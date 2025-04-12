
import { supabase } from "@/integrations/supabase/client";
import { StepReward, ClaimedReward, Reward } from "@/lib/supabase";

// Get all step rewards for the current user
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

// Add new step data and calculate rewards
export const logSteps = async (steps: number) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  // Calculate points based on steps (1 point per 1000 steps)
  const pointsEarned = Math.floor(steps / 1000);
  
  // Format the date in ISO format for storage
  const currentDate = new Date().toISOString().split('T')[0];
  
  const stepReward = {
    user_id: user.id,
    date: currentDate,
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

// Claim a reward
export const claimReward = async (rewardId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  const claimedReward = {
    user_id: user.id,
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
export const getUserPointsBalance = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  const { data, error } = await supabase
    .from('step_rewards')
    .select('points_earned')
    .eq('user_id', user.id);

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
    .eq('user_id', user.id);

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
