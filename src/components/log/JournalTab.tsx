
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormMessage } from '@/components/ui/form';

interface JournalTabProps {
  journal: string;
  setJournal: (value: string) => void;
  errors: Record<string, string>;
}

const JournalTab: React.FC<JournalTabProps> = ({
  journal,
  setJournal,
  errors
}) => {
  return (
    <TabsContent value="journal" className="py-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="journal" className="text-base">
            Journal Entry <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Textarea 
            id="journal" 
            placeholder="Write your thoughts, challenges, victories, or anything else you want to remember about today..." 
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            className="min-h-[200px]"
          />
          {errors.journal && <FormMessage>{errors.journal}</FormMessage>}
        </div>
        
        <div className="space-y-2 mt-6">
          <h3 className="text-lg font-medium">Journal Prompts:</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>What was the most challenging moment today regarding cravings?</li>
            <li>What strategies worked well for managing your nicotine use today?</li>
            <li>How did your energy or mood change throughout the day?</li>
            <li>What are you proud of today, no matter how small?</li>
            <li>What's one thing you're looking forward to tomorrow?</li>
          </ul>
        </div>
      </div>
    </TabsContent>
  );
};

export default JournalTab;
