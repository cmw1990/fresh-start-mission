import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PublicLayout } from './components/layout/PublicLayout';
import { AppLayout } from './components/layout/AppLayout';
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

// Import our new tools
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

  return children;
}

function App() {
  const { initializeAuth } = useAuth();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  
  return (
    <Router>
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
        <Route path="/app/dashboard" element={
          <AuthGuard>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </AuthGuard>
        } />
        <Route path="/app/log" element={
          <AuthGuard>
            <AppLayout>
              <LogEntry />
            </AppLayout>
          </AuthGuard>
        } />
        <Route path="/app/goals" element={
          <AuthGuard>
            <AppLayout>
              <Goals />
            </AppLayout>
          </AuthGuard>
        } />
        <Route path="/app/rewards" element={
          <AuthGuard>
            <AppLayout>
              <Rewards />
            </AppLayout>
          </AuthGuard>
        } />
        <Route path="/app/profile" element={
          <AuthGuard>
            <AppLayout>
              <Profile />
            </AppLayout>
          </AuthGuard>
        } />
        <Route path="/app/settings" element={
          <AuthGuard>
            <AppLayout>
              <Settings />
            </AppLayout>
          </AuthGuard>
        } />
        
        {/* Add new routes for our tools */}
        <Route path="/app/tools/cravings" element={
          <AuthGuard>
            <AppLayout>
              <CravingTools />
            </AppLayout>
          </AuthGuard>
        } />
        <Route path="/app/tools/energy" element={
          <AuthGuard>
            <AppLayout>
              <EnergyTools />
            </AppLayout>
          </AuthGuard>
        } />
        <Route path="/app/tools/focus" element={
          <AuthGuard>
            <AppLayout>
              <FocusTools />
            </AppLayout>
          </AuthGuard>
        } />
        <Route path="/app/tools/mood" element={
          <AuthGuard>
            <AppLayout>
              <MoodTools />
            </AppLayout>
          </AuthGuard>
        } />
        <Route path="/app/progress/timeline" element={
          <AuthGuard>
            <AppLayout>
              <HealthTimeline />
            </AppLayout>
          </AuthGuard>
        } />
        
        {/* Default Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWrapper;
