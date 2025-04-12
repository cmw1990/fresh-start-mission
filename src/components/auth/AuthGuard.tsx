
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login page and save the intended destination
      navigate('/auth', { state: { from: location.pathname } });
    }
  }, [user, loading, navigate, location]);

  // Show loading state if still checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-12 border-4 border-fresh-300 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-fresh-500 font-medium">Loading your journey...</p>
        </div>
      </div>
    );
  }

  // Only render children if authenticated
  return user ? <>{children}</> : null;
};

export default AuthGuard;
