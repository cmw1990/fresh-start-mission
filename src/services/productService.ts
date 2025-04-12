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

    // Optional: Trigger a function to recalculate average rating for the product (can be done via DB trigger too)
    // await supabase.rpc('recalculate_product_rating', { p_product_id: reviewData.product_id });

    toast.success("Review submitted successfully!");
    return data as ProductReview;

  } catch (error: any) {
    console.error('Error in addProductReview service:', error);
    toast.error("Failed to submit review: " + (error.message || "Unknown error"));
    throw error;
  }
};

// Placeholder for a function to recalculate ratings (if not using DB triggers)
/*
export const recalculateProductRating = async (productId: string) => {
  try {
    const { error } = await supabase.rpc('recalculate_product_rating', { p_product_id: productId });
    if (error) throw error;
  } catch (error: any) {
    console.error('Error recalculating product rating:', error);
    // Don't necessarily show toast for this background task
  }
};
*/