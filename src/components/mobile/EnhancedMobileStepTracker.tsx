
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Footprints, RefreshCw, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';

const EnhancedMobileStepTracker = () => {
  const [steps, setSteps] = useState(0);
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const { impact } = useHaptics();
  
  // Simulate fetching steps from a health platform on component mount
  useEffect(() => {
    const randomSteps = Math.floor(Math.random() * 8000) + 2000; // Random between 2000-10000
    setSteps(randomSteps);
    
    // Check if we have a last synced time in local storage
    const stored = localStorage.getItem('lastStepSync');
    if (stored) {
      setLastSynced(stored);
    }
    
    // Fetch points balance - simulated
    setPoints(Math.floor(Math.random() * 500) + 100);
  }, []);
  
  const refreshSteps = () => {
    // Simulate refreshing steps data
    setIsLoading(true);
    setTimeout(() => {
      const newSteps = steps + Math.floor(Math.random() * 500) + 100; // Add 100-600 steps
      setSteps(newSteps);
      setIsLoading(false);
      toast.success("Steps refreshed from health data");
      impact(HapticImpact.LIGHT);
    }, 1200);
  };
  
  const syncSteps = () => {
    setIsLoading(true);
    
    // Simulate syncing steps to backend
    setTimeout(() => {
      // Calculate points earned (1 point per 100 steps)
      const newPoints = Math.floor(steps / 100);
      setPoints(prev => prev + newPoints);
      
      // Update last synced time
      const now = new Date().toLocaleTimeString();
      setLastSynced(now);
      localStorage.setItem('lastStepSync', now);
      
      setIsLoading(false);
      toast.success(`Synced ${steps} steps! Earned ${newPoints} points.`);
      impact(HapticImpact.MEDIUM);
    }, 1500);
  };
  
  return (
    <Card className="border-2 border-fresh-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Footprints className="h-5 w-5 mr-2 text-fresh-400" />
          Step Tracker
        </CardTitle>
        <CardDescription>
          {lastSynced ? `Last synced: ${lastSynced}` : 'Sync to earn points'}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-fresh-500">{steps.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Steps today</p>
          </div>
          
          <div className="h-2 bg-gray-100 rounded-full">
            <div 
              className="h-full bg-fresh-300 rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(100, (steps / 10000) * 100)}%` }} 
            />
          </div>
          <p className="text-xs text-center text-muted-foreground">Goal: 10,000 steps</p>
          
          <div className="flex justify-between items-center px-2">
            <div className="text-sm">
              <span className="font-medium">{points}</span> points earned
            </div>
            <div className="text-xs text-muted-foreground">
              +{Math.floor(steps / 100)} pending
            </div>
          </div>
          
          <div className="flex justify-between gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={refreshSteps}
              disabled={isLoading}
            >
              <RefreshCw className={`mr-1 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <Button
              variant="default"
              size="sm"
              className="flex-1 bg-fresh-400 hover:bg-fresh-500"
              onClick={syncSteps}
              disabled={isLoading}
            >
              <Award className="mr-1 h-4 w-4" />
              Sync & Earn
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedMobileStepTracker;
