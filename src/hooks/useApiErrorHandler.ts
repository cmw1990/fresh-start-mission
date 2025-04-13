
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useHaptics, HapticImpact } from './useHaptics';
import { useOfflineSupport } from './useOfflineSupport';

interface ApiErrorHandlerOptions {
  toastErrors?: boolean;
  haptic?: boolean;
  offlineFallback?: boolean;
  defaultErrorMessage?: string;
}

interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

export function useApiErrorHandler(options: ApiErrorHandlerOptions = {}) {
  const {
    toastErrors = true,
    haptic = true,
    offlineFallback = true,
    defaultErrorMessage = 'An error occurred. Please try again later.'
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const { impact } = useHaptics();
  const { isOnline, saveOfflineData } = useOfflineSupport();

  const handleApiCall = useCallback(
    async <T>(
      apiCall: () => Promise<T>,
      { 
        successMessage,
        errorMessage = defaultErrorMessage,
        offlineAction,
        offlineData
      }: {
        successMessage?: string;
        errorMessage?: string;
        offlineAction?: string;
        offlineData?: any;
      } = {}
    ): Promise<ApiResponse<T>> => {
      setIsLoading(true);
      
      // Check for offline state
      if (offlineFallback && !isOnline && offlineAction && offlineData) {
        setIsLoading(false);
        const saved = saveOfflineData(offlineAction, offlineData);
        
        if (saved) { // Check if saved is truthy
          if (haptic) impact(HapticImpact.LIGHT);
          if (toastErrors) toast.info('You are offline. Your data will be saved and synced when you reconnect.');
        } else {
          if (haptic) impact(HapticImpact.HEAVY);
          if (toastErrors) toast.error('Failed to save offline data');
        }
        
        return { data: null, error: new Error('Offline'), isLoading: false };
      }
      
      try {
        const result = await apiCall();
        
        if (successMessage) {
          toast.success(successMessage);
          if (haptic) impact(HapticImpact.LIGHT);
        }
        
        setIsLoading(false); // Move here to ensure it's set before returning
        return { data: result, error: null, isLoading: false };
      } catch (error) {
        console.error('API Error:', error);
        
        if (toastErrors) {
          toast.error(errorMessage);
        }
        
        if (haptic) {
          impact(HapticImpact.HEAVY);
        }
        
        setIsLoading(false); // Move here to ensure it's set before returning
        return { 
          data: null, 
          error: error instanceof Error ? error : new Error(errorMessage), 
          isLoading: false 
        };
      }
    },
    [defaultErrorMessage, haptic, impact, isOnline, offlineFallback, saveOfflineData, toastErrors]
  );

  return {
    handleApiCall,
    isLoading
  };
}
