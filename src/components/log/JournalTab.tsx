
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface JournalTabProps {
  journal: string;
  setJournal: (value: string) => void;
}

const JournalTab = ({
  journal,
  setJournal
}: JournalTabProps) => {
  return (
    <TabsContent value="journal" className="space-y-4 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Journal</CardTitle>
          <CardDescription>
            Record your thoughts and reflections
          </CardDescription>
        </CardHeader>
        <CardContent>
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
