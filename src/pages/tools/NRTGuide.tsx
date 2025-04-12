
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Medicinal, CirclePlus, Gauge, Clock, AlertCircle, ShieldCheck, DollarSign, Pills, CheckCircle, XCircle } from "lucide-react";

const NRTGuide = () => {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">NRT Guide</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive guide to Nicotine Replacement Therapy options
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2.5 rounded-full">
                <Medicinal className="h-5 w-5 text-blue-500" />
              </div>
              <CardTitle className="text-lg">What is NRT?</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Nicotine Replacement Therapy (NRT) products provide nicotine without the harmful chemicals found in cigarette smoke, helping reduce withdrawal symptoms and cravings.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-2.5 rounded-full">
                <CirclePlus className="h-5 w-5 text-green-500" />
              </div>
              <CardTitle className="text-lg">Benefits of NRT</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Research shows NRT can increase your chances of quitting successfully by 50-60% compared to quitting without support.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 p-2.5 rounded-full">
                <Gauge className="h-5 w-5 text-purple-500" />
              </div>
              <CardTitle className="text-lg">Effectiveness</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Most effective when used correctly, combined with behavioral support, and when the right product is chosen for your smoking habits.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="types">NRT Types</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-8">
          <div className="prose max-w-none">
            <h2>How Nicotine Replacement Therapy Works</h2>
            <p>
              Nicotine Replacement Therapy works by providing your body with nicotine without the thousands of harmful chemicals found in tobacco smoke. By delivering controlled doses of nicotine, NRT helps reduce withdrawal symptoms and cravings while you break the behavioral habits associated with smoking.
            </p>
            
            <h3>Key Benefits of Using NRT</h3>
            <ul>
              <li><strong>Manages withdrawal symptoms</strong> including irritability, anxiety, difficulty concentrating, and strong cravings</li>
              <li><strong>Reduces physical dependence</strong> by gradually lowering nicotine intake over time</li>
              <li><strong>Separates nicotine delivery</strong> from the harmful ritual of smoking</li>
              <li><strong>Provides structure</strong> to the quitting process with clear dosing guidelines</li>
              <li><strong>Increases success rates</strong> compared to quitting "cold turkey"</li>
            </ul>
            
            <h3>Who Can Use NRT?</h3>
            <p>
              Most adults can safely use NRT products. However, you should consult with a healthcare provider before starting NRT if you:
            </p>
            <ul>
              <li>Are pregnant or breastfeeding</li>
              <li>Have heart disease or have recently had a heart attack</li>
              <li>Have uncontrolled high blood pressure</li>
              <li>Have diabetes</li>
              <li>Take prescription medications that may interact with nicotine</li>
              <li>Are under 18 years of age</li>
            </ul>
            
            <h3>Using NRT Effectively</h3>
            <p>
              To maximize your chances of success with NRT:
            </p>
            <ul>
              <li>Use the correct dosage based on your current nicotine consumption</li>
              <li>Follow the recommended schedule and duration (typically 8-12 weeks)</li>
              <li>Consider combining a long-acting NRT (patch) with a short-acting product (gum, lozenge) for breakthrough cravings</li>
              <li>Don't stop treatment too soon, even if cravings diminish</li>
              <li>Pair NRT with behavioral support or counseling</li>
            </ul>
            
            <div className="bg-blue-50 p-4 rounded-md my-6">
              <h4 className="text-blue-700 font-medium">Important Health Note</h4>
              <p className="text-blue-700 text-sm mb-0">
                While NRT contains nicotine, which is addictive, medical evidence clearly shows that NRT products are much safer than smoking. The health risks from continuing to smoke far outweigh any potential risks from using NRT.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="types" className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-blue-500">Long-acting</Badge>
                  Nicotine Patches
                </CardTitle>
                <CardDescription>Provides steady nicotine delivery over 16-24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">How to Use</h4>
                  <p className="text-sm text-muted-foreground">
                    Apply one patch daily to clean, dry, hair-free skin. Rotate application sites to prevent skin irritation. Available in different strengths based on how much you smoke.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Pros</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>Once-daily application</li>
                    <li>Provides steady nicotine level</li>
                    <li>Easy to use</li>
                    <li>Discreet</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Cons</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>May cause skin irritation</li>
                    <li>Cannot adjust for sudden cravings</li>
                    <li>May affect sleep if worn overnight</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Best For</h4>
                  <p className="text-sm text-muted-foreground">
                    Regular smokers who need consistent nicotine levels throughout the day. Often used in combination with a short-acting NRT.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm pt-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">16-24 hours</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">$30-60 / box</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-green-500">Short-acting</Badge>
                  Nicotine Gum
                </CardTitle>
                <CardDescription>Quick-release nicotine for immediate craving relief</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">How to Use</h4>
                  <p className="text-sm text-muted-foreground">
                    Chew slowly until you notice a tingling sensation, then place between cheek and gum. When tingle fades, repeat process. Avoid eating and drinking 15 minutes before and during use.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Pros</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>Fast-acting relief for sudden cravings</li>
                    <li>Can control dosage as needed</li>
                    <li>Oral satisfaction similar to smoking</li>
                    <li>Available in multiple flavors</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Cons</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>Specific chewing technique required</li>
                    <li>May cause jaw soreness</li>
                    <li>Can stick to dental work</li>
                    <li>Requires multiple doses throughout day</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Best For</h4>
                  <p className="text-sm text-muted-foreground">
                    Smokers who need something to do with their mouth or who have irregular cravings. Works well combined with patches.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm pt-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">30-60 minutes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">$25-50 / box</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-green-500">Short-acting</Badge>
                  Nicotine Lozenges
                </CardTitle>
                <CardDescription>Dissolve slowly in mouth for craving control</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">How to Use</h4>
                  <p className="text-sm text-muted-foreground">
                    Place lozenge in mouth and allow it to dissolve slowly (20-30 minutes). Move it occasionally from one side of the mouth to the other. Avoid eating and drinking while using.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Pros</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>No chewing required</li>
                    <li>Discreet to use</li>
                    <li>Fast-acting for craving relief</li>
                    <li>Good alternative if you have dental work</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Cons</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>May cause hiccups or heartburn</li>
                    <li>Needs to dissolve fully (no chewing/swallowing)</li>
                    <li>Multiple doses needed throughout day</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Best For</h4>
                  <p className="text-sm text-muted-foreground">
                    People who want a discreet option or those who find gum difficult to use. Easy to use in social or work settings.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm pt-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">20-30 minutes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">$35-60 / box</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-green-500">Short-acting</Badge>
                  Nicotine Inhalers
                </CardTitle>
                <CardDescription>Mimics hand-to-mouth action of smoking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">How to Use</h4>
                  <p className="text-sm text-muted-foreground">
                    Insert nicotine cartridge into the inhaler mouthpiece. Puff on the inhaler when you have a craving. Each cartridge lasts about 20 minutes of active puffing.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Pros</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>Mimics hand-to-mouth ritual of smoking</li>
                    <li>Quick craving relief</li>
                    <li>Can control intake based on need</li>
                    <li>Addresses behavioral aspects of addiction</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Cons</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>More expensive than some options</li>
                    <li>Not as discreet to use</li>
                    <li>May cause throat or mouth irritation</li>
                    <li>Requires prescription in some countries</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Best For</h4>
                  <p className="text-sm text-muted-foreground">
                    People who miss the hand-to-mouth action of smoking or who have strong behavioral associations with smoking.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm pt-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Variable</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">$40-60 / starter kit</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-green-500">Short-acting</Badge>
                  Nicotine Spray
                </CardTitle>
                <CardDescription>Fastest-acting NRT for immediate relief</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">How to Use</h4>
                  <p className="text-sm text-muted-foreground">
                    Spray directly into each nostril (nasal spray) or mouth (mouth spray) when a craving hits. Don't inhale, sniff, or swallow immediately after spraying.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Pros</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>Fastest nicotine delivery of all NRT products</li>
                    <li>Highly effective for intense cravings</li>
                    <li>Easy to carry and use</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Cons</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>Can cause nasal/throat irritation</li>
                    <li>May have unpleasant taste</li>
                    <li>Higher dependence potential than other NRTs</li>
                    <li>More expensive than some options</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Best For</h4>
                  <p className="text-sm text-muted-foreground">
                    Heavy smokers with strong cravings or those who need very rapid relief. Works well combined with patches.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm pt-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Minutes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">$50-70 / unit</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-purple-500">Combined</Badge>
                  Combination Therapy
                </CardTitle>
                <CardDescription>Multiple NRT products used together</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">How to Use</h4>
                  <p className="text-sm text-muted-foreground">
                    Typically involves using a long-acting product (patch) for background nicotine levels plus a short-acting product (gum, lozenge, spray) for breakthrough cravings.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Pros</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>Higher success rates than single NRT</li>
                    <li>Addresses both steady state and acute cravings</li>
                    <li>More closely mimics smoking patterns</li>
                    <li>Better control over symptoms</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Cons</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>More expensive</li>
                    <li>More complex to manage</li>
                    <li>Combined side effects possible</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Best For</h4>
                  <p className="text-sm text-muted-foreground">
                    Heavy smokers, those with a high nicotine dependence, or people who have failed with single NRT approaches in the past.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm pt-2">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Most effective</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Cost varies</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="comparison" className="space-y-6">
          <Table>
            <TableCaption>Comparison of NRT Options</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Speed of Effect</TableHead>
                <TableHead>Ease of Use</TableHead>
                <TableHead>Discretion</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Cost (30 days)</TableHead>
                <TableHead>Prescription</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Patch</TableCell>
                <TableCell>Slow (hours)</TableCell>
                <TableCell className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Easy
                </TableCell>
                <TableCell className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> High
                </TableCell>
                <TableCell>16-24 hours</TableCell>
                <TableCell>$100-180</TableCell>
                <TableCell>No</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Gum</TableCell>
                <TableCell>Medium (5-10 mins)</TableCell>
                <TableCell className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-1" /> Moderate
                </TableCell>
                <TableCell className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> High
                </TableCell>
                <TableCell>30-60 minutes</TableCell>
                <TableCell>$120-200</TableCell>
                <TableCell>No</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Lozenge</TableCell>
                <TableCell>Medium (5-10 mins)</TableCell>
                <TableCell className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Easy
                </TableCell>
                <TableCell className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> High
                </TableCell>
                <TableCell>20-30 minutes</TableCell>
                <TableCell>$140-220</TableCell>
                <TableCell>No</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Inhaler</TableCell>
                <TableCell>Medium (5-10 mins)</TableCell>
                <TableCell className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Easy
                </TableCell>
                <TableCell className="flex items-center">
                  <XCircle className="h-4 w-4 text-red-500 mr-1" /> Low
                </TableCell>
                <TableCell>Variable</TableCell>
                <TableCell>$180-300</TableCell>
                <TableCell>Sometimes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Spray</TableCell>
                <TableCell>Fast (1-2 mins)</TableCell>
                <TableCell className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Easy
                </TableCell>
                <TableCell className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-1" /> Moderate
                </TableCell>
                <TableCell>Minutes</TableCell>
                <TableCell>$200-300</TableCell>
                <TableCell>Sometimes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Combination</TableCell>
                <TableCell>Fast + Sustained</TableCell>
                <TableCell className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-1" /> Moderate
                </TableCell>
                <TableCell className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> High
                </TableCell>
                <TableCell>24 hours + as needed</TableCell>
                <TableCell>$200-400</TableCell>
                <TableCell>Sometimes</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          <div className="bg-muted p-4 rounded-md text-sm text-muted-foreground">
            <p>
              Note: Costs are approximate and may vary by region, brand, and insurance coverage. 
              Some products may be covered by health insurance plans, reducing out-of-pocket expenses.
            </p>
          </div>
          
          <div className="space-y-2 mt-6">
            <h3 className="text-xl font-semibold">Choosing the Right NRT</h3>
            <p className="text-muted-foreground">
              The best NRT option depends on your individual needs, preferences, and smoking patterns. 
              Consider these factors when choosing:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Gauge className="h-4 w-4 mr-2 text-fresh-500" />
                    Nicotine Dependence Level
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Heavy smokers (20+ cigarettes/day) may benefit from higher doses or combination therapy.
                    Light smokers might start with lower strengths.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-fresh-500" />
                    Craving Patterns
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Consistent cravings throughout the day? Consider patches. Unpredictable or situational cravings? 
                    Try gum, lozenges, or spray.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Pills className="h-4 w-4 mr-2 text-fresh-500" />
                    Physical Considerations
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Skin sensitivities might rule out patches. Dental work could make gum difficult. 
                    Asthma might affect inhaler use.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="faq" className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it safe to use multiple NRT products at the same time?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Yes, combination NRT therapy is not only safe but often more effective than using a single product alone. 
                  A common approach is to use a patch (providing steady background nicotine) along with a faster-acting product like gum or lozenges (for breakthrough cravings). 
                  Research shows this approach can increase your chances of quitting successfully.
                </p>
                <p className="text-muted-foreground mt-2">
                  Always follow package directions and consult with a healthcare provider if you have specific health concerns.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>How long should I use NRT products?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Most NRT products are designed for use over 8-12 weeks, with a gradual reduction in dosage as your body adjusts to lower nicotine levels. 
                  The typical recommendation is:
                </p>
                <ul className="text-muted-foreground list-disc pl-5 mt-2 space-y-1">
                  <li>Weeks 1-6: Full strength</li>
                  <li>Weeks 7-9: Reduced strength</li>
                  <li>Weeks 10-12: Lowest strength before stopping</li>
                </ul>
                <p className="text-muted-foreground mt-2">
                  However, there is no harm in using NRT for longer periods if it helps you stay away from cigarettes. It's safer to continue using NRT than to return to smoking.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I become addicted to NRT products?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  While NRT products contain nicotine, which is addictive, the risk of becoming dependent on NRT is much lower than with cigarettes. This is because:
                </p>
                <ul className="text-muted-foreground list-disc pl-5 mt-2 space-y-1">
                  <li>NRT delivers nicotine more slowly and at lower levels than cigarettes</li>
                  <li>NRT lacks the additional compounds in cigarettes that enhance nicotine's addictive properties</li>
                  <li>NRT is designed with a gradual reduction protocol</li>
                </ul>
                <p className="text-muted-foreground mt-2">
                  Some people may use NRT longer than the recommended period, but this is still considerably safer than returning to smoking. If concerned about long-term use, consult your healthcare provider.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I smoke while using NRT?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Ideally, you should stop smoking completely when you start using NRT. However, if you do smoke while using NRT:
                </p>
                <ul className="text-muted-foreground list-disc pl-5 mt-2 space-y-1">
                  <li>With patches: Remove the patch before smoking and wait several hours before applying a new one</li>
                  <li>With oral NRTs: Wait at least 15-30 minutes after smoking before using gum, lozenges, etc.</li>
                </ul>
                <p className="text-muted-foreground mt-2">
                  Some newer approaches actually encourage using NRT before your quit date to reduce smoking gradually. Discuss this "pre-loading" approach with your healthcare provider if you're struggling with an immediate, complete quit.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mt-3">
                  <p className="text-amber-700 text-sm font-medium">Safety Note:</p>
                  <p className="text-amber-700 text-sm">
                    Using NRT while smoking can lead to higher nicotine levels than your body is accustomed to, potentially causing nausea, headaches, or dizziness.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>Are there side effects from using NRT?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  NRT products can have some side effects, though they're generally mild and often less severe than withdrawal symptoms. Common side effects by product type:
                </p>
                <ul className="text-muted-foreground list-disc pl-5 mt-2 space-y-2">
                  <li><strong>Patches:</strong> Skin irritation, redness, itching; sleep disturbances or vivid dreams (with 24-hour patches)</li>
                  <li><strong>Gum:</strong> Mouth/jaw soreness, hiccups, indigestion, nausea</li>
                  <li><strong>Lozenges:</strong> Heartburn, nausea, hiccups, coughing</li>
                  <li><strong>Inhalers:</strong> Mouth/throat irritation, coughing</li>
                  <li><strong>Sprays:</strong> Nasal/throat irritation, runny nose, watery eyes, sneezing, coughing</li>
                </ul>
                <p className="text-muted-foreground mt-2">
                  Many side effects decrease after the first few days of use. If they persist or are severe, consult your healthcare provider about adjusting your dosage or trying a different NRT product.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger>Is NRT as effective for vaping cessation as for smoking?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  While NRT was originally designed for smoking cessation, it can also be helpful for people trying to quit vaping. However, there are some considerations:
                </p>
                <ul className="text-muted-foreground list-disc pl-5 mt-2 space-y-1">
                  <li>Some vapes deliver higher concentrations of nicotine than cigarettes, so adequate NRT dosing is important</li>
                  <li>Vaping behavior can be more frequent than smoking, making short-acting NRTs potentially more appropriate</li>
                  <li>The hand-to-mouth ritual of vaping might make inhalers a good option for some people</li>
                </ul>
                <p className="text-muted-foreground mt-2">
                  Research specifically on NRT for vaping cessation is still emerging. Work with a healthcare provider to develop a personalized plan for quitting vaping.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold mb-2">Need More Personalized Guidance?</h3>
            <p className="text-muted-foreground mb-4">
              For personalized advice on which NRT option is best for your specific situation, consider:
            </p>
            <ul className="text-muted-foreground list-disc pl-5 space-y-1">
              <li>Consulting with your healthcare provider</li>
              <li>Speaking with a pharmacist</li>
              <li>Calling a quitline (1-800-QUIT-NOW in the US)</li>
              <li>Setting up an appointment with a tobacco cessation specialist</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NRTGuide;
