
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";

interface JournalTabProps {
  journal: string;
  setJournal: (value: string) => void;
  errors?: Record<string, string>;
}

const JournalTab: React.FC<JournalTabProps> = ({
  journal,
  setJournal,
  errors = {}
}) => {
  return (
    <TabsContent value="journal" className="space-y-4 py-4">
      <Card>
        <CardHeader>
          <CardTitle>Journal</CardTitle>
          <CardDescription>
            Reflect on your day, challenges, and victories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Textarea
              placeholder="How are you feeling today? Any thoughts or reflections..."
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              rows={10}
              className="resize-none"
            />
            {errors.journal && (
              <div className="flex items-center text-destructive mt-2 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>{errors.journal}</span>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Writing down your thoughts and feelings can help you identify patterns and develop better coping strategies.
            </p>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default JournalTab;
