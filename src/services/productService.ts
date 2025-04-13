
import { supabase } from "@/integrations/supabase/client";
import { ProductReview } from "@/lib/supabase"; // Import type
import { toast } from "sonner";

/**
 * Add a review for a smokeless product
 */
export const addProductReview = async (reviewData: Omit<ProductReview, 'id' | 'created_at' | 'user_id' | 'is_moderated'> & { product_id: string }) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const reviewToInsert = {
      ...reviewData,
      user_id: user.id,
      is_moderated: false, // Default to not moderated
      moderation_status: 'pending', // Using our new field
    };

    const { data, error } = await supabase
      .from('smokeless_product_reviews')
      .insert(reviewToInsert)
      .select()
      .single();

    if (error) {
      console.error('Error adding product review:', error);
      throw error;
    }

    toast.success("Review submitted successfully! It will be visible after moderation.");
    return data as ProductReview;

  } catch (error: any) {
    console.error('Error in addProductReview service:', error);
    toast.error("Failed to submit review: " + (error.message || "Unknown error"));
    throw error;
  }
};

/**
 * Track affiliate link interaction
 */
export const trackAffiliateInteraction = async (productId: string, affiliateLink: string, interactionType: 'click' | 'view' | 'purchase') => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      // Just silently return if not authenticated - we only track for authenticated users
      return;
    }

    const { error } = await supabase
      .from('affiliate_interactions')
      .insert({
        user_id: user.id,
        product_id: productId,
        affiliate_link: affiliateLink,
        interaction_type: interactionType
      });

    if (error) {
      console.error('Error tracking affiliate interaction:', error);
      // Don't throw error or show toast for affiliate tracking failures
      // to avoid disrupting the user experience
    }
  } catch (error: any) {
    console.error('Error in trackAffiliateInteraction:', error);
    // Silent failure - don't disrupt user experience for analytics
  }
};

/**
 * Get moderation status for reviews
 * Admin-only function
 */
export const getReviewsForModeration = async (limit = 20, lastId?: string) => {
  try {
    let query = supabase
      .from('smokeless_product_reviews')
      .select('*, user:users(email, user_metadata), product:smokeless_products(name)')
      .eq('moderation_status', 'pending')
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (lastId) {
      query = query.lt('id', lastId);
    }
    
    const { data, error } = await query;

    if (error) {
      console.error('Error fetching reviews for moderation:', error);
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error('Error in getReviewsForModeration:', error);
    toast.error("Failed to fetch reviews: " + (error.message || "Unknown error"));
    throw error;
  }
};

/**
 * Moderate a review (approve or reject)
 * Admin-only function
 */
export const moderateReview = async (reviewId: string, status: 'approved' | 'rejected', notes?: string) => {
  try {
    const { data, error } = await supabase
      .rpc('moderate_review', {
        review_id: reviewId,
        status: status,
        notes: notes || null
      });

    if (error) {
      console.error('Error moderating review:', error);
      throw error;
    }

    toast.success(`Review ${status} successfully`);
    return data;
  } catch (error: any) {
    console.error('Error in moderateReview:', error);
    toast.error("Failed to moderate review: " + (error.message || "Unknown error"));
    throw error;
  }
};

// Enhance the product details page to track affiliate clicks
export const getProductDetails = async (productId: string) => {
  try {
    const { data, error } = await supabase
      .from('smokeless_products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error) {
      console.error('Error fetching product details:', error);
      throw error;
    }

    // Track product view
    await trackAffiliateInteraction(productId, '', 'view').catch(err => {
      console.error('Error tracking product view:', err);
      // Silent failure
    });

    return data;
  } catch (error: any) {
    console.error('Error in getProductDetails:', error);
    toast.error("Failed to fetch product details: " + (error.message || "Unknown error"));
    throw error;
  }
};
