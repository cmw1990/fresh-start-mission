
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Features from "@/components/home/Features";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="page-container">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="page-title">A Fresh World is Mission Possible</h1>
          <p className="page-description">
            Mission Fresh transcends the typical "quit smoking" app by addressing the root causes that make quitting or reducing nicotine so challenging.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/sign-up">
              <Button size="lg" variant="default">
                Start Your Fresh Journey
              </Button>
            </Link>
            <Link to="/tools/holistic-health">
              <Button size="lg" variant="outline">
                Explore Our Free Tools
              </Button>
            </Link>
          </div>
        </div>

        <Features />

        <div className="max-w-4xl mx-auto text-center mt-16">
          <h2 className="text-3xl font-bold mb-6 tracking-tight">Our Approach: Holistic Support</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We believe that achieving a nicotine-free life ("Staying Afresh") or reducing intake ("Staying Fresher") requires addressing the physiological and psychological impacts of withdrawal. That's why Mission Fresh provides targeted support for energy, mood, focus, and cravings alongside robust tracking and goal management.
          </p>
          <Link to="/how-it-works">
            <Button size="lg" variant="default">
              Learn How It Works
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
