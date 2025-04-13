
import { CircleCheckBig, Activity, Brain, Footprints } from "lucide-react";
import { cn } from "@/lib/utils";

const stepData = [
  {
    icon: <CircleCheckBig className="h-10 w-10 text-fresh-300" />,
    title: "Set Your Goal",
    description: "Choose your path - Stay Afresh (quit) or Fresher (reduce). We support any goal with any product."
  },
  {
    icon: <Activity className="h-10 w-10 text-fresh-300" />,
    title: "Track Your Progress",
    description: "Log your journey holistically including mood, energy, focus, and sleep alongside nicotine use."
  },
  {
    icon: <Brain className="h-10 w-10 text-fresh-300" />,
    title: "Get Support",
    description: "Access tools specifically designed to boost energy, improve mood, enhance focus, and manage cravings."
  },
  {
    icon: <Footprints className="h-10 w-10 text-fresh-300" />,
    title: "Earn Rewards",
    description: "Stay active and earn points through step tracking that can be redeemed for special rewards."
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50" id="how-it-works">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Mission Fresh Works</h2>
          <p className="text-lg text-muted-foreground">
            Your journey to a fresh start is supported every step of the way
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {stepData.map((step, index) => (
            <div 
              key={index} 
              className={cn(
                "relative p-6 bg-white rounded-lg shadow-sm border border-gray-100",
                "flex flex-col items-center text-center",
                "transition-all hover:shadow-md hover:-translate-y-1"
              )}
            >
              <div className="mb-4 p-3 bg-fresh-50 rounded-full">
                {step.icon}
              </div>
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-fresh-200 flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
