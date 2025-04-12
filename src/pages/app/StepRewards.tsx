import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Footprints, Award, ChevronRight, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useStepTracking } from "@/hooks/useStepTracking";
import { useHaptics, HapticImpact } from "@/hooks/useHaptics";
import { format } from "date-fns";
import { 
  recordStepCount, 
  getTotalPoints, 
  getRewardHistory,
  getAvailableRewards, // Import new function
  claimSpecificReward, // Import new function
  type RewardHistory,
  // type Reward // Import Reward type from lib/supabase now - Corrected below
} from "@/services/rewardsService";
import { Reward } from "@/lib/supabase"; // Corrected import path for Reward type
import { Progress } from "@/components/ui/progress";

// Extended RewardHistory type to ensure steps property exists
interface ExtendedRewardHistory extends RewardHistory {
  steps?: number;
}

const StepRewards = () => {
  const [steps, setSteps] = useState("");
  const [isSubmittingManualSteps, setIsSubmittingManualSteps] = useState(false);
  const { impact } = useHaptics();
  const queryClient = useQueryClient();

  const {
    stepData,
    isNative,
    isLoading: stepTrackingLoading,
    hasPermission,
    requestPermissions,
    fetchSteps,
  } = useStepTracking();

  // Fetch total points
  const { 
    data: points = 0, 
    isLoading: pointsLoading,
    error: pointsError
  } = useQuery({
    queryKey: ['total-points'],
    queryFn: getTotalPoints,
    staleTime: 1 * 60 * 1000, // 1 minute stale time for points
  });

  // Fetch reward history
  const { 
    data: history = [], 
    isLoading: historyLoading,
    error: historyError
  } = useQuery<ExtendedRewardHistory[]>({
    queryKey: ['reward-history'],
    queryFn: () => getRewardHistory() as Promise<ExtendedRewardHistory[]>,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch available rewards - Uses the new service function
  const { 
    data: availableRewards = [], 
    isLoading: rewardsLoading,
    error: rewardsError
  } = useQuery<Reward[]>({
    queryKey: ['available-rewards'],
    queryFn: getAvailableRewards,
    staleTime: 15 * 60 * 1000, // Cache rewards for 15 minutes
  });

  // Claim reward mutation - Uses the new service function
  const claimRewardMutation = useMutation({
    mutationFn: (rewardId: string) => claimSpecificReward(rewardId), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['total-points'] });
      queryClient.invalidateQueries({ queryKey: ['reward-history'] });
      toast.success("Reward claimed successfully!");
      impact(HapticImpact.MEDIUM);
    },
    onError: (error) => {
      toast.error("Failed to claim reward", { 
        description: error instanceof Error ? error.message : "Please try again later" 
      });
    },
  });

  // Record steps mutation
  const recordStepsMutation = useMutation({
    mutationFn: (data: { steps: number, date: string }) => 
      recordStepCount(data.steps, data.date),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['total-points'] });
      queryClient.invalidateQueries({ queryKey: ['reward-history'] });
      setSteps("");
      toast.success("Steps recorded successfully!");
      impact(HapticImpact.MEDIUM);
    },
    onError: (error) => {
      toast.error("Failed to record steps", { 
        description: error instanceof Error ? error.message : "Please try again later" 
      });
    },
  });

  const handleManualStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!steps || isSubmittingManualSteps) return;
    
    const stepsNumber = parseInt(steps);
    if (isNaN(stepsNumber) || stepsNumber < 0) {
      toast.error("Please enter a valid step count");
      return;
    }
    
    setIsSubmittingManualSteps(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      await recordStepsMutation.mutateAsync({ steps: stepsNumber, date: today });
    } finally {
      setIsSubmittingManualSteps(false);
    }
  };

  // Updated to use the mutation correctly
  const handleClaimReward = async (rewardId: string, pointsRequired: number) => {
    // Client-side check for immediate feedback
    if ((points === undefined || points < pointsRequired) && typeof points === 'number') {
      toast.error("Not enough points", { 
        description: `You need ${pointsRequired} points to claim this reward` 
      });
      return;
    }
    
    // Call the mutation which handles backend logic and error/success states
    claimRewardMutation.mutate(rewardId); 
  };

  const isLoadingOverall = pointsLoading || historyLoading || rewardsLoading;
  const queryErrorOverall = pointsError || historyError || rewardsError;

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Step Rewards</h1>
        <p className="text-muted-foreground">
          Earn points by staying active and claim rewards
        </p>
      </div>

      {queryErrorOverall && (
         <Alert variant="destructive" className="mb-6">
           <AlertCircle className="h-4 w-4" />
           <AlertTitle>Error Loading Data</AlertTitle>
           <AlertDescription>
             There was an error loading rewards data. Please refresh the page. 
             {(queryErrorOverall as Error)?.message && ` Details: ${(queryErrorOverall as Error).message}`}
           </AlertDescription>
         </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Step tracking card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Footprints className="h-5 w-5 mr-2 text-fresh-500" />
              Step Tracker
            </CardTitle>
            <CardDescription>
              Track your daily steps and earn points
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isNative ? (
              hasPermission ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Today's Steps</h3>
                      {stepTrackingLoading ? (
                        <Skeleton className="h-9 w-32" />
                      ) : (
                        <p className="text-3xl font-bold">{stepData.steps.toLocaleString()}</p>
                      )}
                      {stepData.lastUpdated && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Last updated: {format(stepData.lastUpdated, 'hh:mm a')}
                        </p>
                      )}
                    </div>
                    <Button onClick={fetchSteps} disabled={stepTrackingLoading}>
                      {stepTrackingLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Refreshing...
                        </>
                      ) : (
                        "Refresh Steps"
                      )}
                    </Button>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress towards 10,000 steps</span>
                      <span>{Math.min(100, Math.round((stepData.steps / 10000) * 100))}%</span>
                    </div>
                    <Progress value={Math.min(100, (stepData.steps / 10000) * 100)} className="h-2" />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    You earn 1 point per 100 steps. Today's potential points: <span className="font-medium">{Math.floor(stepData.steps / 100)}</span>
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-center">Connect to Apple Health or Google Fit to automatically track your steps</p>
                  <div className="flex justify-center">
                    <Button 
                      onClick={requestPermissions}
                      className="bg-fresh-500 hover:bg-fresh-600"
                      disabled={stepTrackingLoading}
                    >
                      {stepTrackingLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        "Connect Health Data"
                      )}
                    </Button>
                  </div>
                </div>
              )
            ) : (
              <form onSubmit={handleManualStepSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="steps">Enter Today's Steps</Label>
                  <Input
                    id="steps"
                    type="number"
                    placeholder="e.g. 8500"
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                    min="0"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-fresh-500 hover:bg-fresh-600"
                  disabled={isSubmittingManualSteps || recordStepsMutation.isPending}
                >
                  {isSubmittingManualSteps || recordStepsMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Record Steps"
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  You earn 1 point per 100 steps.
                  {isNative && " Install the mobile app to sync steps automatically."}
                </p>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Points and Rewards */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-amber-500" />
              Your Rewards
            </CardTitle>
            <CardDescription>
              Spend your points on exclusive rewards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gradient-to-r from-amber-100 to-amber-50 p-4 rounded-lg border border-amber-200">
              <p className="text-amber-800 text-sm mb-1">Available Points</p>
              {pointsLoading ? (
                <Skeleton className="h-9 w-24" />
              ) : (
                <p className="text-3xl font-bold text-amber-600">{points?.toLocaleString() || 0}</p>
              )}
            </div>

            <div>
              <h3 className="font-medium mb-2">Available Rewards</h3>
              {rewardsLoading ? (
                 <div className="space-y-3">
                   <Skeleton className="h-16 w-full" />
                   <Skeleton className="h-16 w-full" />
                 </div>
              ) : availableRewards.length > 0 ? (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {availableRewards.map((reward) => (
                    <div 
                      key={reward.id}
                      className="bg-white border rounded-lg p-3 flex justify-between items-center"
                    >
                      <div className="flex-1 mr-2">
                        <p className="font-medium text-sm">{reward.name}</p>
                        <p className="text-xs text-muted-foreground">{reward.description}</p>
                      </div>
                      <div className="flex items-center flex-shrink-0">
                        <p className="text-xs font-medium mr-2 whitespace-nowrap">{reward.points_required.toLocaleString()} pts</p>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          // Disable if not enough points OR if the claim mutation is pending
                          disabled={points < reward.points_required || claimRewardMutation.isPending} 
                          onClick={() => handleClaimReward(reward.id, reward.points_required)}
                        >
                          {/* Show loader specifically for the reward being claimed */}
                          {claimRewardMutation.isPending && claimRewardMutation.variables === reward.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Claim"
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                 <p className="text-sm text-muted-foreground text-center py-4">No rewards available currently.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reward History */}
      <Card>
        <CardHeader>
          <CardTitle>Reward History</CardTitle>
          <CardDescription>Your step tracking and reward claims history</CardDescription>
        </CardHeader>
        <CardContent>
          {historyLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : history && history.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{format(new Date(item.date), 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      {item.type === 'reward' ? 'Reward Claim' : 'Step Tracking'}
                    </TableCell>
                    <TableCell>
                      {item.type === 'reward' ? 
                        (item.name || 'Unknown Reward') : 
                        `${item.steps?.toLocaleString() || 0} steps`}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {item.points < 0 ? (
                        <span className="text-red-500">{item.points.toLocaleString()}</span>
                      ) : (
                        <span className="text-green-500">+{item.points.toLocaleString()}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No reward history yet.</p>
              <p className="text-sm mt-1">Start tracking your steps to earn points!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StepRewards;
