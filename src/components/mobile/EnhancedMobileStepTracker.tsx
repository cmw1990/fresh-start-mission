
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footprints, RefreshCw, Download, Shield, ChevronUp, Award, Zap } from "lucide-react";
import { useStepTracking } from '@/hooks/useStepTracking';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';
import { useQuery } from '@tanstack/react-query';
import { getUserPointsBalance } from '@/services/rewardService';
import { motion } from 'framer-motion';
import { Capacitor } from '@capacitor/core';
import { useIsMobile } from '@/hooks/use-mobile';

const EnhancedMobileStepTracker = () => {
  const { 
    stepData, 
    isNative, 
    isLoading, 
    hasPermission, 
    requestPermissions, 
    fetchSteps 
  } = useStepTracking();
  
  const { impact, notification } = useHaptics();
  const isMobile = useIsMobile();
  const [showStepAnimation, setShowStepAnimation] = useState(false);
  
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
    setShowStepAnimation(true);
    await fetchSteps();
    impact(HapticImpact.LIGHT);
    
    // Check if steps reached a milestone (multiple of 1000)
    const isThousandMilestone = stepData.steps % 1000 === 0 && stepData.steps > 0;
    if (isThousandMilestone) {
      notification('SUCCESS');
    }
    
    setTimeout(() => setShowStepAnimation(false), 2000);
  };

  const handleRequestPermissions = async () => {
    await requestPermissions();
    impact(HapticImpact.MEDIUM);
  };

  const formattedDate = stepData.lastUpdated 
    ? new Date(stepData.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    : null;

  // Detect platform for styling
  const isIOS = Capacitor.getPlatform() === 'ios';
  const platformClass = isIOS ? 'ios-style' : 'android-style';

  return (
    <Card className={`border-fresh-100 mt-4 ${platformClass} overflow-hidden`}>
      <CardHeader className="bg-fresh-50">
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Footprints className="h-6 w-6 text-fresh-500 mb-2" />
        </motion.div>
        <CardTitle>Step Tracker</CardTitle>
        <CardDescription>
          {isNative 
            ? "Track your steps directly from your mobile device" 
            : "Steps are tracked automatically in our mobile app"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 relative">
        {hasPermission ? (
          <div className="space-y-4">
            <motion.div 
              className="text-center"
              animate={showStepAnimation ? {
                scale: [1, 1.1, 1],
                transition: { duration: 0.5 }
              } : {}}
            >
              <p className="text-4xl font-bold text-fresh-500">{stepData.steps.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">steps today</p>
            </motion.div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Daily Goal (10,000 steps)</span>
                <span className="font-medium">{Math.round(dailyProgress)}%</span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5 }}
              >
                <Progress value={dailyProgress} className="h-2" />
              </motion.div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Next Step Milestone</span>
                <span className="font-medium">{stepsToNextThousand} steps to go</span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Progress value={progressToNextThousand} className="h-2" />
              </motion.div>
            </div>
            
            <motion.div
              className="bg-gray-50 p-3 rounded-lg"
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-medium">{pointsBalance?.toString() || '0'} points available</p>
                    <Award className="h-4 w-4 text-amber-500" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.floor(stepData.steps / 100)} points earned today
                  </p>
                </div>
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              </div>
            </motion.div>
            
            {formattedDate && (
              <p className="text-center text-sm text-muted-foreground">
                Last updated: {formattedDate}
              </p>
            )}
            
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleRefresh} 
                className="w-full bg-fresh-500 hover:bg-fresh-600 flex items-center gap-2 touch-target"
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
            </motion.div>
            
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
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-muted-foreground text-center">
                {isNative 
                  ? "Enable step tracking to earn points and rewards based on your activity."
                  : "Install our mobile app to track steps and earn rewards while staying fresh!"}
              </p>
            </motion.div>
            
            {isNative ? (
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={handleRequestPermissions}
                  className="w-full bg-fresh-500 hover:bg-fresh-600 touch-target"
                  disabled={isLoading}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  {isLoading ? "Requesting..." : "Enable Step Tracking"}
                </Button>
              </motion.div>
            ) : (
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="w-full flex items-center gap-2 touch-target">
                  <Download className="h-4 w-4" />
                  Learn How to Install
                </Button>
              </motion.div>
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

        {/* Milestone achievement animation */}
        {showStepAnimation && stepData.steps % 1000 === 0 && stepData.steps > 0 && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-b-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="bg-white p-4 rounded-xl shadow-lg text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Award className="h-10 w-10 text-amber-500 mx-auto mb-2" />
              <h3 className="text-xl font-bold">Step Milestone!</h3>
              <p>You've reached {stepData.steps.toLocaleString()} steps</p>
            </motion.div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedMobileStepTracker;

