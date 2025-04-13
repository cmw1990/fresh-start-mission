
import React from 'react';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import KeyFeatures from '@/components/home/KeyFeatures';
import WebTools from '@/components/home/WebTools';
import CallToAction from '@/components/home/CallToAction';
import Footer from '@/components/layout/Footer';
import Testimonials from '@/components/home/Testimonials';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <KeyFeatures />
        <WebTools />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
