
import { useOfflineSupport } from '@/hooks/useOfflineSupport';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { WifiOff, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface OfflineIndicatorProps {
  className?: string;
}

const OfflineIndicator = ({ className }: OfflineIndicatorProps) => {
  const { isOnline, offlineData, syncOfflineData } = useOfflineSupport();
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Calculate pending items count
  const pendingItemsCount = Object.values(offlineData || {}).flat().length;
  
  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await syncOfflineData();
    } finally {
      setIsSyncing(false);
    }
  };
  
  if (isOnline && (!offlineData || pendingItemsCount === 0)) {
    return null;
  }
  
  return (
    <Alert variant={isOnline ? "default" : "destructive"} className={cn("mb-4", className)}>
      {isOnline ? (
        <>
          <Upload className="h-4 w-4" />
          <AlertTitle>Offline Data Available</AlertTitle>
          <div className="flex items-center justify-between">
            <AlertDescription>
              {pendingItemsCount} {pendingItemsCount === 1 ? 'item' : 'items'} need to be synced
            </AlertDescription>
            <Button size="sm" variant="outline" onClick={handleSync} disabled={isSyncing}>
              {isSyncing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Syncing...
                </>
              ) : (
                'Sync Now'
              )}
            </Button>
          </div>
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4" />
          <AlertTitle>You're offline</AlertTitle>
          <AlertDescription>
            Your data will be saved locally and synced when you reconnect
          </AlertDescription>
        </>
      )}
    </Alert>
  );
};

export default OfflineIndicator;
