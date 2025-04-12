
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footprints, RefreshCw } from "lucide-react";
import { useStepTracking } from '@/hooks/useStepTracking';

const EnhancedMobileStepTracker = () => {
  const { 
    stepData, 
    isNative, 
    isLoading, 
    hasPermission, 
    requestPermissions, 
    fetchSteps 
  } = useStepTracking();

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
            ) : (
              <Button 
                onClick={requestPermissions} 
                className="w-full bg-fresh-500 hover:bg-fresh-600"
                disabled={isLoading}
              >
                {isLoading ? "Requesting..." : "Enable Step Tracking"}
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-muted-foreground text-center">
              Install our mobile app to track steps and earn rewards while staying fresh!
            </p>
            <Button variant="outline" className="w-full">
              Learn How to Install
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedMobileStepTracker;
