import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { saveLogEntry } from "@/services/logService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import NicotineUseTab from "@/components/log/NicotineUseTab";
import WellnessTab from "@/components/log/WellnessTab";
import CravingsTab from "@/components/log/CravingsTab";
import JournalTab from "@/components/log/JournalTab";

const LogEntry = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to submit a log entry",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format the date in ISO format for storage
      const currentDate = new Date().toISOString().split('T')[0];
      
      await saveLogEntry({
        user_id: user.id,
        date: currentDate,
        used_nicotine: nicotineUse === "yes",
        product_type: nicotineUse === "yes" ? productType : undefined,
        quantity: nicotineUse === "yes" ? parseInt(quantity) : 0,
        mood,
        energy,
        focus,
        sleep_hours: parseFloat(sleepHours),
        sleep_quality: sleepQuality,
        craving_intensity: cravingIntensity,
        craving_trigger: cravingTrigger,
        journal: journal || undefined,
      });

      // Successfully saved entry
      toast({
        title: "Success!",
        description: "Your log entry has been saved successfully. Keep up the great work on your fresh journey!",
        variant: "default"
      });
      
      // Navigate back to dashboard after successful submission
      navigate('/app/dashboard');
    } catch (error) {
      console.error("Error saving log entry:", error);
      toast({
        title: "Error",
        description: "Failed to save your entry. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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

            <NicotineUseTab 
              nicotineUse={nicotineUse}
              setNicotineUse={setNicotineUse}
              productType={productType}
              setProductType={setProductType}
              quantity={quantity}
              setQuantity={setQuantity}
            />

            <WellnessTab
              mood={mood}
              setMood={setMood}
              energy={energy}
              setEnergy={setEnergy}
              focus={focus}
              setFocus={setFocus}
              sleepHours={sleepHours}
              setSleepHours={setSleepHours}
              sleepQuality={sleepQuality}
              setSleepQuality={setSleepQuality}
            />

            <CravingsTab
              cravingIntensity={cravingIntensity}
              setCravingIntensity={setCravingIntensity}
              cravingTrigger={cravingTrigger}
              setCravingTrigger={setCravingTrigger}
            />

            <JournalTab
              journal={journal}
              setJournal={setJournal}
            />
          </Tabs>

          <Button 
            type="submit" 
            className="w-full md:w-auto bg-fresh-300 hover:bg-fresh-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Log Entry"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LogEntry;
