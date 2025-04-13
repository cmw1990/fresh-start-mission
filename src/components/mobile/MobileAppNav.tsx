
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, PlusCircle, Wrench, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';

const MobileAppNav = () => {
  const location = useLocation();
  const { impact, notification } = useHaptics();
  
  const handleNavClick = (isActive: boolean) => {
    if (!isActive) {
      // Use a light impact for regular navigation
      impact(HapticImpact.LIGHT);
    } else {
      // Use notification haptic for trying to navigate to the current page
      notification();
    }
  };

  const navItems = [
    {
      name: 'Dashboard',
      icon: <Home className="h-6 w-6" />,
      path: '/app/dashboard',
    },
    {
      name: 'Log',
      icon: <PlusCircle className="h-6 w-6" />,
      path: '/app/log',
    },
    {
      name: 'Progress',
      icon: <BarChart2 className="h-6 w-6" />,
      path: '/app/progress',
    },
    {
      name: 'Tools',
      icon: <Wrench className="h-6 w-6" />,
      path: '/app/tools',
    },
    {
      name: 'More',
      icon: <Menu className="h-6 w-6" />,
      path: '/app/settings',
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full",
                isActive ? "text-fresh-500" : "text-gray-500"
              )}
              onClick={() => handleNavClick(isActive)}
            >
              <div className={cn(
                "transition-all",
                isActive ? "scale-110" : ""
              )}>
                {item.icon}
              </div>
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileAppNav;
