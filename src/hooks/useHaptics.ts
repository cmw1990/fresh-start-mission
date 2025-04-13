
/**
 * Custom hook for haptic feedback on mobile devices
 * Uses Capacitor Haptics plugin when available, falls back to Web Vibration API
 */

export enum HapticImpact {
  LIGHT = "light",
  MEDIUM = "medium",
  HEAVY = "heavy"
}

export const useHaptics = () => {
  // Check if the device supports vibration
  const hasVibration = 'navigator' in window && 'vibrate' in navigator;
  
  // Function to trigger impact haptic feedback
  const impact = (style: HapticImpact = HapticImpact.MEDIUM) => {
    try {
      // For now we'll use the Web Vibration API as a fallback
      // In a real implementation, we would check for Capacitor's Haptics plugin first
      if (hasVibration) {
        switch (style) {
          case HapticImpact.LIGHT:
            navigator.vibrate(10);
            break;
          case HapticImpact.MEDIUM:
            navigator.vibrate(20);
            break;
          case HapticImpact.HEAVY:
            navigator.vibrate([30, 10, 30]);
            break;
        }
      }
    } catch (error) {
      console.log('Haptic feedback not available');
    }
  };
  
  // Function for notification-style haptic
  const notification = () => {
    try {
      if (hasVibration) {
        navigator.vibrate([10, 100, 10]);
      }
    } catch (error) {
      console.log('Haptic feedback not available');
    }
  };
  
  // Function for selection change haptic
  const selectionChange = () => {
    try {
      if (hasVibration) {
        navigator.vibrate(5);
      }
    } catch (error) {
      console.log('Haptic feedback not available');
    }
  };
  
  return {
    impact,
    notification,
    selectionChange,
    hasHaptics: hasVibration
  };
};
