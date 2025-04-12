
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footprints, RefreshCw, Download, Shield, ChevronUp } from "lucide-react";
import { useStepTracking } from '@/hooks/useStepTracking';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';
import { useQuery } from '@tanstack/react-query';
import { getUserPointsBalance } from '@/services/rewardService';

const EnhancedMobileStepTracker = () => {
  const { 
    stepData, 
    isNative, 
    isLoading, 
    hasPermission, 
    requestPermissions, 
    fetchSteps 
  } = useStepTracking();
  
  const { impact } = useHaptics();
  
  // Get user points for milestone tracking
  const { data: pointsBalance = 0 } = useQuery({
    queryKey: ['user-points-balance'],
    queryFn: getUserPointsBalance,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Calculate progress to next milestone (every 1000 steps)
  const stepsToNextThousand = 1000 - (stepData.steps % 1000);
  const progressToNextThousand = 100 - ((stepsToNextThousand / 1000) * 100);
  
  // Calculate daily goal progress (assuming 10,000 steps daily goal)
  const dailyGoal = 10000;
  const dailyProgress = Math.min(100, (stepData.steps / dailyGoal) * 100);

  // Auto-fetch steps when component loads if we have permission
  useEffect(() => {
    if ((isNative || !isNative) && hasPermission && !stepData.lastUpdated) {
      fetchSteps();
    }
  }, [isNative, hasPermission, fetchSteps, stepData.lastUpdated]);
  
  const handleRefresh = async () => {
    await fetchSteps();
    impact(HapticImpact.LIGHT);
  };

  const handleRequestPermissions = async () => {
    await requestPermissions();
    impact(HapticImpact.MEDIUM);
  };

  const formattedDate = stepData.lastUpdated 
    ? new Date(stepData.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    : null;

  return (
    <Card className="border-fresh-100 mt-4">
      <CardHeader className="bg-fresh-50">
        <Footprints className="h-6 w-6 text-fresh-500 mb-2" />
        <CardTitle>Step Tracker</CardTitle>
        <CardDescription>
          {isNative 
            ? "Track your steps directly from your mobile device" 
            : "Steps are tracked automatically in our mobile app"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {hasPermission ? (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-fresh-500">{stepData.steps.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">steps today</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Daily Goal (10,000 steps)</span>
                <span className="font-medium">{Math.round(dailyProgress)}%</span>
              </div>
              <Progress value={dailyProgress} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Next Step Milestone</span>
                <span className="font-medium">{stepsToNextThousand} steps to go</span>
              </div>
              <Progress value={progressToNextThousand} className="h-2" />
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">{pointsBalance?.toString() || '0'} points available</p>
                <p className="text-xs text-muted-foreground">
                  {Math.floor(stepData.steps / 100)} points earned today
                </p>
              </div>
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            </div>
            
            {formattedDate && (
              <p className="text-center text-sm text-muted-foreground">
                Last updated: {formattedDate}
              </p>
            )}
            
            <Button 
              onClick={handleRefresh} 
              className="w-full bg-fresh-500 hover:bg-fresh-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Step Data
                </>
              )}
            </Button>
            
            <Alert className="bg-fresh-50 border-fresh-200">
              <Shield className="h-4 w-4 text-fresh-500" />
              <AlertTitle>Automatic Syncing</AlertTitle>
              <AlertDescription>
                Your steps will be automatically synced periodically and when you open the app.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-muted-foreground text-center">
              {isNative 
                ? "Enable step tracking to earn points and rewards based on your activity."
                : "Install our mobile app to track steps and earn rewards while staying fresh!"}
            </p>
            
            {isNative ? (
              <Button 
                onClick={handleRequestPermissions}
                className="w-full bg-fresh-500 hover:bg-fresh-600"
                disabled={isLoading}
              >
                {isLoading ? "Requesting..." : "Enable Step Tracking"}
              </Button>
            ) : (
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Download className="h-4 w-4" />
                Learn How to Install
              </Button>
            )}
            
            <Alert className={isNative ? "bg-blue-50 border-blue-200" : "bg-amber-50 border-amber-200"}>
              <Shield className={`h-4 w-4 ${isNative ? "text-blue-500" : "text-amber-500"}`} />
              <AlertTitle>{isNative ? "Privacy First" : "Using a fitness tracker?"}</AlertTitle>
              <AlertDescription>
                {isNative 
                  ? "Your steps are only used to calculate rewards. We never share your health data with third parties."
                  : "Our mobile app connects with popular fitness trackers and smartphone health apps for automatic step counting."}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedMobileStepTracker;
