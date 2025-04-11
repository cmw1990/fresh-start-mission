
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/app/AppLayout";
import Dashboard from "./pages/app/Dashboard";
import LogEntry from "./pages/app/LogEntry";
import CravingTools from "./pages/app/tools/CravingTools";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Goals from "./pages/app/Goals";
import Progress from "./pages/app/Progress";
import EnergyTools from "./pages/app/tools/EnergyTools";
import MoodTools from "./pages/app/tools/MoodTools";
import FocusTools from "./pages/app/tools/FocusTools";
import StepRewards from "./pages/app/StepRewards";
import Settings from "./pages/app/Settings";
import Features from "./pages/Features";
import NRTGuide from "./pages/tools/NRTGuide";
import SmokelessDirectory from "./pages/tools/SmokelessDirectory";
import ProductDetails from "./pages/tools/ProductDetails";
import QuitMethods from "./pages/tools/QuitMethods";
import Calculators from "./pages/tools/Calculators";
import WebToolsLayout from "./components/layout/WebToolsLayout";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// App Routes component to handle auth routes
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/features" element={<Features />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      
      {/* Web Tools Routes */}
      <Route path="/tools" element={<WebToolsLayout />}>
        <Route path="nrt-guide" element={<NRTGuide />} />
        <Route path="smokeless-directory" element={<SmokelessDirectory />} />
        <Route path="smokeless-directory/:productId" element={<ProductDetails />} />
        <Route path="quit-methods" element={<QuitMethods />} />
        <Route path="calculators" element={<Calculators />} />
      </Route>
      
      {/* App Routes - Protected */}
      <Route 
        path="/app" 
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="log" element={<LogEntry />} />
        <Route path="goals" element={<Goals />} />
        <Route path="progress" element={<Progress />} />
        <Route path="tools/cravings" element={<CravingTools />} />
        <Route path="tools/energy" element={<EnergyTools />} />
        <Route path="tools/mood" element={<MoodTools />} />
        <Route path="tools/focus" element={<FocusTools />} />
        <Route path="rewards" element={<StepRewards />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
