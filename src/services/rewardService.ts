
// Import dependencies from rewardsService (note plural 's') to maintain backwards compatibility
import { supabase } from "@/integrations/supabase/client";
import { getTotalPoints, getRewardHistory, claimRewardPoints } from "./rewardsService";

// Re-export functions from rewardsService for backward compatibility
export { getTotalPoints, getRewardHistory, claimRewardPoints };

// Add missing functions that are referenced elsewhere but not in original file
export const getUserPointsBalance = async (): Promise<number> => {
  // Simply use getTotalPoints from rewardsService
  return getTotalPoints();
};

// Function to log steps for reward tracking
export const logSteps = async (steps: number): Promise<boolean> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    // Use the existing recordStepCount function from rewardsService.ts
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");
    
    // Format today's date
    await recordStepCount(steps, today);
    return true;
  } catch (error) {
    console.error("Error logging steps:", error);
    return false;
  }
};

// Helper function to record step count (copied from rewardsService.ts for local use)
async function recordStepCount(steps: number, date: string) {
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
      
      return data;
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
      
      return data;
    }
  } catch (error) {
    console.error('Error recording step count:', error);
    throw error;
  }
}

export type Reward = {
  id: string;
  name: string;
  description: string;
  points_required: number;
  active: boolean;
};

export async function claimReward(rewardId: string): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");
    
    // Get the reward details from the rewards table
    const { data: reward, error: rewardError } = await supabase
      .from('rewards')
      .select('*')
      .eq('id', rewardId)
      .single();
    
    if (rewardError) throw rewardError;
    if (!reward) throw new Error("Reward not found");
    
    // Use the centralized function from rewardsService
    await claimRewardPoints(reward.points_required);
    
    // Create claimed reward record
    const { error: claimError } = await supabase
      .from('claimed_rewards')
      .insert({
        user_id: user.id,
        reward_id: rewardId,
        points_redeemed: reward.points_required,
        status: 'pending' // Default to pending until processed
      });
    
    if (claimError) throw claimError;
    
    return true;
  } catch (error) {
    console.error("Error claiming reward:", error);
    throw error;
  }
}

export async function getAvailableRewards(): Promise<Reward[]> {
  try {
    const { data, error } = await supabase
      .from('rewards')
      .select('*')
      .eq('active', true)
      .order('points_required', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching available rewards:", error);
    throw error;
  }
}
