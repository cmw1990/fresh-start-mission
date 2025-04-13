
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const StepTracker = () => {
  const [steps, setSteps] = useState(6428);
  const goalSteps = 10000;
  const progressPercentage = Math.min(100, (steps / goalSteps) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step Tracker</CardTitle>
        <CardDescription>Daily progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{steps.toLocaleString()}</div>
        <p className="text-muted-foreground">Steps today</p>
        <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${progressPercentage}%` }} 
          />
        </div>
        <p className="text-sm mt-2">Goal: {goalSteps.toLocaleString()} steps</p>
      </CardContent>
    </Card>
  );
};

export default StepTracker;
