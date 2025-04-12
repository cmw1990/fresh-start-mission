import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton"; 
import { Badge } from "@/components/ui/badge"; // Ensure Badge is imported
import { Footprints, Gift, Trophy, Award, History, Loader2 } from "lucide-react"; 
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
// Assume service functions exist and work as expected
// Comment out getRewardHistory until implemented
import { getUserPointsBalance, logSteps, getAvailableRewards, claimReward /*, getRewardHistory */ } from "@/services/rewardsService"; 
// Import Reward type from generated Supabase types
import { Database } from "@/integrations/supabase/types"; 
import { format, parseISO } from 'date-fns'; // Ensure parseISO is imported

type Reward = Database['public']['Tables']['rewards']['Row']; // Use generated type
// Define placeholder type for claimed rewards until service is implemented
type ClaimedReward = { id: string; reward_name: string; claimed_at: string; points_cost: number };

const StepRewards = () => {
  const { user } = useAuth();
  const [steps, setSteps] = useState(""); // Keep as string for input control
  const [stepsGoal] = useState(10000); // Daily goal
  const [rewardPoints, setRewardPoints] = useState(0);
  const [availableRewards, setAvailableRewards] = useState<Reward[]>([]);
  const [claimedRewards, setClaimedRewards] = useState<ClaimedReward[]>([]); // State for history
  const [isLoadingPoints, setIsLoadingPoints] = useState(true);
  const [isLoadingRewards, setIsLoadingRewards] = useState(true);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true); // Loading state for history
  const [isLoggingSteps, setIsLoggingSteps] = useState(false);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  
  // TODO: Capacitor Integration - Check for native platform and fetch steps automatically
  
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setIsLoadingPoints(false);
        setIsLoadingRewards(false);
        setIsLoadingHistory(false);
        return;
      }
      
      // Fetch points, rewards, and history in parallel (History commented out)
      setIsLoadingPoints(true);
      setIsLoadingRewards(true);
      setIsLoadingHistory(true); // Keep loading state for placeholder
      
      try {
        // TODO: Uncomment getRewardHistory when implemented
        const [pointsInfo, rewards /*, history */] = await Promise.all([
          getUserPointsBalance(),
          getAvailableRewards(),
          // getRewardHistory() // Assume this service function exists
          Promise.resolve([] as ClaimedReward[]) // Placeholder for history
        ]);
        
        setRewardPoints(pointsInfo.available);
        setAvailableRewards(rewards);
        setClaimedRewards([]); // Set history state (empty for now)

      } catch (error) {
        console.error("Error loading rewards page data:", error);
        toast.error("Failed to load some rewards data. Please try refreshing.");
      } finally {
        setIsLoadingPoints(false);
        setIsLoadingRewards(false);
        setIsLoadingHistory(false); // Set history loading to false
      }
    };
    
    fetchData();
  }, [user]);
  
  const handleStepsSubmit = async () => {
    try {
      setIsLoggingSteps(true);
      const stepsNum = parseInt(steps);
      if (isNaN(stepsNum) || stepsNum < 0) {
        toast.error("Please enter a valid positive number of steps.");
        setIsLoggingSteps(false);
        return;
      }
      
      await logSteps(stepsNum); // Assume logSteps returns points earned or similar
      toast.success(`Successfully logged ${stepsNum} steps!`);
      
      // Refresh points balance after logging
      setIsLoadingPoints(true);
      const newBalance = await getUserPointsBalance();
      setRewardPoints(newBalance.available);
      setSteps(""); // Clear input after successful log
      
    } catch (error) {
      console.error("Error logging steps:", error);
      toast.error(`Failed to log steps: ${(error as Error).message}`);
    } finally {
      setIsLoggingSteps(false);
      setIsLoadingPoints(false);
    }
  };
  
  const handleClaimReward = async (reward: Reward) => {
    if (rewardPoints < (reward.points_required ?? 0)) {
        toast.error("Not enough points to claim this reward.");
        return;
    }
    try {
      setClaimingId(reward.id);
      await claimReward(reward.id); // Assume claimReward handles point deduction
      toast.success(`Reward "${reward.name}" claimed successfully!`);
      
      // Refresh points and potentially available rewards/history
      setIsLoadingPoints(true);
      setIsLoadingRewards(true); 
      // setIsLoadingHistory(true); // Keep history loading false for now
      // TODO: Uncomment getRewardHistory when implemented
      const [newBalance, newRewards /*, newHistory */] = await Promise.all([
          getUserPointsBalance(),
          getAvailableRewards(),
          // getRewardHistory()
          Promise.resolve([] as ClaimedReward[]) // Placeholder
      ]);
      setRewardPoints(newBalance.available);
      setAvailableRewards(newRewards);
      // setClaimedRewards(newHistory); // Keep history empty for now

    } catch (error) {
      console.error("Error claiming reward:", error);
      toast.error(`Failed to claim reward: ${(error as Error).message}`);
    } finally {
      setClaimingId(null);
      setIsLoadingPoints(false);
      setIsLoadingRewards(false);
      // setIsLoadingHistory(false);
    }
  };
  
  // Calculate progress percentage towards daily goal
  const stepsProgress = useMemo(() => {
      const currentSteps = parseInt(steps) || 0; // Use current input value for immediate feedback
      return Math.min(100, (currentSteps / stepsGoal) * 100);
  }, [steps, stepsGoal]);

  // Find the next reward tier
  const nextReward = useMemo(() => {
      return availableRewards
          .filter(r => (r.points_required ?? 0) > rewardPoints)
          .sort((a, b) => (a.points_required ?? Infinity) - (b.points_required ?? Infinity))[0];
  }, [availableRewards, rewardPoints]);

  const pointsToNextReward = nextReward ? (nextReward.points_required ?? 0) - rewardPoints : 0;
  const progressToNextReward = nextReward ? Math.min(100, (rewardPoints / (nextReward.points_required ?? 1)) * 100) : 100;

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Step Rewards</h1>
        <p className="text-muted-foreground">
          Earn points for your steps and redeem them for exciting rewards!
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column: Step Tracker & Available Rewards */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="bg-gradient-to-r from-fresh-50 to-blue-50">
              <Footprints className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Daily Step Tracker</CardTitle>
              <CardDescription>
                Log your steps manually or connect a tracker (coming soon).
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="steps">Enter steps for today</Label>
                  <div className="flex space-x-2 mt-1">
                    <Input 
                      id="steps" 
                      type="number" 
                      min="0" 
                      value={steps} 
                      onChange={(e) => setSteps(e.target.value)}
                      placeholder="e.g., 8500"
                      className="flex-1"
                      disabled={isLoggingSteps}
                      // TODO: Disable this input on mobile if using native step tracking
                    />
                    <Button 
                      onClick={handleStepsSubmit}
                      className="bg-primary hover:bg-primary/90"
                      disabled={isLoggingSteps || !steps || parseInt(steps) <= 0}
                    >
                      {isLoggingSteps ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : "Log Steps"}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="text-muted-foreground">Daily Goal Progress</span>
                    <span className="font-medium">{parseInt(steps) || 0} / {stepsGoal.toLocaleString()} steps</span>
                  </div>
                  <Progress value={stepsProgress} className="h-2" aria-label="Daily step goal progress" />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                  <h4 className="font-medium mb-2 text-blue-800">Why Steps Matter</h4>
                  <p className="text-sm text-blue-700">
                    Staying active helps manage cravings, boosts mood, and improves overall well-being during your journey to stay fresh.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Gift className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Available Rewards</CardTitle>
              <CardDescription>
                Use your points to claim these rewards.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingRewards ? (
                 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                 </div>
              ) : availableRewards.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {availableRewards.map((reward) => (
                    <Card key={reward.id} className="flex flex-col">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{reward.name}</CardTitle>
                        <CardDescription>{reward.description || 'No description'}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow pb-2">
                         <Badge variant="secondary">{reward.points_required ?? 0} Points</Badge>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full"
                          disabled={isLoadingPoints || rewardPoints < (reward.points_required ?? 0) || claimingId === reward.id}
                          onClick={() => handleClaimReward(reward)}
                        >
                          {claimingId === reward.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : "Claim Reward"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No rewards currently available. Keep earning points!
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column: Points, Progress, History, Achievements */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-primary to-blue-600 text-primary-foreground">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-primary-foreground">
                <Trophy className="h-5 w-5 mr-2" />
                Your Points Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center"> {/* Structure verified */}
                {isLoadingPoints ? (
                    <Skeleton className="h-10 w-24 mx-auto bg-white/20" />
                ) : (
                    <span className="text-4xl font-bold">{rewardPoints}</span>
                )}
                <p className="text-sm text-primary-foreground/80 mt-1">Reward Points</p>
              </div> {/* Structure verified */}
              {/* Progress to next reward */}
              {nextReward && !isLoadingPoints && (
                <div className="mt-4">
                   <div className="flex justify-between mb-1 text-xs text-primary-foreground/80">
                     <span>Progress to next reward</span>
                     <span>{pointsToNextReward} points needed</span>
                   </div>
                   <Progress value={progressToNextReward} className="h-2 bg-white/30 [&>div]:bg-white" aria-label="Progress to next reward"/>
                   <p className="text-xs text-primary-foreground/80 mt-1 text-center">Next: {nextReward.name} ({nextReward.points_required} pts)</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reward History Card */}
          <Card>
             <CardHeader>
               <History className="h-6 w-6 text-primary mb-2" />
               <CardTitle>Reward History</CardTitle>
               <CardDescription>Rewards you have claimed.</CardDescription>
             </CardHeader>
             <CardContent>
               {isLoadingHistory ? ( 
                 <div className="space-y-3"> {/* Structure verified */}
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                 </div> // Structure verified
               ) : claimedRewards.length > 0 ? (
                 <ul className="space-y-3">
                   {claimedRewards.map(claimed => (
                     <li key={claimed.id} className="flex justify-between items-center text-sm border-b pb-2 last:border-b-0">
                       <div>
                         <p className="font-medium">{claimed.reward_name}</p>
                         <p className="text-xs text-muted-foreground">
                           Claimed on {format(parseISO(claimed.claimed_at), 'MMM d, yyyy')}
                         </p>
                       </div>
                       <Badge variant="outline">-{claimed.points_cost} Pts</Badge>
                     </li>
                   ))}
                 </ul>
               ) : (
                 <p className="text-sm text-muted-foreground text-center py-4">You haven't claimed any rewards yet.</p>
               )}
             </CardContent>
           </Card>
          
          <Card>
            <CardHeader>
              <Award className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Achievements</CardTitle>
              <CardDescription>
                Example step milestones (feature coming soon).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Example Achievements (replace with dynamic data later) */}
                <div className="flex items-center space-x-3 opacity-50">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Footprints className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">First Steps</h4>
                    <p className="text-xs text-muted-foreground">Log 5,000 steps</p>
                  </div>
                </div>
                 <div className="flex items-center space-x-3 opacity-50">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Footprints className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Fresh Strider</h4>
                    <p className="text-xs text-muted-foreground">Reach 50,000 total steps</p>
                  </div>
                </div>
                 <div className="flex items-center space-x-3 opacity-50">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Walking Champion</h4>
                    <p className="text-xs text-muted-foreground">Reach 100,000 total steps</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Connect Tracker Card - Placeholder */}
          {/* 
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Connect a Step Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Connect your device to automatically track steps (coming soon).
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" disabled>
                   Connect Apple Health
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled>
                   Connect Google Fit
                </Button>
              </div>
            </CardContent>
          </Card>
           */}
        </div>
      </div>
    </div>
  );
};

export default StepRewards;
