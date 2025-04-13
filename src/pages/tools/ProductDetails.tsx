
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
  user?: {
    email?: string;
    user_metadata?: {
      full_name?: string;
    }
  } | null;
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
      
      // Filter reviews to ensure they match our Review interface structure
      const validReviews: Review[] = [];
      
      if (reviewsData) {
        for (const review of reviewsData) {
          // Skip reviews with invalid data
          if (!review) continue;
          
          // Create a review object with all required fields
          const validReview: Review = {
            id: review.id,
            user_id: review.user_id,
            rating: review.rating,
            review_text: review.review_text,
            created_at: review.created_at,
            is_moderated: review.is_moderated,
            user: null // Default to null
          };
          
          // Safely add user data if available
          if (review.user && typeof review.user === 'object') {
            validReview.user = {
              email: review.user?.email ? String(review.user.email) : undefined,
              user_metadata: review.user?.user_metadata ? 
                { full_name: review.user?.user_metadata?.full_name ? String(review.user.user_metadata.full_name) : undefined } : 
                { full_name: undefined }
            };
          }
          
          validReviews.push(validReview);
        }
      }

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

export default ProductDetails;
