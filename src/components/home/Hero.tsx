
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-center opacity-5"></div>
      <div className="container relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-block px-3 py-1 rounded-full bg-fresh-100 text-fresh-500 font-medium text-sm animate-fade-in">
              A Fresh World is Mission Possible!
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter">
              Reclaim Your <span className="text-fresh-300">Energy</span>. Find Your <span className="text-teal-500">Fresh</span> Start.
            </h1>
            <p className="text-xl text-muted-foreground">
              Mission Fresh supports your journey to a nicotine-free life with holistic tools for energy, mood, focus, and cravings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/sign-up">
                <Button size="lg" className="bg-fresh-300 hover:bg-fresh-400 text-white w-full sm:w-auto">
                  Start Your Fresh Journey
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-fresh-100 rounded-full filter blur-3xl opacity-30"></div>
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-teal-100 rounded-full filter blur-3xl opacity-30"></div>
              <div className="relative bg-white p-5 rounded-2xl shadow-lg hover-scale animate-scale-in">
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-fresh-50 flex items-center justify-center">
                  <img
                    src="/placeholder.svg"
                    alt="Mission Fresh App"
                    className="w-3/4 h-3/4 object-contain"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-bold text-lg">Comprehensive Support</h3>
                  <p className="text-muted-foreground">Track progress and get tools for energy, mood, focus, and cravings</p>
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
