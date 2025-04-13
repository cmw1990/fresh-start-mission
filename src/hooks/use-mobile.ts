
import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  const [isNativeApp, setIsNativeApp] = useState(false);

  useEffect(() => {
    // Check if we're running in a mobile browser (based on screen size)
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    
    // Check if we're running as a native app
    const checkIfNative = () => {
      // Check for Capacitor
      const hasCapacitor = typeof (window as any).Capacitor !== 'undefined';
      
      // Check for Capacitor plugins (which are only initialized in native apps)
      const hasCapacitorPlugins = !!(window as any).Capacitor?.Plugins?.Haptics ||
        !!(window as any).Capacitor?.Plugins?.App;
      
      // Check user agent for mobile platform indicators
      const userAgent = navigator.userAgent.toLowerCase();
      const hasMobilePlatformIndicators = 
        userAgent.includes('capacitor') ||
        userAgent.includes('android') || 
        userAgent.includes('ios');
      
      // We're in a native app if we have Capacitor and either plugins or mobile platform indicators
      setIsNativeApp(hasCapacitor && (hasCapacitorPlugins || hasMobilePlatformIndicators));
    };
    
    // Initial checks
    checkScreenSize();
    checkIfNative();
    
    // Add event listener for resizing
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [breakpoint]);

  return { 
    isMobile, 
    isNativeApp, 
    isMobileOrNative: isMobile || isNativeApp 
  };
}
