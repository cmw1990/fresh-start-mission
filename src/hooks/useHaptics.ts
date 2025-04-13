
import { useCallback } from 'react';

// Update this enum to match the ImpactStyle type from Capacitor
export enum HapticImpact {
  LIGHT = 'light',
  MEDIUM = 'medium',
  HEAVY = 'heavy'
}

export function useHaptics() {
  const impact = useCallback(async (style: HapticImpact = HapticImpact.MEDIUM) => {
    try {
      // Try to access the Capacitor Haptics plugin
      const Haptics = (window as any).Capacitor?.Plugins?.Haptics;
      
      if (Haptics) {
        await Haptics.impact({ style });
      } else {
        console.log('Haptics not available in this environment');
      }
    } catch (error) {
      console.log('Error using haptics:', error);
    }
  }, []);

  const notification = useCallback(async () => {
    try {
      const Haptics = (window as any).Capacitor?.Plugins?.Haptics;
      
      if (Haptics) {
        await Haptics.notification();
      }
    } catch (error) {
      console.log('Haptics notification not available:', error);
    }
  }, []);

  const vibrate = useCallback(async (duration: number = 500) => {
    try {
      const Haptics = (window as any).Capacitor?.Plugins?.Haptics;
      
      if (Haptics) {
        await Haptics.vibrate({ duration });
      }
    } catch (error) {
      console.log('Haptics vibrate not available:', error);
    }
  }, []);

  return {
    impact,
    notification,
    vibrate
  };
}
