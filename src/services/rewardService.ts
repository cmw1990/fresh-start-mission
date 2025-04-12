
import { supabase } from "@/integrations/supabase/client";
import { getTotalPoints, getRewardHistory, claimRewardPoints } from "./rewardsService";

export { getTotalPoints, getRewardHistory, claimRewardPoints };

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
