
import { useQuery } from "@tanstack/react-query";
import { Quote, getRandomQuote } from "@/services/quoteService";
import { Card, CardContent } from "@/components/ui/card";
import { Quote as QuoteIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

export const QuoteCard = () => {
  const { 
    data: quote, 
    isLoading, 
    error, 
    refetch 
  } = useQuery<Quote>({
    queryKey: ['dashboard-quote'],
    queryFn: getRandomQuote,
  });

  // Refresh quote every 24 hours
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 24 * 60 * 60 * 1000); // 24 hours
    
    return () => clearInterval(interval);
  }, [refetch]);

  if (isLoading) {
    return (
      <Card className="flex flex-col justify-center bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="pt-6 text-center">
          <QuoteIcon className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
          <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
        </CardContent>
      </Card>
    );
  }

  if (error || !quote) {
    return (
      <Card className="flex flex-col justify-center bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="pt-6 text-center">
          <QuoteIcon className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
          <p className="italic text-muted-foreground">
            "The secret of getting ahead is getting started."
          </p>
          <p className="text-sm font-medium mt-2">- Mark Twain</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <CardContent className="pt-6 text-center">
        <QuoteIcon className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
        <p className="italic text-muted-foreground">
          "{quote.text}"
        </p>
        <p className="text-sm font-medium mt-2">- {quote.author}</p>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;
