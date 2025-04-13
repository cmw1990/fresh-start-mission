
import { NavLink, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  BarChart3Icon, 
  UserIcon, 
  Settings2Icon, 
  Target, 
  CalendarCheck, 
  ListTodo, 
  Wind, 
  Battery, 
  Brain,
  Heart,
  Footprints
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '../ui/button';

type SidebarProps = {
  isMobile?: boolean;
  onItemClick?: () => void;
};

const Sidebar = ({ isMobile = false, onItemClick }: SidebarProps) => {
  const { user } = useAuth();
  const location = useLocation();
  
  const navItems = [
    {
      title: 'Dashboard',
      href: '/app/dashboard',
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      title: 'Log Entry',
      href: '/app/log',
      icon: <CalendarCheck className="h-5 w-5" />,
    },
    {
      title: 'Goals',
      href: '/app/goals',
      icon: <Target className="h-5 w-5" />,
    },
    {
      title: 'Progress',
      href: '/app/progress',
      icon: <BarChart3Icon className="h-5 w-5" />,
      submenu: [
        {
          title: 'Health Timeline',
          href: '/app/progress/timeline',
          icon: <CalendarCheck className="h-4 w-4" />,
        },
      ]
    },
    {
      title: 'Support Tools',
      href: '#',
      icon: <ListTodo className="h-5 w-5" />,
      submenu: [
        {
          title: 'Craving Tools',
          href: '/app/tools/cravings',
          icon: <Wind className="h-4 w-4" />,
        },
        {
          title: 'Energy Tools',
          href: '/app/tools/energy',
          icon: <Battery className="h-4 w-4" />,
        },
        {
          title: 'Focus Tools',
          href: '/app/tools/focus',
          icon: <Brain className="h-4 w-4" />,
        },
        {
          title: 'Mood Tools',
          href: '/app/tools/mood',
          icon: <Heart className="h-4 w-4" />,
        },
      ]
    },
    {
      title: 'Step Rewards',
      href: '/app/rewards',
      icon: <Footprints className="h-5 w-5" />,
    },
    {
      title: 'Profile',
      href: '/app/profile',
      icon: <UserIcon className="h-5 w-5" />,
    },
    {
      title: 'Settings',
      href: '/app/settings',
      icon: <Settings2Icon className="h-5 w-5" />,
    },
  ];

  return (
    <div className={cn(
      "flex flex-col h-full bg-background border-r",
      isMobile ? "py-2" : "py-6 w-64"
    )}>
      {!isMobile && (
        <div className="px-6 mb-6">
          <h1 className="text-xl font-bold">Mission Fresh</h1>
        </div>
      )}
      <nav className="space-y-1 px-2 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.href !== '#' ? location.pathname === item.href : 
                          item.submenu?.some(subitem => location.pathname === subitem.href);
          
          if (item.submenu) {
            const isExpanded = item.submenu.some(subitem => location.pathname === subitem.href);
            
            return (
              <div key={item.title} className="space-y-1">
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive ? "bg-muted font-medium" : ""
                  )}
                >
                  {item.icon}
                  {!isMobile && <span className="ml-3">{item.title}</span>}
                </Button>
                
                <div className={cn("space-y-1 ml-6", isExpanded ? "block" : "block")}>
                  {item.submenu.map(subitem => (
                    <NavLink
                      key={subitem.href}
                      to={subitem.href}
                      onClick={onItemClick}
                      className={({ isActive }) => cn(
                        "flex items-center px-3 py-2 text-sm rounded-md",
                        isActive 
                          ? "bg-primary/10 text-primary font-medium" 
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      {subitem.icon}
                      {!isMobile && <span className="ml-3">{subitem.title}</span>}
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          }
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onItemClick}
              className={({ isActive }) => cn(
                "flex items-center px-3 py-2 rounded-md",
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {item.icon}
              {!isMobile && <span className="ml-3">{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>
      
      {!isMobile && user && (
        <div className="p-4 border-t mt-auto">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary/10 text-primary flex items-center justify-center rounded-full">
              {user.email?.[0].toUpperCase() || 'U'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
