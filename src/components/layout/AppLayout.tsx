
import React from 'react';
import Sidebar from '../app/Sidebar';
import { Outlet } from 'react-router-dom';
import MobileAppNav from '../mobile/MobileAppNav';
import { useIsMobile } from '@/hooks/use-mobile';
import OfflineIndicator from '../common/OfflineIndicator';

const AppLayout = () => {
  // Get the mobile status from our hook
  const { isMobile, isNativeApp } = useIsMobile();
  const shouldShowMobileNav = isMobile || isNativeApp;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        {!shouldShowMobileNav && (
          <aside className="w-64 bg-white border-r border-gray-200 shadow-sm">
            <div className="sticky top-0 h-screen overflow-y-auto py-6 px-3">
              <Sidebar />
            </div>
          </aside>
        )}
        
        {/* Main content area */}
        <main className={`flex-1 min-h-screen ${shouldShowMobileNav ? 'mb-16' : ''}`}>
          <div className="container mx-auto p-6">
            <OfflineIndicator />
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Mobile navigation at bottom */}
      {shouldShowMobileNav && <MobileAppNav />}
    </div>
  );
};

export default AppLayout;
