
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, TrendingDown, Cigarette, Zap, CircleSlash2, Minus, Timer, Droplet, Award } from "lucide-react";

const quitMethods = [
  {
    id: "cold-turkey",
    name: "Cold Turkey",
    icon: <CircleSlash2 className="h-5 w-5 text-fresh-500" />,
    description: "Stopping abruptly without any aids or gradually reducing. Often considered the most challenging but also the quickest way to eliminate nicotine from your system.",
    details: [
      {
        title: "What to Expect",
        content: "When quitting cold turkey, expect more intense withdrawal symptoms in the first 72 hours, including irritability, anxiety, difficulty concentrating, headaches, increased appetite, and strong cravings. These symptoms typically peak within the first week and gradually subside over 2-4 weeks, though some psychological cravings may persist longer."
      },
      {
        title: "Who It's Best For",
        content: "Cold turkey works best for people with strong willpower, those who prefer a clean break approach, individuals with good support systems in place, and those who have successfully used this method for other habits. It's often effective for people who are highly motivated by a specific trigger event or health scare."
      },
      {
        title: "Preparation",
        content: "Before quitting cold turkey: 1) Set a specific quit date, ideally during a less stressful period. 2) Remove all nicotine products and triggers from your environment. 3) Stock up on healthy snacks and distractions. 4) Inform friends and family for support. 5) Prepare coping strategies for cravings and withdrawal. 6) Consider downloading a quit-tracking app like Mission Fresh to monitor your progress."
      },
      {
        title: "Success Strategies",
        content: "To succeed with cold turkey: 1) Practice the 4 Ds when cravings hit (Delay, Deep breathe, Drink water, Do something else). 2) Create a strong support network. 3) Avoid triggers and situations associated with nicotine use during the first few weeks. 4) Exercise regularly to manage stress and boost mood. 5) Use Mission Fresh's tools for managing energy, mood, and focus challenges. 6) Prepare for and accept that withdrawal will be challenging but temporary."
      }
    ],
    successRate: "Success rate: Approximately 3-5% without additional support; can increase to 10-15% with proper preparation and support tools."
  },
  {
    id: "gradual-reduction",
    name: "Gradual Reduction",
    icon: <TrendingDown className="h-5 w-5 text-fresh-500" />,
    description: "Systematically reducing nicotine intake over time according to a schedule, helping to ease withdrawal symptoms by slowly decreasing dependency.",
    details: [
      {
        title: "What to Expect",
        content: "With gradual reduction, you'll experience less severe withdrawal symptoms spread over a longer period. You may notice mild irritability, occasional headaches, and periodic cravings as you step down your nicotine intake. Many people report better success managing mood and energy using this method, though it requires longer commitment and discipline to follow your reduction schedule."
      },
      {
        title: "Who It's Best For",
        content: "Gradual reduction works best for: 1) People who've tried and struggled with cold turkey. 2) Those with high daily nicotine consumption. 3) Individuals who prefer methodical approaches with clear milestones. 4) People who need to maintain focus and mood stability for work or family responsibilities. 5) Those who want to build confidence through progressive achievements."
      },
      {
        title: "Creating a Reduction Schedule",
        content: "To create an effective reduction plan: 1) Calculate your current daily nicotine intake. 2) Choose a reasonable timeline (typically 4-12 weeks). 3) Plan regular step-downs (e.g., reduce by 25% every 1-2 weeks). 4) Track each reduction milestone and adjust as needed. 5) Consider spacing out usage rather than just reducing quantity. For example, if you smoke 20 cigarettes daily, you might start by cutting to 15 for a week, then 10, then 5, before quitting completely."
      },
      {
        title: "Success Strategies",
        content: "To succeed with gradual reduction: 1) Keep a detailed log of every usage (the Mission Fresh app is perfect for this). 2) Create specific rules for when you can use nicotine, not just how much. 3) Don't compensate by inhaling more deeply or using more intensely. 4) Have a clear end date when you'll completely stop. 5) Pre-plan particularly challenging reduction steps with extra support or coping mechanisms. 6) Consider combining with NRT during final stages."
      }
    ],
    successRate: "Success rate: Approximately 10-18% when following a structured program with proper tracking and support."
  },
  {
    id: "nrt-assisted",
    name: "NRT Assisted",
    icon: <Droplet className="h-5 w-5 text-fresh-500" />,
    description: "Using Nicotine Replacement Therapy products (patches, gum, lozenges, etc.) to deliver controlled amounts of nicotine while eliminating the harmful chemicals in cigarettes or vapes.",
    details: [
      {
        title: "What to Expect",
        content: "With NRT, you'll experience reduced withdrawal symptoms while still receiving controlled nicotine. You may notice mild side effects specific to your chosen NRT product (skin irritation from patches, mouth soreness from gum/lozenges, etc.). The process typically begins with a higher nicotine dose matched to your current usage, then gradually steps down over 8-12 weeks."
      },
      {
        title: "Choosing the Right NRT",
        content: "Different NRT options suit different preferences: 1) Patches provide steady, all-day nicotine delivery with once-daily application. 2) Gum offers flexible, on-demand relief for cravings. 3) Lozenges work similarly to gum but without chewing. 4) Inhalers satisfy the hand-to-mouth ritual. 5) Nasal/mouth sprays provide the quickest nicotine delivery for intense cravings. Many successful quitters combine a long-acting option (patch) with a quick-acting option (gum/lozenge) for breakthrough cravings."
      },
      {
        title: "Using NRT Correctly",
        content: "Common mistakes that reduce NRT effectiveness include: 1) Underdosing (not using enough to manage cravings). 2) Stopping too soon (NRT should typically be used for 8-12 weeks). 3) Improper use (e.g., chewing nicotine gum like regular gum). 4) Not tapering properly. 5) Continuing to smoke while using NRT (except in specific gradual reduction plans). Follow product instructions carefully and consult our detailed NRT Guide for proper usage techniques."
      },
      {
        title: "Success Strategies",
        content: "To maximize NRT success: 1) Be honest about your nicotine intake when selecting your starting strength. 2) Use NRT consistently according to the product instructions. 3) Don't stop NRT too early; complete the full recommended course. 4) Address the behavioral aspects of addiction alongside the physical dependence using Mission Fresh's holistic tools. 5) Use the Mission Fresh app to track both NRT usage and withdrawal symptoms. 6) Consider behavioral support alongside NRT."
      }
    ],
    successRate: "Success rate: Approximately 15-25% with proper usage compared to 3-5% with willpower alone."
  },
  {
    id: "tapering",
    name: "Tapering",
    icon: <Minus className="h-5 w-5 text-fresh-500" />,
    description: "Methodically reducing nicotine strength while maintaining usage patterns, particularly effective with vaping or pouches where nicotine concentration can be precisely controlled.",
    details: [
      {
        title: "What to Expect",
        content: "With tapering, you'll maintain your usual usage patterns but gradually reduce the nicotine strength. This can be particularly effective with vaping, where you can precisely control nicotine concentration. You may experience mild withdrawal symptoms during each step-down, but they're typically less intense than cold turkey approaches."
      },
      {
        title: "How Tapering Works",
        content: "Unlike gradual reduction (which reduces frequency/quantity), tapering focuses on nicotine strength. For example: 1) If vaping 50mg nicotine e-liquid, you might switch to 35mg, then 20mg, then 10mg, then 3mg, and finally 0mg. 2) With nicotine pouches, you might go from extra strong (15mg) to regular (8mg) to mini (4mg) before stopping. This method allows your body to gradually adapt to lower nicotine levels while maintaining the habitual and behavioral aspects of use."
      },
      {
        title: "Creating a Tapering Schedule",
        content: "To create an effective tapering plan: 1) Identify your starting nicotine strength. 2) Research available lower strength options for your product. 3) Plan step-downs that reduce by roughly 25-50% each time. 4) Allow 1-2 weeks at each strength level before stepping down again. 5) Include a final phase with the lowest available strength before quitting completely. 6) Consider ending with nicotine-free products briefly to address the behavioral habit."
      },
      {
        title: "Success Strategies",
        content: "To succeed with tapering: 1) Use the Mission Fresh app to track each strength change and your body's response. 2) Don't compensate by using more frequently when stepping down. 3) Keep some of your previous strength product available for especially stressful situations (but track any usage). 4) Be patient at each level until cravings stabilize before stepping down further. 5) Combine with Mission Fresh's Mood, Energy, and Focus tools to address withdrawal effects. 6) Consider zero-nicotine products as a final step to break the physical addiction while maintaining the ritual."
      }
    ],
    successRate: "Success rate: Approximately 15-20% when following a structured program with consistent step-downs."
  },
  {
    id: "harm-reduction",
    name: "Harm Reduction",
    icon: <Zap className="h-5 w-5 text-fresh-500" />,
    description: "Switching to potentially less harmful nicotine delivery methods while maintaining nicotine usage. Focus is on eliminating the most harmful aspects of nicotine use rather than eliminating nicotine itself.",
    details: [
      {
        title: "What to Expect",
        content: "With harm reduction, the goal is reducing harm rather than eliminating nicotine entirely. This typically involves switching from high-risk products (combustible cigarettes) to potentially lower-risk alternatives (pouches, certain vaping products). You may experience an adjustment period when switching delivery methods, but should not experience significant withdrawal since you'll maintain nicotine intake."
      },
      {
        title: "Understanding the Approach",
        content: "Harm reduction acknowledges that while no nicotine use is safest, switching to potentially less harmful products can significantly reduce health risks for those who cannot or will not stop completely. The harm reduction spectrum (from most to potentially less harmful) generally runs: combustible cigarettes → heated tobacco → certain vaping systems → nicotine pouches → pharmaceutical NRT. The primary benefit comes from eliminating combustion and the associated tar and carbon monoxide."
      },
      {
        title: "Making Informed Choices",
        content: "For effective harm reduction: 1) Research product options thoroughly using reliable sources (including our Smokeless Directory). 2) Consider all aspects including delivery method, ingredients, manufacturing standards, and regulatory oversight. 3) Be aware of the limitations of current research on newer products. 4) Understand that 'less harmful' doesn't mean 'harmless.' 5) Consider harm reduction as either a permanent choice or a step toward eventual cessation."
      },
      {
        title: "Success Strategies",
        content: "To succeed with harm reduction: 1) Commit fully to the switch without dual-use (using both old and new products). 2) Find satisfying alternatives that effectively manage cravings. 3) Be prepared for an adjustment period as you adapt to the new delivery method. 4) Use the Mission Fresh app to track your usage patterns and health markers over time. 5) Stay informed about emerging research on your chosen alternative products. 6) Consider a gradual transition to cessation as a potential long-term goal."
      }
    ],
    successRate: "Success rate for complete switching: Approximately 25-30% when finding a satisfying alternative with proper education and support."
  }
];

