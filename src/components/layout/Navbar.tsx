
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <Link to="/tools" className="text-sm font-medium story-link">
            Web Tools
          </Link>
          <Link to="/app/dashboard" className="text-sm font-medium story-link">
            Sign In
          </Link>
          <Link to="/sign-up">
            <Button className="bg-fresh-300 hover:bg-fresh-400 text-white">
              Get Started
            </Button>
          </Link>
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
              <Link to="/tools" className="text-lg font-medium" onClick={closeSheet}>
                Web Tools
              </Link>
              <Link to="/app/dashboard" className="text-lg font-medium" onClick={closeSheet}>
                Sign In
              </Link>
              <Link to="/sign-up" onClick={closeSheet}>
                <Button className="bg-fresh-300 hover:bg-fresh-400 text-white w-full mt-2">
                  Get Started
                </Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
