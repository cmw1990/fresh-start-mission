
import { useState, useEffect } from 'react';

// Define the return type for the hook
type OfflineSupportReturn = {
  isOnline: boolean;
  offlineData: Record<string, any[]>;
  pendingItemsCount: number; // Add this property
  saveOfflineData: (actionType: string, data: any) => boolean;
  syncOfflineData: () => Promise<boolean>;
};

export function useOfflineSupport(): OfflineSupportReturn {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [offlineData, setOfflineData] = useState<Record<string, any[]>>({});
  
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
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Save data locally when offline
  const saveOfflineData = (actionType: string, data: any): boolean => {
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
  };
  
  // Sync offline data when back online
  const syncOfflineData = async (): Promise<boolean> => {
    if (!isOnline || Object.keys(offlineData).length === 0) {
      return false;
    }
    
    try {
      // For each action type, process the queued items
      // This is a placeholder - actual implementation would depend on how
      // you want to handle different types of actions
      for (const [actionType, items] of Object.entries(offlineData)) {
        for (const item of items) {
          // Process the item based on its action type
          // e.g., API calls to save logs, update preferences, etc.
          console.log(`Syncing ${actionType} item:`, item);
          
          // Here you would make the actual API calls
          // await api.processOfflineItem(actionType, item);
        }
      }
      
      // Clear offline data after successful sync
      setOfflineData({});
      localStorage.removeItem('offlineData');
      return true;
    } catch (error) {
      console.error('Error syncing offline data:', error);
      return false;
    }
  };
  
  // Calculate the total count of pending items
  const pendingItemsCount = Object.values(offlineData).reduce(
    (count, items) => count + items.length, 
    0
  );
  
  return {
    isOnline,
    offlineData,
    pendingItemsCount,
    saveOfflineData,
    syncOfflineData
  };
}
