
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footprints, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useHaptics, HapticImpact } from "@/hooks/useHaptics";
import { toast } from "sonner";

const MobileStepTracker = () => {
  const [steps, setSteps] = useState<number>(0);
  const [isNative, setIsNative] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { impact } = useHaptics();

  useEffect(() => {
    // Check if running in a Capacitor native environment
    const checkPlatform = async () => {
      try {
        // This would be replaced with actual Capacitor plugin check in production
        const userAgent = navigator.userAgent.toLowerCase();
        setIsNative(userAgent.includes('android') || userAgent.includes('ios'));
        
        // If native, simulate initial step data
        if (userAgent.includes('android') || userAgent.includes('ios')) {
          setSteps(Math.floor(Math.random() * 5000) + 2000);
        }
      } catch (error) {
        console.log('Running in web environment');
      }
    };
    
    checkPlatform();
  }, []);

  const requestStepPermissions = () => {
    setIsLoading(true);
    
    // In a real implementation, we would use Capacitor's health plugin
    // to request permissions and fetch step data
    setTimeout(() => {
      const newSteps = Math.floor(Math.random() * 3000) + 5000;
      setSteps(newSteps);
      setIsLoading(false);
      impact(HapticImpact.MEDIUM);
      toast.success("Steps updated successfully!");
    }, 1500);
  };

  return (
    <Card className="border-fresh-100 mt-4">
      <CardHeader className="bg-fresh-50 pb-2">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Footprints className="h-5 w-5 text-fresh-500 mr-2" />
            <CardTitle>Daily Steps</CardTitle>
          </div>
          {isNative && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={requestStepPermissions}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="sr-only">Refresh</span>
            </Button>
          )}
        </div>
        <CardDescription>
          {isNative 
            ? "Connected to Health data" 
            : "Install our mobile app for automatic tracking"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {isNative ? (
          <div className="space-y-3">
            <div className="text-center">
              <p className="text-3xl font-bold text-fresh-500">{steps.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">steps today</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Daily Goal</span>
                <span>{Math.min(100, Math.round((steps / 10000) * 100))}%</span>
              </div>
              <Progress 
                value={Math.min(100, (steps / 10000) * 100)} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground text-center mt-1">10,000 steps goal</p>
            </div>
            
            <div className="text-center mt-2">
              <p className="text-sm">Earning <span className="font-semibold">{Math.floor(steps / 100)}</span> points today</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-muted-foreground text-center text-sm">
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

export default MobileStepTracker;