const QuittingMethodsGuide = () => {
  const [selectedMethod, setSelectedMethod] = useState("cold-turkey");
  
  return (
    <div className="container py-12">
      <Link to="/" className="inline-flex items-center text-fresh-500 hover:text-fresh-600 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Quitting Methods Guide</h1>
          <p className="text-lg text-muted-foreground">
            Explore different approaches to quitting or reducing nicotine use and find what works for you
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader className="bg-fresh-50">
            <CardTitle>Finding Your Fresh Path</CardTitle>
            <CardDescription>
              There's no one-size-fits-all approach to quitting nicotine. The most effective method for you depends on your personal preferences, usage patterns, and previous quit attempts.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p>
              At Mission Fresh, we believe in supporting <strong>all</strong> paths to freedom from nicotine, whether you're aiming for complete cessation or significant reduction. Each method below has proven effective for different people. We recommend reading through all options before choosing your approach.
            </p>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 mb-8">
          <Tabs value={selectedMethod} onValueChange={setSelectedMethod} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
              {quitMethods.map((method) => (
                <TabsTrigger key={method.id} value={method.id}>
                  <span className="hidden md:inline mr-2">{method.icon}</span>
                  <span className="truncate">{method.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {quitMethods.map((method) => (
              <TabsContent key={method.id} value={method.id}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      {method.icon}
                      <CardTitle>{method.name}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {method.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {method.details.map((detail, index) => (
                      <div key={index}>
                        <h3 className="font-semibold mb-2">{detail.title}</h3>
                        <p className="text-muted-foreground">{detail.content}</p>
                      </div>
                    ))}
                    
                    <div className="bg-fresh-50 p-4 rounded-md">
                      <p className="font-medium text-fresh-800">
                        {method.successRate}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-fresh-500" />
              Recommended Combinations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Many successful quitters combine approaches for better results. Here are some effective combinations:
            </p>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <span className="font-medium">NRT + Behavioral Support:</span>{" "}
                Using nicotine replacement therapy while also addressing the psychological aspects of addiction with Mission Fresh's Focus, Mood, and Energy tools.
              </li>
              <li>
                <span className="font-medium">Tapering + Gradual Reduction:</span>{" "}
                Reducing both the strength of nicotine and the frequency of use simultaneously for a comprehensive approach.
              </li>
              <li>
                <span className="font-medium">Cold Turkey + Strong Support System:</span>{" "}
                Quitting abruptly while leaning heavily on support from friends, family, and digital tools like Mission Fresh.
              </li>
              <li>
                <span className="font-medium">Harm Reduction → Tapering → Cessation:</span>{" "}
                A staged approach starting with switching to less harmful products, then gradually reducing nicotine strength, and finally achieving complete cessation.
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-fresh-500" />
              Ready to Start Your Fresh Journey?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Mission Fresh helps you implement any of these methods with personalized tracking, goal setting, and holistic tools for managing the real challenges that come with nicotine withdrawal.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <Button asChild className="w-full bg-fresh-300 hover:bg-fresh-400">
                <Link to="/sign-up">
                  Create a Free Account
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/tools/nrt-guide">
                  Explore NRT Options
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuittingMethodsGuide;
