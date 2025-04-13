
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';

interface ReviewItemProps {
  review: {
    id: string;
    rating: number;
    review_text?: string;
    created_at: string;
    user?: {
      email?: string;
      user_metadata?: {
        full_name?: string;
      }
    } | null;
  };
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <Card key={review.id}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`h-4 w-4 ${
                  index < review.rating
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {new Date(review.created_at).toLocaleDateString()}
          </span>
        </div>
        {review.review_text && (
          <p className="mt-2 text-muted-foreground">{review.review_text}</p>
        )}
        <p className="text-sm text-muted-foreground mt-2">
          - {review.user?.user_metadata?.full_name || review.user?.email || 'Anonymous'}
        </p>
      </CardContent>
    </Card>
  );
};

export default ReviewItem;
