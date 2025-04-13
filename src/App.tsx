
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/app/Dashboard';
import LogEntry from './pages/app/LogEntry';
import Goals from './pages/app/Goals';
import Progress from './pages/app/Progress';
import Settings from './pages/app/Settings';
import NotFoundPage from './pages/NotFoundPage';
import AuthGuard from './components/auth/AuthGuard';
import WebToolsLayout from './components/layout/WebToolsLayout';
import WebToolsIndex from './pages/tools/WebToolsIndex';
import NRTGuide from './pages/tools/NRTGuide';
import SmokelessDirectory from './pages/tools/SmokelessDirectory';
import ProductDetails from './pages/tools/ProductDetails';
import QuitMethods from './pages/tools/QuitMethods';
import CalculatorsPage from './pages/tools/CalculatorsPage';
import HolisticHealth from './pages/tools/HolisticHealth';
import CravingTools from './pages/app/tools/CravingTools';
import EnergyTools from './pages/app/tools/EnergyTools';
import MoodTools from './pages/app/tools/MoodTools';
import FocusTools from './pages/app/tools/FocusTools';
import AppLayout from './components/layout/AppLayout';
import StepRewards from './pages/app/StepRewards';
import Profile from './pages/app/Profile';
import Community from './pages/app/Community';
import HealthIntegrations from './pages/app/HealthIntegrations';
import { ToastProvider } from './components/ui/toast-provider';
import SplashScreen from './components/app/SplashScreen';

function App() {
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setIsSplashScreenVisible(false);
    }, 2000);

    return () => clearTimeout(splashTimeout);
  }, []);

  return (
    <div className="App">
      {isSplashScreenVisible && <SplashScreen />}
      <ToastProvider />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        
        <Route path="/tools" element={<WebToolsLayout />}>
          <Route index element={<WebToolsIndex />} />
          <Route path="nrt-guide" element={<NRTGuide />} />
          <Route path="smokeless-directory" element={<SmokelessDirectory />} />
          <Route path="smokeless-directory/:id" element={<ProductDetails />} />
          <Route path="quit-methods" element={<QuitMethods />} />
          <Route path="calculators" element={<CalculatorsPage />} />
          <Route path="holistic-health" element={<HolisticHealth />} />
        </Route>
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route path="/app" element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="log" element={<LogEntry />} />
          <Route path="goals" element={<Goals />} />
          <Route path="progress" element={<Progress />} />
          <Route path="step-rewards" element={<StepRewards />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="community" element={<Community />} />
          <Route path="health-integrations" element={<HealthIntegrations />} />
          
          <Route path="tools">
            <Route path="cravings" element={<CravingTools />} />
            <Route path="energy" element={<EnergyTools />} />
            <Route path="mood" element={<MoodTools />} />
            <Route path="focus" element={<FocusTools />} />
          </Route>
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
