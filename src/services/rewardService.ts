
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type Reward = {
  id: string;
  name: string;
  description: string;
  points_required: number;
  active: boolean;
};

export type RewardHistory = {
  id: string;
  name: string;
  date: string;
  points: number;
  status: 'pending' | 'fulfilled';
};

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
    toast.error("Failed to fetch rewards");
    return [];
  }
}

export async function getUserPointsBalance(): Promise<number> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");
    
    // Get the total points earned
    const { data: earnedData, error: earnedError } = await supabase
      .from('step_rewards')
      .select('points_earned')
      .eq('user_id', user.id);
    
    if (earnedError) throw earnedError;
    
    // Get the total points spent
    const { data: spentData, error: spentError } = await supabase
      .from('claimed_rewards')
      .select('points_redeemed')
      .eq('user_id', user.id);
    
    if (spentError) throw spentError;
    
    // Calculate balance
    const earnedPoints = earnedData?.reduce((sum, item) => sum + (item.points_earned || 0), 0) || 0;
    const spentPoints = spentData?.reduce((sum, item) => sum + (item.points_redeemed || 0), 0) || 0;
    
    return earnedPoints - spentPoints;
  } catch (error) {
    console.error("Error fetching user points balance:", error);
    return 0;
  }
}

export async function claimReward(rewardId: string): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");
    
    // Get the reward details
    const { data: reward, error: rewardError } = await supabase
      .from('rewards')
      .select('*')
      .eq('id', rewardId)
      .single();
    
    if (rewardError) throw rewardError;
    if (!reward) throw new Error("Reward not found");
    
    // Check if user has enough points
    const pointsBalance = await getUserPointsBalance();
    if (pointsBalance < reward.points_required) {
      toast.error("You don't have enough points to claim this reward");
      return false;
    }
    
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

export async function getRewardHistory(): Promise<RewardHistory[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");
    
    // Join claimed_rewards with rewards to get reward details
    const { data, error } = await supabase
      .from('claimed_rewards')
      .select(`
        id,
        points_redeemed,
        claimed_at,
        status,
        rewards (
          name
        )
      `)
      .eq('user_id', user.id)
      .order('claimed_at', { ascending: false });
    
    if (error) throw error;
    
    // Format the data
    return (data || []).map(item => ({
      id: item.id,
      name: item.rewards?.name || 'Unknown Reward',
      date: new Date(item.claimed_at).toLocaleDateString(),
      points: item.points_redeemed,
      status: item.status as 'pending' | 'fulfilled'
    }));
  } catch (error) {
    console.error("Error fetching reward history:", error);
    toast.error("Failed to fetch reward history");
    return [];
  }
}

export async function logSteps(steps: number): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");
    
    // Calculate points (1 point per 100 steps)
    const pointsEarned = Math.floor(steps / 100);
    
    // Check if already logged steps today
    const today = new Date().toISOString().split('T')[0];
    const { data: existingLog, error: checkError } = await supabase
      .from('step_rewards')
      .select('id, steps, points_earned')
      .eq('user_id', user.id)
      .eq('date', today)
      .maybeSingle();
    
    if (checkError) throw checkError;
    
    if (existingLog) {
      // Update existing log
      const { error: updateError } = await supabase
        .from('step_rewards')
        .update({ 
          steps: steps, 
          points_earned: pointsEarned
        })
        .eq('id', existingLog.id);
      
      if (updateError) throw updateError;
      toast.success(`Updated today's steps: ${steps} steps (${pointsEarned} points)`);
    } else {
      // Create new log
      const { error: insertError } = await supabase
        .from('step_rewards')
        .insert({
          user_id: user.id,
          date: today,
          steps: steps,
          points_earned: pointsEarned
        });
      
      if (insertError) throw insertError;
      toast.success(`Logged ${steps} steps (${pointsEarned} points)`);
    }
    
    return true;
  } catch (error) {
    console.error("Error logging steps:", error);
    toast.error("Failed to log steps");
    return false;
  }
}
