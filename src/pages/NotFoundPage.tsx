
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center bg-background py-12 px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-fresh-50 mb-6">
            <AlertTriangle className="h-8 w-8 text-fresh-500" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            The page you're looking for doesn't seem to exist. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="default" className="bg-fresh-300 hover:bg-fresh-400">
                Return Home
              </Button>
            </Link>
            <Link to="/app/dashboard">
              <Button variant="outline">
                Go to Dashboard
              </Button>
            </Link>
            <Link to="/tools/nrt-guide">
              <Button variant="outline">
                Explore Tools
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFoundPage;
