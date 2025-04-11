
import { 
  ActivitySquare, 
  BatteryCharging, 
  Brain as BrainIcon, 
  Cigarette, 
  Flame, 
  LineChart, 
  ListChecks, 
  Footprints,
  Sparkles
} from "lucide-react";
import FeatureCard from "./FeatureCard";
import FeaturesIntro from "./FeaturesIntro";

const features = [
  {
    icon: <BatteryCharging className="h-10 w-10 text-mint-500" />,
    title: "Energy Support",
    description: "Combat the fatigue often experienced during nicotine withdrawal with targeted tools designed to boost and maintain energy levels naturally.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-mint-500" />,
    title: "Mood Regulation",
    description: "Practical exercises and techniques to stabilize mood swings and emotional challenges commonly experienced during the quitting or reduction process.",
  },
  {
    icon: <BrainIcon className="h-10 w-10 text-mint-500" />,
    title: "Focus Enhancement",
    description: "Effective strategies to improve mental clarity and concentration, addressing one of the most common barriers to successful nicotine reduction.",
  },
  {
    icon: <Flame className="h-10 w-10 text-mint-500" />,
    title: "Craving Management",
    description: "Immediate, science-backed tools to overcome intense nicotine cravings in the moment, including breathing exercises and distraction techniques.",
  },
  {
    icon: <ListChecks className="h-10 w-10 text-mint-500" />,
    title: "Flexible Goals",
    description: "'Staying Afresh' or 'Staying Fresher' - set personalized goals with support for multiple approaches: cold turkey, gradual reduction, NRT, or harm reduction.",
  },
  {
    icon: <Cigarette className="h-10 w-10 text-mint-500" />,
    title: "All Products Tracking",
    description: "Comprehensive tracking for any nicotine product: cigarettes, vapes, pouches, gums, patches, and more - no judgment, just support for your chosen path.",
  },
  {
    icon: <LineChart className="h-10 w-10 text-mint-500" />,
    title: "Progress Visualization",
    description: "See your journey with clear, motivating charts showing nicotine reduction, money saved, health improvements, and holistic wellness metrics.",
  },
  {
    icon: <Footprints className="h-10 w-10 text-mint-500" />,
    title: "Step Rewards",
    description: "Turn physical activity into tangible benefits with our step-tracking reward system, creating a positive feedback loop for your fresh journey.",
  },
  {
    icon: <ActivitySquare className="h-10 w-10 text-mint-500" />,
    title: "Holistic Tracking",
    description: "Monitor all aspects of wellbeing: sleep quality, energy levels, mood stability, and mental focus alongside your nicotine reduction progress.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-background" id="features">
      <div className="container">
        <FeaturesIntro 
          title="How Mission Fresh Supports Your Journey" 
          description="We address the real challenges of nicotine reduction: energy drain, mood swings, focus loss, and persistent cravings - because willpower alone isn't enough."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
