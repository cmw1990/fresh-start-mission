
import { supabase } from "@/integrations/supabase/client";
import { StepReward, ClaimedReward, Reward } from "@/lib/supabase";
import { toast } from "sonner";

/**
 * Get all step rewards for the current user
 */
export const getStepRewards = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  const { data, error } = await supabase
    .from('step_rewards')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching step rewards', error);
    throw error;
  }

  return data as StepReward[];
};

/**
 * Get a specific step reward by ID
 */
export const getStepRewardById = async (rewardId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  const { data, error } = await supabase
    .from('step_rewards')
    .select('*')
    .eq('id', rewardId)
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching step reward by ID', error);
    throw error;
  }

  return data as StepReward;
};

/**
 * Logs user's daily steps
 */
export const logSteps = async (steps: number): Promise<StepReward | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('You must be logged in to log steps');
      return null;
    }

    // Calculate points based on steps (1 point per 100 steps)
    const pointsEarned = Math.floor(steps / 100);
    const today = new Date().toISOString().split('T')[0];

    // Check if steps already logged for today
    const { data: existingEntry, error: checkError } = await supabase
      .from('step_rewards')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .maybeSingle();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existingEntry) {
      // Update existing entry
      const { data, error } = await supabase
        .from('step_rewards')
        .update({
          steps,
          points_earned: pointsEarned
        })
        .eq('id', existingEntry.id)
        .select()
        .single();

      if (error) throw error;
      toast.success('Steps updated successfully!');
      return data as StepReward;
    } else {
      // Create new entry
      const { data, error } = await supabase
        .from('step_rewards')
        .insert({
          user_id: user.id,
          date: today,
          steps,
          points_earned: pointsEarned
        })
        .select()
        .single();

      if (error) throw error;
      toast.success('Steps logged successfully!');
      return data as StepReward;
    }
  } catch (error: any) {
    console.error('Error logging steps:', error);
    toast.error(error.message || 'Error logging steps');
    return null;
  }
};

/**
 * Delete a step reward entry
 */
export const deleteStepReward = async (rewardId: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("User not authenticated");

    const { error } = await supabase
      .from('step_rewards')
      .delete()
      .eq('id', rewardId)
      .eq('user_id', user.id); // Ensure user can only delete their own entries
    
    if (error) throw error;
    
    toast.success("Step reward deleted successfully!");
    return true;
  } catch (error: any) {
    console.error('Error deleting step reward:', error);
    toast.error(error.message || "Error deleting step reward");
    throw error;
  }
};

/**
 * Gets available rewards
 */
export const getAvailableRewards = async (): Promise<Reward[]> => {
  try {
    const { data, error } = await supabase
      .from('rewards')
      .select('*')
      .eq('active', true)
      .order('points_required', { ascending: true });

    if (error) throw error;
    return data as Reward[];
  } catch (error: any) {
    console.error('Error fetching rewards:', error);
    return [];
  }
};

/**
 * Get a specific reward by ID
 */
export const getRewardById = async (rewardId: string): Promise<Reward | null> => {
  try {
    const { data, error } = await supabase
      .from('rewards')
      .select('*')
      .eq('id', rewardId)
      .single();

    if (error) throw error;
    return data as Reward;
  } catch (error: any) {
    console.error('Error fetching reward by ID:', error);
    return null;
  }
};

/**
 * Gets claimed rewards for the current user
 */
export const getClaimedRewards = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  const { data, error } = await supabase
    .from('claimed_rewards')
    .select(`
      *,
      reward:reward_id (name, description, points_required)
    `)
    .eq('user_id', user.id)
    .order('claimed_at', { ascending: false });

  if (error) {
    console.error('Error fetching claimed rewards', error);
    throw error;
  }

  return data as (ClaimedReward & { reward: Reward })[];
};

/**
 * Get a specific claimed reward by ID
 */
export const getClaimedRewardById = async (claimedRewardId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  const { data, error } = await supabase
    .from('claimed_rewards')
    .select(`
      *,
      reward:reward_id (name, description, points_required)
    `)
    .eq('id', claimedRewardId)
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching claimed reward by ID', error);
    throw error;
  }

  return data as (ClaimedReward & { reward: Reward });
};

/**
 * Claims a reward
 */
export const claimReward = async (rewardId: string): Promise<ClaimedReward | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('You must be logged in to claim rewards');
      return null;
    }

    // Check if user has enough points
    const pointsBalance = await getUserPointsBalance();
    const { data: reward, error: rewardError } = await supabase
      .from('rewards')
      .select('*')
      .eq('id', rewardId)
      .single();

    if (rewardError) throw rewardError;
    
    if (pointsBalance.available < reward.points_required) {
      toast.error('Not enough points to claim this reward');
      return null;
    }

    // Claim the reward
    const { data, error } = await supabase
      .from('claimed_rewards')
      .insert({
        user_id: user.id,
        reward_id: rewardId,
        claimed_at: new Date().toISOString(),
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    
    toast.success('Reward claimed successfully!');
    return data as ClaimedReward;
  } catch (error: any) {
    console.error('Error claiming reward:', error);
    toast.error(error.message || 'Error claiming reward');
    return null;
  }
};

/**
 * Delete a claimed reward
 */
export const deleteClaimedReward = async (claimedRewardId: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("User not authenticated");

    // Only allow deletion if the status is 'pending'
    const { error } = await supabase
      .from('claimed_rewards')
      .delete()
      .eq('id', claimedRewardId)
      .eq('user_id', user.id) 
      .eq('status', 'pending'); // Can only delete pending claims
    
    if (error) throw error;
    
    toast.success("Claimed reward cancelled successfully!");
    return true;
  } catch (error: any) {
    console.error('Error deleting claimed reward:', error);
    toast.error(error.message || "Error cancelling claimed reward");
    throw error;
  }
};

/**
 * Gets total points earned by a user
 */
export const getUserPointsBalance = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { totalEarned: 0, totalSpent: 0, available: 0 };
    
    // Get total points earned
    const { data: earned, error: earnedError } = await supabase
      .from('step_rewards')
      .select('points_earned')
      .eq('user_id', user.id);

    if (earnedError) throw earnedError;

    // Sum up all points earned
    const totalEarned = (earned as StepReward[]).reduce(
      (sum, reward) => sum + (reward.points_earned || 0), 
      0
    );

    // Get already spent points
    const { data: claimedData, error: claimedError } = await supabase
      .from('claimed_rewards')
      .select(`
        reward:reward_id (points_required)
      `)
      .eq('user_id', user.id);

    if (claimedError) throw claimedError;

    // Calculate spent points
    const totalSpent = (claimedData as any[]).reduce(
      (sum, claimed) => sum + (claimed.reward?.points_required || 0),
      0
    );

    return {
      totalEarned,
      totalSpent,
      available: totalEarned - totalSpent
    };
  } catch (error: any) {
    console.error('Error calculating points balance:', error);
    return { totalEarned: 0, totalSpent: 0, available: 0 };
  }
};
