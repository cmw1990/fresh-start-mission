
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileInput,
  LineChart,
  Settings,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const location = useLocation();
  const path = location.pathname;

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
      label: "Settings",
      href: "/app/settings",
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50">
      <nav className="flex items-center justify-around py-2">
        {navItems.map((item, index) => (
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
        ))}
      </nav>
    </div>
  );
};

export default MobileNav;
