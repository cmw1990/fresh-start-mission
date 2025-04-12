import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils"; // Import cn utility
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage, 
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ExternalLink, ChevronLeft, AlertTriangle, Heart, ShoppingCart, ThumbsUp, Info, MessageSquare, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from 'date-fns';

// Interfaces aligned with sb.md (simplified for frontend display)
interface Review {
  id: string;
  user_id: string; // Assuming we might fetch user profile later
  rating: number;
  review_text?: string | null;
  created_at: string;
  // Placeholder for user info until fetched
  user_name?: string; 
  user_avatar_url?: string | null;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  description?: string | null;
  image_url?: string | null;
  nicotine_strength_mg?: number | null;
  flavor_category?: string | null;
  ingredients?: string[] | null;
  expert_notes_chemicals?: string | null;
  expert_notes_gum_health?: string | null;
  user_rating_avg?: number | null;
  user_rating_count?: number | null;
  created_at?: string;
  updated_at?: string;
  // Potentially add fields like usage_instructions if needed from DB
}

// --- Data Fetching Functions ---

const fetchProductDetails = async (productId: string): Promise<Product | null> => {
  if (!productId) return null;
  // @ts-ignore - Temporary ignore until backend tables/types are synced (see sb.md)
  const { data, error } = await supabase
    .from('smokeless_products')
    .select('*')
    .eq('id', productId)
    .single(); // Fetch a single record

  if (error) {
    console.error("Error fetching product details:", error);
    // Return null instead of throwing error to allow component to handle 'not found'
    if (error.code === 'PGRST116') { // Code for "Resource Not Found"
        return null;
    }
    throw new Error(`Error fetching product: ${error.message}`);
  }
  return data as any as Product | null; // Temporary type assertion
};

const fetchProductReviews = async (productId: string): Promise<Review[]> => {
   if (!productId) return [];
   // TODO: Fetch user profile info along with reviews later
   // @ts-ignore - Temporary ignore until backend tables/types are synced (see sb.md) 
   const { data, error } = await supabase
     .from('smokeless_product_reviews') // Assuming this table name from sb.md
     .select('*')
     .eq('product_id', productId)
     .order('created_at', { ascending: false })
     .limit(20); // Limit reviews fetched initially

   if (error) {
     console.error("Error fetching product reviews:", error);
     // Don't throw error here, maybe reviews just don't exist
     return []; 
   }
   // Add placeholder user info for now
   const reviewsWithPlaceholders = (data || []).map(r => ({
       ...(r as any), // Cast r to any to access properties temporarily
       user_name: `User ${((r as any).user_id as string)?.substring(0, 6) || 'Anonymous'}`, // Placeholder name with safe access
       user_avatar_url: null, // Placeholder avatar
   }));
   return reviewsWithPlaceholders as any as Review[]; // Temporary type assertion
};


// --- Helper Components ---

const StarRating = ({ rating, size = "h-5 w-5" }: { rating: number | null | undefined, size?: string }) => {
  const safeRating = rating || 0;
  const fullStars = Math.floor(safeRating);
  const hasHalfStar = false; // Simplified: No half stars for now
  
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={cn( // Use cn here
            size, 
            i < fullStars ? "fill-amber-400 text-amber-400" : "text-gray-300"
          )} 
        />
      ))}
    </div>
  );
};

const RatingBreakdown = ({ breakdown, totalReviews }: { breakdown: any, totalReviews: number }) => {
  // Placeholder breakdown logic - replace with actual data if available
  const sampleBreakdown = { five: 0, four: 0, three: 0, two: 0, one: 0 }; 
  const currentBreakdown = breakdown || sampleBreakdown; // Use sample if no breakdown provided
  // Ensure currentTotal is treated as a number, initialize reduce with 0
  const currentTotal = Object.values(currentBreakdown).reduce((sum: number, count: unknown) => sum + (Number(count) || 0), 0) || totalReviews || 1; 

  return (
    <div className="flex-1 space-y-1">
      {[5, 4, 3, 2, 1].map((stars) => {
        // Ensure count is treated as a number
        const count = Number(currentBreakdown[stars === 5 ? 'five' : stars === 4 ? 'four' : stars === 3 ? 'three' : stars === 2 ? 'two' : 'one'] || 0);
        // Perform calculation safely, casting operands to Number
        const percentage = Number(currentTotal) > 0 ? (Number(count) / Number(currentTotal)) * 100 : 0; 
        return (
          <div key={stars} className="flex items-center gap-2">
            <span className="w-2 text-sm text-muted-foreground">{stars}</span>
            <Star className="h-4 w-4 text-amber-400 flex-shrink-0" />
            <Progress value={percentage} className="w-full h-2" aria-label={`${stars} star reviews percentage`} />
            <span className="w-8 text-sm text-muted-foreground text-right">{count}</span>
          </div>
        );
      })}
    </div>
  );
};

