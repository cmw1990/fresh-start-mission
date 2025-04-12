import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    // Consider adding a high-quality background image/gradient here later
    <section className="relative overflow-hidden bg-gradient-to-b from-fresh-50 via-background to-background py-20 md:py-32">
      {/* Optional: Add subtle background pattern or shapes */}
      {/* <div className="absolute inset-0 bg-[url('/images/hero-background.jpg')] bg-cover bg-center opacity-10"></div> */}
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
              {/* Updated Link */}
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
              {/* Decorative Blobs */}
              <div className="absolute -top-16 -left-16 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
              <div className="absolute -bottom-16 -right-10 w-72 h-72 bg-blue-200/10 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
              
              {/* Mockup Card */}
              <div className="relative bg-white p-4 rounded-2xl shadow-xl border hover:scale-[1.02] transition-transform duration-300">
                <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
                   {/* Using standard placeholder */}
                  <img
                    src="/placeholder.svg" 
                    alt="Mission Fresh App Mockup"
                    className="w-full h-full object-cover" 
                  />
                </div>
                {/* Optional: Add small text below mockup if needed */}
                {/* 
                <div className="mt-3 px-1">
                  <h3 className="font-semibold text-center text-sm text-gray-700">Your Holistic Wellness Dashboard</h3>
                </div> 
                */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
