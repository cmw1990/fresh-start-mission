
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-fresh-300"></div>
      </div>
    );
  }
  
  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // Render children if authenticated
  return <>{children}</>;
};

export default AuthGuard;
