
import React from 'react';
import { useOfflineSupport } from '@/hooks/useOfflineSupport';
import { AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface OfflineIndicatorProps {
  className?: string;
  showWhenOnline?: boolean;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ 
  className,
  showWhenOnline = false
}) => {
  const { isOnline, pendingItemsCount } = useOfflineSupport();
  
  // Don't show anything when online unless specifically requested
  if (isOnline && !showWhenOnline) return null;
  
  // Show offline state
  if (!isOnline) {
    return (
      <Alert 
        className={cn(
          "bg-amber-50 border-amber-200 flex items-center justify-between",
          className
        )}
      >
        <div className="flex items-center space-x-2">
          <WifiOff className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            You're offline. Changes will be saved locally and synced when you reconnect.
          </AlertDescription>
        </div>
        {pendingItemsCount > 0 && (
          <span className="bg-amber-200 text-amber-800 text-xs px-2 py-1 rounded-full">
            {pendingItemsCount} pending
          </span>
        )}
      </Alert>
    );
  }
  
  // Show online state with sync info if requested
  if (showWhenOnline) {
    return (
      <Alert 
        className={cn(
          "bg-green-50 border-green-200 flex items-center justify-between",
          className
        )}
      >
        <div className="flex items-center space-x-2">
          <Wifi className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            You're back online! All your data has been synchronized.
          </AlertDescription>
        </div>
      </Alert>
    );
  }
  
  return null;
};

export default OfflineIndicator;
