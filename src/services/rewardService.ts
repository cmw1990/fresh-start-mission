
import { supabase, StepReward, Reward, ClaimedReward } from '@/lib/supabase';
import { toast } from 'sonner';

/**
 * Logs user's daily steps
 */
export const logSteps = async (steps: number): Promise<StepReward | null> => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      toast.error('You must be logged in to log steps');
      return null;
    }

    // Calculate points based on steps (1 point per 100 steps)
    const pointsEarned = Math.floor(steps / 100);
    const today = new Date().toISOString().split('T')[0];

    // Check if steps already logged for today
    const { data: existingEntry } = await supabase
      .from('step_rewards')
      .select('*')
      .eq('user_id', user.user.id)
      .eq('date', today)
      .single();

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
          user_id: user.user.id,
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
 * Gets user's total points balance
 */
export const getUserPointsBalance = async (): Promise<number> => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return 0;

    // Get total points earned
    const { data: earned, error: earnedError } = await supabase
      .from('step_rewards')
      .select('points_earned')
      .eq('user_id', user.user.id);

    if (earnedError) throw earnedError;

    // Get total points spent
    const { data: claimed, error: claimedError } = await supabase
      .from('claimed_rewards')
      .select('rewards(points_required)')
      .eq('user_id', user.user.id)
      .eq('status', 'fulfilled');

    if (claimedError) throw claimedError;

    // Calculate balance
    const totalEarned = earned.reduce((sum, item) => sum + (item.points_earned || 0), 0);
    
    // Fix the type issue by properly accessing the nested object structure
    const totalSpent = claimed.reduce((sum, item) => {
      // Cast item.rewards to access the nested points_required property
      const rewardsData = item.rewards as { points_required: number };
      return sum + (rewardsData?.points_required || 0);
    }, 0);

    return totalEarned - totalSpent;
  } catch (error: any) {
    console.error('Error calculating points balance:', error);
    return 0;
  }
};

/**
 * Claims a reward
 */
export const claimReward = async (rewardId: string): Promise<ClaimedReward | null> => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      toast.error('You must be logged in to claim rewards');
      return null;
    }

    // Check if user has enough points
    const userBalance = await getUserPointsBalance();
    const { data: reward, error: rewardError } = await supabase
      .from('rewards')
      .select('*')
      .eq('id', rewardId)
      .single();

    if (rewardError) throw rewardError;
    
    if (userBalance < reward.points_required) {
      toast.error('Not enough points to claim this reward');
      return null;
    }

    // Claim the reward
    const { data, error } = await supabase
      .from('claimed_rewards')
      .insert({
        user_id: user.user.id,
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
