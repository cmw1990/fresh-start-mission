
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface GoalTypeSelectorProps {
  value: "afresh" | "fresher";
  onChange: (value: string) => void;
  error?: string; // Adding optional error prop
}

const GoalTypeSelector = ({ value, onChange, error }: GoalTypeSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Primary Goal</CardTitle>
        <CardDescription>Choose your main objective</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={value} 
          onValueChange={onChange}
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
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </CardContent>
    </Card>
  );
};

export default GoalTypeSelector;
