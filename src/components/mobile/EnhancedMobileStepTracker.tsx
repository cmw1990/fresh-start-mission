
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Footprints } from 'lucide-react';
import { logSteps } from '@/services/rewardService';
import { getUserPointsBalance } from '@/services/rewardService';
import { toast } from 'sonner';
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';

// Mock health tracking integration for demo purposes
// In a real implementation, this would connect to Apple HealthKit or Google Fit
const useHealthTracking = () => {
  const [steps, setSteps] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  
  // Simulate fetching steps from a health platform
  useEffect(() => {
    const randomSteps = Math.floor(Math.random() * 8000) + 2000; // Random between 2000-10000
    setSteps(randomSteps);
  }, []);
  
  const refreshSteps = () => {
    // Simulate refreshing steps data
    setIsTracking(true);
    setTimeout(() => {
      const newSteps = steps + Math.floor(Math.random() * 500) + 100; // Add 100-600 steps
      setSteps(newSteps);
      setIsTracking(false);
    }, 1500);
  };
  
  return { steps, refreshSteps, isTracking };
};

const EnhancedMobileStepTracker: React.FC = () => {
  const [points, setPoints] = useState(0);
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const { impact } = useHaptics();
  const { steps, refreshSteps, isTracking } = useHealthTracking();
  
  // Fetch points balance on load
  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const pointBalance = await getUserPointsBalance();
        setPoints(pointBalance);
        
        // Check if we have a last synced time in local storage
        const stored = localStorage.getItem('lastStepSync');
        if (stored) {
          setLastSynced(stored);
        }
      } catch (error) {
        console.error('Error fetching points balance:', error);
      }
    };
    
    fetchPoints();
  }, []);
  
  const syncSteps = async () => {
    try {
      const success = await logSteps(steps);
      
      if (success) {
        // Update points (in a real app we'd refetch the actual balance)
        const newPoints = Math.floor(steps / 100);
        setPoints(prevPoints => prevPoints + newPoints);
        
        // Update last synced time
        const now = new Date().toLocaleTimeString();
        setLastSynced(now);
        localStorage.setItem('lastStepSync', now);
        
        // Feedback
        toast.success(`Successfully synced ${steps} steps!`);
        impact(HapticImpact.MEDIUM);
      } else {
        toast.error("Failed to sync steps. Please try again.");
      }
    } catch (error) {
      console.error('Error syncing steps:', error);
      toast.error("Error syncing steps");
    }
  };
  
  return (
    <Card className="border-2 border-fresh-100">
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
              disabled={isTracking}
            >
              {isTracking ? 'Refreshing...' : 'Refresh Steps'}
            </Button>
            
            <Button
              variant="default"
              size="sm"
              className="flex-1 bg-fresh-400 hover:bg-fresh-500"
              onClick={syncSteps}
              disabled={isTracking}
            >
              Sync & Earn Points
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedMobileStepTracker;
