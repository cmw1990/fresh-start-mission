
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";

// Landing pages and web tools (public)
import LandingPage from "@/pages/LandingPage";
import AuthPage from "@/pages/AuthPage";
import WebToolsLayout from "@/components/layout/WebToolsLayout";
import NRTGuide from "@/pages/tools/NRTGuide";
import SmokelessDirectory from "@/pages/tools/SmokelessDirectory";
import QuitMethods from "@/pages/tools/QuitMethods";
import CalculatorsPage from "@/pages/tools/CalculatorsPage";
import HolisticHealth from "@/pages/tools/HolisticHealth";
import ProductDetails from "@/pages/tools/ProductDetails";
import HowItWorks from "@/pages/HowItWorks";
import Features from "@/pages/Features";

// App pages (authenticated)
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/app/Dashboard";
import LogEntry from "@/pages/app/LogEntry";
import Goals from "@/pages/app/Goals";
import ProgressPage from "@/pages/app/Progress";
import StepRewards from "@/pages/app/StepRewards";
import Settings from "@/pages/app/Settings";

// App tool pages (authenticated)
import CravingTools from "@/pages/app/tools/CravingTools";
import EnergyTools from "@/pages/app/tools/EnergyTools";
import MoodTools from "@/pages/app/tools/MoodTools";
import FocusTools from "@/pages/app/tools/FocusTools";

// Auth guard for protected routes
import AuthGuard from "@/components/auth/AuthGuard";
import NotFoundPage from "@/pages/NotFoundPage";

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" richColors />
      
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/sign-up" element={<AuthPage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/features" element={<Features />} />
        
        {/* Public web tools routes */}
        <Route path="/tools" element={<WebToolsLayout />}>
          <Route index element={<NRTGuide />} />
          <Route path="nrt-guide" element={<NRTGuide />} />
          <Route path="smokeless-directory" element={<SmokelessDirectory />} />
          <Route path="smokeless-directory/:productId" element={<ProductDetails />} />
          <Route path="quit-methods" element={<QuitMethods />} />
          <Route path="calculators" element={<CalculatorsPage />} />
          <Route path="holistic-health" element={<HolisticHealth />} />
        </Route>
        
        {/* Protected app routes */}
        <Route path="/app" element={<AuthGuard><AppLayout /></AuthGuard>}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="log" element={<LogEntry />} />
          <Route path="goals" element={<Goals />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="rewards" element={<StepRewards />} />
          <Route path="settings" element={<Settings />} />
          
          {/* Tool sections */}
          <Route path="tools/cravings" element={<CravingTools />} />
          <Route path="tools/energy" element={<EnergyTools />} />
          <Route path="tools/mood" element={<MoodTools />} />
          <Route path="tools/focus" element={<FocusTools />} />
        </Route>
        
        {/* Catch-all 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
