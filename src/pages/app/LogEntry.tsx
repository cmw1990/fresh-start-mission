
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { saveLogEntry } from "@/services/logService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import NicotineUseTab from "@/components/log/NicotineUseTab";
import WellnessTab from "@/components/log/WellnessTab";
import CravingsTab from "@/components/log/CravingsTab";
import JournalTab from "@/components/log/JournalTab";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2, WifiOff } from "lucide-react";
import { validateData, logEntrySchema } from "@/lib/validation";
import { useHaptics, HapticImpact } from "@/hooks/useHaptics";
import { useOfflineSupport } from "@/hooks/useOfflineSupport";

const LogEntry = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { impact } = useHaptics();
  const { isOnline, saveOfflineData } = useOfflineSupport();
  
  // Nicotine use state
  const [nicotineUse, setNicotineUse] = useState<"yes" | "no">("no");
  const [productType, setProductType] = useState("cigarette");
  const [quantity, setQuantity] = useState("0");
  
  // Wellness metrics state
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [focus, setFocus] = useState(3);
  const [sleepHours, setSleepHours] = useState("7");
  const [sleepQuality, setSleepQuality] = useState(3);
  
  // Cravings state
  const [cravingIntensity, setCravingIntensity] = useState(5);
  const [cravingTrigger, setCravingTrigger] = useState("stress");
  
  // Journal state
  const [journal, setJournal] = useState("");
  
  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Clear any previous errors when form values change
  useEffect(() => {
    setValidationErrors({});
    setGeneralError(null);
  }, [nicotineUse, productType, quantity, mood, energy, focus, sleepHours, sleepQuality, cravingIntensity, cravingTrigger, journal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setGeneralError("You must be logged in to submit a log entry");
      return;
    }
    
    // Validate the form data
    const validationResult = validateData(logEntrySchema, {
      nicotineUse,
      productType: nicotineUse === "yes" ? productType : undefined,
      quantity: nicotineUse === "yes" ? quantity : undefined,
      mood,
      energy,
      focus,
      sleepHours,
      sleepQuality,
      cravingIntensity,
      cravingTrigger,
      journal,
    });
    
    if (!validationResult.success) {
      // Format and display validation errors
      const errors = validationResult.errors.format();
      setValidationErrors(errors);
      toast.error("Please fix the form errors before submitting");
      return;
    }
    
    setIsSubmitting(true);
    setValidationErrors({});
    setGeneralError(null);
    
    try {
      // Format the date in ISO format for storage
      const currentDate = new Date().toISOString().split('T')[0];
      
      const logData = {
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
      };

      // Handle offline vs online saving
      if (isOnline) {
        await saveLogEntry(logData);
      } else {
        // Save offline
        saveOfflineData('log_entry', logData);
      }

      // Success feedback with toast and haptic feedback
      toast.success("Your log entry has been saved successfully!", {
        description: isOnline 
          ? "Keep up the great work on your fresh journey!" 
          : "It will be synced when you're back online.",
        duration: 3000,
      });
      
      // Trigger haptic feedback on success (mobile only)
      impact(HapticImpact.MEDIUM);
      
      // Navigate back to dashboard after successful submission
      setTimeout(() => {
        navigate('/app/dashboard');
      }, 1000);
    } catch (error) {
      console.error("Error saving log entry:", error);
      setGeneralError("Failed to save your entry. Please try again.");
      toast.error("Failed to save your log entry", {
        description: "Please try again or check your network connection.",
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

      {!isOnline && (
        <Alert variant="default" className="mb-6 border-amber-200 bg-amber-50">
          <WifiOff className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            You're currently offline. Your entry will be saved locally and synced when you reconnect.
          </AlertDescription>
        </Alert>
      )}

      {generalError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{generalError}</AlertDescription>
        </Alert>
      )}

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
              errors={validationErrors}
            />

            <WellnessTab
              mood={mood}
              setMood={setMood}
              energy={energy}
              setEnergy={setEnergy}
              focus={focus}
              setFocus={setFocus}
              sleepHours={sleep

Hours}
              setSleepHours={setSleepHours}
              sleepQuality={sleepQuality}
              setSleepQuality={setSleepQuality}
              errors={validationErrors}
            />

            <CravingsTab
              cravingIntensity={cravingIntensity}
              setCravingIntensity={setCravingIntensity}
              cravingTrigger={cravingTrigger}
              setCravingTrigger={setCravingTrigger}
              errors={validationErrors}
            />

            <JournalTab
              journal={journal}
              setJournal={setJournal}
              errors={validationErrors}
            />
          </Tabs>

          <Button 
            type="submit" 
            className="w-full md:w-auto bg-fresh-300 hover:bg-fresh-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (isOnline ? "Save Log Entry" : "Save Offline")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LogEntry;
