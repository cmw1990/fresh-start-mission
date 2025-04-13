
import React from 'react';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import KeyFeatures from '@/components/home/KeyFeatures';
import WebTools from '@/components/home/WebTools';
import CallToAction from '@/components/home/CallToAction';

const LandingPage: React.FC = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <KeyFeatures />
      <WebTools />
      <CallToAction />
    </div>
  );
};

export default LandingPage;
