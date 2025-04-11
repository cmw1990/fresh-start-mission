
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Footprints, Gift, Trophy, Award } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const StepRewards = () => {
  const { user } = useAuth();
  const [steps, setSteps] = useState("0");
  const [stepsGoal, setStepsGoal] = useState(10000);
  const [rewardPoints, setRewardPoints] = useState(125);
  
  const handleStepsSubmit = () => {
    const stepsNum = parseInt(steps);
    if (isNaN(stepsNum) || stepsNum < 0) {
      toast.error("Please enter a valid number of steps");
      return;
    }
    
    // Calculate points (1 point per 100 steps)
    const pointsEarned = Math.floor(stepsNum / 100);
    setRewardPoints(prev => prev + pointsEarned);
    
    toast.success(`${stepsNum} steps logged successfully!`, {
      description: `You earned ${pointsEarned} points!`
    });
    
    setSteps("0");
  };
  
  const claimReward = (points: number, description: string) => {
    if (rewardPoints >= points) {
      setRewardPoints(prev => prev - points);
      toast.success(`Reward claimed successfully!`, {
        description: `You've claimed: ${description}`
      });
    } else {
      toast.error("Not enough points", {
        description: `You need ${points - rewardPoints} more points to claim this reward`
      });
    }
  };
  
  // Calculate progress percentage
  const stepsProgress = Math.min(100, (parseInt(steps) / stepsGoal) * 100);
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Step Rewards</h1>
        <p className="text-muted-foreground">
          Earn rewards by staying active during your fresh journey
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="bg-fresh-50">
              <Footprints className="h-6 w-6 text-fresh-500 mb-2" />
              <CardTitle>Daily Step Tracker</CardTitle>
              <CardDescription>
                Log your steps to earn reward points
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="steps">Enter your steps for today</Label>
                  <div className="flex space-x-4 mt-1">
                    <Input 
                      id="steps" 
                      type="number" 
                      min="0" 
                      value={steps} 
                      onChange={(e) => setSteps(e.target.value)}
                      placeholder="Number of steps"
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleStepsSubmit}
                      className="bg-fresh-300 hover:bg-fresh-400"
                    >
                      Log Steps
                    </Button>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Daily Goal Progress</span>
                    <span>{steps} / {stepsGoal.toLocaleString()} steps</span>
                  </div>
                  <Progress value={stepsProgress} className="h-2" />
                </div>
                
                <div className="bg-fresh-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Why Steps Matter</h4>
                  <p className="text-sm text-muted-foreground">
                    Regular physical activity, like walking, can help reduce nicotine cravings,
                    improve mood, and boost energy levels during your fresh journey.
                    Studies show even moderate exercise can increase your chances of successfully
                    staying nicotine-free.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Gift className="h-6 w-6 text-fresh-500 mb-2" />
              <CardTitle>Available Rewards</CardTitle>
              <CardDescription>
                Redeem your points for these benefits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-base">10% Off Next Month</CardTitle>
                    <CardDescription>100 points</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={() => claimReward(100, "10% off next month's subscription")}
                    >
                      Claim Reward
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-base">Fresh Start Sticker Pack</CardTitle>
                    <CardDescription>200 points</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={() => claimReward(200, "Fresh Start Sticker Pack")}
                    >
                      Claim Reward
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-base">Premium Tool Access</CardTitle>
                    <CardDescription>250 points</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={() => claimReward(250, "One month of Premium Tool Access")}
                    >
                      Claim Reward
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-base">Wellness Starter Kit</CardTitle>
                    <CardDescription>500 points</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={() => claimReward(500, "Wellness Starter Kit")}
                    >
                      Claim Reward
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="bg-fresh-50 border-fresh-100">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 text-fresh-500 mr-2" />
                Your Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <span className="text-4xl font-bold text-fresh-500">{rewardPoints}</span>
                <p className="text-sm text-muted-foreground">Reward Points</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Award className="h-6 w-6 text-fresh-500 mb-2" />
              <CardTitle>Achievements</CardTitle>
              <CardDescription>
                Special badges for reaching step milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-fresh-100 flex items-center justify-center">
                    <Footprints className="h-6 w-6 text-fresh-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">First Steps</h4>
                    <p className="text-xs text-muted-foreground">
                      Log your first 5,000 steps
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 opacity-50">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <Footprints className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Fresh Strider</h4>
                    <p className="text-xs text-muted-foreground">
                      Reach 50,000 total steps
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 opacity-50">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <Footprints className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Walking Champion</h4>
                    <p className="text-xs text-muted-foreground">
                      Reach 100,000 total steps
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 opacity-50">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Fresh Marathon</h4>
                    <p className="text-xs text-muted-foreground">
                      Reach 250,000 total steps
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Connect a Step Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Connect your device to automatically track steps
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#38B2AC" strokeWidth="2" />
                    <path d="M16 12L10 16.5V7.5L16 12Z" fill="#38B2AC" />
                  </svg>
                  Connect Apple Health
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9H21V21H3V9Z" stroke="#38B2AC" strokeWidth="2" />
                    <path d="M7.5 9V6C7.5 4.34315 8.84315 3 10.5 3H13.5C15.1569 3 16.5 4.34315 16.5 6V9" stroke="#38B2AC" strokeWidth="2" />
                    <path d="M12 14L12 18" stroke="#38B2AC" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Connect Google Fit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StepRewards;
