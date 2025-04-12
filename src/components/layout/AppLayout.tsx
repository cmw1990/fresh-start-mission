
import React from 'react';
import Sidebar from '@/components/app/Sidebar';
import MobileNav from '@/components/app/MobileNav';
import { ErrorBoundary } from 'react-error-boundary';
import OfflineIndicator from '@/components/common/OfflineIndicator';
import PageBreadcrumb from '@/components/common/PageBreadcrumb';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <MobileNav />
        <OfflineIndicator className="mx-4 mt-4" />
        <main className="flex-1 overflow-y-auto">
          <div className="container py-4">
            <PageBreadcrumb />
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              {children}
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
