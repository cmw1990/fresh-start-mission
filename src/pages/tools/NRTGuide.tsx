
import { useState } from "react";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { 
  Pill, Clock, DollarSign, AlertCircle, ThumbsUp, ThumbsDown, Percent, 
  ShieldQuestion, Heart, CircleHelp, ChevronDown, ChevronUp
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

// Renamed to avoid duplicate import name
const PillIcon = Pill;

const NRTGuide = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Nicotine Replacement Therapy Guide</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          A comprehensive guide to help you understand different NRT options and choose the right one for your journey.
        </p>
      </div>

      <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-6 max-w-3xl mx-auto mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patches">Patches</TabsTrigger>
          <TabsTrigger value="gum">Gum</TabsTrigger>
          <TabsTrigger value="lozenges">Lozenges</TabsTrigger>
          <TabsTrigger value="inhalers">Inhalers</TabsTrigger>
          <TabsTrigger value="spray">Spray</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>What is Nicotine Replacement Therapy?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Nicotine Replacement Therapy (NRT) is a medically-approved way to take nicotine by means other than tobacco. 
                  It provides nicotine at a lower level than cigarettes without the harmful chemicals found in tobacco smoke.
                </p>
                <p className="mb-4">
                  By reducing withdrawal symptoms and cravings, NRT can approximately double your chances of successfully quitting smoking. 
                  It's safe, effective, and available in several forms to suit your preferences and needs.
                </p>
                <p>
                  NRT works by providing a controlled dose of nicotine without the harmful chemicals found in tobacco smoke. This helps reduce withdrawal symptoms while you break the psychological habit of smoking.
                </p>
              </CardContent>
            </Card>

            <div className="grid sm:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ThumbsUp className="h-5 w-5 text-green-500 mr-2" />
                    Benefits of NRT
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Reduces withdrawal symptoms</li>
                    <li>Doubles chances of quitting success</li>
                    <li>Multiple formats to match personal preferences</li>
                    <li>Can be used in combination for better results</li>
                    <li>Medically approved and backed by research</li>
                    <li>Gradually reduces nicotine dependence</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ThumbsDown className="h-5 w-5 text-red-500 mr-2" />
                    Limitations of NRT
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Doesn't address the behavioral aspects of smoking</li>
                    <li>May cause side effects (mouth/throat irritation, hiccups)</li>
                    <li>Not suitable for everyone (pregnant women should consult doctors)</li>
                    <li>Requires consistent use according to instructions</li>
                    <li>May perpetuate nicotine dependence if used improperly</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>How to Choose the Right NRT</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Consider these factors when selecting an NRT option:</p>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Usage Pattern</h3>
                        <p className="text-sm text-muted-foreground">Think about when and how you'll use NRT during your day.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Pill className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Previous Smoking Habits</h3>
                        <p className="text-sm text-muted-foreground">Heavy smokers may need higher doses or combination therapy.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Side Effects</h3>
                        <p className="text-sm text-muted-foreground">Consider potential side effects of different forms.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <DollarSign className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Cost</h3>
                        <p className="text-sm text-muted-foreground">Compare prices and check if insurance covers your preferred option.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Heart className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Personal Preference</h3>
                        <p className="text-sm text-muted-foreground">Choose an option you'll be comfortable using consistently.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <ShieldQuestion className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Medical Considerations</h3>
                        <p className="text-sm text-muted-foreground">Certain medical conditions may affect which NRT is suitable.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="patches">
          <div className="grid gap-6">
            <Card>
              <div className="md:flex">
                <div className="md:w-1/3 bg-fresh-50 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-sm">
                      <Pill className="h-12 w-12 text-fresh-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-fresh-700">Nicotine Patches</h2>
                    <p className="text-fresh-600 mt-2">Consistent, all-day nicotine delivery</p>
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <p className="mb-4">
                    Nicotine patches are adhesive patches that deliver nicotine through the skin at a steady rate. 
                    They provide a consistent level of nicotine throughout the day, helping to reduce cravings and withdrawal symptoms.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Strength Options</p>
                      <p className="font-medium">7mg, 14mg, 21mg</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">16-24 hours</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Typical Treatment</p>
                      <p className="font-medium">8-12 weeks</p>
                    </div>
                  </div>
                  <p>
                    Patches are available in different strengths, allowing for a gradual reduction in nicotine intake over time. 
                    They're discreet, easy to use, and particularly helpful for those who smoke consistently throughout the day.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ThumbsUp className="h-5 w-5 text-green-500 mr-2" />
                    Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Easy to use and discreet</li>
                    <li>Provides consistent nicotine delivery</li>
                    <li>Only needs to be applied once daily</li>
                    <li>Available in multiple strengths</li>
                    <li>Can be used with other NRT forms</li>
                    <li>Doesn't require active use throughout the day</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ThumbsDown className="h-5 w-5 text-red-500 mr-2" />
                    Disadvantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>May cause skin irritation</li>
                    <li>Cannot adjust nicotine intake during the day</li>
                    <li>Doesn't address hand-to-mouth habit</li>
                    <li>May cause vivid dreams when worn overnight</li>
                    <li>Not suitable for those with certain skin conditions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CircleHelp className="h-5 w-5 text-blue-500 mr-2" />
                    Usage Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Apply to clean, dry, hairless skin</li>
                    <li>Rotate application sites to prevent irritation</li>
                    <li>Use the highest appropriate strength initially</li>
                    <li>Consider removing before sleep if experiencing vivid dreams</li>
                    <li>Combine with short-acting NRT for breakthrough cravings</li>
                    <li>Dispose of used patches carefully, away from children</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How to Use Patches Effectively</AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal pl-5 space-y-3">
                    <li>
                      <strong>Select the right strength:</strong> Heavy smokers (more than 20 cigarettes daily) typically start with 21mg patches, moderate smokers (10-20 daily) with 14mg, and light smokers (less than 10 daily) with 7mg.
                    </li>
                    <li>
                      <strong>Apply correctly:</strong> Apply to a clean, dry, non-hairy area of skin, typically on the upper body or outer arm. Press firmly for 10-15 seconds to ensure adhesion.
                    </li>
                    <li>
                      <strong>Change daily:</strong> Replace with a new patch at approximately the same time each day.
                    </li>
                    <li>
                      <strong>Rotate sites:</strong> Use a different skin site each day to minimize irritation.
                    </li>
                    <li>
                      <strong>Follow the step-down approach:</strong> Typically use high strength patches for 4-6 weeks, medium strength for 2-4 weeks, and low strength for 2-4 weeks.
                    </li>
                    <li>
                      <strong>Consider timing:</strong> 24-hour patches provide around-the-clock protection, but may cause sleep disturbances. 16-hour patches (removed at bedtime) may be preferable if you experience vivid dreams or sleep issues.
                    </li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Frequently Asked Questions</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Can I smoke while using patches?</h4>
                      <p className="text-sm text-muted-foreground">No, you should not smoke while using patches as this could lead to nicotine overdose. Patches are designed to replace cigarettes, not supplement them.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">What if the patch falls off?</h4>
                      <p className="text-sm text-muted-foreground">Apply a new patch if this happens early in the day. Secure patches with medical tape if they consistently come loose.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Can I cut patches to reduce the dosage?</h4>
                      <p className="text-sm text-muted-foreground">No, never cut patches as this can affect how the nicotine is released and may cause it to release too quickly.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">What about skin irritation?</h4>
                      <p className="text-sm text-muted-foreground">If you experience irritation, try a different brand or use hydrocortisone cream on affected areas (after removing the patch).</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Can I use patches with other NRT products?</h4>
                      <p className="text-sm text-muted-foreground">Yes, combining patches with faster-acting forms like gum or lozenges is often recommended for managing breakthrough cravings.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
        
        <TabsContent value="gum">
          <div className="grid gap-6">
            <Card>
              <div className="md:flex">
                <div className="md:w-1/3 bg-fresh-50 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-sm">
                      <PillIcon className="h-12 w-12 text-fresh-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-fresh-700">Nicotine Gum</h2>
                    <p className="text-fresh-600 mt-2">Quick-acting relief for sudden cravings</p>
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <p className="mb-4">
                    Nicotine gum is a chewing gum that releases nicotine when chewed. It provides quick relief from cravings
                    and allows you to control your nicotine intake throughout the day. The gum works by releasing nicotine 
                    that is absorbed through the lining of your mouth.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Strength Options</p>
                      <p className="font-medium">2mg, 4mg</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Effect Duration</p>
                      <p className="font-medium">30-60 minutes</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Typical Treatment</p>
                      <p className="font-medium">12 weeks</p>
                    </div>
                  </div>
                  <p>
                    Nicotine gum comes in various flavors and two strengths. It's best suited for those who want control 
                    over their nicotine intake and appreciate having something to do with their mouth and hands.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ThumbsUp className="h-5 w-5 text-green-500 mr-2" />
                    Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Fast-acting for immediate craving relief</li>
                    <li>User controls nicotine intake</li>
                    <li>Available in multiple flavors</li>
                    <li>Addresses oral fixation aspect of smoking</li>
                    <li>Can be used as needed throughout the day</li>
                    <li>Discreet and portable</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ThumbsDown className="h-5 w-5 text-red-500 mr-2" />
                    Disadvantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Requires proper chewing technique</li>
                    <li>May cause jaw soreness</li>
                    <li>Can lead to hiccups, heartburn, or nausea</li>
                    <li>Not suitable for denture wearers</li>
                    <li>Some people dislike the taste</li>
                    <li>Requires consistent use for effectiveness</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CircleHelp className="h-5 w-5 text-blue-500 mr-2" />
                    Usage Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Use the "chew and park" method (explained below)</li>
                    <li>Don't drink acidic beverages 15 minutes before/during use</li>
                    <li>Start with one piece every 1-2 hours</li>
                    <li>Use for about 12 weeks, gradually reducing</li>
                    <li>Heavy smokers should use 4mg strength</li>
                    <li>Don't chew more than 24 pieces per day</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How to Use Nicotine Gum Correctly</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p>Nicotine gum is not used like regular chewing gum. For best results, follow the "chew and park" method:</p>
                    
                    <ol className="list-decimal pl-5 space-y-3">
                      <li>
                        <strong>Chew slowly:</strong> Chew the gum slowly until you notice a tingling sensation or peppery taste (about 15 chews).
                      </li>
                      <li>
                        <strong>"Park" the gum:</strong> Stop chewing and place ("park") the gum between your cheek and gums.
                      </li>
                      <li>
                        <strong>Wait:</strong> Leave it there until the tingling/taste fades (about 1 minute).
                      </li>
                      <li>
                        <strong>Repeat:</strong> Chew again briefly until the sensation returns, then park it in a different spot.
                      </li>
                      <li>
                        <strong>Continue:</strong> Continue this process for about 30 minutes until the gum no longer produces the tingling sensation.
                      </li>
                    </ol>

                    <div className="bg-blue-50 p-4 rounded-md">
                      <h4 className="font-medium text-blue-700 mb-2">Why this method matters</h4>
                      <p className="text-sm">
                        Continuous chewing releases the nicotine too quickly and can cause side effects like hiccups, 
                        heartburn, and nausea. It also means the nicotine is mostly swallowed rather than absorbed 
                        through the mouth lining, making the gum less effective.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Frequently Asked Questions</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Can I use nicotine gum while still smoking?</h4>
                      <p className="text-sm text-muted-foreground">No, you should quit smoking completely before using nicotine gum to avoid nicotine overdose.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">How many pieces of gum should I use daily?</h4>
                      <p className="text-sm text-muted-foreground">Most people need about 8-12 pieces per day initially. Don't exceed 24 pieces in one day.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Which strength should I choose?</h4>
                      <p className="text-sm text-muted-foreground">If you smoke 25+ cigarettes daily or smoke within 30 minutes of waking, use 4mg. Otherwise, 2mg is typically suitable.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Can I use gum with other NRT products?</h4>
                      <p className="text-sm text-muted-foreground">Yes, nicotine gum can be combined with patches for better craving control. This is called combination therapy.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Can I become addicted to nicotine gum?</h4>
                      <p className="text-sm text-muted-foreground">It's possible but uncommon. Follow the recommended duration and gradually reduce usage to minimize this risk.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
        
        <TabsContent value="lozenges">
          <div className="grid gap-6">
            <Card>
              <div className="md:flex">
                <div className="md:w-1/3 bg-fresh-50 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-sm">
                      <Pill className="h-12 w-12 text-fresh-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-fresh-700">Nicotine Lozenges</h2>
                    <p className="text-fresh-600 mt-2">Discreet, controlled nicotine delivery</p>
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <p className="mb-4">
                    Nicotine lozenges are tablets that dissolve slowly in the mouth, releasing nicotine that is absorbed through the lining of the mouth. 
                    They provide discreet, controlled nicotine delivery without the need for chewing.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Strength Options</p>
                      <p className="font-medium">2mg, 4mg</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Effect Duration</p>
                      <p className="font-medium">20-30 minutes</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Typical Treatment</p>
                      <p className="font-medium">12 weeks</p>
                    </div>
                  </div>
                  <p>
                    Lozenges are similar to nicotine gum in usage but don't require chewing. They come in various flavors and two strengths, 
                    making them a good option for those who prefer not to chew gum or have dental issues.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ThumbsUp className="h-5 w-5 text-green-500 mr-2" />
                    Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Easy to use and discreet</li>
                    <li>No chewing required</li>
                    <li>Suitable for people with dental work</li>
                    <li>Available in multiple flavors</li>
                    <li>Quick-acting for craving relief</li>
                    <li>User controls nicotine intake</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ThumbsDown className="h-5 w-5 text-red-500 mr-2" />
                    Disadvantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Can cause hiccups or heartburn</li>
                    <li>Taste may be unpleasant for some</li>
                    <li>Requires proper usage technique</li>
                    <li>Can't eat or drink while using</li>
                    <li>Slightly more expensive than gum</li>
                    <li>Requires consistent use throughout day</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CircleHelp className="h-5 w-5 text-blue-500 mr-2" />
                    Usage Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Allow lozenge to dissolve slowly (20-30 minutes)</li>
                    <li>Don't chew or swallow the lozenge</li>
                    <li>Move lozenge around mouth occasionally</li>
                    <li>Don't drink acidic beverages 15 minutes before/during</li>
                    <li>Use one lozenge every 1-2 hours initially</li>
                    <li>Maximum of 15 lozenges per day</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How to Use Lozenges Effectively</AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal pl-5 space-y-3">
                    <li>
                      <strong>Place in mouth:</strong> Place the lozenge in your mouth and allow it to dissolve slowly over 20-30 minutes.
                    </li>
                    <li>
                      <strong>Move occasionally:</strong> Periodically move the lozenge from one side of your mouth to the other.
                    </li>
                    <li>
                      <strong>Don't chew or swallow:</strong> Chewing will release the nicotine too quickly and may cause stomach upset. Swallowing reduces effectiveness as nicotine needs to be absorbed through the mouth lining.
                    </li>
                    <li>
                      <strong>Avoid eating and drinking:</strong> Do not eat or drink (especially acidic beverages) for 15 minutes before using or while the lozenge is in your mouth.
                    </li>
                    <li>
                      <strong>Use regularly:</strong> Use one lozenge every 1-2 hours during the first six weeks, then gradually reduce frequency over the following six weeks.
                    </li>
                    <li>
                      <strong>Choose the right strength:</strong> Use 4mg lozenges if you smoke within 30 minutes of waking; otherwise, use 2mg.
                    </li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Frequently Asked Questions</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Are lozenges better than gum?</h4>
                      <p className="text-sm text-muted-foreground">Neither is better - it's about personal preference. Lozenges are easier for those with dental work or who dislike chewing, while gum may better address the oral fixation aspect of smoking.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">How quickly do lozenges work?</h4>
                      <p className="text-sm text-muted-foreground">Lozenges begin to relieve cravings within minutes, with full effect in about 10-15 minutes.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Can I use lozenges with patches?</h4>
                      <p className="text-sm text-muted-foreground">Yes, this combination therapy is often recommended. Patches provide consistent background nicotine while lozenges address breakthrough cravings.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">How long should I use lozenges?</h4>
                      <p className="text-sm text-muted-foreground">Typically 12 weeks total - 6 weeks of regular use followed by 6 weeks of gradually decreasing use.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">What if I get hiccups or heartburn?</h4>
                      <p className="text-sm text-muted-foreground">This usually means you're dissolving the lozenge too quickly or swallowing too much nicotine. Try using the lozenge more slowly and avoid swallowing often while it's in your mouth.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
        
        <TabsContent value="inhalers">
          <div className="grid gap-6">
            <Card>
              <div className="md:flex">
                <div className="md:w-1/3 bg-fresh-50 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-sm">
                      <PillIcon className="h-12 w-12 text-fresh-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-fresh-700">Nicotine Inhalers</h2>
                    <p className="text-fresh-600 mt-2">Hand-to-mouth ritual replacement</p>
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <p className="mb-4">
                    Nicotine inhalers consist of a mouthpiece and cartridges containing nicotine. They mimic the hand-to-mouth 
                    action of smoking while delivering nicotine that's absorbed primarily through the mouth and throat, not the lungs.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Nicotine per Cartridge</p>
                      <p className="font-medium">~4mg (delivers ~2mg)</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Cartridge Duration</p>
                      <p className="font-medium">~20 minutes of active use</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Typical Treatment</p>
                      <p className="font-medium">12 weeks</p>
                    </div>
                  </div>
                  <p>
                    Inhalers are especially beneficial for those who miss the physical hand-to-mouth ritual of smoking. 
                    They provide both behavioral and pharmacological support for quitting.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ThumbsUp className="h-5 w-5 text-green-500 mr-2" />
                    Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Mimics hand-to-mouth smoking action</li>
                    <li>User controls nicotine intake</li>
                    <li>Addresses both behavioral and physical aspects</li>
                    <li>Relatively rapid craving relief</li>
                    <li>Can be used intermittently as needed</li>
                    <li>No smoke, tar, or carbon monoxide</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ThumbsDown className="h-5 w-5 text-red-500 mr-2" />
                    Disadvantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Less discreet than other NRT forms</li>
                    <li>May cause mouth/throat irritation</li>
                    <li>More expensive than gum or lozenges</li>
                    <li>Requires frequent use for effectiveness</li>
                    <li>Temperature sensitive (less effective in cold)</li>
                    <li>Not available over-the-counter in all countries</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CircleHelp className="h-5 w-5 text-blue-500 mr-2" />
                    Usage Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Puff frequently for best results</li>
                    <li>Use warm environment (60°F+) for optimal delivery</li>
                    <li>Use 6-12 cartridges daily for first 6 weeks</li>
                    <li>Take shallow puffs (not deep lung inhalations)</li>
                    <li>Consider combination with patches</li>
                    <li>Store unused cartridges securely at room temperature</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How to Use Nicotine Inhalers</AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal pl-5 space-y-3">
                    <li>
                      <strong>Assemble the inhaler:</strong> Insert a nicotine cartridge into the mouthpiece according to the product instructions.
                    </li>
                    <li>
                      <strong>Puff frequently:</strong> Take frequent, shallow puffs for about 20 minutes. Each cartridge provides about 400 puffs.
                    </li>
                    <li>
                      <strong>Use proper technique:</strong> Unlike smoking, do not inhale deeply into your lungs. The nicotine is absorbed primarily through the lining of your mouth and throat.
                    </li>
                    <li>
                      <strong>Use enough cartridges:</strong> Most people need 6-12 cartridges per day during the first 6 weeks to effectively control cravings.
                    </li>
                    <li>
                      <strong>Follow the step-down approach:</strong> Use regularly for 6 weeks, then gradually reduce use over the next 6 weeks.
                    </li>
                    <li>
                      <strong>Consider temperature:</strong> The inhaler works best in warm environments (above 60°F). In colder temperatures, consider warming the cartridge in your hands before use.
                    </li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Frequently Asked Questions</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Is the inhaler like an e-cigarette?</h4>
                      <p className="text-sm text-muted-foreground">No, the inhaler doesn't heat or vaporize anything. It simply allows nicotine to be absorbed through the lining of the mouth and throat as you puff.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">How quickly will it relieve my cravings?</h4>
                      <p className="text-sm text-muted-foreground">It typically takes about 10-15 minutes of use to significantly reduce cravings, slower than cigarettes but faster than patches.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">How many cartridges should I use daily?</h4>
                      <p className="text-sm text-muted-foreground">Most users need 6-12 cartridges per day initially to effectively manage cravings.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Can I use it with other NRT products?</h4>
                      <p className="text-sm text-muted-foreground">Yes, the inhaler works well with patches. The patch provides baseline nicotine levels while the inhaler addresses breakthrough cravings and behavioral aspects.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Why am I not getting enough relief?</h4>
                      <p className="text-sm text-muted-foreground">You may need to use it more frequently, ensure you're using it in a warm enough environment, or consider combination therapy with patches.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
        
        <TabsContent value="spray">
          <div className="grid gap-6">
            <Card>
              <div className="md:flex">
                <div className="md:w-1/3 bg-fresh-50 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-sm">
                      <PillIcon className="h-12 w-12 text-fresh-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-fresh-700">Nicotine Spray</h2>
                    <p className="text-fresh-600 mt-2">Fastest-acting NRT option</p>
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <p className="mb-4">
                    Nicotine spray delivers nicotine through a fine mist sprayed into the mouth or nose. It provides the fastest nicotine 
                    delivery of all NRT products, making it particularly effective for intense cravings.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Nicotine per Spray</p>
                      <p className="font-medium">~1mg (mouth spray)</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Speed of Action</p>
                      <p className="font-medium">30-60 seconds</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Typical Treatment</p>
                      <p className="font-medium">12 weeks</p>
                    </div>
                  </div>
                  <p>
                    Nicotine spray comes in two forms: mouth (oromucosal) spray and nasal spray. Both provide rapid relief for intense 
                    cravings, but nasal spray acts faster while mouth spray is generally more acceptable to users.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ThumbsUp className="h-5 w-5 text-green-500 mr-2" />
                    Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Fastest acting NRT option</li>
                    <li>Provides rapid relief for intense cravings</li>
                    <li>User controls nicotine intake</li>
                    <li>Discreet and portable</li>
                    <li>Mimics quick delivery of smoking</li>
                    <li>No chewing or dissolving required</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ThumbsDown className="h-5 w-5 text-red-500 mr-2" />
                    Disadvantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Can cause throat or nasal irritation</li>
                    <li>Nasal spray may cause sneezing, watery eyes</li>
                    <li>Some users dislike taste or sensation</li>
                    <li>More expensive than some other NRT options</li>
                    <li>Higher dependency potential than other forms</li>
                    <li>Not suitable for those with nasal/sinus conditions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CircleHelp className="h-5 w-5 text-blue-500 mr-2" />
                    Usage Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Don't inhale while spraying (mouth spray)</li>
                    <li>Don't swallow for a few seconds after spraying</li>
                    <li>Avoid eating or drinking for 15 minutes before/after</li>
                    <li>Use 1-2 sprays per craving</li>
                    <li>Maximum of 4 sprays per hour or 64 per day</li>
                    <li>For nasal spray: tilt head back slightly when applying</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How to Use Nicotine Spray Effectively</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Mouth (Oromucosal) Spray</h4>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Point the spray nozzle as close as possible to your open mouth.</li>
                        <li>Press the top of the dispenser to release one spray into your mouth, avoiding the lips.</li>
                        <li>Don't inhale while spraying to avoid getting the spray down your throat.</li>
                        <li>For best results, don't swallow for a few seconds after spraying.</li>
                        <li>If you still have a craving after a few minutes, you can use a second spray.</li>
                        <li>Don't use more than 2 sprays at once, 4 sprays per hour, or 64 sprays per day.</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Nasal Spray</h4>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Tilt your head back slightly.</li>
                        <li>Insert the tip of the bottle into one nostril, pointing toward the back of your nose.</li>
                        <li>Press firmly and quickly for one spray.</li>
                        <li>If using two sprays, repeat in the other nostril.</li>
                        <li>Don't sniff, swallow, or inhale through your nose as you spray.</li>
                        <li>Limit to 5 doses (10 sprays) per hour or 40 sprays per day.</li>
                      </ol>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-md">
                      <h4 className="font-medium text-blue-700 mb-2">Treatment Schedule</h4>
                      <p className="text-sm mb-2">
                        For both types of spray, follow this general schedule:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Weeks 1-6: Use regularly to control cravings</li>
                        <li>Weeks 7-9: Begin to reduce the number of sprays per day</li>
                        <li>Weeks 10-12: Continue gradually reducing usage</li>
                        <li>After week 12: Discontinue use (consult healthcare provider if difficulty stopping)</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Frequently Asked Questions</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Why does the spray burn or taste unpleasant?</h4>
                      <p className="text-sm text-muted-foreground">This is normal, especially with initial use. Most users find that the sensation diminishes with continued use as your body adapts.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Which is better: mouth spray or nasal spray?</h4>
                      <p className="text-sm text-muted-foreground">Nasal spray acts slightly faster but causes more initial irritation. Mouth spray is generally better tolerated but acts a bit more slowly. The choice depends on personal preference.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Can I use spray with other NRT products?</h4>
                      <p className="text-sm text-muted-foreground">Yes, combining spray with patches is often effective. The patch provides baseline nicotine while the spray addresses breakthrough cravings.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Is it addictive?</h4>
                      <p className="text-sm text-muted-foreground">While all NRT products contain nicotine, the risk of dependence is lower than with cigarettes. However, sprays have slightly higher dependency potential than other NRT forms due to their rapid delivery.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">What if I get hiccups or heartburn?</h4>
                      <p className="text-sm text-muted-foreground">Try not to swallow the spray. Wait longer before swallowing after spraying. If symptoms persist, consider trying a different NRT product.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 p-6 bg-fresh-50 border border-fresh-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Ready to start your fresh journey?</h2>
        <div className="space-y-2">
          <p>Mission Fresh provides personalized support for your nicotine-free journey, whether you choose to use NRT or other methods.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <a href="/app/dashboard" className="inline-flex items-center justify-center rounded-md bg-fresh-300 hover:bg-fresh-400 text-white px-4 py-2">
              Get Started
            </a>
            <a href="/tools/smokeless-directory" className="inline-flex items-center justify-center rounded-md border border-fresh-200 bg-white hover:bg-fresh-50 px-4 py-2">
              Explore Smokeless Alternatives
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NRTGuide;
