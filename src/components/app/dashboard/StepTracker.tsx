
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footprints, Medal } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface StepTrackerProps {
  steps?: number;
  goal?: number;
  pointsEarned?: number;
}

const StepTracker: React.FC<StepTrackerProps> = ({
  steps = 6842,
  goal = 10000,
  pointsEarned = 68
}) => {
  // Calculate progress percentage
  const progressPercentage = Math.min(100, Math.round((steps / goal) * 100));
  
  return (
    <Card className="border-fresh-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 pb-2">
        <div className="flex items-center space-x-2">
          <Footprints className="h-5 w-5 text-green-600" />
          <CardTitle className="text-lg font-semibold">Step Tracker</CardTitle>
        </div>
        <CardDescription>
          Daily steps & points earned
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">{steps.toLocaleString()} steps today</span>
            <span className="text-sm text-muted-foreground">Goal: {goal.toLocaleString()}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-right mt-1 text-muted-foreground">{progressPercentage}% complete</p>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center">
            <Medal className="h-5 w-5 text-amber-500 mr-2" />
            <span className="font-medium">Points Earned</span>
          </div>
          <span className="text-lg font-bold text-green-600">+{pointsEarned}</span>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Connect your mobile app to automatically track steps and earn more rewards!
        </p>
      </CardContent>
    </Card>
  );
};

export default StepTracker;
