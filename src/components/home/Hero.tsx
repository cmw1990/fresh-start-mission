
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-fresh-50 via-background to-background py-20 md:py-32">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>
      <div className="container relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left animate-fade-in-up">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
              A Fresh World is Mission Possible!
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter text-gray-900">
              Reclaim Your <span className="text-primary">Energy</span>. Find Your <span className="text-primary">Fresh</span> Start.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Mission Fresh supports your journey to a nicotine-free life with holistic tools for energy, mood, focus, and cravings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Link to="/auth?mode=register"> 
                <Button size="lg" variant="default" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
                  Start Your Fresh Journey
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn How It Works
                </Button>
              </a>
            </div>
          </div>
          <div className="hidden md:block animate-fade-in">
            <div className="relative">
              <div className="absolute -top-16 -left-16 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
              <div className="absolute -bottom-16 -right-10 w-72 h-72 bg-blue-200/10 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
              
              <div className="relative bg-white p-4 rounded-2xl shadow-xl border hover:scale-[1.02] transition-transform duration-300">
                <div className="aspect-video w-full overflow-hidden rounded-xl relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-fresh-300 to-fresh-600 flex flex-col items-center justify-center text-white p-6">
                    <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1H8.3z"></path>
                        <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                        <circle cx="17.5" cy="17.5" r="3.5"></circle>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-center">Mission Fresh App</h3>
                    <p className="text-center text-white/80 text-sm">Track your energy, mood, focus, and cravings in one place</p>
                    <div className="mt-4 flex space-x-2">
                      <div className="h-1 w-8 bg-white/40 rounded-full"></div>
                      <div className="h-1 w-4 bg-white/80 rounded-full"></div>
                      <div className="h-1 w-2 bg-white/40 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
