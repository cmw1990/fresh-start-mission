
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Box, Compass, Calculator, SunMoon, Tablet, ArrowRight, CheckCircle, Brain, Heart, Activity, Zap } from 'lucide-react';

const WebToolsIndex = () => {
  return (
    <div className="container py-12 px-4 mx-auto max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Free Resources for Your Fresh Journey</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore our collection of valuable tools to help you understand your options
          and make informed decisions on your path to a fresh start.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ToolCard 
          title="NRT Guide" 
          description="Comprehensive information about nicotine replacement therapy options with expert recommendations."
          icon={<Tablet className="h-8 w-8" />}
          link="/tools/nrt-guide"
          bgColor="bg-blue-50"
          iconColor="text-blue-600"
          features={[
            "Compare all NRT types",
            "Usage guidelines",
            "Side effect information",
            "Cost considerations"
          ]}
        />
        
        <ToolCard 
          title="Smokeless Directory" 
          description="Browse and compare smokeless nicotine alternatives with expert analysis and user reviews."
          icon={<Box className="h-8 w-8" />}
          link="/tools/smokeless-directory"
          bgColor="bg-green-50"
          iconColor="text-green-600"
          features={[
            "Expert chemical analysis",
            "User reviews and ratings",
            "Product filtering options",
            "Affiliate purchase links"
          ]}
        />
        
        <ToolCard 
          title="Quit Methods" 
          description="Learn about different approaches to quitting or reducing nicotine use with pros and cons of each."
          icon={<Compass className="h-8 w-8" />}
          link="/tools/quit-methods"
          bgColor="bg-purple-50"
          iconColor="text-purple-600"
          features={[
            "Cold turkey approach",
            "Gradual reduction plans",
            "Tapering schedules",
            "Harm reduction strategies"
          ]}
        />
        
        <ToolCard 
          title="Calculators" 
          description="Estimate your savings and health improvements when you reduce or quit using nicotine products."
          icon={<Calculator className="h-8 w-8" />}
          link="/tools/calculators"
          bgColor="bg-amber-50"
          iconColor="text-amber-600"
          features={[
            "Financial savings calculator",
            "Health timeline generator",
            "Custom product calculations",
            "Long-term projection view"
          ]}
        />
        
        <ToolCard 
          title="Holistic Health" 
          description="Resources for managing energy, mood, focus and overall wellbeing during your fresh journey."
          icon={<SunMoon className="h-8 w-8" />}
          link="/tools/holistic-health"
          bgColor="bg-rose-50"
          iconColor="text-rose-600"
          features={[
            "Energy management strategies",
            "Mood regulation techniques",
            "Focus enhancement tools",
            "Cravings management guides"
          ]}
        />
      </div>
      
      <div className="mt-16 mb-20">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-4">Holistic Support for Your Journey</h2>
          <p className="text-lg text-muted-foreground">
            Discover practical tools and techniques to address the real challenges of nicotine reduction
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <HolisticCard 
            title="Energy Support" 
            icon={<Activity className="h-10 w-10" />}
            description="Combat fatigue during nicotine reduction with science-backed techniques to maintain natural energy levels."
            bgColor="bg-blue-50"
            iconColor="text-blue-600"
          />
          
          <HolisticCard 
            title="Mood Enhancement" 
            icon={<Heart className="h-10 w-10" />}
            description="Stabilize emotions and reduce irritability with practical exercises designed for nicotine withdrawal."
            bgColor="bg-green-50"
            iconColor="text-green-600"
          />
          
          <HolisticCard 
            title="Focus Improvement" 
            icon={<Brain className="h-10 w-10" />}
            description="Maintain mental clarity and overcome brain fog with techniques that enhance concentration."
            bgColor="bg-purple-50"
            iconColor="text-purple-600"
          />
          
          <HolisticCard 
            title="Craving Management" 
            icon={<Zap className="h-10 w-10" />}
            description="Effectively navigate through cravings with evidence-based approaches that break the dependency cycle."
            bgColor="bg-rose-50"
            iconColor="text-rose-600"
          />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-fresh-50 to-fresh-100 p-8 rounded-xl shadow-sm">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Want More Personalized Support?</h2>
          <p className="text-lg mb-6">
            The Mission Fresh app offers personalized tracking, holistic support tools,
            step rewards, and a community of people on the same journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-fresh-500 hover:bg-fresh-600 text-white">
              <Link to="/sign-up">Create Free Account</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  bgColor: string;
  iconColor: string;
  features?: string[];
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon, link, bgColor, iconColor, features }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md border-t-4 border-t-fresh-500 hover:border-t-fresh-600">
      <CardHeader className="pb-2">
        <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center ${iconColor} mb-4`}>
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        {features && features.length > 0 && (
          <ul className="space-y-1">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Button asChild variant="ghost" className="text-fresh-600 hover:text-fresh-700 hover:bg-fresh-50 p-0 group">
          <Link to={link} className="flex items-center">
            Explore Tool
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

interface HolisticCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

const HolisticCard: React.FC<HolisticCardProps> = ({ title, description, icon, bgColor, iconColor }) => {
  return (
    <div className={`${bgColor} rounded-lg p-6 transition-all hover:shadow-md`}>
      <div className="flex flex-col items-center text-center">
        <div className={`mb-4 ${iconColor}`}>{icon}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
        <Button asChild variant="link" className="mt-4 text-fresh-600 hover:text-fresh-700 p-0">
          <Link to="/tools/holistic-health" className="flex items-center">
            Learn more
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default WebToolsIndex;
