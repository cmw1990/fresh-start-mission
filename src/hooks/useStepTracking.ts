
import { useState, useEffect, useCallback } from 'react';
import { logSteps } from '@/services/rewardService';
import { toast } from 'sonner';
import { useHaptics, HapticImpact } from './useHaptics';

interface StepData {
  steps: number;
  date: string;
  source: 'health-api' | 'manual' | 'mock';
}

export function useStepTracking() {
  const [stepData, setStepData] = useState<StepData>({
    steps: 0,
    date: new Date().toISOString().split('T')[0],
    source: 'mock'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(true); // Assume permission for now
  const { impact } = useHaptics();
  
  // Function to fetch steps from health APIs (mock for now)
  const fetchSteps = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // In a real implementation, we would connect to HealthKit/Google Fit
      // For now, we'll simulate with random step data
      const mockSteps = Math.floor(Math.random() * 8000) + 2000; // Random between 2000-10000
      const today = new Date().toISOString().split('T')[0];
      
      // Set the step data
      setStepData({
        steps: mockSteps,
        date: today,
        source: 'mock'
      });
      
      // Log to the backend
      await logSteps(mockSteps);
      
      return mockSteps;
    } catch (error) {
      console.error('Error fetching step data:', error);
      toast.error('Failed to fetch step data');
      setHasPermission(false);
      return 0;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Function to manually log step count
  const logManualSteps = useCallback(async (steps: number) => {
    try {
      if (steps <= 0) {
        toast.error('Please enter a valid step count greater than 0');
        return false;
      }
      
      setIsLoading(true);
      const today = new Date().toISOString().split('T')[0];
      
      // Set the step data
      setStepData({
        steps,
        date: today,
        source: 'manual'
      });
      
      // Log to the backend
      await logSteps(steps);
      
      toast.success(`Logged ${steps} steps successfully`);
      impact(HapticImpact.LIGHT);
      return true;
    } catch (error) {
      console.error('Error logging manual steps:', error);
      toast.error('Failed to log steps');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [impact]);
  
  // Fetch steps on component mount
  useEffect(() => {
    fetchSteps();
  }, [fetchSteps]);
  
  return {
    stepData,
    isLoading,
    hasPermission,
    fetchSteps,
    logManualSteps
  };
}
