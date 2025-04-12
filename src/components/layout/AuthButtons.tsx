
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AuthButtons = () => {
  const handleGetStarted = () => {
    toast.info("Let's get started on your fresh journey!", {
      description: "Create an account to track your progress and access all features.",
    });
  };

  return (
    <>
      <Link to="/auth?mode=login">
        <Button 
          variant="ghost" 
          size="sm"
        >
          Sign In
        </Button>
      </Link>
      <Link to="/auth?mode=register" className="hidden sm:block" onClick={handleGetStarted}>
        <Button 
          size="sm" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Get Started
        </Button>
      </Link>
    </>
  );
};

export default AuthButtons;
