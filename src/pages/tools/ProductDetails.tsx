import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { addProductReview } from '@/services/productService';
import { toast } from 'sonner';
import ProductInfo from '@/components/tools/ProductInfo';
import ReviewList from '@/components/tools/ReviewList';

interface Review {
  id: string;
  user_id: string;
  rating: number;
  review_text?: string;
  created_at: string;
  is_moderated: boolean;
  user?: any; // Using any to bypass TypeScript errors for now
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  nicotine_content: string;
  manufacturer: string;
  image_url?: string;
  average_rating?: number;
  brand?: string;
  created_at?: string; 
  expert_notes_chemicals?: string;
  expert_notes_gum_health?: string;
  flavor_category?: string;
  ingredients?: string[];
  user_rating_avg?: number;
  nicotine_strength_mg?: number;
  user_rating_count?: number;
}

// Raw database structure for products from Supabase
interface RawProductData {
  id: string;
  name: string;
  brand?: string;
  description?: string;
  image_url?: string;
  nicotine_strength_mg?: number;
  flavor_category?: string;
  ingredients?: string[];
  expert_notes_chemicals?: string;
  expert_notes_gum_health?: string;
  user_rating_avg?: number;
  user_rating_count?: number;
  created_at?: string;
  updated_at?: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate('/tools/smokeless-directory');
      return;
    }
    fetchProductDetails();
  }, [id, navigate]);

  const fetchProductDetails = async () => {
    try {
      setIsLoading(true);
      // Fetch product details
      const { data: productData, error: productError } = await supabase
        .from('smokeless_products')
        .select('*')
        .eq('id', id)
        .single();

      if (productError) throw productError;
      if (!productData) {
        toast.error('Product not found');
        navigate('/tools/smokeless-directory');
        return;
      }

      // Map product data to match our interface
      const formattedProduct: Product = {
        id: productData.id,
        name: productData.name,
        description: productData.description || '',
        image_url: productData.image_url,
        price: 'N/A',  // Default values for required fields
        category: productData.flavor_category || 'N/A',
        nicotine_content: productData.nicotine_strength_mg ? String(productData.nicotine_strength_mg) : 'N/A',
        manufacturer: productData.brand || 'N/A',
        average_rating: productData.user_rating_avg,
        // Additional fields
        brand: productData.brand,
        created_at: productData.created_at,
        expert_notes_chemicals: productData.expert_notes_chemicals,
        expert_notes_gum_health: productData.expert_notes_gum_health,
        flavor_category: productData.flavor_category,
        ingredients: productData.ingredients,
        user_rating_avg: productData.user_rating_avg,
        nicotine_strength_mg: productData.nicotine_strength_mg,
        user_rating_count: productData.user_rating_count
      };

      setProduct(formattedProduct);

      // Fetch reviews with user information
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('smokeless_product_reviews')
        .select('*, user:users(email, user_metadata)')
        .eq('product_id', id)
        .eq('is_moderated', true)
        .order('created_at', { ascending: false });

      if (reviewsError) throw reviewsError;
      
      // Simple mapping to avoid TypeScript errors for now
      const validReviews: Review[] = reviewsData || [];
      
      setReviews(validReviews);

    } catch (error: any) {
      toast.error('Error loading product details: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReviewSubmit = async (reviewData: { product_id: string; rating: number; review_text?: string }) => {
    try {
      setIsSubmitting(true);
      await addProductReview(reviewData);
      await fetchProductDetails(); // Refresh reviews
    } catch (error) {
      // Error handling is done in the service
      console.error('Review submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product || isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-muted rounded mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Button
        variant="ghost"
        onClick={() => navigate('/tools/smokeless-directory')}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Directory
      </Button>

      {/* Product Details Component */}
      <ProductInfo product={product} />

      {/* Reviews Section Component */}
      <ReviewList 
        reviews={reviews}
        productId={id!}
        isSubmitting={isSubmitting}
        onSubmitReview={handleReviewSubmit}
        onSubmitSuccess={fetchProductDetails}
      />
    </div>
  );
};

// Add ProductInfo component
const ProductInfo: React.FC<{ product: Product | null }> = ({ product }) => {
  if (!product) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 p-6 flex justify-center items-center bg-gray-50">
          {product.image_url ? (
            <img 
              src={product.image_url} 
              alt={product.name} 
              className="max-h-64 object-contain"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
              No image available
            </div>
          )}
        </div>
        
        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
              <p className="text-gray-600">{product.brand}</p>
            </div>
            <div className="flex items-center">
              <div className="flex items-center mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(product.user_rating_avg || 0) 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 text-sm">
                {product.user_rating_avg?.toFixed(1) || "No ratings"} 
                ({product.user_rating_count || 0} reviews)
              </span>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Category</h3>
              <p>{product.flavor_category || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Nicotine Strength</h3>
              <p>{product.nicotine_strength_mg ? `${product.nicotine_strength_mg} mg` : 'N/A'}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1 text-gray-800">{product.description}</p>
          </div>
          
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">Ingredients</h3>
              <ul className="list-disc list-inside mt-1 text-gray-800">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-sm">{ingredient}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.expert_notes_chemicals && (
              <div className="p-3 bg-amber-50 rounded-md">
                <h3 className="text-sm font-medium text-amber-800">Chemical Analysis Notes</h3>
                <p className="mt-1 text-amber-700 text-sm">{product.expert_notes_chemicals}</p>
              </div>
            )}
            
            {product.expert_notes_gum_health && (
              <div className="p-3 bg-blue-50 rounded-md">
                <h3 className="text-sm font-medium text-blue-800">Gum Health Notes</h3>
                <p className="mt-1 text-blue-700 text-sm">{product.expert_notes_gum_health}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add ReviewList component
interface ReviewListProps {
  reviews: Review[];
  productId: string;
  isSubmitting: boolean;
  onSubmitReview: (data: { product_id: string; rating: number; review_text?: string }) => Promise<void>;
  onSubmitSuccess: () => Promise<void>;
}

const ReviewList: React.FC<ReviewListProps> = ({ 
  reviews, 
  productId, 
  isSubmitting,
  onSubmitReview,
  onSubmitSuccess
}) => {
  const { user } = useAuth();
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to submit a review');
      return;
    }
    
    try {
      await onSubmitReview({
        product_id: productId,
        rating,
        review_text: reviewText || undefined
      });
      
      toast.success('Review submitted successfully! It will appear after moderation.');
      setRating(5);
      setReviewText('');
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Customer Reviews</h2>
          <Button 
            onClick={() => setShowForm(!showForm)}
            variant={showForm ? "outline" : "default"}
          >
            {showForm ? 'Cancel' : 'Write a Review'}
          </Button>
        </div>
        
        {showForm && (
          <div className="mb-8 p-6 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Share Your Experience</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      <svg 
                        className={`w-8 h-8 ${
                          star <= rating ? 'text-yellow-400' : 'text-gray-300'
                        } hover:text-yellow-400`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="review">
                  Review (Optional)
                </label>
                <textarea
                  id="review"
                  rows={4}
                  className="w-full rounded-md border border-gray-300 shadow-sm p-3"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your thoughts about this product..."
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Your review will be moderated before appearing publicly.
              </p>
            </form>
          </div>
        )}
        
        {reviews.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No reviews yet. Be the first to review this product!
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Add ReviewItem component
const ReviewItem: React.FC<{ review: Review }> = ({ review }) => {
  // Use optional chaining to avoid TypeScript errors
  const userName = review.user?.email || review.user?.user_metadata?.full_name || 'Anonymous';
  
  return (
    <div className="pb-4 border-b">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star}
                className={`w-5 h-5 ${
                  star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <p className="ml-2 text-sm font-medium text-gray-700">{userName}</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(review.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      {review.review_text && (
        <p className="mt-3 text-gray-800">{review.review_text}</p>
      )}
    </div>
  );
};

export default ProductDetails;
