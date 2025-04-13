
import React from "react";
import { Link } from "react-router-dom";
import NavbarBrand from "./NavbarBrand";
import { Twitter, Instagram, Facebook, Youtube, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <NavbarBrand />
            <p className="mt-4 text-sm text-muted-foreground">
              A comprehensive wellness ecosystem supporting your journey to reduce or quit nicotine use.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">YouTube</span>
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Web Tools</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tools/nrt-guide" className="text-muted-foreground hover:text-fresh-600">NRT Guide</Link></li>
              <li><Link to="/tools/smokeless-directory" className="text-muted-foreground hover:text-fresh-600">Smokeless Directory</Link></li>
              <li><Link to="/tools/quit-methods" className="text-muted-foreground hover:text-fresh-600">Quit Methods</Link></li>
              <li><Link to="/tools/calculators" className="text-muted-foreground hover:text-fresh-600">Calculators</Link></li>
              <li><Link to="/tools/holistic-health" className="text-muted-foreground hover:text-fresh-600">Holistic Health</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-fresh-600">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-fresh-600">Contact</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-fresh-600">Careers</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-fresh-600">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="text-muted-foreground hover:text-fresh-600">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-fresh-600">Privacy Policy</Link></li>
              <li><Link to="/cookie-policy" className="text-muted-foreground hover:text-fresh-600">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; {currentYear} Mission Fresh. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="mailto:support@missionfresh.com" className="flex items-center hover:text-fresh-600">
              <Mail size={16} className="mr-2" />
              support@missionfresh.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
