
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileInput,
  LineChart,
  Settings,
  Zap,
  LogOut,
  Footprints
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

const MobileNav = () => {
  const location = useLocation();
  const path = location.pathname;
  const { signOut } = useAuth();
  const [isNativeApp, setIsNativeApp] = useState(false);

  useEffect(() => {
    // Check if running in a Capacitor native environment
    const checkPlatform = async () => {
      try {
        // In a real implementation, we would check Capacitor.isNativePlatform()
        const userAgent = navigator.userAgent.toLowerCase();
        setIsNativeApp(userAgent.includes('android') || userAgent.includes('ios'));
      } catch (error) {
        console.log('Running in web environment');
      }
    };
    
    checkPlatform();
  }, []);

  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      href: "/app/dashboard",
    },
    {
      icon: <FileInput size={20} />,
      label: "Log",
      href: "/app/log",
    },
    {
      icon: <LineChart size={20} />,
      label: "Progress",
      href: "/app/progress",
    },
    {
      icon: <Zap size={20} />,
      label: "Tools",
      href: "/app/tools/cravings",
      dropdown: true,
      subItems: [
        { label: "Cravings", href: "/app/tools/cravings" },
        { label: "Energy", href: "/app/tools/energy" },
        { label: "Mood", href: "/app/tools/mood" },
        { label: "Focus", href: "/app/tools/focus" }
      ]
    },
    {
      icon: isNativeApp ? <Footprints size={20} /> : <Settings size={20} />,
      label: isNativeApp ? "Steps" : "More",
      href: isNativeApp ? "/app/rewards" : "/app/settings",
      dropdown: !isNativeApp
    },
  ];

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50 safe-area-padding">
      <nav className="flex items-center justify-around py-2">
        {navItems.map((item, index) => (
          item.dropdown ? (
            <DropdownMenu key={index}>
              <DropdownMenuTrigger className="flex flex-col items-center px-3 py-1">
                <div
                  className={cn(
                    "p-1 rounded-full",
                    path === item.href || (item.subItems && item.subItems.some(subItem => path === subItem.href))
                      ? "text-fresh-500"
                      : "text-muted-foreground"
                  )}
                >
                  {item.icon}
                </div>
                <span
                  className={cn(
                    "text-xs mt-1",
                    path === item.href || (item.subItems && item.subItems.some(subItem => path === subItem.href))
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {item.subItems ? (
                  item.subItems.map((subItem, subIndex) => (
                    <DropdownMenuItem key={subIndex} asChild>
                      <Link to={subItem.href} className="w-full">
                        {subItem.label}
                      </Link>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/app/rewards" className="w-full">
                        Step Rewards
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tools/smokeless-directory" className="w-full">
                        Smokeless Directory
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/app/settings" className="w-full">
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              key={index}
              to={item.href}
              className="flex flex-col items-center px-3 py-1"
            >
              <div
                className={cn(
                  "p-1 rounded-full",
                  path === item.href
                    ? "text-fresh-500"
                    : "text-muted-foreground"
                )}
              >
                {item.icon}
              </div>
              <span
                className={cn(
                  "text-xs mt-1",
                  path === item.href
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        ))}
      </nav>
    </div>
  );
};

export default MobileNav;
