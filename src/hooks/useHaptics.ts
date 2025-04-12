
import { Capacitor } from '@capacitor/core';

export enum HapticImpact {
  LIGHT = 'light',
  MEDIUM = 'medium',
  HEAVY = 'heavy'
}

export function useHaptics() {
  const isNative = Capacitor.isNativePlatform();

  const impact = async (style: HapticImpact = HapticImpact.MEDIUM) => {
    if (!isNative) return;
    
    try {
      // Dynamic import to avoid loading this on web
      const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
      
      let impactStyle;
      switch (style) {
        case HapticImpact.LIGHT:
          impactStyle = ImpactStyle.Light;
          break;
        case HapticImpact.HEAVY:
          impactStyle = ImpactStyle.Heavy;
          break;
        default:
          impactStyle = ImpactStyle.Medium;
      }
      
      await Haptics.impact({ style: impactStyle });
    } catch (err) {
      console.warn('Haptic feedback error:', err);
    }
  };

  const notification = async (type: 'SUCCESS' | 'WARNING' | 'ERROR' = 'SUCCESS') => {
    if (!isNative) return;
    
    try {
      const { Haptics, NotificationType } = await import('@capacitor/haptics');
      
      let notificationType;
      switch (type) {
        case 'SUCCESS':
          notificationType = NotificationType.Success;
          break;
        case 'WARNING':
          notificationType = NotificationType.Warning;
          break;
        case 'ERROR':
          notificationType = NotificationType.Error;
          break;
        default:
          notificationType = NotificationType.Success;
      }
      
      await Haptics.notification({ type: notificationType });
    } catch (err) {
      console.warn('Haptic notification error:', err);
    }
  };

  const vibrate = async (duration = 300) => {
    if (!isNative) return;
    
    try {
      const { Haptics } = await import('@capacitor/haptics');
      await Haptics.vibrate({ duration });
    } catch (err) {
      console.warn('Haptic vibration error:', err);
    }
  };

  return { impact, notification, vibrate, isNative };
}
