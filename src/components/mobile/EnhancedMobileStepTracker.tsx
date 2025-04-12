
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footprints, RefreshCw, Download, Shield } from "lucide-react";
import { useStepTracking } from '@/hooks/useStepTracking';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const EnhancedMobileStepTracker = () => {
  const { 
    stepData, 
    isNative, 
    isLoading, 
    hasPermission, 
    requestPermissions, 
    fetchSteps 
  } = useStepTracking();

  // Auto-fetch steps when component loads if we have permission
  useEffect(() => {
    if (isNative && hasPermission && !stepData.lastUpdated) {
      fetchSteps();
    }
  }, [isNative, hasPermission, fetchSteps, stepData.lastUpdated]);

  const formattedDate = stepData.lastUpdated 
    ? new Date(stepData.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    : null;

  return (
    <Card className="border-fresh-100 mt-4">
      <CardHeader className="bg-fresh-50">
        <Footprints className="h-6 w-6 text-fresh-500 mb-2" />
        <CardTitle>Mobile Step Tracker</CardTitle>
        <CardDescription>
          {isNative 
            ? "Track your steps directly from your mobile device" 
            : "Install our mobile app for step tracking"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {isNative ? (
          <div className="space-y-4">
            <p className="text-center text-2xl font-bold text-fresh-500">{stepData.steps} steps today</p>
            
            {formattedDate && (
              <p className="text-center text-sm text-muted-foreground">
                Last updated: {formattedDate}
              </p>
            )}
            
            {hasPermission ? (
              <>
                <Button 
                  onClick={fetchSteps} 
                  className="w-full bg-fresh-500 hover:bg-fresh-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>Refresh Step Data</>
                  )}
                </Button>
                <Alert className="bg-fresh-50 border-fresh-200">
                  <Shield className="h-4 w-4 text-fresh-500" />
                  <AlertTitle>Automatic Syncing</AlertTitle>
                  <AlertDescription>
                    Your steps will be automatically synced periodically and when you open the app.
                  </AlertDescription>
                </Alert>
              </>
            ) : (
              <>
                <Button 
                  onClick={requestPermissions} 
                  className="w-full bg-fresh-500 hover:bg-fresh-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Requesting..." : "Enable Step Tracking"}
                </Button>
                <Alert className="bg-blue-50 border-blue-200">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <AlertTitle>Privacy First</AlertTitle>
                  <AlertDescription>
                    Your steps are only used to calculate rewards. We never share your health data with third parties.
                  </AlertDescription>
                </Alert>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-muted-foreground text-center">
              Install our mobile app to track steps and earn rewards while staying fresh!
            </p>
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Download className="h-4 w-4" />
              Learn How to Install
            </Button>
            <Alert className="bg-amber-50 border-amber-200">
              <AlertTitle>Using a fitness tracker?</AlertTitle>
              <AlertDescription>
                Our mobile app connects with popular fitness trackers and smartphone health apps for automatic step counting.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedMobileStepTracker;
