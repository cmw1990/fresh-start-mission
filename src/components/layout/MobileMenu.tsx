
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const MobileMenu = () => {
  const { user, signOut } = useAuth();
  const isAuthenticated = !!user;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5 text-gray-700" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <Link to="/" className="flex items-center space-x-2 mb-8">
          <img src="/logo.svg" alt="Mission Fresh Logo" className="h-8 w-8" />
          <span className="font-bold text-xl">Mission Fresh</span>
        </Link>
        <nav className="flex flex-col gap-4">
          <a 
            href="/#how-it-works" 
            className="text-base font-medium hover:text-primary transition-colors"
          >
            How It Works
          </a>
          <a 
            href="/#features" 
            className="text-base font-medium hover:text-primary transition-colors"
          >
            Features
          </a>
          <span 
            className="text-base font-medium text-muted-foreground cursor-not-allowed"
            title="Coming Soon"
          >
            Pricing
          </span>

          <div className="h-px bg-border my-2" />
          <span className="text-sm font-medium text-muted-foreground px-2">Web Tools</span>
          <Link 
            to="/tools/nrt-guide" 
            className="text-base font-medium hover:text-primary transition-colors pl-4"
          >
            NRT Guide
          </Link>
          <Link 
            to="/tools/smokeless-directory" 
            className="text-base font-medium hover:text-primary transition-colors pl-4"
          >
            Smokeless Directory
          </Link>
          <Link 
            to="/tools/quit-methods" 
            className="text-base font-medium hover:text-primary transition-colors pl-4"
          >
            Quit Methods
          </Link>
          <Link 
            to="/tools/holistic-health" 
            className="text-base font-medium hover:text-primary transition-colors pl-4"
          >
            Holistic Health
          </Link>
          <Link 
            to="/tools/calculators" 
            className="text-base font-medium hover:text-primary transition-colors pl-4"
          >
            Calculators
          </Link>
          
          {!isAuthenticated && (
            <>
              <div className="h-px bg-border my-2" />
              <Link 
                to="/auth?mode=login" 
                className="text-base font-medium hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/auth?mode=register" 
                className="text-base font-medium hover:text-primary transition-colors"
              >
                Get Started
              </Link>
            </>
          )}
          
          {isAuthenticated && (
            <>
              <div className="h-px bg-border my-2" />
              <Link 
                to="/app/dashboard" 
                className="text-base font-medium hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                to="/app/settings" 
                className="text-base font-medium hover:text-primary transition-colors"
              >
                Settings
              </Link>
              <button 
                onClick={() => signOut()} 
                className="text-start text-base font-medium hover:text-primary transition-colors"
              >
                Log out
              </button>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
