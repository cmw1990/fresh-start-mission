
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { useEffect, useState } from "react";

const AppLayout = () => {
  const [isMobileApp, setIsMobileApp] = useState(false);

  useEffect(() => {
    // Check if we're running as a native app
    const checkPlatform = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      setIsMobileApp(userAgent.includes('android') || userAgent.includes('ios'));
    };
    
    checkPlatform();
  }, []);

  return (
    <div className={`flex h-screen bg-background ${isMobileApp ? 'capacitor-container safe-area-padding' : ''}`}>
      <Sidebar />
      <main className="flex-1 overflow-auto pb-16 md:pb-0 app-container">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  );
};

export default AppLayout;
