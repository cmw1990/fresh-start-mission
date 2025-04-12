
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAvailableRewards, getUserPointsBalance, claimReward, getRewardHistory } from '@/services/rewardService';
import EnhancedMobileStepTracker from '@/components/mobile/EnhancedMobileStepTracker';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Gift, Trophy, Clock, Check } from 'lucide-react';
import { useStepTracking } from '@/hooks/useStepTracking';
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';

// Define reward history type
type RewardHistory = {
  id: string;
  name: string;
  date: string;
  points: number;
  status: 'pending' | 'fulfilled';
};

// Schema for manual step entry
const stepFormSchema = z.object({
  steps: z
    .string()
    .min(1, { message: "Steps are required" })
    .refine((val) => !isNaN(parseInt(val)), { message: "Steps must be a number" })
    .refine((val) => parseInt(val) > 0 && parseInt(val) <= 50000, { 
      message: "Steps must be between 1 and 50,000" 
    })
});

const StepRewards = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showManualEntry, setShowManualEntry] = useState(false);
  const { impact } = useHaptics();
  
  const { isNative, stepData, logManualSteps, hasPermission, requestPermissions } = useStepTracking();
  
  const form = useForm<z.infer<typeof stepFormSchema>>({
    resolver: zodResolver(stepFormSchema),
    defaultValues: {
      steps: '',
    },
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!user && !loading) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Fetch available rewards
  const { 
    data: rewards = [],
    isLoading: isLoadingRewards 
  } = useQuery({
    queryKey: ['available-rewards'],
    queryFn: getAvailableRewards,
    enabled: !!user
  });

  // Fetch user points balance
  const { 
    data: pointsBalance = 0,
    isLoading: isLoadingPoints 
  } = useQuery({
    queryKey: ['user-points-balance'],
    queryFn: getUserPointsBalance,
    enabled: !!user
  });

  // Fetch reward history
  const {
    data: rewardHistory = [],
    isLoading: isLoadingHistory
  } = useQuery({
    queryKey: ['reward-history'],
    queryFn: getRewardHistory,
    enabled: !!user
  });

  // Mutation for claiming rewards
  const claimRewardMutation = useMutation({
    mutationFn: (rewardId: string) => claimReward(rewardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-points-balance'] });
      queryClient.invalidateQueries({ queryKey: ['reward-history'] });
      impact(HapticImpact.MEDIUM);
      toast.success('Reward claimed successfully!');
    },
    onError: (error) => {
      console.error('Error claiming reward:', error);
      toast.error('Failed to claim reward. Please try again.');
    }
  });

  // Handle reward claim
  const handleClaimReward = (rewardId: string, pointsRequired: number) => {
    if (pointsBalance < pointsRequired) {
      toast.error('Not enough points to claim this reward');
      return;
    }
    
    claimRewardMutation.mutate(rewardId);
  };

  // Handle manual step submission
  const onSubmitSteps = (data: z.infer<typeof stepFormSchema>) => {
    const steps = parseInt(data.steps);
    logManualSteps(steps);
    form.reset();
    setShowManualEntry(false);
    impact(HapticImpact.LIGHT);
  };

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  // Hide manual entry on mobile if tracking is active
  const showManualEntryButton = isNative ? !hasPermission : true;

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Step Rewards</h1>
        <p className="text-muted-foreground">
          Track your steps and earn rewards to support your fresh journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Points Summary Card */}
        <Card>
          <CardHeader className="bg-green-50">
            <Trophy className="h-6 w-6 text-green-600 mb-2" />
            <CardTitle>Your Points</CardTitle>
            <CardDescription>Convert steps to rewards</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <p className="text-4xl font-bold text-green-600">{pointsBalance}</p>
              <p className="text-sm text-muted-foreground">Available Points</p>
            </div>
            <p className="text-sm text-center mb-4">
              You earn 1 point for every 100 steps you take!
            </p>
            {showManualEntryButton && (
              <Button
                onClick={() => setShowManualEntry(prev => !prev)}
                variant="outline"
                className="w-full"
              >
                {showManualEntry ? 'Cancel' : 'Enter Steps Manually'}
              </Button>
            )}

            {showManualEntry && (
              <div className="mt-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitSteps)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="steps"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Today's Steps</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter steps" 
                              type="number"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Log Steps
                    </Button>
                  </form>
                </Form>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Mobile Step Tracker */}
        <div className="col-span-1 md:col-span-1 lg:col-span-2">
          <EnhancedMobileStepTracker />
        </div>
      </div>

      {/* Available Rewards */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Available Rewards</h2>
        
        {isLoadingRewards ? (
          <p>Loading rewards...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewards.map((reward) => (
              <Card key={reward.id} className="overflow-hidden">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex justify-between items-center">
                    <span>{reward.name}</span>
                    <span className="text-amber-600 font-bold">{reward.points_required} pts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm mb-4">{reward.description}</p>
                  <Button 
                    onClick={() => handleClaimReward(reward.id, reward.points_required)}
                    disabled={pointsBalance < reward.points_required || claimRewardMutation.isPending}
                    className="w-full"
                    variant={pointsBalance >= reward.points_required ? "default" : "outline"}
                  >
                    {claimRewardMutation.isPending ? 
                      "Processing..." : 
                      pointsBalance >= reward.points_required ? 
                        "Claim Reward" : 
                        `Need ${reward.points_required - pointsBalance} more points`
                    }
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Reward History */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Your Reward History</h2>
        
        {isLoadingHistory ? (
          <p>Loading history...</p>
        ) : rewardHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Reward</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Points</th>
                  <th className="py-2 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {rewardHistory.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">{item.date}</td>
                    <td className="py-3 px-4">{item.points}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                        ${item.status === 'fulfilled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {item.status === 'fulfilled' ? (
                          <><Check className="w-3 h-3 mr-1" /> Fulfilled</>
                        ) : (
                          <><Clock className="w-3 h-3 mr-1" /> Pending</>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 border rounded-lg">
            <p className="text-muted-foreground">You haven't claimed any rewards yet.</p>
            <p className="text-muted-foreground">Track your steps and earn points to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepRewards;
