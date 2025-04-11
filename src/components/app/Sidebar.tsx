
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileInput,
  Target,
  LineChart,
  Flame,
  BatteryCharging,
  Sparkles,
  Brain,
  Award,
  Droplets,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  active?: boolean;
}

const SidebarLink = ({ href, icon, title, active }: SidebarLinkProps) => {
  return (
    <Link to={href} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2",
          active
            ? "bg-fresh-100 text-fresh-500 hover:bg-fresh-100 hover:text-fresh-500"
            : "text-muted-foreground hover:bg-background hover:text-foreground"
        )}
      >
        {icon}
        <span>{title}</span>
      </Button>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 border-r bg-background">
      <div className="flex items-center gap-2 p-6">
        <div className="rounded-full bg-fresh-300 p-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-white"
          >
            <path d="M18 16.98h-5.99c-1.66 0-3.01-1.34-3.01-3s1.34-3 3.01-3H18" />
            <path d="M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10z" />
          </svg>
        </div>
        <span className="text-xl font-bold text-fresh-600">Mission Fresh</span>
      </div>

      <div className="flex-1 overflow-auto py-4 px-3">
        <nav className="space-y-1">
          <SidebarLink
            href="/app/dashboard"
            icon={<LayoutDashboard size={20} />}
            title="Dashboard"
            active={path === "/app/dashboard"}
          />
          <SidebarLink
            href="/app/log"
            icon={<FileInput size={20} />}
            title="Log Entry"
            active={path === "/app/log"}
          />
          <SidebarLink
            href="/app/goals"
            icon={<Target size={20} />}
            title="Goals"
            active={path === "/app/goals"}
          />
          <SidebarLink
            href="/app/progress"
            icon={<LineChart size={20} />}
            title="Progress"
            active={path === "/app/progress"}
          />

          <div className="pt-4 pb-2">
            <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Support Tools
            </p>
          </div>

          <SidebarLink
            href="/app/tools/cravings"
            icon={<Flame size={20} />}
            title="Craving Tools"
            active={path === "/app/tools/cravings"}
          />
          <SidebarLink
            href="/app/tools/energy"
            icon={<BatteryCharging size={20} />}
            title="Energy Tools"
            active={path === "/app/tools/energy"}
          />
          <SidebarLink
            href="/app/tools/mood"
            icon={<Sparkles size={20} />}
            title="Mood Tools"
            active={path === "/app/tools/mood"}
          />
          <SidebarLink
            href="/app/tools/focus"
            icon={<Brain size={20} />}
            title="Focus Tools"
            active={path === "/app/tools/focus"}
          />

          <div className="pt-4 pb-2">
            <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              More
            </p>
          </div>

          <SidebarLink
            href="/app/rewards"
            icon={<Award size={20} />}
            title="Step Rewards"
            active={path === "/app/rewards"}
          />
          <SidebarLink
            href="/tools/smokeless-directory"
            icon={<Droplets size={20} />}
            title="Smokeless Directory"
            active={path === "/tools/smokeless-directory"}
          />
          <SidebarLink
            href="/app/settings"
            icon={<Settings size={20} />}
            title="Settings"
            active={path === "/app/settings"}
          />
        </nav>
      </div>

      <div className="p-4 border-t">
        <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Log Out</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
