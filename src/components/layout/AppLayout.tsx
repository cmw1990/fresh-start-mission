
import { Outlet } from "react-router-dom";
import Sidebar from "../app/Sidebar";
import MobileNav from "../app/MobileNav";
import OfflineIndicator from "../common/OfflineIndicator";
import ErrorBoundary from "../common/ErrorBoundary";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const AppLayout = () => {
  const [isMobileApp, setIsMobileApp] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Check if we're running as a native app
    const checkPlatform = () => {
      // Use Capacitor if available
      try {
        const Capacitor = require('@capacitor/core').Capacitor;
        const isMobile = Capacitor.isNativePlatform();
        setIsMobileApp(isMobile);
      } catch (e) {
        // Fallback to user agent check if Capacitor is not available
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobile = userAgent.includes('android') || userAgent.includes('ios');
        setIsMobileApp(isMobile);
      }
      
      // Check if this is first visit
      const visited = localStorage.getItem('hasVisitedAppBefore');
      if (!visited && isMobileApp) {
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
      {showSplash && isFirstVisit && (
        <div className="fixed inset-0 bg-fresh-300 z-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold mb-4">Welcome to Mission Fresh</h1>
            <p className="mb-8">{user?.email ? `Welcome ${user.email}!` : 'A Fresh World is Mission Possible!'}</p>
            <button 
              className="bg-white text-fresh-600 px-6 py-2 rounded-full font-medium"
              onClick={() => setShowSplash(false)}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
      <div className={`flex h-screen bg-background ${isMobileApp ? 'capacitor-container safe-area-padding' : ''}`}>
        <Sidebar />
        <main className="flex-1 overflow-auto pb-16 md:pb-0 app-container relative">
          <ErrorBoundary>
            <div className="sticky top-0 z-40 w-full">
              <OfflineIndicator className="rounded-none border-x-0 border-t-0" />
            </div>
            <Outlet />
          </ErrorBoundary>
        </main>
        <MobileNav />
      </div>
    </>
  );
};

export default AppLayout;
