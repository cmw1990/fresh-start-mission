
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type GoalMethod = "cold-turkey" | "gradual-reduction" | "tapering" | "nrt" | "harm-reduction";

interface MethodSelectorProps {
  method: GoalMethod;
  setMethod: (method: GoalMethod) => void;
  quitDate: Date | undefined;
  setQuitDate: (date: Date | undefined) => void;
  reduction: string;
  setReduction: (value: string) => void;
  timeline: string;
  setTimeline: (value: string) => void;
}

const MethodSelector = ({
  method,
  setMethod,
  quitDate,
  setQuitDate,
  reduction,
  setReduction,
  timeline,
  setTimeline
}: MethodSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Method</CardTitle>
        <CardDescription>Select your preferred approach</CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={method} onValueChange={(value) => setMethod(value as GoalMethod)}>
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
  );
};

export default MethodSelector;
