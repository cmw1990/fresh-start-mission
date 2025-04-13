
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { addProductReview } from '@/services/productService';
import ProductReviewForm from '@/components/tools/ProductReviewForm';
import { toast } from 'sonner';

interface Review {
  id: string;
  user_id: string;
  rating: number;
  review_text?: string;
  created_at: string;
  is_moderated: boolean;
  user?: {
    email: string;
    user_metadata?: {
      full_name?: string;
    }
  }
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
  // Add any additional properties from the returned data
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
          // Skip reviews with invalid user data
          if (!review || !review.user || typeof review.user === 'string' || 'error' in review.user) {
            continue;
          }
          
          validReviews.push({
            id: review.id,
            user_id: review.user_id,
            rating: review.rating,
            review_text: review.review_text,
            created_at: review.created_at,
            is_moderated: review.is_moderated,
            user: {
              email: review.user?.email || 'Unknown',
              user_metadata: review.user?.user_metadata
            }
          });
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{product.name}</span>
            {product.average_rating && (
              <span className="flex items-center text-sm">
                <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                {product.average_rating.toFixed(1)}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {product.image_url && (
            <img 
              src={product.image_url} 
              alt={product.name}
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          )}
          <div className="grid gap-2">
            <p className="text-muted-foreground">{product.description}</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="font-medium">Manufacturer</p>
                <p className="text-muted-foreground">{product.manufacturer}</p>
              </div>
              <div>
                <p className="font-medium">Category</p>
                <p className="text-muted-foreground">{product.category}</p>
              </div>
              <div>
                <p className="font-medium">Price</p>
                <p className="text-muted-foreground">{product.price}</p>
              </div>
              <div>
                <p className="font-medium">Nicotine Content</p>
                <p className="text-muted-foreground">{product.nicotine_content}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Reviews</h2>
        
        <ProductReviewForm
          productId={id!}
          onSubmitSuccess={fetchProductDetails}
          isLoading={isSubmitting}
          mutationFn={handleReviewSubmit}
        />

        <div className="space-y-4 mt-8">
          {reviews.map((review) => (
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
          ))}
          {reviews.length === 0 && (
            <p className="text-center text-muted-foreground">
              No reviews yet. Be the first to review this product!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
