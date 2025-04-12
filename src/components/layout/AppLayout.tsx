
import React, { useState } from 'react';
import Sidebar from '@/components/app/Sidebar';
import MobileNav from '@/components/app/MobileNav';
import { ErrorBoundary } from 'react-error-boundary';
import OfflineIndicator from '@/components/common/OfflineIndicator';
import PageBreadcrumb from '@/components/common/PageBreadcrumb';
import { Outlet } from 'react-router-dom';

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`md:flex ${sidebarOpen ? 'flex' : 'hidden'} h-screen md:sticky top-0 z-50`}>
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <MobileNav onToggleSidebar={toggleSidebar} />
        <OfflineIndicator className="mx-4 mt-4" />
        <main className="flex-1 overflow-y-auto">
          <div className="container py-4">
            <PageBreadcrumb />
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              <Outlet />
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
