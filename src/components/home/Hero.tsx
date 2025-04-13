
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-white to-fresh-50 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img src="/grid-pattern.svg" alt="" className="w-full h-full object-cover" />
      </div>
      
      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gray-900">
            Reclaim Your <span className="text-fresh-500">Energy.</span> Find Your <span className="text-fresh-500">Fresh</span> Start.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Mission Fresh supports your journey to reduce nicotine use with powerful tools for energy, mood, focus, and cravings management.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-fresh-500 hover:bg-fresh-600 text-white">
              <Link to="/sign-up">
                Start Your Fresh Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/tools">Explore Free Tools</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
