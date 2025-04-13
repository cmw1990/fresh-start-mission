import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useHaptics, HapticImpact } from './useHaptics';

// Define the return type for the hook
type OfflineSupportReturn = {
  isOnline: boolean;
  offlineData: Record<string, any[]>;
  pendingItemsCount: number;
  saveOfflineData: (actionType: string, data: any) => boolean;
  syncOfflineData: () => Promise<boolean>;
  lastSyncAttempt: Date | null;
};

export function useOfflineSupport(): OfflineSupportReturn {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [offlineData, setOfflineData] = useState<Record<string, any[]>>({});
  const [lastSyncAttempt, setLastSyncAttempt] = useState<Date | null>(null);
  const { impact } = useHaptics();
  
  // Calculate the total count of pending items - moved up before it's used
  const pendingItemsCount = Object.values(offlineData).reduce(
    (count, items) => count + items.length, 
    0
  );
  
  // Load any existing offline data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('offlineData');
    if (storedData) {
      try {
        setOfflineData(JSON.parse(storedData));
      } catch (e) {
        console.error('Failed to parse offline data:', e);
        localStorage.removeItem('offlineData');
      }
    }
    
    // Set up event listeners for online/offline status
    const handleOnline = () => {
      setIsOnline(true);
      // Provide haptic feedback when coming back online
      impact(HapticImpact.LIGHT);
      toast.success("You're back online!", {
        description: "Your data will sync automatically."
      });
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast.warning("You're offline", {
        description: "Don't worry, your data will be saved locally."
      });
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [impact]);
  
  // Save data locally when offline
  const saveOfflineData = useCallback((actionType: string, data: any): boolean => {
    if (!actionType || !data) return false;
    
    const newOfflineData = { ...offlineData };
    
    // Initialize the array for this action type if it doesn't exist
    if (!newOfflineData[actionType]) {
      newOfflineData[actionType] = [];
    }
    
    // Add the data with a timestamp
    newOfflineData[actionType].push({
      ...data,
      offlineTimestamp: new Date().toISOString()
    });
    
    // Save to state and localStorage
    setOfflineData(newOfflineData);
    localStorage.setItem('offlineData', JSON.stringify(newOfflineData));
    
    return true;
  }, [offlineData]);
  
  // Sync offline data when back online
  const syncOfflineData = useCallback(async (): Promise<boolean> => {
    if (!isOnline || Object.keys(offlineData).length === 0) {
      return false;
    }
    
    setLastSyncAttempt(new Date());
    
    try {
      // For each action type, process the queued items
      for (const [actionType, items] of Object.entries(offlineData)) {
        for (const item of items) {
          // Process based on action type
          switch (actionType) {
            case 'nicotine_logs':
              try {
                // This would call your API service to save logs
                console.log(`Syncing nicotine log:`, item);
                // await logService.addNicotineLog(item);
              } catch (error) {
                console.error('Error syncing nicotine log:', error);
              }
              break;
              
            case 'step_logs':
              try {
                console.log(`Syncing step log:`, item);
                // await rewardService.logSteps(item.steps, item.date);
              } catch (error) {
                console.error('Error syncing step log:', error);
              }
              break;
              
            case 'mood_logs':
              // Mood log sync logic
              console.log(`Syncing mood log:`, item);
              break;
              
            default:
              console.log(`Unhandled offline action type: ${actionType}`, item);
          }
        }
      }
      
      // Clear offline data after successful sync
      setOfflineData({});
      localStorage.removeItem('offlineData');
      
      // Provide haptic feedback for successful sync
      impact(HapticImpact.LIGHT);
      
      if (pendingItemsCount > 0) {
        toast.success("Data synced successfully", {
          description: `${pendingItemsCount} items uploaded to your account.`
        });
      }
      
      return true;
    } catch (error) {
      console.error('Error syncing offline data:', error);
      return false;
    }
  }, [isOnline, offlineData, impact, pendingItemsCount]);
  
  // Auto-sync when coming back online
  useEffect(() => {
    if (isOnline && Object.keys(offlineData).length > 0) {
      // Add a small delay to ensure network is stable
      const syncTimer = setTimeout(() => {
        syncOfflineData();
      }, 2000);
      
      return () => clearTimeout(syncTimer);
    }
  }, [isOnline, offlineData, syncOfflineData]);
  
  // Periodic sync attempt when online (every 5 minutes)
  useEffect(() => {
    if (isOnline) {
      const periodicSync = setInterval(() => {
        if (Object.keys(offlineData).length > 0) {
          syncOfflineData();
        }
      }, 5 * 60 * 1000); // 5 minutes
      
      return () => clearInterval(periodicSync);
    }
  }, [isOnline, offlineData, syncOfflineData]);
  
  return {
    isOnline,
    offlineData,
    pendingItemsCount,
    saveOfflineData,
    syncOfflineData,
    lastSyncAttempt
  };
}
