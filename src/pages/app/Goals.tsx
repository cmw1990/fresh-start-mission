
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getUserGoal } from "@/services/goalService";
import { UserGoal } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import GoalTypeSelector from "@/components/goals/GoalTypeSelector";
import MethodSelector from "@/components/goals/MethodSelector";
import { ProductSelector } from "@/components/goals/ProductSelector";
import MotivationInput from "@/components/goals/MotivationInput";

const Goals = () => {
  const { user } = useAuth();
  const [goalType, setGoalType] = useState<"afresh" | "fresher">("afresh");
  const [method, setMethod] = useState<"cold-turkey" | "gradual-reduction" | "tapering" | "nrt" | "harm-reduction">("cold-turkey");
  const [product, setProduct] = useState("cigarette");
  const [quitDate, setQuitDate] = useState<Date | undefined>(new Date());
  const [reduction, setReduction] = useState("50");
  const [timeline, setTimeline] = useState("30");
  const [motivation, setMotivation] = useState("");
  const [existingGoal, setExistingGoal] = useState<UserGoal | null>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchGoal = async () => {
      if (!user) return;
      
      setLoading(true);
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
        toast.error("Failed to load your goals");
      } finally {
        setLoading(false);
      }
    };
    
    fetchGoal();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        await import('@/services/goalService').then(module => {
          module.updateUserGoal(existingGoal.id, goalData);
        });
        toast.success("Your goals have been updated successfully!");
      } else {
        await import('@/services/goalService').then(module => {
          module.saveUserGoal(goalData).then(newGoal => {
            if (newGoal) {
              setExistingGoal(newGoal);
            }
          });
        });
        toast.success("Your goals have been saved successfully!");
      }
    } catch (error) {
      console.error("Error saving goals:", error);
      toast.error("Failed to save your goals. Please try again.");
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
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <GoalTypeSelector 
            value={goalType} 
            onChange={(value) => setGoalType(value as "afresh" | "fresher")} 
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
          />
          
          <ProductSelector product={product} setProduct={setProduct} />
          
          <MotivationInput value={motivation} onChange={(e) => setMotivation(e.target.value)} />
          
          <Button 
            type="submit" 
            className="w-full md:w-auto bg-fresh-300 hover:bg-fresh-400"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="h-4 w-4 mr-2 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
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
