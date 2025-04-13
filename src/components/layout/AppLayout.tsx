
import React from 'react';
import Sidebar from '../app/Sidebar';
import { Outlet } from 'react-router-dom';
import MobileNav from '../app/MobileNav';
import { useIsMobile } from '@/hooks/use-mobile';

const AppLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <div className="flex flex-1">
        {!isMobile && <Sidebar />}
        
        <main className="flex-1 p-0">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile navigation at bottom */}
      {isMobile && <MobileNav />}
    </div>
  );
};

export default AppLayout;
