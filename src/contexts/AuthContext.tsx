import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Define the User type with user_metadata
type User = {
  id: string;
  email: string;
  created_at: string;
  user_metadata?: {
    name?: string;
    avatar_url?: string;
  };
} | null;

// Define the AuthState type
type AuthState = {
  user: User;
  loading: boolean;
  error: string | null;
};

// Define action types
type AuthAction =
  | { type: 'AUTH_INIT' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_RESET' };

// Initial state
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Create context
const AuthContext = createContext<{
  user: User;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  initializeAuth: () => Promise<void>;
}>({
  ...initialState,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
  initializeAuth: async () => {},
});

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_INIT':
      return { ...state, loading: true, error: null };
    case 'AUTH_SUCCESS':
      return { user: action.payload, loading: false, error: null };
    case 'AUTH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'AUTH_RESET':
      return initialState;
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  // Initialize authentication state
  const initializeAuth = useCallback(async () => {
    try {
      dispatch({ type: 'AUTH_INIT' });
      
      // Check if user is already logged in
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        dispatch({ type: 'AUTH_SUCCESS', payload: session.user as User });
      } else {
        dispatch({ type: 'AUTH_SUCCESS', payload: null });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      dispatch({ type: 'AUTH_FAILURE', payload: 'Authentication failed to initialize' });
    }
  }, []);

  // Sign up function
  const signUp = useCallback(async (email: string, password: string) => {
    try {
      dispatch({ type: 'AUTH_INIT' });
      
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) throw error;
      
      if (data.session) {
        dispatch({ type: 'AUTH_SUCCESS', payload: data.user as User });
        toast.success("Account created successfully! Please check your email for verification.");
        navigate('/app/dashboard');
      } else {
        // Email confirmation required
        toast.info("Please check your email to confirm your account.");
        dispatch({ type: 'AUTH_SUCCESS', payload: null });
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error(error.message || 'Failed to create account');
      dispatch({ type: 'AUTH_FAILURE', payload: error.message || 'Failed to create account' });
    }
  }, [navigate]);

  // Sign in function
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      dispatch({ type: 'AUTH_INIT' });
      
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      dispatch({ type: 'AUTH_SUCCESS', payload: data.user as User });
      toast.success("Signed in successfully!");
      navigate('/app/dashboard');
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast.error(error.message || 'Failed to sign in');
      dispatch({ type: 'AUTH_FAILURE', payload: error.message || 'Failed to sign in' });
    }
  }, [navigate]);

  // Sign out function
  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      dispatch({ type: 'AUTH_RESET' });
      toast.info("Signed out successfully");
      navigate('/login');
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast.error(error.message || 'Failed to sign out');
    }
  }, [navigate]);

  // Reset password function
  const resetPassword = useCallback(async (email: string) => {
    try {
      dispatch({ type: 'AUTH_INIT' });
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast.success("Password reset email sent!");
      dispatch({ type: 'AUTH_SUCCESS', payload: null });
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast.error(error.message || 'Failed to send password reset email');
      dispatch({ type: 'AUTH_FAILURE', payload: error.message || 'Failed to send password reset email' });
    }
  }, []);

  // Setup auth listener for changes
  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          dispatch({ type: 'AUTH_SUCCESS', payload: session.user as User });
        } else if (event === 'SIGNED_OUT') {
          dispatch({ type: 'AUTH_RESET' });
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Create memoized context value
  const value = useMemo(
    () => ({
      user: state.user,
      loading: state.loading,
      error: state.error,
      signUp,
      signIn,
      signOut,
      resetPassword,
      initializeAuth,
    }),
    [state, signUp, signIn, signOut, resetPassword, initializeAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
