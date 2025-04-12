import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container py-12 md:py-16">
        {/* Adjusted grid for better distribution */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8"> 
          {/* Logo and Motto - Spanning 2 columns on medium screens */}
          <div className="col-span-2 space-y-4"> 
            <Link to="/" className="flex items-center gap-2">
              {/* Use logo image consistent with Navbar */}
              <img src="/logo.svg" alt="Mission Fresh Logo" className="h-8 w-8" /> 
              <span className="text-xl font-bold text-primary">Mission Fresh</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A Fresh World is Mission Possible! Supporting your journey to a nicotine-free life.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                {/* Link to landing page anchor */}
                <a href="/#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Web Tools Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Web Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tools/nrt-guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  NRT Guide
                </Link>
              </li>
              <li>
                <Link to="/tools/smokeless-directory" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Smokeless Directory
                </Link>
              </li>
              <li>
                <Link to="/tools/calculators" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Calculators
                </Link>
              </li>
              <li>
                <Link to="/tools/quit-methods" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Quit Methods
                </Link>
              </li>
              <li>
                <Link to="/tools/holistic-health" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Holistic Health
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Get the App - Moved to be part of the main grid */}
          {/* 
          <div className="md:col-start-5"> 
            <h3 className="font-semibold mb-4 text-foreground">Get the App</h3>
            <div className="flex flex-col space-y-3">
              <a href="#" target="_blank" rel="noopener noreferrer" className="inline-block" aria-label="Download on the App Store">
                <img src="/placeholder-app-store.svg" alt="App Store Badge" className="h-10"/> 
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="inline-block" aria-label="Get it on Google Play">
                <img src="/placeholder-google-play.svg" alt="Google Play Badge" className="h-10"/>
              </a>
            </div>
          </div>
          */}
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Mission Fresh. All rights reserved.
          </p>
          {/* App Store Badges - Moved here for better bottom alignment */}
           <div className="flex space-x-3 mt-4 md:mt-0">
              <a href="#" target="_blank" rel="noopener noreferrer" className="inline-block" aria-label="Download on the App Store">
                {/* Using placeholders - replace with actual images/links */}
                <img src="/placeholder-app-store.svg" alt="App Store Badge" className="h-10 opacity-70 hover:opacity-100 transition-opacity"/> 
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="inline-block" aria-label="Get it on Google Play">
                 {/* Using placeholders - replace with actual images/links */}
                <img src="/placeholder-google-play.svg" alt="Google Play Badge" className="h-10 opacity-70 hover:opacity-100 transition-opacity"/>
              </a>
            </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
