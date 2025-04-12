
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent } from "react";

interface MotivationInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const MotivationInput = ({ value, onChange }: MotivationInputProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Motivation</CardTitle>
        <CardDescription>Remind yourself why you're on this journey</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea 
          placeholder="Why do you want to stay afresh or fresher? What benefits are you looking forward to?" 
          value={value}
          onChange={onChange}
          className="min-h-[120px]"
        />
      </CardContent>
    </Card>
  );
};

export default MotivationInput;
