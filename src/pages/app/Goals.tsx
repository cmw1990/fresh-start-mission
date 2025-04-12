
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getUserGoal, saveUserGoal, updateUserGoal } from "@/services/goalService";
import { UserGoal } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import GoalTypeSelector from "@/components/goals/GoalTypeSelector";
import MethodSelector from "@/components/goals/MethodSelector";
import { ProductSelector } from "@/components/goals/ProductSelector";
import MotivationInput from "@/components/goals/MotivationInput";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { validateData, goalSchema, formatValidationErrors, getValidationErrors } from "@/lib/validation";
import { useHaptics, HapticImpact } from "@/hooks/useHaptics";

const Goals = () => {
  const { user } = useAuth();
  const { impact } = useHaptics();
  const [goalType, setGoalType] = useState<"afresh" | "fresher">("afresh");
  const [method, setMethod] = useState<"cold-turkey" | "gradual-reduction" | "tapering" | "nrt" | "harm-reduction">("cold-turkey");
  const [product, setProduct] = useState("cigarette");
  const [quitDate, setQuitDate] = useState<Date | undefined>(new Date());
  const [reduction, setReduction] = useState("50");
  const [timeline, setTimeline] = useState("30");
  const [motivation, setMotivation] = useState("");
  const [existingGoal, setExistingGoal] = useState<UserGoal | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    const fetchGoal = async () => {
      if (!user) return;
      
      setLoading(true);
      setError(null);
      try {
        const goal = await getUserGoal();
        if (goal) {
          setExistingGoal(goal);
          setGoalType(goal.goal_type as "afresh" | "fresher");
          setMethod(goal.method as "cold-turkey" | "gradual-reduction" | "tapering" | "nrt" | "harm-reduction");
          setProduct(goal.product_type);
          if (goal.quit_date) {
            setQuitDate(new Date(goal.quit_date));
          }
          if (goal.reduction_percent) {
            setReduction(goal.reduction_percent.toString());
          }
          if (goal.timeline_days) {
            setTimeline(goal.timeline_days.toString());
          }
          if (goal.motivation) {
            setMotivation(goal.motivation);
          }
        }
      } catch (error) {
        console.error("Error fetching goal:", error);
        setError("Failed to load your goals. Please try refreshing the page.");
        toast.error("Failed to load your goals");
      } finally {
        setLoading(false);
      }
    };
    
    fetchGoal();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    setError(null);
    
    // Validate form data
    const validationResult = validateData(goalSchema, {
      goalType,
      method,
      product,
      quitDate,
      reduction,
      timeline,
      motivation
    });
    
    // Use the helper function to get formatted errors
    const errors = getValidationErrors(validationResult);
    
    if (Object.keys(errors).length > 0) {
      toast.error("Please correct the form errors");
      setValidationErrors(errors);
      return;
    }
    
    setLoading(true);
    
    try {
      const goalData = {
        goal_type: goalType,
        method,
        product_type: product,
        quit_date: quitDate ? quitDate.toISOString() : undefined,
        reduction_percent: parseInt(reduction),
        timeline_days: parseInt(timeline),
        motivation
      };
      
      if (existingGoal) {
        await updateUserGoal(existingGoal.id, goalData);
        toast.success("Your goals have been updated successfully!", {
          description: "Your journey has been adjusted based on your new preferences.",
        });
      } else {
        const newGoal = await saveUserGoal(goalData);
        if (newGoal) {
          setExistingGoal(newGoal);
        }
        toast.success("Your goals have been saved successfully!", {
          description: "Your fresh journey is ready to begin!",
        });
      }
      
      // Haptic feedback on success
      impact(HapticImpact.MEDIUM);
    } catch (error) {
      console.error("Error saving goals:", error);
      setError("Failed to save your goals. Please try again.");
      toast.error("Failed to save your goals");
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && !existingGoal) {
    return (
      <div className="container py-8 flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-fresh-300 border-t-transparent animate-spin mx-auto mb-4"></div>
          <p>Loading your goals...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Fresh Journey Goals</h1>
        <p className="text-muted-foreground">
          Define and customize your path to success
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <GoalTypeSelector 
            value={goalType} 
            onChange={(value) => setGoalType(value as "afresh" | "fresher")}
            error={validationErrors.goalType}
          />
          
          <MethodSelector 
            method={method} 
            setMethod={setMethod}
            quitDate={quitDate}
            setQuitDate={setQuitDate}
            reduction={reduction}
            setReduction={setReduction}
            timeline={timeline}
            setTimeline={setTimeline}
            errors={{
              method: validationErrors.method,
              quitDate: validationErrors.quitDate,
              reduction: validationErrors.reduction,
              timeline: validationErrors.timeline
            }}
          />
          
          <ProductSelector 
            product={product} 
            setProduct={setProduct}
            error={validationErrors.product}
          />
          
          <MotivationInput 
            value={motivation} 
            onChange={(e) => setMotivation(e.target.value)}
            error={validationErrors.motivation}
          />
          
          <Button 
            type="submit" 
            className="w-full md:w-auto bg-fresh-300 hover:bg-fresh-400"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : existingGoal ? "Update Goals" : "Save Goals"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Goals;
