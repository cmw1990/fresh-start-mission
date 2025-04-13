
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Box, Compass, Calculator, SunMoon, Tablet } from 'lucide-react';

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
          description="Comprehensive information about nicotine replacement therapy options."
          icon={<Tablet className="h-8 w-8" />}
          link="/tools/nrt-guide"
        />
        
        <ToolCard 
          title="Smokeless Directory" 
          description="Browse and compare smokeless nicotine alternatives with expert analysis."
          icon={<Box className="h-8 w-8" />}
          link="/tools/smokeless-directory"
        />
        
        <ToolCard 
          title="Quit Methods" 
          description="Learn about different approaches to quitting or reducing nicotine use."
          icon={<Compass className="h-8 w-8" />}
          link="/tools/quit-methods"
        />
        
        <ToolCard 
          title="Calculators" 
          description="Estimate your savings and health improvements when you reduce or quit."
          icon={<Calculator className="h-8 w-8" />}
          link="/tools/calculators"
        />
        
        <ToolCard 
          title="Holistic Health" 
          description="Resources for managing energy, mood, focus and overall wellbeing."
          icon={<SunMoon className="h-8 w-8" />}
          link="/tools/holistic-health"
        />
      </div>
      
      <div className="mt-16 bg-fresh-50 p-8 rounded-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Want More Personalized Support?</h2>
          <p className="text-lg mb-6">
            The Mission Fresh app offers personalized tracking, holistic support tools,
            step rewards, and a community of people on the same journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-fresh-500 hover:bg-fresh-600 text-white">
              <Link to="/sign-up">Create Free Account</Link>
            </Button>
            <Button asChild variant="outline">
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
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon, link }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader>
        <div className="w-12 h-12 rounded-full bg-fresh-100 flex items-center justify-center text-fresh-600 mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild variant="ghost" className="text-fresh-600 hover:text-fresh-700 hover:bg-fresh-50 p-0">
          <Link to={link} className="flex items-center">
            Explore Tool
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WebToolsIndex;
