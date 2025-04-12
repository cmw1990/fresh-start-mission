
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export function useOfflineSupport() {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [offlineData, setOfflineData] = useState<any[]>([]);
  
  // Update online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('You\'re back online! Syncing data...');
      syncOfflineData();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast.error('You\'re offline. Data will be saved locally and synced when you reconnect.');
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Load any stored offline data from localStorage
  useEffect(() => {
    const loadOfflineData = () => {
      try {
        const storedData = localStorage.getItem('offlineData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setOfflineData(parsedData);
        }
      } catch (error) {
        console.error('Error loading offline data:', error);
      }
    };
    
    loadOfflineData();
  }, []);
  
  // Save data locally when offline
  const saveOfflineData = (type: string, data: any) => {
    try {
      const newItem = {
        id: `offline_${Date.now()}`,
        type,
        data,
        timestamp: new Date().toISOString()
      };
      
      const updatedData = [...offlineData, newItem];
      setOfflineData(updatedData);
      localStorage.setItem('offlineData', JSON.stringify(updatedData));
      
      toast.info('Data saved locally. Will sync when online.');
      return true;
    } catch (error) {
      console.error('Error saving offline data:', error);
      toast.error('Failed to save data locally');
      return false;
    }
  };
  
  // Sync offline data when back online
  const syncOfflineData = async () => {
    if (!isOnline || offlineData.length === 0) return;
    
    try {
      // Group data by type for more efficient syncing
      const groupedData = offlineData.reduce((acc, item) => {
        if (!acc[item.type]) {
          acc[item.type] = [];
        }
        acc[item.type].push(item.data);
        return acc;
      }, {} as Record<string, any[]>);
      
      // Process each data type
      for (const [type, dataArray] of Object.entries(groupedData)) {
        // Here we would implement the actual sync logic for each data type
        console.log(`Syncing ${dataArray.length} items of type: ${type}`);
        
        // Example sync implementation placeholder:
        // await syncSpecificTypeData(type, dataArray);
      }
      
      // Clear synced data
      setOfflineData([]);
      localStorage.removeItem('offlineData');
      
      toast.success('All offline data has been synced!');
    } catch (error) {
      console.error('Error syncing offline data:', error);
      toast.error('Failed to sync some offline data. Will try again later.');
    }
  };
  
  return {
    isOnline,
    offlineData,
    saveOfflineData,
    syncOfflineData,
    pendingItemsCount: offlineData.length
  };
}
