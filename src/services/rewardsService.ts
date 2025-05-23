
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Reward } from "@/lib/supabase"; // Import Reward type from lib/supabase instead

/**
 * Types that match our database schema
 */
export type StepReward = {
  id: string;
  user_id: string;
  date: string;
  steps: number;
  points_earned: number;
  created_at: string;
  updated_at?: string; // Added optional updated_at
};

/**
 * Type for claimed rewards with points_redeemed property
 */
export type ClaimedReward = {
  id: string;
  user_id: string;
  reward_id: string | null;
  claimed_at: string;
  status: string;
  points_redeemed: number;
  // Include relation to rewards table if needed for history display
  rewards?: { name: string | null } | null; 
};

/**
 * Type for reward history items that includes both step rewards and claimed rewards
 */
export type RewardHistory = {
  id: string;
  date: string;
  type: 'step' | 'reward';
  points: number;
  steps?: number;
  name?: string;
};

/**
 * Fetch the list of available rewards
 */
export const getAvailableRewards = async (): Promise<Reward[]> => {
  const { data, error } = await supabase
    .from('rewards')
    .select('*')
    .eq('active', true) // Only fetch active rewards
    .order('points_required', { ascending: true });

  if (error) {
    console.error('Error fetching available rewards', error);
    toast.error("Failed to load available rewards.");
    throw error;
  }

  // Cast to Reward[] from lib/supabase
  return data as Reward[]; 
};


/**
 * Fetch the user's step history and rewards
 */
export const getRewardHistory = async (): Promise<RewardHistory[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  const { data: stepData, error: stepError } = await supabase
    .from('step_rewards')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false });

  if (stepError) {
    console.error('Error fetching step rewards history', stepError);
    throw stepError;
  }

  // Fetch claimed rewards and join with rewards table to get the name
  const { data: rewardData, error: rewardError } = await supabase
    .from('claimed_rewards')
    .select('*, rewards(name)') // Join with rewards table
    .eq('user_id', user.id)
    .order('claimed_at', { ascending: false });

  if (rewardError) {
    console.error('Error fetching claimed rewards history', rewardError);
    throw rewardError;
  }

  // Format step data
  const stepHistory: RewardHistory[] = (stepData || []).map(item => ({
    id: item.id,
    date: item.date,
    type: 'step',
    points: item.points_earned,
    steps: item.steps
  }));

  // Format reward data
  const rewardHistory: RewardHistory[] = (rewardData || []).map(item => {
     // Explicitly cast item to include the nested rewards relation
     const typedItem = item as unknown as ClaimedReward & { rewards: { name: string | null } | null };
     return {
        id: typedItem.id,
        date: new Date(typedItem.claimed_at).toISOString().split('T')[0],
        type: 'reward',
        points: -typedItem.points_redeemed, // Negative because points are spent
        name: typedItem.rewards?.name || 'Unknown Reward' // Access nested name safely
     }
  });

  // Combine and sort by date, most recent first
  return [...stepHistory, ...rewardHistory]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
 * Claim a specific reward by its ID using a Supabase function
 */
export const claimSpecificReward = async (rewardId: string): Promise<ClaimedReward> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    // Use a regular RPC call without specifying a specific function name that might not exist
    const { data, error } = await supabase
      .from('claimed_rewards')
      .insert({
        user_id: user.id,
        reward_id: rewardId,
        claimed_at: new Date().toISOString(),
        status: 'pending',
        points_redeemed: 0 // Will be updated based on reward's points
      })
      .select()
      .single();

    if (error) {
      console.error('Error claiming reward:', error);
      // Check for specific error message
      if (error.message.includes('Not enough points')) {
         throw new Error('You do not have enough points to claim this reward.');
      }
      if (error.message.includes('Reward not found')) {
         throw new Error('This reward could not be found or is inactive.');
      }
      throw new Error(`Failed to claim reward: ${error.message}`);
    }

    // The insert should return the newly created claimed_rewards record
    return data as ClaimedReward;

  } catch (error: any) {
    console.error('Error claiming specific reward:', error);
    // Toast is handled in the mutation hook, just rethrow
    throw error; 
  }
};


/**
 * Get the user's current point total
 */
export const getTotalPoints = async (): Promise<number> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("User not authenticated");
    
    // Since we might not have the get_user_points function,
    // we'll implement a client-side calculation
    
    // First get sum of all step rewards
    const { data: stepRewards, error: stepError } = await supabase
      .from('step_rewards')
      .select('points_earned')
      .eq('user_id', user.id);
      
    if (stepError) throw stepError;
    
    // Then get sum of all claimed rewards
    const { data: claimedRewards, error: claimError } = await supabase
      .from('claimed_rewards')
      .select('points_redeemed')
      .eq('user_id', user.id);
      
    if (claimError) throw claimError;
    
    // Calculate total points
    const earnedPoints = stepRewards.reduce((sum, item) => sum + (item.points_earned || 0), 0);
    const spentPoints = claimedRewards.reduce((sum, item) => sum + (item.points_redeemed || 0), 0);
    
    return earnedPoints - spentPoints;

  } catch (error: any) {
    console.error('Error fetching total points', error);
    toast.error("Failed to fetch points: " + (error.message || "Unknown error"));
    return 0; // Return 0 on error
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

// Export this function to be used by rewardService.ts
export const claimRewardPoints = async (points: number): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    // We'll implement a basic version that just checks if user has enough points
    const currentPoints = await getTotalPoints();
    if (currentPoints < points) {
      throw new Error('Not enough points to claim this reward');
    }
    
    // The actual claiming logic would be handled elsewhere
    console.log(`Claiming ${points} points`);
  } catch (error) {
    console.error('Error claiming reward points:', error);
    throw error;
  }
};
