
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Get user display name from user_metadata or email
  const userDisplayName = user?.user_metadata?.name || user?.email?.split('@')[0] || "Account";

  const closeSheet = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={closeSheet}>
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
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/how-it-works" className="text-sm font-medium story-link">
            How It Works
          </Link>
          <Link to="/features" className="text-sm font-medium story-link">
            Features
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium story-link flex items-center">
              Web Tools <ChevronDown className="h-4 w-4 ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/tools/nrt-guide">NRT Guide</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/tools/smokeless-directory">Smokeless Directory</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/tools/quit-methods">Quitting Methods</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/tools/calculators">Interactive Calculators</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {user ? (
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span>{userDisplayName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/app/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/app/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Link to="/auth" className="text-sm font-medium story-link">
                Sign In
              </Link>
              <Link to="/auth?tab=signup">
                <Button className="bg-fresh-300 hover:bg-fresh-400 text-white">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Nav */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link to="/how-it-works" className="text-lg font-medium" onClick={closeSheet}>
                How It Works
              </Link>
              <Link to="/features" className="text-lg font-medium" onClick={closeSheet}>
                Features
              </Link>
              <div className="space-y-3">
                <p className="text-lg font-medium">Web Tools</p>
                <div className="pl-4 flex flex-col gap-3">
                  <Link to="/tools/nrt-guide" className="text-base" onClick={closeSheet}>
                    NRT Guide
                  </Link>
                  <Link to="/tools/smokeless-directory" className="text-base" onClick={closeSheet}>
                    Smokeless Directory
                  </Link>
                  <Link to="/tools/quit-methods" className="text-base" onClick={closeSheet}>
                    Quitting Methods
                  </Link>
                  <Link to="/tools/calculators" className="text-base" onClick={closeSheet}>
                    Interactive Calculators
                  </Link>
                </div>
              </div>
              
              {user ? (
                <>
                  <Link to="/app/dashboard" className="text-lg font-medium" onClick={closeSheet}>
                    Dashboard
                  </Link>
                  <Link to="/app/settings" className="text-lg font-medium" onClick={closeSheet}>
                    Settings
                  </Link>
                  <Button 
                    variant="outline" 
                    className="mt-2 justify-start gap-2"
                    onClick={() => {
                      signOut();
                      closeSheet();
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth" className="text-lg font-medium" onClick={closeSheet}>
                    Sign In
                  </Link>
                  <Link to="/auth?tab=signup" onClick={closeSheet}>
                    <Button className="bg-fresh-300 hover:bg-fresh-400 text-white w-full mt-2">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
