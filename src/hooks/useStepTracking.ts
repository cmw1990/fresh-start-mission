
import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { logSteps } from '@/services/rewardService';
import { toast } from 'sonner';
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';
import { useOfflineSupport } from '@/hooks/useOfflineSupport';

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
  const { impact } = useHaptics();
  const { isOnline, saveOfflineData } = useOfflineSupport();

  // Check if running on native platform
  useEffect(() => {
    const checkPlatform = async () => {
      try {
        const isMobile = Capacitor.isNativePlatform();
        setIsNative(isMobile);
        
        // Check if we have permissions already stored
        const storedPermission = localStorage.getItem('stepTrackingPermission');
        if (storedPermission === 'granted') {
          setHasPermission(true);
        }
      } catch (e) {
        console.error("Error checking platform:", e);
      }
    };
    
    checkPlatform();
  }, []);

  // Request step tracking permissions
  const requestPermissions = async () => {
    setIsLoading(true);
    try {
      if (!isNative) {
        setHasPermission(true);
        localStorage.setItem('stepTrackingPermission', 'granted');
        toast.success('Step tracking enabled for demo purposes');
        impact(HapticImpact.LIGHT);
        await fetchSteps();
        return;
      }
      
      // In a real implementation with Capacitor Health plugin:
      try {
        // This is just placeholder code - in a real app you'd use the Health plugin
        // const healthPlugin = CapacitorHealth;
        // const result = await healthPlugin.requestPermission({
        //   permissions: ['steps']  
        // });
        // setHasPermission(result.granted);
        
        // Simulate permission success
        await new Promise(resolve => setTimeout(resolve, 500));
        setHasPermission(true);
        localStorage.setItem('stepTrackingPermission', 'granted');
        
        toast.success('Step tracking permissions granted');
        impact(HapticImpact.LIGHT);
        
        // Immediately fetch steps
        await fetchSteps();
      } catch (e) {
        console.error("Error requesting health permissions:", e);
        toast.error('Could not get step tracking permissions');
        setHasPermission(false);
      }
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
      if (isNative && hasPermission) {
        // In a real implementation, we'd use the Capacitor Health plugin
        // Try to fetch today's steps from HealthKit/Google Fit
        
        // Simulate fetching steps
        const today = new Date();
        // Generate a somewhat realistic step count that varies but doesn't reset
        const hour = today.getHours();
        const dayOfMonth = today.getDate();
        const baseSteps = 5000 + (dayOfMonth * 100); // Different base steps each day
        const hourMultiplier = hour / 24;
        const steps = Math.floor(baseSteps * (hourMultiplier === 0 ? 0.1 : hourMultiplier));
        
        setStepData({
          steps,
          lastUpdated: today
        });
        
        // Log steps to the backend or store offline
        if (isOnline) {
          await logSteps(steps);
        } else {
          saveOfflineData('steps', { steps, date: today.toISOString().split('T')[0] });
        }
        
        impact(HapticImpact.LIGHT);
      } else if (!isNative && hasPermission) {
        // For web demo, simulate random step counts
        const today = new Date();
        const hour = today.getHours();
        const baseSteps = 3000 + Math.floor(Math.random() * 2000);
        const hourMultiplier = hour / 24;
        const steps = Math.floor(baseSteps * (hourMultiplier === 0 ? 0.1 : hourMultiplier));
        
        setStepData({
          steps,
          lastUpdated: today
        });
        
        // Log demo steps
        if (isOnline) {
          await logSteps(steps);
        } else {
          saveOfflineData('steps', { steps, date: today.toISOString().split('T')[0] });
        }
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
      setStepData({
        steps,
        lastUpdated: new Date()
      });
      
      if (isOnline) {
        await logSteps(steps);
      } else {
        saveOfflineData('steps', { 
          steps, 
          date: new Date().toISOString().split('T')[0] 
        });
      }
      
      toast.success(`Logged ${steps} steps manually`);
      impact(HapticImpact.MEDIUM);
    } catch (error) {
      console.error('Error logging steps manually:', error);
      toast.error('Failed to log steps');
    } finally {
      setIsLoading(false);
    }
  };

  // Set up automatic sync interval
  useEffect(() => {
    if (!isNative || !hasPermission) return;
    
    // Fetch initial data
    fetchSteps();
    
    // Set up periodic sync (every 30 minutes)
    const syncInterval = setInterval(() => {
      fetchSteps();
    }, 30 * 60 * 1000);
    
    return () => clearInterval(syncInterval);
  }, [isNative, hasPermission]);

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
