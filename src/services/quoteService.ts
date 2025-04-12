
import { supabase } from "@/integrations/supabase/client";

export type Quote = {
  id: string;
  text: string;
  author: string;
};

// A fallback array of quotes in case the API or database fails
const fallbackQuotes: Quote[] = [
  { 
    id: '1', 
    text: "The secret of getting ahead is getting started.", 
    author: "Mark Twain" 
  },
  { 
    id: '2', 
    text: "Every accomplishment starts with the decision to try.", 
    author: "Gail Devers" 
  },
  { 
    id: '3', 
    text: "It does not matter how slowly you go as long as you do not stop.", 
    author: "Confucius" 
  },
  { 
    id: '4', 
    text: "The only person you are destined to become is the person you decide to be.", 
    author: "Ralph Waldo Emerson" 
  },
  { 
    id: '5', 
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", 
    author: "Winston Churchill" 
  }
];

/**
 * Fetch a random motivational quote
 */
export const getRandomQuote = async (): Promise<Quote> => {
  try {
    // First attempt to get a random quote from the quotes table in Supabase
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .order(() => 'RANDOM()')  // Get a random quote
      .limit(1)
      .single();
    
    if (error || !data) {
      console.log("Falling back to pre-defined quotes:", error);
      // If Supabase fails or returns no data, use a fallback quote
      return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    }
    
    return {
      id: data.id,
      text: data.text,
      author: data.author
    };
  } catch (error) {
    console.error("Error fetching quote:", error);
    // Return a random fallback quote
    return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
  }
};
