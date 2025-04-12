
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
import { Menu, User } from "lucide-react";
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

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        transparentAtTop && !scrolled 
          ? "bg-transparent" 
          : "bg-white/80 backdrop-blur-md border-b shadow-sm"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Fresh" className="h-8 w-8" />
            <span className={cn(
              "font-bold text-xl",
              transparentAtTop && !scrolled ? "text-white" : "text-black"
            )}>Fresh</span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            <Link 
              to="/smokeless" 
              className={cn(
                "text-sm font-medium hover:text-primary transition-colors", 
                transparentAtTop && !scrolled ? "text-white/90" : "text-gray-700"
              )}
            >
              Smokeless
            </Link>
            <Link 
              to="/nrt" 
              className={cn(
                "text-sm font-medium hover:text-primary transition-colors", 
                transparentAtTop && !scrolled ? "text-white/90" : "text-gray-700"
              )}
            >
              NRT
            </Link>
            <Link 
              to="/guides" 
              className={cn(
                "text-sm font-medium hover:text-primary transition-colors", 
                transparentAtTop && !scrolled ? "text-white/90" : "text-gray-700"
              )}
            >
              Guides
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "text-sm font-medium hover:text-primary transition-colors", 
                transparentAtTop && !scrolled ? "text-white/90" : "text-gray-700"
              )}
            >
              About
            </Link>
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
                  <Link to="/app">Dashboard</Link>
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
                  Login
                </Button>
              </Link>
              <Link to="/auth?mode=register" className="hidden sm:block">
                <Button 
                  size="sm" 
                  className={cn(
                    transparentAtTop && !scrolled 
                      ? "bg-white text-black hover:bg-white/90" 
                      : "bg-fresh-300 hover:bg-fresh-400 text-white"
                  )}
                >
                  Start Free
                </Button>
              </Link>
            </>
          )}
          
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
                <img src="/logo.svg" alt="Fresh" className="h-8 w-8" />
                <span className="font-bold text-xl">Fresh</span>
              </Link>
              <nav className="flex flex-col gap-4">
                <Link 
                  to="/smokeless" 
                  className="text-base font-medium hover:text-primary transition-colors"
                >
                  Smokeless
                </Link>
                <Link 
                  to="/nrt" 
                  className="text-base font-medium hover:text-primary transition-colors"
                >
                  NRT
                </Link>
                <Link 
                  to="/guides" 
                  className="text-base font-medium hover:text-primary transition-colors"
                >
                  Guides
                </Link>
                <Link 
                  to="/about" 
                  className="text-base font-medium hover:text-primary transition-colors"
                >
                  About
                </Link>
                
                {!isAuthenticated && (
                  <>
                    <div className="h-px bg-border my-2" />
                    <Link 
                      to="/auth?mode=login" 
                      className="text-base font-medium hover:text-primary transition-colors"
                    >
                      Log in
                    </Link>
                    <Link 
                      to="/auth?mode=register" 
                      className="text-base font-medium hover:text-primary transition-colors"
                    >
                      Sign up
                    </Link>
                  </>
                )}
                
                {isAuthenticated && (
                  <>
                    <div className="h-px bg-border my-2" />
                    <Link 
                      to="/app" 
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
