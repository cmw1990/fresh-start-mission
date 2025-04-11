
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Pill, Cigarette, Coffee, AlertTriangle } from "lucide-react";

const nrtTypes = [
  {
    id: "patches",
    name: "Nicotine Patches",
    image: "🩹",
    howItWorks: "Delivers a steady dose of nicotine through the skin over 16-24 hours, reducing withdrawal symptoms.",
    pros: ["Provides steady nicotine levels", "Only needed once a day", "Easy to use", "Can be used discreetly"],
    cons: ["Cannot adjust for sudden cravings", "May cause skin irritation", "Sleep disturbances if worn overnight"],
    typicalUsage: "Apply one patch daily to clean, dry, hairless skin. Rotate application sites to prevent irritation.",
    sideEffects: ["Skin irritation or redness", "Sleep disturbances or vivid dreams", "Headache", "Nausea"],
    costRange: "$30-$50 for a two-week supply",
  },
  {
    id: "gum",
    name: "Nicotine Gum",
    image: "🍬",
    howItWorks: "Releases nicotine when chewed and then placed between cheek and gums. Provides quick relief from cravings.",
    pros: ["Can be used as needed for cravings", "Quick-acting", "Multiple flavors available", "Dose control"],
    cons: ["Requires specific chewing technique", "May cause jaw soreness", "Cannot eat or drink 15 minutes before/during use", "May cause hiccups"],
    typicalUsage: "Chew slowly until you notice a tingling sensation, then place between cheek and gum. Repeat when the tingle fades.",
    sideEffects: ["Mouth/throat irritation", "Hiccups", "Upset stomach", "Jaw discomfort"],
    costRange: "$25-$45 for a box of 100-120 pieces",
  },
  {
    id: "lozenges",
    name: "Nicotine Lozenges",
    image: "💊",
    howItWorks: "Dissolves slowly in the mouth, releasing nicotine that is absorbed through the lining of the mouth.",
    pros: ["No chewing required", "Easy to use correctly", "Discreet", "Multiple flavors available"],
    cons: ["Cannot eat or drink while using", "Effects take longer than gum", "May cause hiccups or heartburn"],
    typicalUsage: "Place lozenge in mouth and allow to dissolve slowly (20-30 minutes). Do not chew or swallow.",
    sideEffects: ["Hiccups", "Heartburn", "Nausea", "Mouth/throat irritation"],
    costRange: "$35-$50 for 72-81 lozenges",
  },
  {
    id: "inhalers",
    name: "Nicotine Inhalers",
    image: "🌬️",
    howItWorks: "Nicotine cartridge inside a plastic mouthpiece delivers nicotine vapor when puffed, mimicking the hand-to-mouth action of smoking.",
    pros: ["Mimics hand-to-mouth smoking ritual", "Quick-acting", "Can be used as needed", "Minimal systemic absorption"],
    cons: ["More visible than other NRT options", "May cause mouth/throat irritation", "More expensive than other forms"],
    typicalUsage: "Insert cartridge into the plastic mouthpiece. Puff for 20 minutes as needed throughout the day.",
    sideEffects: ["Mouth/throat irritation", "Coughing", "Runny nose", "Upset stomach"],
    costRange: "$45-$65 per inhaler kit (cartridges sold separately)",
  },
  {
    id: "sprays",
    name: "Nicotine Sprays",
    image: "💨",
    howItWorks: "Delivers nicotine quickly through the lining of the nose or mouth, providing the fastest relief from cravings.",
    pros: ["Fastest acting NRT option", "Easy to use", "Can be used as needed", "Good for intense cravings"],
    cons: ["Can cause irritation", "More expensive than other options", "Nasal spray may cause sneezing/runny nose"],
    typicalUsage: "1-2 sprays in each nostril (nasal) or 1-2 sprays in mouth (oral) when craving occurs.",
    sideEffects: ["Nasal/throat irritation", "Watery eyes", "Sneezing", "Coughing"],
    costRange: "$50-$70 per spray bottle/dispenser",
  },
];

const NRTGuide = () => {
  const [activeTab, setActiveTab] = useState("patches");
  
  return (
    <div className="container py-12">
      <Link to="/" className="inline-flex items-center text-fresh-500 hover:text-fresh-600 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Nicotine Replacement Therapy Guide</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive information about NRT options to support your fresh journey
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader className="bg-fresh-50">
            <CardTitle>What is Nicotine Replacement Therapy?</CardTitle>
            <CardDescription>
              Nicotine replacement therapy (NRT) helps reduce withdrawal symptoms by providing a controlled dose of nicotine without the harmful chemicals found in tobacco products.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 pb-4">
            <div className="space-y-4">
              <p>
                NRT can nearly double your chances of successfully quitting compared to using willpower alone. It works by reducing physical withdrawal symptoms while you break the psychological habit of smoking or using other nicotine products.
              </p>
              
              <div className="flex items-start gap-4 bg-amber-50 p-4 rounded-md">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-700">Important Note</h4>
                  <p className="text-sm text-amber-700">
                    Always consult your healthcare provider before starting any NRT, especially if you're pregnant, nursing, have heart disease, or other medical conditions.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            {nrtTypes.map((type) => (
              <TabsTrigger key={type.id} value={type.id}>
                <span className="hidden md:inline mr-2">{type.image}</span>
                <span className="truncate">{type.id === "inhalers" || type.id === "sprays" ? type.name : type.name.split(" ")[1]}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {nrtTypes.map((type) => (
            <TabsContent key={type.id} value={type.id}>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{type.image}</span>
                    <CardTitle>{type.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">How It Works</h3>
                    <p>{type.howItWorks}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2 text-green-600">Pros</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {type.pros.map((pro, index) => (
                          <li key={index}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2 text-red-600">Cons</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {type.cons.map((con, index) => (
                          <li key={index}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Typical Usage</h3>
                    <p>{type.typicalUsage}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Potential Side Effects</h3>
                    <div className="flex flex-wrap gap-2">
                      {type.sideEffects.map((effect, index) => (
                        <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {effect}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Approximate Cost</h3>
                    <p>{type.costRange}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coffee className="h-5 w-5 text-fresh-500" />
              Tips for Successful NRT Use
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc pl-5 space-y-2">
              <li>Start using NRT on your quit day, not before.</li>
              <li>Consider combining a long-acting NRT (patch) with a quick-acting form (gum, lozenge) for better results.</li>
              <li>Follow the dosage instructions carefully and reduce gradually over time.</li>
              <li>Keep quick-acting NRT forms readily available for sudden cravings.</li>
              <li>Be aware that some medications may interact with NRT - speak with your doctor.</li>
              <li>If one form doesn't work for you, try another - everyone responds differently.</li>
              <li>Use NRT correctly - for example, don't chew nicotine gum like regular gum.</li>
              <li>Typical NRT use lasts 8-12 weeks, gradually reducing the nicotine dose.</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cigarette className="h-5 w-5 text-fresh-500" />
              Combining NRT with Other Methods
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Many people find the greatest success by combining NRT with behavioral support. Mission Fresh offers tools for managing energy, mood, focus, and cravings that complement NRT use.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <Button asChild className="w-full bg-fresh-300 hover:bg-fresh-400">
                <Link to="/sign-up">
                  Create a Free Account
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/tools/quit-methods" className="inline-flex items-center justify-center">
                  <span>Explore Quitting Methods</span>
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NRTGuide;
