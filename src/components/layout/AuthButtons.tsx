
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AuthButtons = () => {
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
      <Link to="/auth?mode=register" className="hidden sm:block">
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
