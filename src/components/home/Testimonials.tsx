
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Mission Fresh helped me understand that my energy dips weren't a failure—they were just part of the process. Their tools made all the difference.",
      author: "Michael K.",
      title: "2 Months Afresh",
      background: "bg-blue-50",
      border: "border-blue-200"
    },
    {
      quote: "I tried quitting cold turkey five times before and always failed. Using the gradual reduction approach with Mission Fresh finally worked for me.",
      author: "Sarah T.",
      title: "Reduced by 75%",
      background: "bg-green-50",
      border: "border-green-200"
    },
    {
      quote: "The mood management tools were exactly what I needed. They helped me navigate the emotional rollercoaster of quitting without breaking my streak.",
      author: "James L.",
      title: "90 Days Afresh",
      background: "bg-purple-50", 
      border: "border-purple-200"
    }
  ];

  return (
    <section className="py-20 bg-white" id="testimonials">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-lg text-muted-foreground">
            Real people on their Fresh journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <div 
              key={i} 
              className={`rounded-lg ${testimonial.background} ${testimonial.border} border p-6 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4 text-2xl text-gray-400">"</div>
                <p className="flex-grow italic mb-6">{testimonial.quote}</p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
