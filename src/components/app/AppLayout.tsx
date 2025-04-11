
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import SplashScreen from "./SplashScreen";
import { useEffect, useState } from "react";

const AppLayout = () => {
  const [isMobileApp, setIsMobileApp] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    // Check if we're running as a native app
    const checkPlatform = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = userAgent.includes('android') || userAgent.includes('ios');
      setIsMobileApp(isMobile);
      
      // Check if this is first visit
      const visited = localStorage.getItem('hasVisitedAppBefore');
      if (!visited && isMobile) {
        setIsFirstVisit(true);
        localStorage.setItem('hasVisitedAppBefore', 'true');
      } else {
        setShowSplash(false);
      }
    };
    
    checkPlatform();
  }, []);

  return (
    <>
      {showSplash && isFirstVisit && <SplashScreen />}
      <div className={`flex h-screen bg-background ${isMobileApp ? 'capacitor-container safe-area-padding' : ''}`}>
        <Sidebar />
        <main className="flex-1 overflow-auto pb-16 md:pb-0 app-container">
          <Outlet />
        </main>
        <MobileNav />
      </div>
    </>
  );
};

export default AppLayout;
