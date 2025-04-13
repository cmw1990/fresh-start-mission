
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ClipboardList,
  Target,
  BarChart,
  Wrench,
  Wind,
  Zap,
  Smile,
  Settings,
  Footprints,
  Users,
  Activity
} from 'lucide-react';

interface MenuItem {
  path?: string;
  label: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth(); // Changed from 'logout' to 'signOut' to match AuthContext
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await signOut(); // Changed from 'logout' to 'signOut' here too
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuItems = [
    { path: '/app/dashboard', icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard' },
    { path: '/app/log', icon: <ClipboardList className="h-5 w-5" />, label: 'Log Entry' },
    { path: '/app/goals', icon: <Target className="h-5 w-5" />, label: 'Goals' },
    { path: '/app/progress', icon: <BarChart className="h-5 w-5" />, label: 'Progress' },
    { 
      label: 'Support Tools',
      icon: <Wrench className="h-5 w-5" />,
      children: [
        { path: '/app/tools/cravings', icon: <Wind className="h-5 w-5" />, label: 'Craving Tools' },
        { path: '/app/tools/energy', icon: <Zap className="h-5 w-5" />, label: 'Energy Tools' },
        { path: '/app/tools/mood', icon: <Smile className="h-5 w-5" />, label: 'Mood Tools' },
        { path: '/app/tools/focus', icon: <Target className="h-5 w-5" />, label: 'Focus Tools' },
      ]
    },
    { path: '/app/step-rewards', icon: <Footprints className="h-5 w-5" />, label: 'Step Rewards' },
    { path: '/app/community', icon: <Users className="h-5 w-5" />, label: 'Community' },
    { path: '/app/health-integrations', icon: <Activity className="h-5 w-5" />, label: 'Health' },
    { path: '/app/settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="absolute left-4 top-4 rounded-full lg:hidden">
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-64">
        <SheetHeader className="text-left">
          <SheetTitle>Mission Fresh</SheetTitle>
          <SheetDescription>
            Navigate your journey
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <div className="flex flex-col space-y-2.5">
          {menuItems.map((item, index) => (
            item.path ? (
              <Button
                key={index}
                variant="ghost"
                className={cn(
                  "justify-start px-4",
                  isActive(item.path) ? "font-semibold" : "font-normal"
                )}
                onClick={() => {
                  navigate(item.path);
                  setOpen(false); // Close sidebar on navigation
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </Button>
            ) : (
              <Accordion type="single" collapsible key={index}>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="px-4">{item.label}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2">
                      {item.children?.map((child, childIndex) => (
                        <Button
                          key={childIndex}
                          variant="ghost"
                          className={cn(
                            "justify-start pl-8",
                            isActive(child.path || '') ? "font-semibold" : "font-normal"
                          )}
                          onClick={() => {
                            if (child.path) {
                              navigate(child.path);
                              setOpen(false); // Close sidebar on navigation
                            }
                          }}
                        >
                          {child.icon}
                          <span>{child.label}</span>
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          ))}
        </div>
        <Separator className="my-4" />
        <Button variant="destructive" onClick={handleLogout} className="w-full">
          Log Out
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
