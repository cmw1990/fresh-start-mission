
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footprints } from "lucide-react";

const MobileStepTracker = () => {
  const [steps, setSteps] = useState<number>(0);
  const [isNative, setIsNative] = useState<boolean>(false);

  useEffect(() => {
    // Check if running in a Capacitor native environment
    const checkPlatform = async () => {
      try {
        // This would be replaced with actual Capacitor plugin check in production
        const userAgent = navigator.userAgent.toLowerCase();
        setIsNative(userAgent.includes('android') || userAgent.includes('ios'));
      } catch (error) {
        console.log('Running in web environment');
      }
    };
    
    checkPlatform();
  }, []);

  const requestStepPermissions = () => {
    // In a real implementation, we would use Capacitor's health plugin
    // to request permissions and fetch step data
    alert('Requesting step tracking permissions...');
    // Simulate step data for demo purposes
    setSteps(Math.floor(Math.random() * 5000) + 2000);
  };

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
            <p className="text-center text-2xl font-bold text-fresh-500">{steps} steps today</p>
            <Button 
              onClick={requestStepPermissions} 
              className="w-full bg-fresh-500 hover:bg-fresh-600"
            >
              Refresh Step Data
            </Button>
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

export default MobileStepTracker;
