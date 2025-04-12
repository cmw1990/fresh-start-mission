
import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Lightbulb, Save } from "lucide-react";

// Journal prompts to help users reflect
const JOURNAL_PROMPTS = [
  "What triggers have you noticed today?",
  "What's one thing that helped you manage cravings today?",
  "How has your energy level affected your cravings today?",
  "What are you proud of accomplishing today?",
  "What challenges did you face today and how did you overcome them?",
  "What are three things you're grateful for today?",
  "How has your mood changed throughout the day?",
  "What's one healthy habit you practiced today?",
  "How did sleep quality affect your day?",
  "What's something you're looking forward to tomorrow?"
];

interface JournalTabProps {
  journal: string;
  setJournal: (value: string) => void;
  onSave?: () => void;
}

const JournalTab = ({
  journal,
  setJournal,
  onSave
}: JournalTabProps) => {
  const [prompt, setPrompt] = useState("");
  const [savedContent, setSavedContent] = useState(journal);

  // Generate a new random prompt when component mounts
  useEffect(() => {
    getRandomPrompt();
  }, []);

  // Update saved content when journal prop changes (e.g. when form is loaded with existing data)
  useEffect(() => {
    setSavedContent(journal);
  }, [journal]);

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * JOURNAL_PROMPTS.length);
    setPrompt(JOURNAL_PROMPTS[randomIndex]);
  };

  const insertPrompt = () => {
    // Add the prompt to the current journal text, with a line break if needed
    const prefix = journal && !journal.endsWith("\n\n") && !journal.endsWith("\n") 
      ? "\n\n"
      : journal.length > 0 && !journal.endsWith("\n") ? "\n" : "";
      
    setJournal(`${journal}${prefix}${prompt}\n`);
  };

  const handleSave = () => {
    setSavedContent(journal);
    if (onSave) onSave();
  };

  const hasChanges = journal !== savedContent;

  return (
    <TabsContent value="journal" className="space-y-4 mt-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Journal</CardTitle>
              <CardDescription>
                Record your thoughts and reflections
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={getRandomPrompt}
                    >
                      <Lightbulb className="h-4 w-4 mr-2" />
                      New Prompt
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Get a new reflection prompt
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {onSave && hasChanges && (
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={handleSave}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {prompt && (
            <div className="bg-blue-50 p-3 rounded-md border border-blue-100 flex justify-between items-center">
              <p className="text-blue-700 text-sm italic">
                <span className="font-medium">Reflection prompt:</span> {prompt}
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={insertPrompt}
                className="text-xs"
              >
                Use This
              </Button>
            </div>
          )}
          
          <Textarea 
            placeholder="How are you feeling today? Any insights or reflections?" 
            className="min-h-[200px]"
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
          />
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default JournalTab;
