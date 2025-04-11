
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Features from "@/components/home/Features";
import WebTools from "@/components/home/WebTools";
import CTASection from "@/components/home/CTASection";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1">
        <Hero />
        <HowItWorks />
        <Features />
        <WebTools />
        <CTASection />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
