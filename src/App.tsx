
import React, { useEffect } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { PublicLayout } from './components/layout/PublicLayout';
import AppLayout from './components/layout/AppLayout'; 
import LandingPage from './pages/LandingPage';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import Profile from './pages/app/Profile';
import Settings from './pages/app/Settings';
import Dashboard from './pages/app/Dashboard';
import LogEntry from './pages/app/LogEntry';
import Goals from './pages/app/Goals';
import Rewards from './pages/app/Rewards';
import WebToolsIndex from './pages/tools/WebToolsIndex';
import NRTGuide from './pages/tools/NRTGuide';
import SmokelessDirectory from './pages/tools/SmokelessDirectory';
import ProductDetails from './pages/tools/ProductDetails';
import QuitMethods from './pages/tools/QuitMethods';
import Calculators from './pages/tools/Calculators';
import HolisticHealth from './pages/tools/HolisticHealth';

// Import our tools
import CravingTools from "./pages/app/tools/CravingTools";
import EnergyTools from "./pages/app/tools/EnergyTools";
import FocusTools from "./pages/app/tools/FocusTools";
import MoodTools from "./pages/app/tools/MoodTools";
import HealthTimeline from "./pages/app/progress/HealthTimeline";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  useEffect(() => {
    // This effect will only run on the client-side
    if (!loading && !user) {
      console.log('No user found, redirecting to login');
    }
  }, [user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function App() {
  const { initializeAuth } = useAuth();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
      <Route path="/sign-up" element={<PublicLayout><SignUp /></PublicLayout>} />
      <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
      <Route path="/forgot-password" element={<PublicLayout><ForgotPassword /></PublicLayout>} />
      
      {/* Web Tools Routes */}
      <Route path="/tools" element={<PublicLayout><WebToolsIndex /></PublicLayout>} />
      <Route path="/tools/nrt-guide" element={<PublicLayout><NRTGuide /></PublicLayout>} />
      <Route path="/tools/smokeless-directory" element={<PublicLayout><SmokelessDirectory /></PublicLayout>} />
      <Route path="/tools/smokeless-directory/:id" element={<PublicLayout><ProductDetails /></PublicLayout>} />
      <Route path="/tools/quit-methods" element={<PublicLayout><QuitMethods /></PublicLayout>} />
      <Route path="/tools/calculators" element={<PublicLayout><Calculators /></PublicLayout>} />
      <Route path="/tools/holistic-health" element={<PublicLayout><HolisticHealth /></PublicLayout>} />

      {/* App Routes - Protected */}
      <Route 
        path="/app" 
        element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="log" element={<LogEntry />} />
        <Route path="goals" element={<Goals />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        
        {/* Tools routes */}
        <Route path="tools/cravings" element={<CravingTools />} />
        <Route path="tools/energy" element={<EnergyTools />} />
        <Route path="tools/focus" element={<FocusTools />} />
        <Route path="tools/mood" element={<MoodTools />} />
        <Route path="progress/timeline" element={<HealthTimeline />} />
      </Route>
      
      {/* Default Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

// Export directly without wrapping in Router
export default App;