const ReviewCard = ({ review }: { review: Review }) => {
  return (
     <Card className="border-l-4 border-primary/20">
      <CardHeader className="flex flex-row items-start justify-between pb-2 space-x-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={review.user_avatar_url || undefined} alt={review.user_name} />
            <AvatarFallback>{review.user_name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-sm">{review.user_name}</div>
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
            </div>
          </div>
        </div>
        <StarRating rating={review.rating} size="h-4 w-4" />
      </CardHeader>
      <CardContent className="pb-3">
        {/* Review title removed for simplicity, focus on comment */}
        <p className="text-sm text-foreground">{review.review_text || "No comment provided."}</p>
      </CardContent>
      {/* Helpful button removed for simplicity */}
    </Card>
  );
};

// --- Main Component ---

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  // Fetch Product Details
  const { data: product, isLoading: isLoadingProduct, error: productError, isError: isProductError } = useQuery<Product | null>({
    queryKey: ['productDetails', productId],
    queryFn: () => fetchProductDetails(productId!),
    enabled: !!productId, // Only run query if productId exists
    retry: 1, // Don't retry endlessly if product not found
  });

  // Fetch Product Reviews
  const { data: reviews, isLoading: isLoadingReviews, error: reviewsError } = useQuery<Review[]>({
      queryKey: ['productReviews', productId],
      queryFn: () => fetchProductReviews(productId!),
      enabled: !!productId, // Only run query if productId exists
      staleTime: 5 * 60 * 1000, // Cache reviews for 5 mins
  });

  const isLoading = isLoadingProduct || isLoadingReviews;
  // Prioritize product error message if it exists
  const queryError = productError || reviewsError; 

  // --- Loading State ---
  if (isLoading && !isProductError) { // Show loading only if not already in product error state
    return (
      <div className="container py-8 animate-pulse">
         <Skeleton className="h-6 w-1/3 mb-6" /> {/* Breadcrumb Skeleton */}
         <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="md:col-span-1 space-y-4">
                <Skeleton className="aspect-square w-full rounded-md" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="md:col-span-2 space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-10 w-full" /> {/* Tabs Skeleton */}
                <Skeleton className="h-24 w-full" /> {/* Content Skeleton */}
                <Skeleton className="h-24 w-full" /> 
            </div>
         </div>
      </div>
    );
  }

  // --- Error State or Product Not Found ---
  if (isProductError || !product) {
    return (
       <div className="container py-8 text-center">
         <h2 className="text-xl font-semibold text-red-600 mb-2">Product Not Found</h2>
         <p className="text-muted-foreground mb-4">
           {productError ? (productError as Error).message : 'The requested product could not be found or there was an error loading it.'}
         </p>
         <Button variant="outline" onClick={() => navigate('/tools/smokeless-directory')}>
           <ChevronLeft className="h-4 w-4 mr-2" />
           Back to Directory
         </Button>
       </div>
    );
  }

  // --- Success State ---
  const totalReviews = product.user_rating_count || reviews?.length || 0;
  const averageRating = product.user_rating_avg || 0;

  return (
    <div className="container py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/tools/smokeless-directory" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Smokeless Directory
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {/* Use BreadcrumbPage for the current non-link item */}
            <BreadcrumbPage className="text-sm font-medium text-foreground">{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column: Image & Basic Info */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="aspect-square bg-muted rounded-md mb-4 flex items-center justify-center border">
                <img 
                  src={product.image_url || '/placeholder.svg'} 
                  alt={product.name} 
                  className="object-contain max-h-full p-2"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {product.flavor_category && <Badge variant="outline">{product.flavor_category}</Badge>}
                  {product.nicotine_strength_mg !== null && product.nicotine_strength_mg !== undefined && (
                    <Badge variant="secondary">{product.nicotine_strength_mg}mg</Badge>
                  )}
                </div>
                
                {/* Affiliate/Purchase Links - Placeholder */}
                <div className="space-y-2 pt-2">
                  <Button className="w-full bg-primary hover:bg-primary/90" disabled> 
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Find Online (Coming Soon)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column: Details & Tabs */}
        <div className="md:col-span-2">
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">{product.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-muted-foreground font-medium">{product.brand}</p>
                {/* Add type/category if available */}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <StarRating rating={averageRating} />
                <span className="text-sm text-muted-foreground">
                  {averageRating.toFixed(1)} ({totalReviews} reviews)
                </span>
              </div>
            </div>
            
            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({totalReviews})</TabsTrigger>
                <TabsTrigger value="health">Health Info</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6 text-sm">
                <div>
                  <h3 className="font-semibold mb-2 text-base">Description</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {product.description || 'No detailed description available.'}
                  </p>
                </div>
                
                {product.ingredients && product.ingredients.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2 text-base">Ingredients</h3>
                    <p className="text-muted-foreground">{product.ingredients.join(', ')}</p>
                  </div>
                )}
                {/* Add Usage Instructions if available in DB */}
              </TabsContent>
              
              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Customer Reviews</CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                       <div className="text-center">
                         <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
                         <StarRating rating={averageRating} />
                         <div className="text-sm text-muted-foreground mt-1">{totalReviews} Reviews</div>
                       </div>
                       {/* Placeholder for rating breakdown */}
                       <RatingBreakdown breakdown={null} totalReviews={totalReviews} /> 
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Review Submission Form (Placeholder) */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Write a Review</CardTitle>
                        <CardDescription>Share your experience (feature coming soon).</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                         <div className="flex items-center gap-1">
                           {[1, 2, 3, 4, 5].map((i) => (
                             <Button key={i} variant="ghost" size="icon" className="text-muted-foreground hover:text-amber-400" disabled>
                               <Star className="h-5 w-5" />
                             </Button>
                           ))}
                         </div>
                        <Textarea placeholder="Your review..." disabled />
                      </CardContent>
                      <CardFooter>
                        <Button disabled>Submit Review</Button>
                      </CardFooter>
                    </Card>

                    {/* Display Reviews */}
                    <div className="space-y-4">
                      {reviews && reviews.length > 0 ? (
                        reviews.map((review) => <ReviewCard key={review.id} review={review} />)
                      ) : (
                        <p className="text-muted-foreground text-center py-4">No reviews yet for this product.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Health Info Tab */}
              <TabsContent value="health" className="space-y-6 text-sm">
                 <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex gap-3">
                   <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                   <div className="text-sm">
                     <p className="font-medium text-amber-800">Health Disclaimer</p>
                     <p className="text-amber-700">
                       All nicotine products are addictive. This information is for harm reduction education. 
                       No nicotine use is the healthiest choice. Consult healthcare providers for medical advice.
                     </p>
                   </div>
                 </div>

                {product.expert_notes_chemicals && (
                  <div>
                    <h3 className="font-semibold mb-2 text-base flex items-center"><Info className="h-4 w-4 mr-2 text-blue-500"/>Chemical Notes</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{product.expert_notes_chemicals}</p>
                  </div>
                )}

                 {product.expert_notes_gum_health && ( 
                  <div> 
                    <h3 className="font-semibold mb-2 text-base flex items-center"><Info className="h-4 w-4 mr-2 text-blue-500"/>Gum Health Impact Notes</h3> 
                    <p className="text-muted-foreground whitespace-pre-wrap">{product.expert_notes_gum_health}</p>
                  </div> 
                )}

                {/* General Harm Reduction Profile */}
                <div> 
                  <h3 className="font-semibold mb-2 text-base">General Harm Reduction Profile</h3>
                  <p className="text-muted-foreground mb-2">
                    Compared to smoking cigarettes, tobacco-free nicotine pouches generally:
                  </p>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1"> 
                    <li>Eliminate exposure to tar and harmful combustion byproducts.</li> 
                    <li>Significantly reduce risks associated with smoking-related diseases (cancer, respiratory illness).</li> 
                    <li>Contain addictive nicotine, which carries cardiovascular risks.</li> 
                    <li>May pose local risks like gum irritation.</li> 
                    <li>Represent a substantial harm reduction for smokers unable or unwilling to quit nicotine entirely.</li> 
                  </ul> 
                </div> 
                
                {/* Additional Resources */}
                <div>
                  <h3 className="font-semibold mb-2 text-base">Additional Resources</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <Link to="/tools/nrt-guide" className="text-primary hover:underline flex items-center text-sm">
                        Mission Fresh NRT Guide
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Link>
                    </li>
                     <li>
                      <Link to="/tools/quit-methods" className="text-primary hover:underline flex items-center text-sm">
                        Compare Quitting Methods
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; // Ensure default export exists
