
import { useState, useEffect } from 'react';

enum HapticImpact {
  LIGHT = 'light',
  MEDIUM = 'medium',
  HEAVY = 'heavy'
}

interface HapticsInterface {
  impact: (style: HapticImpact) => Promise<void>;
  notification: (type: 'success' | 'warning' | 'error') => Promise<void>;
  vibrate: (pattern?: number[]) => Promise<void>;
  isAvailable: boolean;
}

export function useHaptics(): HapticsInterface {
  const [isAvailable, setIsAvailable] = useState(false);
  const [haptics, setHaptics] = useState<any>(null);

  useEffect(() => {
    // Try to load Capacitor Haptics
    const loadHaptics = async () => {
      try {
        // Dynamic import of Capacitor Haptics
        const Capacitor = await import('@capacitor/core');
        
        if (Capacitor.Capacitor.isPluginAvailable('Haptics')) {
          const { Haptics } = await import('@capacitor/haptics');
          setHaptics(Haptics);
          setIsAvailable(true);
        } else {
          console.log('Haptics plugin not available');
          setIsAvailable(false);
        }
      } catch (error) {
        console.log('Haptics not available:', error);
        setIsAvailable(false);
      }
    };

    loadHaptics();
  }, []);

  // Function to trigger impact haptic feedback
  const impact = async (style: HapticImpact = HapticImpact.MEDIUM): Promise<void> => {
    if (!isAvailable || !haptics) return;

    try {
      await haptics.impact({ style });
    } catch (error) {
      console.error('Error triggering haptic impact:', error);
    }
  };

  // Function to trigger notification haptic feedback
  const notification = async (type: 'success' | 'warning' | 'error' = 'success'): Promise<void> => {
    if (!isAvailable || !haptics) return;

    try {
      await haptics.notification({ type });
    } catch (error) {
      console.error('Error triggering haptic notification:', error);
    }
  };

  // Function to trigger custom vibration pattern
  const vibrate = async (pattern: number[] = [100, 50, 100]): Promise<void> => {
    if (!isAvailable || !haptics) {
      // Fallback to Web Vibration API if available
      if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
      return;
    }

    try {
      await haptics.vibrate({ pattern });
    } catch (error) {
      // Fallback to Web Vibration API
      if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
      console.error('Error triggering haptic vibration:', error);
    }
  };

  return {
    impact,
    notification,
    vibrate,
    isAvailable
  };
}

export { HapticImpact };
