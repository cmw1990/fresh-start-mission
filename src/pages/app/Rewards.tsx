
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  getAvailableRewards, 
  getUserPointsBalance, 
  getRewardHistory,
  claimReward
} from "@/services/rewardService";
import { Reward } from "@/lib/supabase";
import { toast } from "sonner";
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';
import { Award, Gift, History, Footprints } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Define types for rewards
type RewardHistoryItem = {
  id: string;
  date: string;
  type: 'step' | 'reward';
  points: number;
  steps?: number;
  name?: string;
};

const Rewards = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [pointsBalance, setPointsBalance] = useState(0);
  const [history, setHistory] = useState<RewardHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [claimingReward, setClaimingReward] = useState<string | null>(null);
  const { impact } = useHaptics();

  useEffect(() => {
    const fetchRewardsData = async () => {
      setLoading(true);
      try {
        const [availableRewards, points, rewardHistory] = await Promise.all([
          getAvailableRewards(),
          getUserPointsBalance(),
          getRewardHistory()
        ]);
        
        setRewards(availableRewards || []);
        setPointsBalance(points);
        setHistory(rewardHistory || []);
      } catch (error) {
        console.error("Error fetching rewards data:", error);
        toast.error("Failed to load rewards data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchRewardsData();
  }, []);
  
  const handleClaimReward = async (rewardId: string) => {
    try {
      setClaimingReward(rewardId);
      impact(HapticImpact.LIGHT);
      
      const selectedReward = rewards.find(r => r.id === rewardId);
      if (!selectedReward) throw new Error("Reward not found");
      
      if (pointsBalance < selectedReward.points_required) {
        toast.error("Not enough points to claim this reward");
        impact(HapticImpact.HEAVY);
        return;
      }
      
      const success = await claimReward(rewardId);
      
      if (success) {
        toast.success("Reward claimed successfully!");
        impact(HapticImpact.MEDIUM);
        
        // Update points balance
        setPointsBalance(prev => prev - selectedReward.points_required);
        
        // Add to history
        const newHistoryItem: RewardHistoryItem = {
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
          type: 'reward',
          points: -selectedReward.points_required,
          name: selectedReward.name
        };
        
        setHistory(prev => [newHistoryItem, ...prev]);
      }
    } catch (error: any) {
      console.error("Error claiming reward:", error);
      toast.error(error.message || "Failed to claim reward");
      impact(HapticImpact.HEAVY);
    } finally {
      setClaimingReward(null);
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Step Rewards</h1>
        <p className="text-muted-foreground">
          Earn points by tracking your steps and redeem them for rewards
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Your Points Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Award className="h-8 w-8 mr-3 text-fresh-400" />
            <span className="text-4xl font-bold">{pointsBalance}</span>
            <span className="ml-2 text-muted-foreground">points</span>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="rewards" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="rewards" className="flex-1">Available Rewards</TabsTrigger>
          <TabsTrigger value="history" className="flex-1">Points History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rewards">
          <div className="space-y-6">
            {loading ? (
              <div className="text-center p-12">
                <div className="h-12 w-12 rounded-full border-4 border-fresh-300 border-t-transparent animate-spin mx-auto mb-4"></div>
                <p>Loading rewards...</p>
              </div>
            ) : rewards.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {rewards.map(reward => (
                  <Card key={reward.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        <div className="flex items-center">
                          <Gift className="h-5 w-5 mr-2 text-fresh-400" />
                          {reward.name}
                        </div>
                      </CardTitle>
                      <CardDescription>{reward.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-bold text-xl">{reward.points_required}</span>
                          <span className="text-muted-foreground ml-1">points</span>
                        </div>
                        
                        <Button 
                          onClick={() => handleClaimReward(reward.id)}
                          disabled={pointsBalance < reward.points_required || claimingReward === reward.id}
                          className="bg-fresh-400 hover:bg-fresh-500"
                        >
                          {claimingReward === reward.id ? (
                            <>
                              <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></div>
                              Claiming...
                            </>
                          ) : pointsBalance < reward.points_required ? (
                            "Not Enough Points"
                          ) : (
                            "Claim Reward"
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-12">
                <p>No rewards available at the moment</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <div className="space-y-6">
            {loading ? (
              <div className="text-center p-12">
                <div className="h-12 w-12 rounded-full border-4 border-fresh-300 border-t-transparent animate-spin mx-auto mb-4"></div>
                <p>Loading history...</p>
              </div>
            ) : history.length > 0 ? (
              <div className="space-y-4">
                {history.map(item => (
                  <Card key={item.id}>
                    <CardHeader className="py-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          {item.type === 'step' ? (
                            <Footprints className="h-5 w-5 mr-2 text-blue-500" />
                          ) : (
                            <Gift className="h-5 w-5 mr-2 text-purple-500" />
                          )}
                          <span>
                            {item.type === 'step' ? (
                              <>Tracked {item.steps} steps</>
                            ) : (
                              <>Claimed "{item.name}" reward</>
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${item.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {item.points > 0 ? '+' : ''}{item.points} points
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardFooter className="py-2">
                      <div className="w-full flex justify-between items-center text-xs text-muted-foreground">
                        <div>
                          <History className="h-3 w-3 inline mr-1" />
                          {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
                        </div>
                        
                        {item.type === 'step' && (
                          <div>≈ {Math.round(Number(item.steps) / 100)} points per 100 steps</div>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-12">
                <p>No point history yet. Start tracking steps to earn points!</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 bg-muted rounded-lg p-4">
        <h3 className="font-medium mb-2">How to earn points:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Track your steps using your phone's health app</li>
          <li>Earn 1 point for every 100 steps you take</li>
          <li>Sync your steps daily in the Dashboard or Step Tracker</li>
          <li>Claim rewards with your earned points</li>
        </ul>
      </div>
    </div>
  );
};

export default Rewards;
