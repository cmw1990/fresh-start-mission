import { useState, useEffect, useCallback } from 'react';

export function useOfflineSupport() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineData, setOfflineData] = useState<Record<string, any[]>>({});

  useEffect(() => {
    // Load any saved offline data from localStorage
    try {
      const savedData = localStorage.getItem('offlineData');
      if (savedData) {
        setOfflineData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Error loading offline data:', error);
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save data for offline use
  const saveOfflineData = useCallback((actionType: string, data: any) => {
    try {
      const newOfflineData = { ...offlineData };
      
      if (!newOfflineData[actionType]) {
        newOfflineData[actionType] = [];
      }
      
      // Add timestamp to track when this was saved
      const dataWithTimestamp = {
        ...data,
        _offlineSavedAt: new Date().toISOString()
      };
      
      newOfflineData[actionType].push(dataWithTimestamp);
      
      // Save to state and localStorage
      setOfflineData(newOfflineData);
      localStorage.setItem('offlineData', JSON.stringify(newOfflineData));
      
      return true;
    } catch (error) {
      console.error('Error saving offline data:', error);
      return false;
    }
  }, [offlineData]);

  // Function to sync offline data when back online
  const syncOfflineData = useCallback(async () => {
    if (!isOnline || Object.keys(offlineData).length === 0) {
      return;
    }
    
    // Here we would implement logic to sync each type of offline data
    // This is a placeholder for the actual implementation
    console.log('Syncing offline data:', offlineData);
    
    // After successful sync, clear the offline data
    // setOfflineData({});
    // localStorage.removeItem('offlineData');
    
    return true;
  }, [isOnline, offlineData]);

  return {
    isOnline,
    offlineData,
    saveOfflineData,
    syncOfflineData
  };
}
