
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-5xl font-bold text-fresh-500 mb-6">404</h1>
          <div className="rounded-full w-24 h-24 bg-fresh-100 mx-auto flex items-center justify-center mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-fresh-500"
            >
              <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            <Button 
              asChild 
              className="bg-fresh-300 hover:bg-fresh-400"
            >
              <Link to="/">Return to Home</Link>
            </Button>
            <Button 
              asChild 
              variant="outline"
            >
              <Link to="/app/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
