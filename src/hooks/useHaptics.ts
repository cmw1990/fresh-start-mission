
import { useCallback } from 'react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

// Update this enum to match the ImpactStyle type from Capacitor
export enum HapticImpact {
  LIGHT = 'light',
  MEDIUM = 'medium',
  HEAVY = 'heavy'
}

export function useHaptics() {
  const impact = useCallback(async (style: HapticImpact = HapticImpact.MEDIUM) => {
    try {
      // Convert our enum to the ImpactStyle type expected by Capacitor
      // Use type assertion to convert between compatible string enums
      await Haptics.impact({ style: style as unknown as ImpactStyle });
    } catch (error) {
      console.log('Haptics not available or error:', error);
    }
  }, []);

  const notification = useCallback(async () => {
    try {
      await Haptics.notification();
    } catch (error) {
      console.log('Haptics notification not available:', error);
    }
  }, []);

  const vibrate = useCallback(async (duration: number = 500) => {
    try {
      await Haptics.vibrate({ duration });
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
