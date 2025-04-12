
import Hero from '@/components/home/Hero';
import FeaturesIntro from '@/components/home/FeaturesIntro';
import HowItWorks from '@/components/home/HowItWorks';
import WebTools from '@/components/home/WebTools';
import CTASection from '@/components/home/CTASection';
import SEOHead from '@/components/common/SEOHead';
import Testimonials from '@/components/home/Testimonials';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const LandingPage = () => {
  return (
    <>
      <SEOHead 
        title="Mission Fresh - Your Journey to a Nicotine-Free Life"
        description="Start your journey to becoming nicotine-free with Mission Fresh. Track your progress, manage cravings, and celebrate milestones with our supportive community and evidence-based tools."
        keywords="quit smoking, quit vaping, quit nicotine, tobacco cessation, nicotine addiction, health tracker, smoking cessation app"
      />
      <Navbar transparentAtTop={true} />
      <Hero />
      <FeaturesIntro 
        title="Take Control of Your Journey" 
        description="Our suite of powerful tools and features designed to support you at every step" 
      />
      <HowItWorks />
      <WebTools />
      <Testimonials />
      <CTASection />
      <Footer />
    </>
  );
};

export default LandingPage;

