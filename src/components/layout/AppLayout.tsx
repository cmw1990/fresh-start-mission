
import React from 'react';
import Sidebar from '../app/Sidebar';
import { Outlet } from 'react-router-dom';
import MobileNav from '../app/MobileNav';
import { useIsMobile } from '@/hooks/use-mobile';

const AppLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        {!isMobile && (
          <aside className="w-64 bg-white border-r border-gray-200 shadow-sm">
            <div className="sticky top-0 h-screen overflow-y-auto py-6 px-3">
              <Sidebar />
            </div>
          </aside>
        )}
        
        {/* Main content area */}
        <main className="flex-1 min-h-screen">
          <div className="container mx-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Mobile navigation at bottom */}
      {isMobile && <MobileNav />}
    </div>
  );
};

export default AppLayout;
