import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const NRTGuide = () => {
  return (
    <div className="container py-12 px-4 mx-auto max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Nicotine Replacement Therapy (NRT) Guide</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Understanding your NRT options to find the right solution for your fresh journey
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-6 max-w-3xl mx-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patches">Patches</TabsTrigger>
          <TabsTrigger value="gum">Gum</TabsTrigger>
          <TabsTrigger value="lozenges">Lozenges</TabsTrigger>
          <TabsTrigger value="inhalers">Inhalers</TabsTrigger>
          <TabsTrigger value="sprays">Sprays</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="bg-gradient-to-r from-fresh-50 to-blue-50 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">What is NRT?</h2>
            <p className="mb-4">
              Nicotine Replacement Therapy (NRT) is a medically-approved way to take nicotine by means other
              than tobacco. It can help reduce unpleasant withdrawal effects such as mood swings, cravings and anxiety
              that may occur when you stop smoking or using nicotine products.
            </p>
            <p>
              NRT is available as skin patches, chewing gum, inhalers, tablets, oral strips, lozenges, nasal and 
              mouth spray. These products provide low, controlled doses of nicotine without the tar, carbon monoxide
              and other poisonous chemicals present in tobacco smoke.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-medium mb-3">Benefits of NRT</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Relieves physical withdrawal symptoms</li>
                <li>Reduces cravings</li>
                <li>Can double your chances of quitting successfully</li>
                <li>Safe and regulated with consistent dosing</li>
                <li>Allows you to focus on behavioral aspects of quitting</li>
                <li>Available without prescription (in most countries)</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-medium mb-3">Considerations</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Different products work better for different people</li>
                <li>May need to try multiple forms to find what works</li>
                <li>Proper usage instructions should be followed</li>
                <li>Some side effects are possible (typically mild)</li>
                <li>Pregnant women should consult healthcare providers</li>
                <li>Combining NRT forms may be more effective</li>
              </ul>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How to choose the right NRT product?</AccordionTrigger>
              <AccordionContent>
                <p>
                  The best NRT product for you depends on your personal preferences, smoking habits, and past experiences. 
                  Consider these factors:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li><strong>Heavy smokers</strong> (20+ cigarettes daily) may benefit from patches combined with a fast-acting option.</li>
                  <li><strong>Oral fixation</strong> - If you miss the hand-to-mouth action, consider inhalers or gum.</li>
                  <li><strong>Regular cravings</strong> - Patches provide consistent nicotine levels.</li>
                  <li><strong>Sudden cravings</strong> - Fast-acting options like sprays or lozenges work quickly.</li>
                  <li><strong>Discretion needed</strong> - Lozenges and patches are the most discreet options.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How long should I use NRT?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Most healthcare providers recommend using NRT for at least 8-12 weeks. Start with a full dose based on your 
                  nicotine intake, then gradually reduce over time. Stopping NRT too early is a common reason for relapse.
                  Some people may benefit from extended use of 6 months or longer. 
                </p>
                <p className="mt-2">
                  Don't be discouraged if you need to use NRT longer than expected - it's still much safer than returning to 
                  tobacco products. Always consult your healthcare provider for personalized advice.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I use multiple NRT products together?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes, combination therapy is often more effective than using a single form. A common approach is to use 
                  a nicotine patch (providing a steady baseline of nicotine) along with a faster-acting form like gum, 
                  lozenge, or spray (for breakthrough cravings).
                </p>
                <p className="mt-2">
                  This approach has been shown to increase quit rates by 15-36% compared to using a single NRT product.
                  Always follow product guidelines or consult your healthcare provider when combining products.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        
        <TabsContent value="patches" className="mt-6">
          <div className="bg-blue-50 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Nicotine Patches</h2>
            <p>
              Nicotine patches deliver a measured dose of nicotine through the skin. They are applied once a day
              and provide a steady level of nicotine to help prevent cravings throughout the day.
            </p>
          </div>
          
          <p className="text-center text-muted-foreground italic">
            Full detailed content for patches would be here
          </p>
        </TabsContent>
        
        <TabsContent value="gum" className="mt-6">
          <p className="text-center text-muted-foreground italic">
            Detailed information about nicotine gum would be here
          </p>
        </TabsContent>
        
        <TabsContent value="lozenges" className="mt-6">
          <p className="text-center text-muted-foreground italic">
            Detailed information about lozenges would be here
          </p>
        </TabsContent>
        
        <TabsContent value="inhalers" className="mt-6">
          <p className="text-center text-muted-foreground italic">
            Detailed information about inhalers would be here
          </p>
        </TabsContent>
        
        <TabsContent value="sprays" className="mt-6">
          <p className="text-center text-muted-foreground italic">
            Detailed information about nasal/mouth sprays would be here
          </p>
        </TabsContent>
      </Tabs>
      
      <div className="mt-16 p-6 bg-gradient-to-r from-fresh-50 to-blue-50 border border-fresh-100 rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-3">Need More Personalized Support?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Mission Fresh offers tools to track your progress, manage cravings, and boost your well-being during your journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/tools/smokeless-directory">
            <Button variant="outline" className="w-full sm:w-auto">Explore Smokeless Alternatives</Button>
          </Link>
          <Link to="/sign-up">
            <Button className="w-full sm:w-auto bg-fresh-500 hover:bg-fresh-600">
              Start Your Fresh Journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NRTGuide;
