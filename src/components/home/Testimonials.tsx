
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuoteIcon } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  testimonial: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah K.",
    role: "Fresh for 1 year",
    testimonial: "Mission Fresh gave me the structure and support I needed to finally quit after 15 years of smoking. The craving tools got me through the toughest moments.",
    image: "/testimonials/person1.jpg"
  },
  {
    id: "2",
    name: "Michael T.",
    role: "Fresh for 6 months",
    testimonial: "The step rewards feature kept me active and focused on something other than cravings. I've saved over $2000 and feel like a new person!",
    image: "/testimonials/person2.jpg"
  },
  {
    id: "3",
    name: "Jamie L.",
    role: "Fresh for 3 months",
    testimonial: "As a vaper, I appreciated how the app wasn't just focused on cigarettes. The personalized reduction plan helped me taper down gradually.",
    image: "/testimonials/person3.jpg"
  },
  {
    id: "4",
    name: "Robert D.",
    role: "Fresh for 9 months",
    testimonial: "The holistic approach that addresses mood, energy, and cravings as interconnected was what finally worked for me. I recommend this app to everyone I know.",
    image: ""
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-fresh-50/50">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">
            Success Stories
          </h2>
          <p className="text-muted-foreground mt-2 text-lg">
            Join thousands who have successfully started fresh
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="pt-6">
                <div className="mb-4 flex items-start">
                  <QuoteIcon className="h-6 w-6 text-fresh-400 mr-2 shrink-0 mt-1" />
                  <p className="italic text-gray-700">{testimonial.testimonial}</p>
                </div>
                
                <div className="flex items-center mt-4">
                  <Avatar className="h-10 w-10 border-2 border-fresh-100">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-fresh-200 text-fresh-700">
                      {testimonial.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-fresh-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
