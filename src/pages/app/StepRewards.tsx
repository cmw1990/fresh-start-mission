
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRewardHistory, recordStepCount, claimRewardPoints, getTotalPoints, syncNativeSteps } from "@/services/rewardsService";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/ui/bar-chart";
import { useAuth } from "@/contexts/AuthContext";

const StepRewards = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [steps, setSteps] = useState("0");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [redeemPoints, setRedeemPoints] = useState(0);
  const [isNativeTracking, setIsNativeTracking] = useState(false);

  // Fetch reward history
  const { data: rewardHistory, isLoading: isHistoryLoading } = useQuery({
    queryKey: ['reward-history'],
    queryFn: getRewardHistory,
    enabled: !!user,
  });

  // Fetch total points
  const { data: totalPoints, isLoading: isPointsLoading } = useQuery({
    queryKey: ['total-points'],
    queryFn: getTotalPoints,
    enabled: !!user,
  });

  // Record steps mutation
  const recordStepsMutation = useMutation({
    mutationFn: ({ steps, date }: { steps: number, date: string }) =>
      recordStepCount(steps, date),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reward-history'] });
      queryClient.invalidateQueries({ queryKey: ['total-points'] });
      toast({
        title: "Success",
        description: "Steps recorded successfully!",
        variant: "success"
      });
      setSteps("0");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to record steps: " + (error.message || "Unknown error"),
        variant: "error"
      });
    }
  });

  // Claim rewards mutation
  const claimRewardsMutation = useMutation({
    mutationFn: (points: number) => claimRewardPoints(points),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['total-points'] });
      queryClient.invalidateQueries({ queryKey: ['reward-history'] });
      toast({
        title: "Success",
        description: "Rewards claimed successfully!",
        variant: "success"
      });
      setRedeemPoints(0);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to claim rewards: " + (error.message || "Unknown error"),
        variant: "error"
      });
    }
  });

  // Sync native steps mutation
  const syncStepsMutation = useMutation({
    mutationFn: syncNativeSteps,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reward-history'] });
      queryClient.invalidateQueries({ queryKey: ['total-points'] });
      toast({
        title: "Success",
        description: "Steps synced from your device!",
        variant: "success"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to sync steps: " + (error.message || "Unknown error"),
        variant: "error"
      });
      setIsNativeTracking(false);
    }
  });

  // Check if native tracking is available
  useEffect(() => {
    const checkNativeTracking = async () => {
      try {
        // In a real implementation, we would check if Capacitor Health is available
        // For now, we'll just simulate this based on whether we're in a mobile app context
        const isMobileApp = window.matchMedia('(display-mode: standalone)').matches ||
                          ('navigator' in window && 'standalone' in navigator && (navigator as any).standalone === true) ||
                          document.referrer.includes('android-app://');
        
        setIsNativeTracking(isMobileApp);
        
        // If we're in a mobile app, we could try to sync steps automatically here
        if (isMobileApp) {
          // This would be replaced with actual Capacitor Health API call
          // syncStepsMutation.mutate(getRandomSteps());
        }
      } catch (error) {
        console.error("Error checking native tracking:", error);
      }
    };
    
    checkNativeTracking();
  }, []);

  // Format date for submission
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');

  // Get chart data from history
  const chartData = rewardHistory?.slice(0, 7).map(entry => ({
    date: format(new Date(entry.date), 'MMM d'),
    steps: entry.steps
  })).reverse() || [];

  const handleSubmitSteps = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedSteps = parseInt(steps);
    if (isNaN(parsedSteps) || parsedSteps < 0) {
      toast({
        title: "Error",
        description: "Please enter a valid number of steps",
        variant: "error"
      });
      return;
    }
    
    recordStepsMutation.mutate({
      steps: parsedSteps,
      date: formattedDate
    });
  };

  const handleClaimRewards = (e: React.FormEvent) => {
    e.preventDefault();
    if (redeemPoints <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid number of points to redeem",
        variant: "error"
      });
      return;
    }
    
    if (redeemPoints > (totalPoints || 0)) {
      toast({
        title: "Error",
        description: `You don't have enough points. Available: ${totalPoints}`,
        variant: "error"
      });
      return;
    }
    
    claimRewardsMutation.mutate(redeemPoints);
  };

  // Function to simulate syncing with native step counter
  const handleSyncNativeSteps = () => {
    // This would be replaced with actual Capacitor Health API call
    const simulatedSteps = Math.floor(Math.random() * 5000) + 3000;
    syncStepsMutation.mutate(simulatedSteps);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Step Rewards</h1>
        <p className="text-muted-foreground">
          Earn points for staying active and redeem for rewards
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Points Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Points</CardTitle>
            <CardDescription>Current balance and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <div className="text-4xl font-bold mb-2">{isPointsLoading ? "..." : totalPoints}</div>
              <div className="text-sm text-muted-foreground">Total Points Available</div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium mb-2">How to Earn Points</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Record your daily steps (1 point per 100 steps)</li>
                <li>• Complete your daily wellness log (10 points)</li>
                <li>• Achieve milestones in your fresh journey (varies)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Step Tracker Card */}
        <Card>
          <CardHeader>
            <CardTitle>Track Your Steps</CardTitle>
            <CardDescription>Log your steps to earn points</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="manual">
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="manual" className="flex-1">Manual Entry</TabsTrigger>
                <TabsTrigger 
                  value="auto" 
                  className="flex-1" 
                  disabled={!isNativeTracking}
                >
                  Auto Sync
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="manual">
                <form onSubmit={handleSubmitSteps}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Select Date</label>
                      <div className="border rounded-md p-2">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => date && setSelectedDate(date)}
                          className="mx-auto"
                          disabled={(date) => date > new Date() || date < new Date(new Date().setDate(new Date().getDate() - 30))}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="steps" className="block text-sm font-medium mb-1">Steps Taken</label>
                      <Input
                        id="steps"
                        type="number"
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                        placeholder="Enter number of steps"
                        min="0"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={recordStepsMutation.isPending}
                    >
                      {recordStepsMutation.isPending ? "Recording..." : "Record Steps"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="auto">
                {isNativeTracking ? (
                  <div className="space-y-4 text-center">
                    <p className="text-sm mb-4">
                      Sync steps automatically from your device's health app
                    </p>
                    <Button 
                      onClick={handleSyncNativeSteps}
                      className="w-full"
                      disabled={syncStepsMutation.isPending}
                    >
                      {syncStepsMutation.isPending ? "Syncing..." : "Sync Now"}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">
                      Native step tracking is not available on this device. Please use manual entry instead.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Redeem Rewards Card */}
        <Card>
          <CardHeader>
            <CardTitle>Redeem Rewards</CardTitle>
            <CardDescription>Exchange your points for rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleClaimRewards}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="redeem" className="block text-sm font-medium mb-1">Points to Redeem</label>
                  <Input
                    id="redeem"
                    type="number"
                    value={redeemPoints || ""}
                    onChange={(e) => setRedeemPoints(parseInt(e.target.value) || 0)}
                    placeholder="Enter points to redeem"
                    min="0"
                    max={totalPoints || 0}
                  />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Available Rewards</h3>
                  <div className="flex justify-between text-sm py-1 border-b">
                    <span>Badge: 7-Day Streak</span>
                    <span className="font-medium">100 points</span>
                  </div>
                  <div className="flex justify-between text-sm py-1 border-b">
                    <span>$5 Gift Card</span>
                    <span className="font-medium">500 points</span>
                  </div>
                  <div className="flex justify-between text-sm py-1 border-b">
                    <span>Premium Membership (1 month)</span>
                    <span className="font-medium">1000 points</span>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={claimRewardsMutation.isPending || redeemPoints <= 0 || redeemPoints > (totalPoints || 0)}
                >
                  {claimRewardsMutation.isPending ? "Processing..." : "Claim Reward"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Step History Chart */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Your Step History</CardTitle>
          <CardDescription>Recent activity over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          {isHistoryLoading ? (
            <div className="h-[300px] flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-fresh-300 rounded-full border-t-transparent"></div>
            </div>
          ) : chartData.length > 0 ? (
            <div className="h-[300px]">
              <BarChart 
                data={chartData}
                index="date"
                categories={["steps"]}
                colors={["#10b981"]}
                valueFormatter={(value) => `${value.toLocaleString()} steps`}
              />
            </div>
          ) : (
            <div className="h-[200px] flex items-center justify-center">
              <p className="text-muted-foreground">No step data recorded yet. Start tracking to see your history!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StepRewards;
