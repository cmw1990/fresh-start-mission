
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-fresh-50 to-fresh-100">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Fresh Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of others who are reclaiming their energy, mood, and focus while reducing their dependence on nicotine.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-fresh-500 hover:bg-fresh-600 text-white">
              <Link to="/sign-up">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/tools">Explore Free Tools First</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
