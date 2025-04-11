
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Goals = () => {
  const [goalType, setGoalType] = useState<"afresh" | "fresher">("afresh");
  const [method, setMethod] = useState("cold-turkey");
  const [product, setProduct] = useState("cigarette");
  const [quitDate, setQuitDate] = useState<Date | undefined>(new Date());
  const [reduction, setReduction] = useState("50");
  const [timeline, setTimeline] = useState("30");
  const [motivation, setMotivation] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here we would save the goal to Supabase
    console.log({
      goalType,
      method,
      product,
      quitDate,
      reduction: parseInt(reduction),
      timeline: parseInt(timeline),
      motivation
    });
    
    toast.success("Your goals have been updated!", {
      description: "We'll use these to personalize your journey."
    });
  };
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Fresh Journey Goals</h1>
        <p className="text-muted-foreground">
          Define and customize your path to success
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Primary Goal</CardTitle>
              <CardDescription>Choose your main objective</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={goalType} 
                onValueChange={(value) => setGoalType(value as "afresh" | "fresher")}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-muted">
                  <RadioGroupItem value="afresh" id="afresh" />
                  <Label htmlFor="afresh" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Staying Afresh</div>
                    <div className="text-sm text-muted-foreground">
                      Complete abstinence from nicotine products
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-muted">
                  <RadioGroupItem value="fresher" id="fresher" />
                  <Label htmlFor="fresher" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Staying Fresher</div>
                    <div className="text-sm text-muted-foreground">
                      Reducing nicotine intake over time
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Method</CardTitle>
              <CardDescription>Select your preferred approach</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cold-turkey">Cold Turkey</SelectItem>
                  <SelectItem value="gradual-reduction">Gradual Reduction</SelectItem>
                  <SelectItem value="tapering">Tapering Schedule</SelectItem>
                  <SelectItem value="nrt">NRT Assisted</SelectItem>
                  <SelectItem value="harm-reduction">Harm Reduction</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="mt-6">
                {method === "cold-turkey" && (
                  <div className="space-y-4">
                    <Label>Quit Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !quitDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {quitDate ? format(quitDate, "PPP") : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={quitDate}
                          onSelect={setQuitDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
                
                {method === "gradual-reduction" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="reduction">Target Reduction (%)</Label>
                      <Input 
                        id="reduction" 
                        type="number" 
                        min="1" 
                        max="99" 
                        value={reduction} 
                        onChange={(e) => setReduction(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="timeline">Timeline (days)</Label>
                      <Input 
                        id="timeline" 
                        type="number" 
                        min="1" 
                        max="365" 
                        value={timeline} 
                        onChange={(e) => setTimeline(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                
                {method === "tapering" && (
                  <div className="text-muted-foreground">
                    Set up a custom tapering schedule in the next step after saving your goals.
                  </div>
                )}
                
                {method === "nrt" && (
                  <div className="text-muted-foreground">
                    After saving, you'll be able to select your preferred NRT products and set up your protocol.
                  </div>
                )}
                
                {method === "harm-reduction" && (
                  <div className="text-muted-foreground">
                    Focus on reducing harm while maintaining some nicotine use. You'll be able to set specific targets after saving.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>Tell us what you're using</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={product} onValueChange={setProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cigarette">Cigarette</SelectItem>
                  <SelectItem value="vape">Vape</SelectItem>
                  <SelectItem value="pouch">Nicotine Pouch</SelectItem>
                  <SelectItem value="gum">Nicotine Gum</SelectItem>
                  <SelectItem value="patch">Nicotine Patch</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Motivation</CardTitle>
              <CardDescription>Remind yourself why you're on this journey</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Why do you want to stay afresh or fresher? What benefits are you looking forward to?" 
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                className="min-h-[120px]"
              />
            </CardContent>
          </Card>
          
          <Button type="submit" className="w-full md:w-auto bg-fresh-300 hover:bg-fresh-400">
            Save Goals
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Goals;
