
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getTotalPoints, getAvailableRewards, getRewardHistory, claimSpecificReward } from "@/services/rewardsService";
import { Loader2, Gift, Clock, Trophy, Award } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { Reward as RewardType } from "@/lib/supabase"; // Import the correct type

// A custom interface that conforms to both types
interface GenericReward {
  id: string;
  name: string;
  description: string;
  points_required: number;
  active?: boolean;
  created_at?: string;
}

const Rewards = () => {
  const [userPoints, setUserPoints] = useState<number>(0);
  const [rewards, setRewards] = useState<GenericReward[]>([]);
  const [rewardHistory, setRewardHistory] = useState<any[]>([]);
  
  const queryClient = useQueryClient();

  // Query for fetching total points
  const { data: pointsData, isLoading: isLoadingPoints } = useQuery({
    queryKey: ['user-points'],
    queryFn: getTotalPoints
  });

  // Query for fetching available rewards
  const { data: rewardsData, isLoading: isLoadingRewards } = useQuery({
    queryKey: ['available-rewards'],
    queryFn: getAvailableRewards
  });

  // Query for fetching reward history
  const { data: historyData, isLoading: isLoadingHistory } = useQuery({
    queryKey: ['reward-history'],
    queryFn: getRewardHistory
  });

  // Mutation for claiming rewards
  const { mutate: claimReward, isLoading: isClaiming } = useMutation({
    mutationFn: (rewardId: string) => claimSpecificReward(rewardId),
    onSuccess: () => {
      toast.success("Reward claimed successfully!");
      queryClient.invalidateQueries({ queryKey: ['user-points'] });
      queryClient.invalidateQueries({ queryKey: ['reward-history'] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to claim reward");
    }
  });

  useEffect(() => {
    if (pointsData !== undefined) {
      setUserPoints(pointsData);
    }
    
    if (rewardsData) {
      // Convert to the generic reward type to make TypeScript happy
      const genericRewards: GenericReward[] = rewardsData.map(reward => ({
        id: reward.id,
        name: reward.name,
        description: reward.description,
        points_required: reward.points_required,
        active: reward.active,
        created_at: reward.created_at
      }));
      
      setRewards(genericRewards);
    }
    
    if (historyData) {
      setRewardHistory(historyData);
    }
  }, [pointsData, rewardsData, historyData]);

  const handleClaimReward = (rewardId: string) => {
    claimReward(rewardId);
  };

  if (isLoadingPoints || isLoadingRewards) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Step Rewards</h1>
            <p className="text-muted-foreground mt-1">
              Stay active, earn points, and claim rewards
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                Available Rewards
              </CardTitle>
              <CardDescription>
                Claim rewards with your earned points
              </CardDescription>
            </CardHeader>
            <CardContent>
              {rewards.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No rewards available at this time
                </div>
              ) : (
                <div className="space-y-4">
                  {rewards.map((reward) => (
                    <Card key={reward.id} className="overflow-hidden">
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <div className="font-medium">{reward.name}</div>
                          <div className="text-sm text-muted-foreground">{reward.description}</div>
                          <div className="mt-1 text-sm font-medium text-primary">
                            {reward.points_required} points required
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleClaimReward(reward.id)}
                          disabled={userPoints < reward.points_required || isClaiming}
                          className="shrink-0"
                        >
                          {isClaiming ? 
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 
                            <Gift className="mr-2 h-4 w-4" />
                          }
                          Claim
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {!isLoadingHistory && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-blue-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {rewardHistory.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    No recent activity
                  </div>
                ) : (
                  <div className="space-y-4">
                    {rewardHistory.slice(0, 5).map((item) => (
                      <div key={item.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                        <div className="flex items-center">
                          {item.type === 'step' ? (
                            <div className="bg-green-100 p-2 rounded-full mr-3">
                              <Award className="h-4 w-4 text-green-600" />
                            </div>
                          ) : (
                            <div className="bg-purple-100 p-2 rounded-full mr-3">
                              <Gift className="h-4 w-4 text-purple-600" />
                            </div>
                          )}
                          <div>
                            <div className="font-medium">
                              {item.type === 'step' 
                                ? `Earned ${item.points} points from ${item.steps} steps` 
                                : `Claimed ${item.name}`}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
                            </div>
                          </div>
                        </div>
                        <div className={`font-medium ${item.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.points > 0 ? `+${item.points}` : item.points} points
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Your Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center py-6 flex-col">
                <div className="text-4xl font-bold">{userPoints}</div>
                <div className="text-muted-foreground mt-1">total points earned</div>
              </div>
              
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="font-medium mb-2">How to earn more points:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <div className="bg-blue-100 p-1 rounded-full mr-2">
                        <Award className="h-3 w-3 text-blue-600" />
                      </div>
                      1 point for every 100 steps
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="bg-green-100 p-1 rounded-full mr-2">
                        <Award className="h-3 w-3 text-green-600" />
                      </div>
                      Track steps automatically with the mobile app
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
