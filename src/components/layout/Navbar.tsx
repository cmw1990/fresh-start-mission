
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import NavbarBrand from "./NavbarBrand";
import WebToolsDropdown from "./WebToolsDropdown";
import UserMenu from "./UserMenu";
import AuthButtons from "./AuthButtons";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  transparentAtTop?: boolean;
}

const Navbar = ({ transparentAtTop = false }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
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

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        transparentAtTop && !scrolled 
          ? "bg-white/80 backdrop-blur-md" // Changed from bg-white/95 to bg-white/80 for better visibility
          : "bg-white/80 backdrop-blur-md border-b shadow-sm"
      )}
    >
      <div className={cn(
        "container flex h-16 items-center justify-between",
        !(transparentAtTop && !scrolled) && "border-b"
      )}>
        <div className="flex items-center gap-6">
          <NavbarBrand />
          
          <nav className="hidden md:flex gap-6 items-center">
            <a 
              href="/#how-it-works"
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              How It Works
            </a>
            <a 
              href="/#features"
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              Features
            </a>
            
            <WebToolsDropdown />

            <span 
              className="text-sm font-medium text-gray-400 transition-colors cursor-not-allowed"
              title="Coming Soon"
            >
              Pricing
            </span>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? <UserMenu /> : <AuthButtons />}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
