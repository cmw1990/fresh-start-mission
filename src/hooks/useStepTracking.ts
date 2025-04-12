
import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { logSteps } from '@/services/rewardService';
import { toast } from 'sonner';

type StepData = {
  steps: number;
  lastUpdated: Date | null;
};

export const useStepTracking = () => {
  const [stepData, setStepData] = useState<StepData>({ 
    steps: 0, 
    lastUpdated: null 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isNative, setIsNative] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  // Check if running on native platform
  useEffect(() => {
    const checkPlatform = async () => {
      const isMobile = Capacitor.isNativePlatform();
      setIsNative(isMobile);
    };
    
    checkPlatform();
  }, []);

  // Request step tracking permissions
  const requestPermissions = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, we would use Capacitor's health plugin
      // For now, we'll simulate getting permission
      
      // Mock implementation - in real code, this would use native plugins
      await new Promise(resolve => setTimeout(resolve, 500));
      setHasPermission(true);
      toast.success('Step tracking permissions granted');
      
      // Immediately fetch steps after getting permission
      await fetchSteps();
    } catch (error) {
      console.error('Error requesting permissions:', error);
      toast.error('Failed to get step tracking permissions');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch steps from health APIs
  const fetchSteps = async () => {
    setIsLoading(true);
    try {
      // Mock implementation - in real code, this would use native health plugins
      // such as @capacitor/health or custom plugins for HealthKit/Google Fit
      
      if (isNative && hasPermission) {
        // Simulate fetching steps from native API
        const today = new Date();
        // Generate a somewhat realistic step count that varies but doesn't reset
        const randomStepBase = Math.floor(Math.random() * 2000) + 3000;
        const hourOfDay = today.getHours();
        // Steps increase throughout the day
        const hourlyFactor = Math.min(1, hourOfDay / 24) * 1.5;
        const dailySteps = Math.floor(randomStepBase * hourlyFactor);
        
        setStepData({
          steps: dailySteps,
          lastUpdated: today
        });
        
        // Log steps to the backend
        await logSteps(dailySteps);
        toast.success(`Updated steps: ${dailySteps}`);
      }
    } catch (error) {
      console.error('Error fetching steps:', error);
      toast.error('Failed to fetch step data');
    } finally {
      setIsLoading(false);
    }
  };

  // Function for manual step entry
  const logManualSteps = async (steps: number) => {
    setIsLoading(true);
    try {
      await logSteps(steps);
      setStepData({
        steps,
        lastUpdated: new Date()
      });
      toast.success(`Logged ${steps} steps manually`);
    } catch (error) {
      console.error('Error logging steps manually:', error);
      toast.error('Failed to log steps');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    stepData,
    isNative,
    isLoading,
    hasPermission,
    requestPermissions,
    fetchSteps,
    logManualSteps
  };
};
