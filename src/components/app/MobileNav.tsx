
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileInput,
  LineChart,
  Settings,
  Zap,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const MobileNav = () => {
  const location = useLocation();
  const path = location.pathname;
  const { signOut } = useAuth();

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
    },
    {
      icon: <Settings size={20} />,
      label: "More",
      href: "/app/settings",
      dropdown: true
    },
  ];

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50">
      <nav className="flex items-center justify-around py-2">
        {navItems.map((item, index) => (
          item.dropdown ? (
            <DropdownMenu key={index}>
              <DropdownMenuTrigger className="flex flex-col items-center px-3 py-1">
                <div
                  className={cn(
                    "p-1 rounded-full",
                    path === item.href
                      ? "text-fresh-300"
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
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
                    ? "text-fresh-300"
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
