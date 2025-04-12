
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Fetch the user's step history and rewards
 */
export const getRewardHistory = async () => {
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

  return data;
};

/**
 * Save step count for the day and calculate points earned
 */
export const recordStepCount = async (steps: number, date: string) => {
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
    const points = Math.floor(steps / 100);
    
    if (existingEntry) {
      // Update existing entry
      const { error } = await supabase
        .from('step_rewards')
        .update({
          steps,
          points,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingEntry.id);
      
      if (error) throw error;
      
      return { ...existingEntry, steps, points };
    } else {
      // Create new entry
      const { data, error } = await supabase
        .from('step_rewards')
        .insert({
          user_id: user.id,
          date,
          steps,
          points,
          claimed: false
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return data;
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
    
    // Get total available points
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('total_points')
      .eq('id', user.id)
      .single();
    
    if (userError) throw userError;
    
    const availablePoints = userData?.total_points || 0;
    
    if (availablePoints < pointsToRedeem) {
      throw new Error(`Not enough points. You have ${availablePoints} points available.`);
    }
    
    // Create a reward claim record
    const { data, error } = await supabase
      .from('reward_claims')
      .insert({
        user_id: user.id,
        points_redeemed: pointsToRedeem,
        claim_date: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Update the user's point balance
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        total_points: availablePoints - pointsToRedeem
      })
      .eq('id', user.id);
    
    if (updateError) throw updateError;
    
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
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  const { data, error } = await supabase
    .from('profiles')
    .select('total_points')
    .eq('id', user.id)
    .single();
  
  if (error) {
    console.error('Error fetching total points', error);
    throw error;
  }
  
  return data?.total_points || 0;
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
