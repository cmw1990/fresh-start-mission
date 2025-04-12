
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbSeparator,
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
import { Star, ExternalLink, ChevronLeft, AlertTriangle, Heart, ShoppingCart } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpful: number;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  type: string;
  nicotineStrength: string;
  flavors: string[];
  price: string;
  rating: number;
  reviewCount: number;
  description: string;
  longDescription: string;
  imageUrl?: string;
  affiliateUrl?: string;
  chemicalInfo?: string;
  usageInstructions?: string;
  reviews: Review[];
  ratingBreakdown: {
    five: number;
    four: number;
    three: number;
    two: number;
    one: number;
  };
}

// Sample product data
const sampleProduct: Product = {
  id: "1",
  name: "ZYN Cool Mint",
  brand: "ZYN",
  category: "Nicotine Pouch",
  type: "Pouch",
  nicotineStrength: "6mg",
  flavors: ["Mint", "Menthol"],
  price: "$4.99",
  rating: 4.5,
  reviewCount: 124,
  description: "ZYN Cool Mint provides a refreshing minty experience with a satisfying nicotine kick. Tobacco-free and discreet.",
  longDescription: "ZYN pouches are tobacco-free nicotine pouches that provide a discreet and convenient way to enjoy nicotine without smoke, spit, or odor. The Cool Mint variety offers a refreshing minty flavor that provides long-lasting freshness while delivering a satisfying nicotine experience. Each pouch is white and slim for a comfortable fit under your lip. ZYN pouches are made with pharmaceutical-grade nicotine salts, food-grade fillers, stabilizers, and flavorings. They contain no tobacco leaf or dust, making them a smoke-free, spit-free alternative.",
  imageUrl: "https://via.placeholder.com/400x400",
  affiliateUrl: "https://example.com/buy-zyn",
  chemicalInfo: "ZYN pouches contain nicotine salts, food-grade fillers, pH adjusters, stabilizers, and flavorings. They do not contain tobacco leaf or tobacco dust. The nicotine is pharmaceutical grade. While significantly less harmful than combustible tobacco, nicotine itself is addictive and can increase heart rate and blood pressure.",
  usageInstructions: "Place one pouch between your upper lip and gum. No need to chew or spit. Leave in place for up to 30-60 minutes for optimal nicotine release. Discard after use. Store at room temperature away from direct sunlight.",
  reviews: [
    {
      id: "r1",
      userName: "Alex M.",
      userAvatar: "",
      rating: 5,
      date: "2023-09-15",
      title: "Great alternative",
      comment: "These are excellent for times when I can't smoke. The mint flavor is refreshing and lasts a good while. Helps manage cravings without the need to step outside.",
      helpful: 12
    },
    {
      id: "r2",
      userName: "Jordan T.",
      userAvatar: "",
      rating: 4,
      date: "2023-08-22",
      title: "Good but strong",
      comment: "The flavor is nice and the nicotine satisfaction is there, but I found the 6mg strength a bit too much for me. Going to try the 3mg next time. Overall good product.",
      helpful: 8
    },
    {
      id: "r3",
      userName: "Sam K.",
      userAvatar: "",
      rating: 5,
      date: "2023-07-30",
      title: "Finally quit smoking!",
      comment: "These pouches have been a game-changer for me. After 12 years of smoking, I've been cigarette-free for 3 months using these. The mint flavor is pleasant and the satisfaction is there.",
      helpful: 15
    }
  ],
  ratingBreakdown: {
    five: 70,
    four: 20,
    three: 5,
    two: 3,
    one: 2
  }
};

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product] = useState<Product>(sampleProduct); // In a real app, fetch based on productId
  
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
        ))}
        {hasHalfStar && (
          <Star className="h-5 w-5 fill-amber-400 text-amber-400 fill-half" />
        )}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
        ))}
      </div>
    );
  };
  
  return (
    <div className="container py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/tools/smokeless-directory">
              <ChevronLeft className="h-4 w-4 inline mr-1" />
              Smokeless Directory
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">{product.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-square bg-muted rounded-md mb-4 flex items-center justify-center">
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="object-contain max-h-full"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    No image available
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Badge variant="outline" className="text-fresh-500 border-fresh-200 bg-fresh-50">
                    {product.category}
                  </Badge>
                  <Badge variant="outline">
                    {product.nicotineStrength}
                  </Badge>
                </div>
                
                <div>
                  <div className="font-medium text-lg">{product.price}</div>
                  <div className="text-sm text-muted-foreground">per package</div>
                </div>
                
                {product.affiliateUrl && (
                  <div className="space-y-2">
                    <Button className="w-full bg-fresh-300 hover:bg-fresh-400" asChild>
                      <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Check Price Online
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="#">
                        <Heart className="h-4 w-4 mr-2" />
                        Save to Favorites
                      </a>
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Affiliate link - Mission Fresh may earn a commission
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-muted-foreground">{product.brand}</p>
                <span className="text-muted-foreground">•</span>
                <p className="text-muted-foreground">{product.type}</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {renderStars(product.rating)}
                <span className="text-sm text-muted-foreground">
                  {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="health">Health Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{product.longDescription}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Flavors</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {product.flavors.map(flavor => (
                      <Badge key={flavor} variant="secondary">
                        {flavor}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {product.usageInstructions && (
                  <div>
                    <h3 className="font-semibold mb-2">Usage Instructions</h3>
                    <p className="text-muted-foreground">{product.usageInstructions}</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{product.rating.toFixed(1)}</div>
                    <div className="text-sm text-muted-foreground">{product.reviewCount} reviews</div>
                    <div className="mt-1">
                      {renderStars(product.rating)}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="text-sm w-6">5★</div>
                        <Progress value={product.ratingBreakdown.five} className="h-2" />
                        <div className="text-sm text-muted-foreground w-8">{product.ratingBreakdown.five}%</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm w-6">4★</div>
                        <Progress value={product.ratingBreakdown.four} className="h-2" />
                        <div className="text-sm text-muted-foreground w-8">{product.ratingBreakdown.four}%</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm w-6">3★</div>
                        <Progress value={product.ratingBreakdown.three} className="h-2" />
                        <div className="text-sm text-muted-foreground w-8">{product.ratingBreakdown.three}%</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm w-6">2★</div>
                        <Progress value={product.ratingBreakdown.two} className="h-2" />
                        <div className="text-sm text-muted-foreground w-8">{product.ratingBreakdown.two}%</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm w-6">1★</div>
                        <Progress value={product.ratingBreakdown.one} className="h-2" />
                        <div className="text-sm text-muted-foreground w-8">{product.ratingBreakdown.one}%</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {product.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-base">{review.title}</CardTitle>
                              <CardDescription>
                                {review.userName} • {new Date(review.date).toLocaleDateString()}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3.5 w-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </CardContent>
                      <CardFooter className="pt-0 text-sm text-muted-foreground">
                        <span>{review.helpful} people found this helpful</span>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="health" className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-800">Health Disclaimer</p>
                    <p className="text-amber-700">
                      All nicotine products are addictive. This information is provided for harm reduction purposes.
                      No nicotine use is always the healthiest option. Consult healthcare providers for medical advice.
                    </p>
                  </div>
                </div>
                
                {product.chemicalInfo && (
                  <div>
                    <h3 className="font-semibold mb-2">Chemical Composition & Health Notes</h3>
                    <p className="text-muted-foreground">{product.chemicalInfo}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="font-semibold mb-2">Harm Reduction Profile</h3>
                  <p className="text-muted-foreground mb-2">
                    Compared to combustible tobacco products (cigarettes), this product:
                  </p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Contains nicotine, which is addictive but not the primary cause of smoking-related diseases</li>
                    <li>Does not involve combustion, eliminating exposure to tar and most carcinogens found in smoke</li>
                    <li>Significantly reduces risk of respiratory issues, lung cancer, and cardiovascular impacts compared to smoking</li>
                    <li>May have specific risks related to its form factor (e.g., gum irritation for pouches, potential respiratory irritation for vapes)</li>
                    <li>Is not risk-free, but represents a substantial harm reduction for those who would otherwise smoke</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Additional Resources</h3>
                  <p className="text-muted-foreground mb-2">
                    For more information about smokeless nicotine products and harm reduction:
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>
                      <Link to="#" className="text-fresh-500 hover:underline flex items-center">
                        Mission Fresh Guide to Harm Reduction
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Link>
                    </li>
                    <li>
                      <a href="https://www.nhs.uk/live-well/quit-smoking/" target="_blank" rel="noopener noreferrer" className="text-fresh-500 hover:underline flex items-center">
                        NHS Smokefree Resources
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
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

export default ProductDetails;
