import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ProductReviewFormProps {
  productId: string;
  onSubmitSuccess: () => void; // Callback to refetch reviews
  isLoading: boolean;
  mutationFn: (reviewData: { product_id: string; rating: number; review_text?: string }) => Promise<any>;
}

const ProductReviewForm: React.FC<ProductReviewFormProps> = ({ productId, onSubmitSuccess, isLoading, mutationFn }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRatingClick = (index: number) => {
    setRating(index);
    setError(null); // Clear error when rating is selected
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      toast.error("Please log in to submit a review.");
      return;
    }

    if (rating === 0) {
      setError("Please select a star rating.");
      toast.error("Rating is required.");
      return;
    }

    try {
      await mutationFn({
        product_id: productId,
        rating: rating,
        review_text: reviewText || undefined,
      });
      // Reset form on success
      setRating(0);
      setReviewText("");
      onSubmitSuccess(); // Trigger refetch in parent
    } catch (err) {
      // Error handling is done in the mutation hook, but we can set local error state if needed
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Write a Review</CardTitle>
        {!user && <CardDescription className="text-destructive">You must be logged in to submit a review.</CardDescription>}
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="rating" className="mb-2 block">Your Rating*</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((index) => (
                <Star
                  key={index}
                  className={cn(
                    "h-6 w-6 cursor-pointer transition-colors",
                    (hoverRating || rating) >= index
                      ? "text-amber-400 fill-amber-400"
                      : "text-muted-foreground hover:text-amber-300"
                  )}
                  onClick={() => handleRatingClick(index)}
                  onMouseEnter={() => setHoverRating(index)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`Rate ${index} stars`}
                />
              ))}
            </div>
            {error && <p className="text-sm text-destructive mt-1">{error}</p>}
          </div>
          <div>
            <Label htmlFor="review-text">Your Review (Optional)</Label>
            <Textarea
              id="review-text"
              placeholder="Share your thoughts on this product..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              disabled={!user || isLoading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={!user || rating === 0 || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProductReviewForm;