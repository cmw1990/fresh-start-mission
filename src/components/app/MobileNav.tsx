
import React from 'react';
import AppHeader from './AppHeader';
import { Menu } from 'lucide-react';

interface MobileNavProps {
  onToggleSidebar?: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ onToggleSidebar }) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 flex items-center justify-between px-4 h-16">
      <button
        onClick={onToggleSidebar}
        className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>
      
      <div className="flex-1 md:flex-none md:ml-8">
        <h1 className="text-lg font-medium md:hidden">Mission Fresh</h1>
      </div>
      
      <AppHeader />
    </header>
  );
};

export default MobileNav;
