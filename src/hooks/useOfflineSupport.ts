
import { useState, useEffect } from 'react';

interface OfflineData {
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
    setOfflineData(prev => [
      ...prev.filter(item => item.key !== key),
      {
        key,
        value,
        timestamp: Date.now()
      }
    ]);
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
  
  return {
    isOnline,
    saveOfflineData,
    getOfflineData,
    clearOfflineData,
    clearAllOfflineData,
    getPendingOfflineData
  };
};
