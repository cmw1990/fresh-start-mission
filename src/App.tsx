import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { Toaster } from 'sonner';

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
      <Toaster richColors position="top-right" closeButton />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Web tools - public access */}
          <Route path="/tools" element={<WebToolsLayout />}>
            <Route index element={<WebToolsIndex />} />
            <Route path="nrt-guide" element={<NRTGuide />} />
            <Route path="smokeless-directory" element={<SmokelessDirectory />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="quit-methods" element={<QuitMethods />} />
            <Route path="calculators" element={<CalculatorsPage />} />
            <Route path="holistic-health" element={<HolisticHealth />} />
          </Route>
          
          {/* App routes - protected */}
          <Route path="/app" element={<AuthGuard><AppLayout /></AuthGuard>}>
            <Route index element={<Dashboard />} />
            <Route path="log" element={<LogEntry />} />
            <Route path="goals" element={<Goals />} />
            <Route path="progress" element={<Progress />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="step-rewards" element={<StepRewards />} />
            
            {/* Support tools */}
            <Route path="tools/craving" element={<CravingTools />} />
            <Route path="tools/energy" element={<EnergyTools />} />
            <Route path="tools/mood" element={<MoodTools />} />
            <Route path="tools/focus" element={<FocusTools />} />
          </Route>
          
          {/* Catch-all route for 404s */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
