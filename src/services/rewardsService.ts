
import { supabase } from "@/integrations/supabase/client";
import { StepReward, ClaimedReward, Reward } from "@/lib/supabase";

// Get all step rewards for the current user
export const getStepRewards = async (userId: string) => {
  const { data, error } = await supabase
    .from('step_rewards')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching step rewards', error);
    throw error;
  }

  return data as StepReward[];
};

// Add new step data and calculate rewards
export const addStepData = async (userId: string, date: string, steps: number) => {
  // Calculate points based on steps (1 point per 1000 steps)
  const pointsEarned = Math.floor(steps / 1000);
  
  const stepReward = {
    user_id: userId,
    date,
    steps,
    points_earned: pointsEarned
  };
  
  const { data, error } = await supabase
    .from('step_rewards')
    .insert(stepReward)
    .select()
    .single();

  if (error) {
    console.error('Error adding step reward', error);
    throw error;
  }

  return data as StepReward;
};

// Get all available rewards
export const getAvailableRewards = async () => {
  const { data, error } = await supabase
    .from('rewards')
    .select('*')
    .eq('active', true)
    .order('points_required', { ascending: true });

  if (error) {
    console.error('Error fetching rewards', error);
    throw error;
  }

  return data as Reward[];
};

// Get claimed rewards for the current user
export const getClaimedRewards = async (userId: string) => {
  const { data, error } = await supabase
    .from('claimed_rewards')
    .select(`
      *,
      reward:reward_id (name, description, points_required)
    `)
    .eq('user_id', userId)
    .order('claimed_at', { ascending: false });

  if (error) {
    console.error('Error fetching claimed rewards', error);
    throw error;
  }

  return data as (ClaimedReward & { reward: Reward })[];
};

// Claim a reward
export const claimReward = async (userId: string, rewardId: string) => {
  const claimedReward = {
    user_id: userId,
    reward_id: rewardId,
    status: 'pending'
  };
  
  const { data, error } = await supabase
    .from('claimed_rewards')
    .insert(claimedReward)
    .select()
    .single();

  if (error) {
    console.error('Error claiming reward', error);
    throw error;
  }

  return data as ClaimedReward;
};

// Get total points earned by a user
export const getTotalPoints = async (userId: string) => {
  const { data, error } = await supabase
    .from('step_rewards')
    .select('points_earned')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching total points', error);
    throw error;
  }

  // Sum up all points
  const totalPoints = (data as StepReward[]).reduce(
    (sum, reward) => sum + reward.points_earned, 
    0
  );

  // Get already spent points
  const { data: claimedData, error: claimedError } = await supabase
    .from('claimed_rewards')
    .select(`
      reward:reward_id (points_required)
    `)
    .eq('user_id', userId);

  if (claimedError) {
    console.error('Error fetching claimed rewards', claimedError);
    throw claimedError;
  }

  const spentPoints = (claimedData as any[]).reduce(
    (sum, claimed) => sum + claimed.reward.points_required,
    0
  );

  return {
    totalEarned: totalPoints,
    totalSpent: spentPoints,
    available: totalPoints - spentPoints
  };
};
