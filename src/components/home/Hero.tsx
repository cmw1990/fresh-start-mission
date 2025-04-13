
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-28 pb-32 overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `url('/grid-pattern.svg')`,
          backgroundSize: '30px 30px'
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-fresh-50/80 to-blue-50/50"></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-gradient-to-br from-fresh-300/20 to-fresh-200/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-[5%] w-72 h-72 bg-gradient-to-tr from-blue-300/10 to-fresh-200/10 rounded-full blur-3xl"></div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium bg-fresh-100 text-fresh-800 rounded-full">
            <span className="flex h-2 w-2 rounded-full bg-fresh-500 mr-2"></span>
            A Fresh World is Mission Possible
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Reclaim Your Energy. <br />Find Your Fresh Start.
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Comprehensive support for your journey to reduce or quit nicotine, focusing on your energy, mood, focus, and overall wellbeing.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-fresh-400 to-fresh-600 hover:from-fresh-500 hover:to-fresh-700 border-none text-white">
              <Link to="/sign-up">
                Start Your Fresh Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/tools">Explore Free Tools</Link>
            </Button>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
              <span>Free Web Tools</span>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-blue-500 mr-2"></div>
              <span>Holistic Approach</span>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-purple-500 mr-2"></div>
              <span>Any Nicotine Product</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
