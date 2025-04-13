
import React from 'react';
import ReviewItem from './ReviewItem';
import ProductReviewForm from './ProductReviewForm';

interface Review {
  id: string;
  user_id: string;
  rating: number;
  review_text?: string;
  created_at: string;
  is_moderated: boolean;
  user?: {
    email?: string;
    user_metadata?: {
      full_name?: string;
    }
  } | null;
}

interface ReviewListProps {
  reviews: Review[];
  productId: string;
  isSubmitting: boolean;
  onSubmitReview: (reviewData: { product_id: string; rating: number; review_text?: string }) => Promise<void>;
  onSubmitSuccess: () => Promise<void>;
}

const ReviewList: React.FC<ReviewListProps> = ({ 
  reviews, 
  productId, 
  isSubmitting, 
  onSubmitReview,
  onSubmitSuccess
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reviews</h2>
      
      <ProductReviewForm
        productId={productId}
        onSubmitSuccess={onSubmitSuccess}
        isLoading={isSubmitting}
        mutationFn={onSubmitReview}
      />

      <div className="space-y-4 mt-8">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
        
        {reviews.length === 0 && (
          <p className="text-center text-muted-foreground">
            No reviews yet. Be the first to review this product!
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
