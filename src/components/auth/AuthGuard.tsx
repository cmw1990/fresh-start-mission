
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
        <div className="h-12 w-12 border-4 border-fresh-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Only render children if authenticated
  return user ? <>{children}</> : null;
};

export default AuthGuard;
