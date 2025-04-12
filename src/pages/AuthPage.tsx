
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthForm from "@/components/auth/AuthForm";

const AuthPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("login");
  
  // Parse query params to determine initial tab
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab === "signup") {
      setActiveTab("signup");
    }
  }, [location]);
  
  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      navigate("/app/dashboard");
    }
  }, [user, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-background py-12 px-4">
        <div className="w-full max-w-md">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <TabsContent value="login">
                <AuthForm type="login" />
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Forgot your password?{" "}
                    <Link to="/reset-password" className="text-fresh-500 hover:underline">
                      Reset it here
                    </Link>
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="signup">
                <AuthForm type="signup" />
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  <p>
                    By creating an account, you agree to our{" "}
                    <Link to="/terms" className="text-fresh-500 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-fresh-500 hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;
