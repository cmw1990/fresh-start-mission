
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Battery, Brain, Heart, Award } from 'lucide-react';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-fresh-50 py-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Reclaim Your Energy.
                <span className="text-fresh-600 block">Find Your Fresh Start.</span>
              </h1>
              <p className="text-xl mb-8 text-gray-600">
                The holistic approach to quitting or reducing nicotine use that focuses on what really matters: 
                your energy, mood, focus, and overall wellbeing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-fresh-500 hover:bg-fresh-600 text-lg px-8 py-6">
                  <Link to="/sign-up">Start Your Fresh Journey</Link>
                </Button>
                <Button asChild variant="outline" className="text-lg px-8 py-6">
                  <Link to="/tools">Explore Free Tools</Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                  <img 
                    src="/hero-image-placeholder.jpg" 
                    alt="Mission Fresh App" 
                    className="w-full h-auto"
                    onError={(e) => {
                      // If image fails to load, render a colored div instead
                      const target = e.target as HTMLImageElement;
                      target.style.height = '400px';
                      target.style.background = 'linear-gradient(135deg, #82CFA7 0%, #4CAF50 100%)';
                    }}
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-fresh-100 rounded-full p-8 hidden md:block">
                  <span className="text-fresh-800 font-bold text-xl">A Fresh World is Mission Possible!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mission Fresh takes a completely different approach to quitting or reducing nicotine use,
              focusing on the whole you, not just tracking days.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StepCard 
              number={1}
              title="Set Your Goal"
              description="Choose between 'Staying Afresh' (quitting) or 'Staying Fresher' (reducing). We support ALL paths."
            />
            <StepCard 
              number={2}
              title="Track Holistically"
              description="Monitor not just nicotine use, but also your energy, mood, focus, and sleep quality."
            />
            <StepCard 
              number={3}
              title="Use Support Tools"
              description="Access specialized tools for cravings, energy dips, mood regulation, and focus improvement."
            />
            <StepCard 
              number={4}
              title="Earn Rewards"
              description="Track daily steps to earn points redeemable for discounts and benefits."
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-fresh-50 py-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Mission Fresh</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our holistic approach addresses the real challenges of quitting or reducing nicotine use.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Battery className="h-8 w-8 text-fresh-600" />}
              title="Energy Support"
              description="Tools and techniques specifically designed to combat the energy dips that often lead to relapse."
            />
            <FeatureCard 
              icon={<Brain className="h-8 w-8 text-fresh-600" />}
              title="Focus Enhancement"
              description="Practical methods to improve concentration when nicotine is no longer providing artificial focus."
            />
            <FeatureCard 
              icon={<Heart className="h-8 w-8 text-fresh-600" />}
              title="Mood Regulation"
              description="Mood-lifting exercises and journaling prompts to help manage the emotional challenges."
            />
            <FeatureCard 
              title="Comprehensive Tracking"
              description="Log and monitor all forms of nicotine use (cigarettes, vapes, pouches, etc.) alongside holistic metrics."
            />
            <FeatureCard 
              title="Non-Judgmental Approach"
              description="Whether you choose cold turkey, gradual reduction, NRT, or harm reduction, we support your path."
            />
            <FeatureCard 
              icon={<Award className="h-8 w-8 text-fresh-600" />}
              title="Step Rewards"
              description="Walking helps with cravings and mood - our app rewards you for physical activity with redeemable points."
            />
          </div>
        </div>
      </section>

      {/* Web Tools Intro Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Free Web Tools</h2>
              <p className="text-xl mb-6 text-gray-600">
                Explore our comprehensive collection of free resources to help you make informed decisions
                about your nicotine journey.
              </p>
              <ul className="space-y-4 mb-8">
                <ToolListItem text="NRT Guide - Compare nicotine replacement options" />
                <ToolListItem text="Smokeless Directory - Expert analysis of alternatives" />
                <ToolListItem text="Quit Methods - Different approaches explained" />
                <ToolListItem text="Calculators - Estimate savings and health benefits" />
                <ToolListItem text="Holistic Health - Manage energy, mood, and focus" />
              </ul>
              <Button asChild className="bg-fresh-500 hover:bg-fresh-600">
                <Link to="/tools">
                  Explore Web Tools
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                <img 
                  src="/web-tools-placeholder.jpg" 
                  alt="Mission Fresh Web Tools" 
                  className="w-full h-auto"
                  onError={(e) => {
                    // If image fails to load, render a colored div instead
                    const target = e.target as HTMLImageElement;
                    target.style.height = '400px';
                    target.style.background = 'linear-gradient(135deg, #90CAF9 0%, #42A5F5 100%)';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-fresh-600 text-white py-20">
        <div className="container px-4 mx-auto max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Begin Your Fresh Journey?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of others who are reclaiming their energy, mood, and focus while reducing or quitting nicotine.
            A Fresh World is Mission Possible!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="default" className="bg-white text-fresh-600 hover:bg-gray-100">
              <Link to="/sign-up">Create Free Account</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-fresh-700">
              <Link to="/tools">Explore Free Tools</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
  return (
    <div className="relative">
      <div className="absolute -top-4 -left-4 bg-fresh-100 w-12 h-12 rounded-full flex items-center justify-center">
        <span className="text-fresh-800 font-bold text-xl">{number}</span>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-md h-full pt-12">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md h-full">
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const ToolListItem: React.FC<{ text: string }> = ({ text }) => {
  return (
    <li className="flex items-start">
      <CheckCircle className="h-6 w-6 text-fresh-500 mr-2 shrink-0" />
      <span>{text}</span>
    </li>
  );
};

export default LandingPage;
