
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 bg-primary/10">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            Ready to Start Your Fresh Journey?
          </h2>
          <p className="text-lg mb-8 text-muted-foreground">
            Whether you want to quit completely or reduce your nicotine intake, Mission Fresh provides the support and tools you need to succeed.
          </p>
          <Link to="/sign-up">
            <Button size="lg" variant="default">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
