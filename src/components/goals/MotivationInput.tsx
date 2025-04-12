
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChangeEvent } from "react";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MotivationInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

// Motivation templates to help users articulate their reasons
const MOTIVATION_TEMPLATES = [
  "I want to stay afresh because [health reason] and I'm looking forward to [benefit].",
  "My motivation is [personal reason]. When I succeed, I will [celebration].",
  "I'm doing this for [person/people], and I know it will improve my [life aspect].",
  "Every day afresh means [specific improvement] for me. I deserve this because [self-care reason].",
  "My biggest reason for changing is [deep motivation], and I'm excited about [future vision]."
];

// Motivation examples to inspire users
const MOTIVATION_EXAMPLES = [
  "I want to stay afresh because I'm tired of the constant cycle of cravings and short-term relief. I'm looking forward to feeling truly free and in control of my choices.",
  "My biggest motivation is my health. I've noticed shortness of breath when playing with my kids, and I want to be active and present in their lives for many years to come.",
  "I'm doing this to reclaim my energy. Every morning I wake up after using nicotine, I feel drained before the day even starts. I deserve to feel vibrant again.",
  "I'm tired of planning my day around when I can get my next hit. I want the freedom to go anywhere and do anything without that constant mental calculation.",
  "When I succeed in staying afresh, I'm going to use the money I save to finally take that vacation I've been postponing for years."
];

const MotivationInput = ({ value, onChange }: MotivationInputProps) => {
  const [showGuidance, setShowGuidance] = useState(true);
  const [showExamples, setShowExamples] = useState(false);

  const handleTemplateSelect = (template: string) => {
    // Create a synthetic event to maintain the onChange interface
    const syntheticEvent = {
      target: { value: template }
    } as ChangeEvent<HTMLTextAreaElement>;
    
    onChange(syntheticEvent);
  };

  const handleExampleSelect = (example: string) => {
    // Create a synthetic event to maintain the onChange interface
    const syntheticEvent = {
      target: { value: example }
    } as ChangeEvent<HTMLTextAreaElement>;
    
    onChange(syntheticEvent);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Your Motivation</CardTitle>
            <CardDescription>Remind yourself why you're on this journey</CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowGuidance(!showGuidance)}
          >
            {showGuidance ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showGuidance && (
          <div className="bg-blue-50 p-4 rounded-md border border-blue-100 space-y-2 mb-4">
            <h4 className="text-sm font-medium text-blue-800">Writing Tips:</h4>
            <ul className="text-xs text-blue-700 space-y-1 list-disc pl-4">
              <li>Be specific about your personal reasons</li>
              <li>Consider both what you're moving away from AND what you're moving toward</li>
              <li>Include health, financial, relationship, and emotional benefits</li>
              <li>Write as if speaking to your future self when you need motivation most</li>
            </ul>
            
            <div className="pt-2 flex items-center justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs border-blue-200 text-blue-700 hover:bg-blue-100"
                onClick={() => setShowExamples(!showExamples)}
              >
                {showExamples ? "Hide Examples" : "Show Examples"}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" className="text-xs">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Use Template
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {MOTIVATION_TEMPLATES.map((template, index) => (
                    <DropdownMenuItem 
                      key={index}
                      onClick={() => handleTemplateSelect(template)}
                    >
                      {template}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {showExamples && (
              <div className="mt-2 pt-2 border-t border-blue-200">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Example Motivations:</h4>
                <div className="space-y-2">
                  {MOTIVATION_EXAMPLES.map((example, index) => (
                    <div key={index} className="text-xs text-blue-700 p-2 bg-blue-50 rounded border border-blue-100 flex justify-between items-start">
                      <p className="italic">{example}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 ml-2 shrink-0"
                        onClick={() => handleExampleSelect(example)}
                      >
                        Use
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
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
