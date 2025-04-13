
import { useCallback } from 'react';
import { Haptics } from '@capacitor/haptics';

export enum HapticImpact {
  LIGHT = 'light',
  MEDIUM = 'medium',
  HEAVY = 'heavy'
}

export function useHaptics() {
  const impact = useCallback(async (style: HapticImpact = HapticImpact.MEDIUM) => {
    try {
      await Haptics.impact({ style });
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
