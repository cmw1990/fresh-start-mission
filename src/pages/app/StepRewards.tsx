
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
  type RewardHistory 
} from "@/services/rewardsService";
import { Progress } from "@/components/ui/progress";

interface Reward {
  id: string;
  name: string;
  description: string;
  points_required: number;
}

const StepRewards = () => {
  const [steps, setSteps] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { impact } = useHaptics();
  const queryClient = useQueryClient();

  const {
    stepData,
    isNative,
    isLoading: stepTrackingLoading,
    hasPermission,
    requestPermissions,
    fetchSteps,
    logManualSteps
  } = useStepTracking();

  // Fetch total points
  const { 
    data: points, 
    isLoading: pointsLoading,
    error: pointsError
  } = useQuery({
    queryKey: ['total-points'],
    queryFn: getTotalPoints,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch reward history
  const { 
    data: history, 
    isLoading: historyLoading,
    error: historyError
  } = useQuery({
    queryKey: ['reward-history'],
    queryFn: getRewardHistory,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Claim reward mutation
  const claimRewardMutation = useMutation({
    mutationFn: (rewardId: string) => {
      toast.error("This feature is coming soon!");
      return Promise.resolve(); // Placeholder
    },
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

  // Sample rewards - in a real app these would come from the backend
  const availableRewards: Reward[] = [
    { id: "1", name: "10% Off Next Month", description: "Get 10% off your next monthly subscription", points_required: 1000 },
    { id: "2", name: "Free Premium Month", description: "One month of premium features for free", points_required: 5000 },
    { id: "3", name: "Exclusive Badge", description: "Unlock a special badge for your profile", points_required: 2500 },
    { id: "4", name: "Custom Theme", description: "Access to exclusive app color themes", points_required: 3000 },
  ];

  const handleManualStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!steps || isSubmitting) return;
    
    const stepsNumber = parseInt(steps);
    if (isNaN(stepsNumber) || stepsNumber < 0) {
      toast.error("Please enter a valid step count");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      await recordStepsMutation.mutateAsync({ steps: stepsNumber, date: today });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClaimReward = async (rewardId: string, pointsRequired: number) => {
    if (points === undefined || points < pointsRequired) {
      toast.error("Not enough points", { 
        description: `You need ${pointsRequired} points to claim this reward` 
      });
      return;
    }
    
    await claimRewardMutation.mutateAsync(rewardId);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Step Rewards</h1>
        <p className="text-muted-foreground">
          Earn points by staying active and claim rewards
        </p>
      </div>

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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
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

            {pointsError && (
              <Alert variant="destructive" className="my-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Failed to load your points. Please try refreshing the page.
                </AlertDescription>
              </Alert>
            )}

            <div>
              <h3 className="font-medium mb-2">Available Rewards</h3>
              <div className="space-y-3">
                {availableRewards.map((reward) => (
                  <div 
                    key={reward.id}
                    className="bg-white border rounded-lg p-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{reward.name}</p>
                      <p className="text-sm text-muted-foreground">{reward.description}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm font-medium mr-3">{reward.points_required.toLocaleString()} pts</p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        disabled={!points || points < reward.points_required || claimRewardMutation.isPending}
                        onClick={() => handleClaimReward(reward.id, reward.points_required)}
                      >
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
          ) : historyError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Failed to load your reward history. Please try refreshing the page.
              </AlertDescription>
            </Alert>
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
