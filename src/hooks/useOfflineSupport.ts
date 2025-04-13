
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface OfflineData {
  key: string;
  value: any;
  timestamp: number;
}

export const useOfflineSupport = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [offlineData, setOfflineData] = useState<OfflineData[]>([]);
  
  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Load offline data from localStorage on mount
    try {
      const savedData = localStorage.getItem('offlineData');
      if (savedData) {
        setOfflineData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Error loading offline data:', error);
    }
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Update localStorage when offlineData changes
  useEffect(() => {
    try {
      localStorage.setItem('offlineData', JSON.stringify(offlineData));
    } catch (error) {
      console.error('Error saving offline data:', error);
    }
  }, [offlineData]);
  
  // Save data for offline use
  const saveOfflineData = (key: string, value: any) => {
    try {
      setOfflineData(prev => [
        ...prev.filter(item => item.key !== key),
        {
          key,
          value,
          timestamp: Date.now()
        }
      ]);
      
      return true; // Return success status
    } catch (error) {
      console.error('Error saving offline data:', error);
      return false;
    }
  };
  
  // Get offline data by key
  const getOfflineData = (key: string) => {
    return offlineData.find(item => item.key === key)?.value;
  };
  
  // Clear processed offline data
  const clearOfflineData = (key: string) => {
    setOfflineData(prev => prev.filter(item => item.key !== key));
  };
  
  // Clear all offline data
  const clearAllOfflineData = () => {
    setOfflineData([]);
  };
  
  // Get all pending offline data
  const getPendingOfflineData = () => {
    return offlineData;
  };
  
  // Sync offline data with backend when online
  const syncOfflineData = async () => {
    if (!isOnline || offlineData.length === 0) {
      return false;
    }
    
    try {
      // In a real implementation, we would send data to the backend
      // For demo purposes, we'll just simulate success and clear the data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear all synced data
      clearAllOfflineData();
      
      toast.success(`Successfully synced ${offlineData.length} items`);
      return true;
    } catch (error) {
      console.error('Error syncing offline data:', error);
      toast.error('Failed to sync offline data');
      return false;
    }
  };
  
  // Calculate the number of pending items
  const pendingItemsCount = offlineData.length;
  
  return {
    isOnline,
    offlineData,
    pendingItemsCount,
    saveOfflineData,
    getOfflineData,
    clearOfflineData,
    clearAllOfflineData,
    getPendingOfflineData,
    syncOfflineData
  };
};
