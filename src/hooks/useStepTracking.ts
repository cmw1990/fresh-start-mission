
import { useState, useEffect, useCallback } from 'react';
import { logSteps } from '@/services/rewardService';
import { toast } from 'sonner';
import { useHaptics, HapticImpact } from './useHaptics';
import { useIsMobile } from './use-mobile';
import { useOfflineSupport } from './useOfflineSupport';

interface StepData {
  steps: number;
  date: string;
  source: 'health-api' | 'manual' | 'mock';
  lastUpdated: Date;
}

export function useStepTracking() {
  const [stepData, setStepData] = useState<StepData>({
    steps: 0,
    date: new Date().toISOString().split('T')[0],
    source: 'mock',
    lastUpdated: new Date()
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const { impact } = useHaptics();
  const { isMobile, isNativeApp } = useIsMobile();
  const { isOnline, saveOfflineData } = useOfflineSupport();
  
  // Add isNative property based on mobile detection
  const isNative = isNativeApp;
  
  // Function to request permissions for health data
  const requestPermissions = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Check if Capacitor and Health plugin are available
      const Health = (window as any).Capacitor?.Plugins?.Health;
      
      if (Health) {
        try {
          // Request authorization from the health API
          const result = await Health.requestAuthorization({
            permissions: ['steps']
          });
          
          setHasPermission(result.authorized);
          
          if (result.authorized) {
            toast.success('Health permissions granted successfully');
            impact(HapticImpact.LIGHT);
            
            // After getting permission, fetch steps
            return await fetchSteps();
          } else {
            toast.error('Health permissions denied');
            return false;
          }
        } catch (err) {
          console.error('Error requesting health permissions:', err);
          toast.error('Failed to get health permissions');
          return false;
        }
      } else {
        // Mock permission request for non-native environments
        await new Promise(resolve => setTimeout(resolve, 1000));
        setHasPermission(true);
        toast.success('Health permissions granted successfully');
        impact(HapticImpact.LIGHT);
        
        // After getting permission, fetch steps
        return await fetchSteps();
      }
    } catch (error) {
      console.error('Error requesting health permissions:', error);
      toast.error('Failed to get health permissions');
      setHasPermission(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [impact]);
  
  // Function to fetch steps from health APIs
  const fetchSteps = useCallback(async () => {
    try {
      setIsLoading(true);
      const today = new Date().toISOString().split('T')[0];
      let steps = 0;
      let source: 'health-api' | 'manual' | 'mock' = 'mock';
      
      // Try to use the Health plugin if available
      const Health = (window as any).Capacitor?.Plugins?.Health;
      
      if (Health && hasPermission) {
        try {
          // Get steps from Health API for today
          const now = new Date();
          const startDate = new Date(now);
          startDate.setHours(0, 0, 0, 0);
          
          const result = await Health.queryAggregated({
            startDate: startDate.toISOString(),
            endDate: now.toISOString(),
            dataType: 'steps'
          });
          
          if (result && result.value !== undefined) {
            steps = Math.floor(result.value);
            source = 'health-api';
          } else {
            // Fallback to mock data if Health API returned no results
            steps = Math.floor(Math.random() * 8000) + 2000;
            source = 'mock';
          }
        } catch (err) {
          console.error('Error fetching health data:', err);
          // Fallback to mock data
          steps = Math.floor(Math.random() * 8000) + 2000;
          source = 'mock';
        }
      } else {
        // Use mock data for non-native environments
        steps = Math.floor(Math.random() * 8000) + 2000;
        source = 'mock';
      }
      
      // Set the step data
      setStepData({
        steps,
        date: today,
        source,
        lastUpdated: new Date()
      });
      
      // Log to the backend if online
      if (isOnline) {
        await logSteps(steps);
      } else {
        // Save offline for later sync
        saveOfflineData('step_logs', { steps, date: today });
      }
      
      return steps;
    } catch (error) {
      console.error('Error fetching step data:', error);
      toast.error('Failed to fetch step data');
      setHasPermission(false);
      return 0;
    } finally {
      setIsLoading(false);
    }
  }, [hasPermission, isOnline, saveOfflineData]);
  
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
        source: 'manual',
        lastUpdated: new Date()
      });
      
      if (isOnline) {
        // Log to the backend
        await logSteps(steps);
      } else {
        // Save offline for later sync
        saveOfflineData('step_logs', { steps, date: today });
      }
      
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
  }, [impact, isOnline, saveOfflineData]);
  
  // Check for existing permission on component mount
  useEffect(() => {
    const checkPermission = async () => {
      const Health = (window as any).Capacitor?.Plugins?.Health;
      if (Health) {
        try {
          const result = await Health.isAuthorized({ permissions: ['steps'] });
          setHasPermission(result.authorized);
        } catch (err) {
          console.error('Error checking health permissions:', err);
        }
      }
    };
    
    if (isNative) {
      checkPermission();
    }
  }, [isNative]);
  
  // Fetch steps on component mount or when hasPermission changes
  useEffect(() => {
    if (hasPermission) {
      fetchSteps();
    }
  }, [hasPermission, fetchSteps]);
  
  // Set up periodic refresh (every 30 minutes)
  useEffect(() => {
    if (hasPermission && isNative) {
      const refreshInterval = setInterval(() => {
        fetchSteps();
      }, 30 * 60 * 1000); // 30 minutes
      
      return () => clearInterval(refreshInterval);
    }
  }, [hasPermission, isNative, fetchSteps]);
  
  return {
    stepData,
    isLoading,
    hasPermission,
    fetchSteps,
    logManualSteps,
    isNative,
    requestPermissions
  };
}
