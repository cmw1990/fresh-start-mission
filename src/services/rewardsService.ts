
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Types that match our database schema
 */
type StepReward = {
  id: string;
  user_id: string;
  date: string;
  steps: number;
  points_earned: number;
  created_at: string;
};

/**
 * Fetch the user's step history and rewards
 */
export const getRewardHistory = async (): Promise<StepReward[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  const { data, error } = await supabase
    .from('step_rewards')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false })
    .limit(30);

  if (error) {
    console.error('Error fetching reward history', error);
    throw error;
  }

  return data as StepReward[];
};

/**
 * Save step count for the day and calculate points earned
 */
export const recordStepCount = async (steps: number, date: string): Promise<StepReward> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("User not authenticated");
    
    // Check if an entry already exists for this date
    const { data: existingEntry } = await supabase
      .from('step_rewards')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', date)
      .maybeSingle();
    
    // Calculate points based on steps (1 point per 100 steps)
    const points_earned = Math.floor(steps / 100);
    
    if (existingEntry) {
      // Update existing entry
      const { data, error } = await supabase
        .from('step_rewards')
        .update({
          steps,
          points_earned,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingEntry.id)
        .select()
        .single();
      
      if (error) throw error;
      
      return data as StepReward;
    } else {
      // Create new entry
      const { data, error } = await supabase
        .from('step_rewards')
        .insert({
          user_id: user.id,
          date,
          steps,
          points_earned,
          created_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return data as StepReward;
    }
  } catch (error: any) {
    console.error('Error recording step count:', error);
    toast.error("Failed to record steps: " + (error.message || "Unknown error"));
    throw error;
  }
};

/**
 * Claim points for rewards
 */
export const claimRewardPoints = async (pointsToRedeem: number) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("User not authenticated");
    
    // Get total available points from step_rewards table
    const { data: rewardsData, error: rewardsError } = await supabase
      .from('step_rewards')
      .select('points_earned')
      .eq('user_id', user.id);
    
    if (rewardsError) throw rewardsError;
    
    const earnedPoints = rewardsData.reduce((sum, item) => sum + (item.points_earned || 0), 0);
    
    // Get already claimed points
    const { data: claimedRewards, error: claimedError } = await supabase
      .from('claimed_rewards')
      .select('points_redeemed')
      .eq('user_id', user.id);
    
    if (claimedError) throw claimedError;
    
    const claimedPoints = claimedRewards?.reduce((sum, item) => sum + (item.points_redeemed || 0), 0) || 0;
    
    // Calculate available points
    const availablePoints = earnedPoints - claimedPoints;
    
    if (availablePoints < pointsToRedeem) {
      throw new Error(`Not enough points. You have ${availablePoints} points available.`);
    }
    
    // Create a reward claim record
    const { data, error } = await supabase
      .from('claimed_rewards')
      .insert({
        user_id: user.id,
        points_redeemed: pointsToRedeem,
        claimed_at: new Date().toISOString(),
        reward_id: null // Assuming this is a generic claim without a specific reward
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error: any) {
    console.error('Error claiming reward points:', error);
    toast.error("Failed to claim rewards: " + (error.message || "Unknown error"));
    throw error;
  }
};

/**
 * Get the user's current point total
 */
export const getTotalPoints = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("User not authenticated");
    
    // Get total earned points from step_rewards
    const { data: earned, error: earnedError } = await supabase
      .from('step_rewards')
      .select('points_earned')
      .eq('user_id', user.id);
    
    if (earnedError) throw earnedError;
    
    // Get total spent points from claimed_rewards
    const { data: claimed, error: claimedError } = await supabase
      .from('claimed_rewards')
      .select('points_redeemed')
      .eq('user_id', user.id);
    
    if (claimedError) throw claimedError;
    
    // Calculate balance
    const totalEarned = earned?.reduce((sum, item) => sum + (item.points_earned || 0), 0) || 0;
    const totalSpent = claimed?.reduce((sum, item) => sum + (item.points_redeemed || 0), 0) || 0;
    
    return totalEarned - totalSpent;
  } catch (error: any) {
    console.error('Error fetching total points', error);
    toast.error("Failed to fetch points: " + (error.message || "Unknown error"));
    return 0;
  }
};

/**
 * Update the user's profile with new steps from a native health tracker
 */
export const syncNativeSteps = async (steps: number) => {
  try {
    // Format today's date
    const today = new Date().toISOString().split('T')[0];
    
    // Record the steps
    return await recordStepCount(steps, today);
  } catch (error: any) {
    console.error('Error syncing native steps:', error);
    toast.error("Failed to sync steps: " + (error.message || "Unknown error"));
    throw error;
  }
};
