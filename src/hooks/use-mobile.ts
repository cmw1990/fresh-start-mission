
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
      const userAgent = navigator.userAgent.toLowerCase();
      // Check for capacitor or cordova
      const isNative = 
        typeof (window as any).Capacitor !== 'undefined' || 
        userAgent.includes('capacitor') ||
        userAgent.includes('android') || 
        userAgent.includes('ios');
      
      setIsNativeApp(isNative);
    };
    
    // Initial checks
    checkScreenSize();
    checkIfNative();
    
    // Add event listener for resizing
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [breakpoint]);

  return { isMobile, isNativeApp, isMobileOrNative: isMobile || isNativeApp };
}

// Remove the duplicate export to fix the error
