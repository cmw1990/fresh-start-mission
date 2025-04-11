
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const LogEntry = () => {
  const [nicotineUse, setNicotineUse] = useState<"yes" | "no">("no");
  const [productType, setProductType] = useState("cigarette");
  const [quantity, setQuantity] = useState("0");
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [focus, setFocus] = useState(3);
  const [sleepHours, setSleepHours] = useState("7");
  const [sleepQuality, setSleepQuality] = useState(3);
  const [cravingIntensity, setCravingIntensity] = useState(5);
  const [cravingTrigger, setCravingTrigger] = useState("stress");
  const [journal, setJournal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally send the data to an API
    console.log({
      nicotineUse,
      productType: nicotineUse === "yes" ? productType : null,
      quantity: nicotineUse === "yes" ? quantity : "0",
      mood,
      energy,
      focus,
      sleepHours,
      sleepQuality,
      cravingIntensity,
      cravingTrigger,
      journal,
      date: new Date().toISOString(),
    });

    toast.success("Your entry has been logged successfully!", {
      description: "Keep up the great work on your fresh journey!",
    });
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Daily Log Entry</h1>
        <p className="text-muted-foreground">
          Track your progress and how you're feeling today
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Tabs defaultValue="nicotine" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="nicotine">Nicotine Use</TabsTrigger>
              <TabsTrigger value="wellness">Wellness</TabsTrigger>
              <TabsTrigger value="cravings">Cravings</TabsTrigger>
              <TabsTrigger value="journal">Journal</TabsTrigger>
            </TabsList>

            <TabsContent value="nicotine" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Nicotine Use</CardTitle>
                  <CardDescription>
                    Log any nicotine products you used today
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Did you use any nicotine products today?</Label>
                    <div className="flex gap-4">
                      <Button 
                        type="button"
                        variant={nicotineUse === "no" ? "default" : "outline"}
                        className={nicotineUse === "no" ? "bg-fresh-300 hover:bg-fresh-400" : ""}
                        onClick={() => setNicotineUse("no")}
                      >
                        No
                      </Button>
                      <Button 
                        type="button"
                        variant={nicotineUse === "yes" ? "default" : "outline"}
                        className={nicotineUse === "yes" ? "bg-fresh-300 hover:bg-fresh-400" : ""}
                        onClick={() => setNicotineUse("yes")}
                      >
                        Yes
                      </Button>
                    </div>
                  </div>

                  {nicotineUse === "yes" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="product-type">Type of Product</Label>
                        <Select value={productType} onValueChange={setProductType}>
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
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="quantity">
                          {productType === "cigarette" 
                            ? "Number of cigarettes" 
                            : productType === "vape" 
                              ? "Approximate puffs" 
                              : "Quantity"}
                        </Label>
                        <Input 
                          id="quantity" 
                          type="number" 
                          min="0" 
                          value={quantity} 
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wellness" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Holistic Wellness</CardTitle>
                  <CardDescription>
                    Track your mood, energy, focus, and sleep
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>
                      Mood (1-5): {mood === 1 ? "Very Low" : mood === 2 ? "Low" : mood === 3 ? "Neutral" : mood === 4 ? "Good" : "Excellent"}
                    </Label>
                    <Slider 
                      value={[mood]} 
                      min={1} 
                      max={5} 
                      step={1} 
                      onValueChange={(value) => setMood(value[0])}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>
                      Energy (1-5): {energy === 1 ? "Very Low" : energy === 2 ? "Low" : energy === 3 ? "Moderate" : energy === 4 ? "High" : "Very High"}
                    </Label>
                    <Slider 
                      value={[energy]} 
                      min={1} 
                      max={5} 
                      step={1} 
                      onValueChange={(value) => setEnergy(value[0])}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>
                      Focus (1-5): {focus === 1 ? "Very Poor" : focus === 2 ? "Poor" : focus === 3 ? "Moderate" : focus === 4 ? "Good" : "Excellent"}
                    </Label>
                    <Slider 
                      value={[focus]} 
                      min={1} 
                      max={5} 
                      step={1} 
                      onValueChange={(value) => setFocus(value[0])}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sleep-hours">Hours of Sleep</Label>
                      <Input 
                        id="sleep-hours" 
                        type="number" 
                        min="0" 
                        max="24" 
                        step="0.5" 
                        value={sleepHours} 
                        onChange={(e) => setSleepHours(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Sleep Quality (1-5): {sleepQuality === 1 ? "Very Poor" : sleepQuality === 2 ? "Poor" : sleepQuality === 3 ? "Fair" : sleepQuality === 4 ? "Good" : "Excellent"}
                      </Label>
                      <Slider 
                        value={[sleepQuality]} 
                        min={1} 
                        max={5} 
                        step={1} 
                        onValueChange={(value) => setSleepQuality(value[0])}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cravings" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Craving Log</CardTitle>
                  <CardDescription>
                    Record details about your cravings today
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <Label>
                      Craving Intensity (1-10): {cravingIntensity === 1 ? "Very Mild" : cravingIntensity <= 3 ? "Mild" : cravingIntensity <= 6 ? "Moderate" : cravingIntensity <= 8 ? "Strong" : "Very Strong"}
                    </Label>
                    <Slider 
                      value={[cravingIntensity]} 
                      min={1} 
                      max={10} 
                      step={1} 
                      onValueChange={(value) => setCravingIntensity(value[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="craving-trigger">Main Trigger</Label>
                    <Select value={cravingTrigger} onValueChange={setCravingTrigger}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select trigger" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stress">Stress</SelectItem>
                        <SelectItem value="boredom">Boredom</SelectItem>
                        <SelectItem value="social">Social Situation</SelectItem>
                        <SelectItem value="food">After Eating</SelectItem>
                        <SelectItem value="alcohol">Alcohol</SelectItem>
                        <SelectItem value="coffee">Coffee/Caffeine</SelectItem>
                        <SelectItem value="emotional">Emotional State</SelectItem>
                        <SelectItem value="routine">Daily Routine</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="journal" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Journal</CardTitle>
                  <CardDescription>
                    Record your thoughts and reflections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    placeholder="How are you feeling today? Any insights or reflections?" 
                    className="min-h-[200px]"
                    value={journal}
                    onChange={(e) => setJournal(e.target.value)}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Button 
            type="submit" 
            className="w-full md:w-auto bg-fresh-300 hover:bg-fresh-400"
          >
            Save Log Entry
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LogEntry;
