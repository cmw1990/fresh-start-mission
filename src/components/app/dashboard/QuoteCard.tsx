
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuoteData {
  text: string;
  author: string;
}

const QuoteCard: React.FC = () => {
  const [quote, setQuote] = useState<QuoteData>({
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  });
  const [isLoading, setIsLoading] = useState(false);

  // Quotes to cycle through - in a real app, these would come from a Supabase table
  const quotes = [
    {
      text: "The secret of getting ahead is getting started.",
      author: "Mark Twain"
    },
    {
      text: "It's not about perfect. It's about effort.",
      author: "Jillian Michaels"
    },
    {
      text: "Your body hears everything your mind says.",
      author: "Naomi Judd"
    },
    {
      text: "Each day is a new opportunity to improve yourself.",
      author: "Anonymous"
    },
    {
      text: "Take care of your body. It's the only place you have to live.",
      author: "Jim Rohn"
    },
    {
      text: "Every fresh start begins with a clear mindset.",
      author: "Mission Fresh"
    }
  ];

  const getRandomQuote = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
      setIsLoading(false);
    }, 300);
  };

  useEffect(() => {
    // Set an initial quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <Card className="border-fresh-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Quote className="h-5 w-5 text-indigo-500" />
          <CardTitle className="text-lg font-semibold">Daily Motivation</CardTitle>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={getRandomQuote}
          disabled={isLoading}
          className="h-8 w-8 p-0"
        >
          <RefreshCw className={`h-4 w-4 text-indigo-500 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="sr-only">Refresh quote</span>
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        <blockquote className="italic text-center px-4">
          "{quote.text}"
        </blockquote>
        <p className="text-right text-sm text-muted-foreground mt-2">— {quote.author}</p>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;
