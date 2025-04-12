import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  transparentAtTop?: boolean;
}

const Navbar = ({ transparentAtTop = false }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const isAuthenticated = !!user;

  // Handle scroll effect
  React.useEffect(() => {
    if (!transparentAtTop) return;
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparentAtTop]);
  
  const getDisplayName = () => {
    if (user?.user_metadata?.name) {
      return user.user_metadata.name;
    }
    
    return user?.email?.split('@')[0] || 'User';
  };

  const getInitials = () => {
    if (user?.user_metadata?.name) {
      return user.user_metadata.name.charAt(0).toUpperCase();
    }
    
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  // TODO: Revisit anchor links (#how-it-works, #features) if these become separate pages.
  // Currently assuming they are sections on the LandingPage as per t1.md.

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        transparentAtTop && !scrolled 
          ? "bg-transparent" 
          : "bg-white/80 backdrop-blur-md border-b shadow-sm"
      )}
    >
      <div className={cn(
        "container flex h-16 items-center justify-between",
        !(transparentAtTop && !scrolled) && "border-b" // Add border only when not transparent
      )}>
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            {/* Assuming logo.svg is in public folder */}
            <img src="/logo.svg" alt="Mission Fresh Logo" className="h-8 w-8" /> 
            <span className={cn(
              "font-bold text-xl",
              transparentAtTop && !scrolled ? "text-white" : "text-gray-900"
            )}>Mission Fresh</span>
          </Link>
          
          <nav className="hidden md:flex gap-6 items-center">
            <a 
              href="/#how-it-works" // Ensure it links to landing page section
              className={cn(
                "text-sm font-medium hover:text-primary transition-colors", 
                transparentAtTop && !scrolled ? "text-white/90 hover:text-white" : "text-gray-700"
              )}
            >
              How It Works
            </a>
            <a 
              href="/#features" // Ensure it links to landing page section
              className={cn(
                "text-sm font-medium hover:text-primary transition-colors", 
                transparentAtTop && !scrolled ? "text-white/90 hover:text-white" : "text-gray-700"
              )}
            >
              Features
            </a>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className={cn(
                    "flex items-center text-sm font-medium hover:text-primary transition-colors outline-none", 
                    transparentAtTop && !scrolled ? "text-white/90 hover:text-white" : "text-gray-700"
                  )}
                >
                  Web Tools <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link to="/tools/nrt-guide">NRT Guide</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/tools/smokeless-directory">Smokeless Directory</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/tools/quit-methods">Quit Methods</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/tools/holistic-health">Holistic Health</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/tools/calculators">Calculators</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Pricing Link (Future) - Placeholder */}
            <span 
              className={cn(
                "text-sm font-medium transition-colors cursor-not-allowed", 
                transparentAtTop && !scrolled ? "text-white/50" : "text-gray-400"
              )}
              title="Coming Soon"
            >
              Pricing
            </span>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.user_metadata?.avatar_url} alt={getDisplayName()} />
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{getDisplayName()}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/app/dashboard">Dashboard</Link> {/* Updated link */}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => signOut()}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/auth?mode=login">
                <Button 
                  variant={transparentAtTop && !scrolled ? "outline" : "ghost"} 
                  size="sm" 
                  className={cn(
                    transparentAtTop && !scrolled 
                      ? "text-white border-white hover:text-white hover:bg-white/20" 
                      : ""
                  )}
                >
                  Sign In {/* Updated Text */}
                </Button>
              </Link>
              <Link to="/auth?mode=register" className="hidden sm:block">
                <Button 
                  size="sm" 
                  className={cn(
                    transparentAtTop && !scrolled 
                      ? "bg-white text-black hover:bg-white/90" 
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  )}
                >
                  Get Started
                </Button>
              </Link>
            </>
          )}
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                aria-label="Menu"
              >
                <Menu className={cn(
                  "h-5 w-5", 
                  transparentAtTop && !scrolled ? "text-white" : ""
                )} />
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
                {/* Pricing Link (Future) - Placeholder */}
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
                      Sign In {/* Updated Text */}
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
                      to="/app/dashboard" // Updated link
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
        </div>
      </div>
    </header>
  );
};

export default Navbar;
