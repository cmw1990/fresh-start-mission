
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Heart, Star, ThumbsUp, ThumbsDown, AlertTriangle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample product data (in a real app, this would come from the database)
const products = [
  {
    id: "1",
    name: "ZYN Cool Mint",
    brand: "ZYN",
    type: "Nicotine Pouch",
    nicotineStrength: 6,
    flavors: ["Mint", "Menthol"],
    image: "https://via.placeholder.com/300x300",
    rating: 4.5,
    reviewCount: 128,
    description: "Slim nicotine pouch with a fresh mint flavor. Provides a moderate nicotine strength and minimal drip.",
    longDescription: "ZYN Cool Mint delivers a refreshing mint experience with moderate nicotine satisfaction. These slim, white pouches are discreet and comfortable, fitting perfectly under your lip. The nicotine is absorbed through the gum lining, providing a smoke-free, spit-free experience without tobacco. The cooling mint sensation helps reduce cravings quickly while freshening breath.",
    specifications: {
      size: "Regular",
      weight: "0.4g/pouch",
      pouchCount: "15 pouches per can",
      moistureContent: "Low",
      format: "Dry white pouch",
      ingredients: "Nicotine, Water, Salt, Plant Fibers, pH Adjusters, Stabilizers, Sweeteners, Mint Flavoring",
    },
    healthNotes: "Contains pharmaceutical grade nicotine. While free from tobacco, nicotine itself is highly addictive. Not recommended for non-nicotine users. May cause gum irritation in some users.",
    price: "$4.99 - $6.99",
    vendors: [
      {
        name: "VaporFi",
        link: "https://example.com/buy-zyn",
        price: "$4.99",
      },
      {
        name: "Element Vape",
        link: "https://example.com/buy-zyn-2",
        price: "$5.49",
      },
      {
        name: "Direct from Manufacturer",
        link: "https://example.com/zyn-official",
        price: "$6.99",
      }
    ],
    reviews: [
      {
        id: "r1",
        user: "Michael S.",
        avatar: "",
        rating: 5,
        date: "2023-08-15",
        title: "Great alternative to smoking",
        content: "I've tried many different pouches and ZYN is my favorite. The mint flavor is refreshing and not too overwhelming. Nicotine strength is perfect for me as a former pack-a-day smoker.",
        helpful: 24,
        unhelpful: 2,
      },
      {
        id: "r2",
        user: "Jessica T.",
        avatar: "",
        rating: 4,
        date: "2023-07-22",
        title: "Good flavor, but could last longer",
        content: "The mint flavor is really nice and the strength is good, but I find they don't last quite as long as some competitors. Still a solid choice though!",
        helpful: 18,
        unhelpful: 3,
      },
      {
        id: "r3",
        user: "David K.",
        avatar: "",
        rating: 5,
        date: "2023-09-05",
        title: "The best pouches on the market",
        content: "Been using ZYN for over a year now and they're consistently good. The Cool Mint is refreshing and the nicotine hit is perfect - not too harsh but satisfying. No issues with quality control either, unlike some other brands I've tried.",
        helpful: 31,
        unhelpful: 1,
      },
    ]
  },
  {
    id: "2",
    name: "VELO Citrus",
    brand: "VELO",
    type: "Nicotine Pouch",
    nicotineStrength: 4,
    flavors: ["Citrus", "Orange"],
    image: "https://via.placeholder.com/300x300",
    rating: 4.2,
    reviewCount: 86,
    description: "Refreshing citrus-flavored nicotine pouch with a balanced strength and excellent comfort.",
    longDescription: "VELO Citrus offers a bright, zesty flavor that provides a refreshing alternative to traditional mint options. These slim pouches deliver a consistent nicotine release with minimal irritation. The moisture level is perfectly balanced for comfort without excessive drip, making them ideal for both new and experienced users. The citrus flavor helps mask the typical nicotine taste while providing a subtle, pleasant sensation.",
    specifications: {
      size: "Slim",
      weight: "0.35g/pouch",
      pouchCount: "20 pouches per can",
      moistureContent: "Medium",
      format: "White pouch",
      ingredients: "Nicotine, Water, Plant-based Materials, Sweeteners, Stabilizers, Natural and Artificial Flavors",
    },
    healthNotes: "Contains pharmaceutical grade nicotine without tobacco leaf. Nicotine is an addictive chemical. Not for use by non-nicotine users, pregnant women, or those with cardiovascular conditions. May cause gum sensitivity in some users.",
    price: "$4.49 - $5.99",
    vendors: [
      {
        name: "CigElectric",
        link: "https://example.com/buy-velo",
        price: "$4.49",
      },
      {
        name: "Smokers Outlet",
        link: "https://example.com/buy-velo-2",
        price: "$4.99",
      },
      {
        name: "VELO Official",
        link: "https://example.com/velo-official",
        price: "$5.99",
      }
    ],
    reviews: [
      {
        id: "r1",
        user: "Alex M.",
        avatar: "",
        rating: 5,
        date: "2023-10-12",
        title: "Favorite citrus flavor on the market",
        content: "The citrus flavor is perfectly balanced - not too sweet, not too sour. Great alternative to mint flavors which can get overwhelming. Nicotine strength is just right for me.",
        helpful: 15,
        unhelpful: 1,
      },
      {
        id: "r2",
        user: "Sam K.",
        avatar: "",
        rating: 3,
        date: "2023-09-18",
        title: "Good flavor but inconsistent quality",
        content: "I really like the citrus taste, but I've found the pouches can be inconsistent from can to can. Sometimes they're perfect, other times they seem dry. When they're good though, they're really good!",
        helpful: 12,
        unhelpful: 2,
      },
      {
        id: "r3",
        user: "Taylor R.",
        avatar: "",
        rating: 4,
        date: "2023-11-03",
        title: "Great morning pouch",
        content: "I've made these my go-to morning pouch. The citrus flavor is bright and energizing, pairs perfectly with coffee. Good nicotine delivery without being overwhelming.",
        helpful: 19,
        unhelpful: 0,
      }
    ]
  },
  {
    id: "3",
    name: "ON! Coffee",
    brand: "ON!",
    type: "Nicotine Pouch",
    nicotineStrength: 8,
    flavors: ["Coffee", "Mocha"],
    image: "https://via.placeholder.com/300x300",
    rating: 4.7,
    reviewCount: 94,
    description: "High-strength nicotine pouch with authentic coffee flavor, perfect for coffee lovers looking to reduce smoking.",
    longDescription: "ON! Coffee nicotine pouches deliver a rich, authentic coffee experience with notes of chocolate and roasted beans. These small but potent pouches pack a substantial nicotine punch at 8mg strength, making them ideal for those transitioning from regular cigarettes. The unique coffee flavor offers a welcome alternative to traditional mint or fruit options, and pairs exceptionally well with your morning routine. Despite their higher strength, these pouches are designed to minimize gum irritation.",
    specifications: {
      size: "Mini",
      weight: "0.3g/pouch",
      pouchCount: "20 pouches per can",
      moistureContent: "Low-Medium",
      format: "White dry pouch",
      ingredients: "Pharmaceutical Grade Nicotine, Vegetable Fibers, Food-Grade Flavorings, Stabilizers, Coffee Extract",
    },
    healthNotes: "Contains a higher concentration of nicotine (8mg). Not recommended for nicotine-sensitive individuals or beginner users. Nicotine is highly addictive and can increase heart rate and blood pressure. Not for use during pregnancy or by non-nicotine users.",
    price: "$5.49 - $7.99",
    vendors: [
      {
        name: "NicoDirect",
        link: "https://example.com/buy-on",
        price: "$5.49",
      },
      {
        name: "VapeCity",
        link: "https://example.com/buy-on-2",
        price: "$6.29",
      },
      {
        name: "ON! Official Store",
        link: "https://example.com/on-official",
        price: "$7.99",
      }
    ],
    reviews: [
      {
        id: "r1",
        user: "James L.",
        avatar: "",
        rating: 5,
        date: "2023-07-19",
        title: "Finally, a good coffee-flavored option",
        content: "As a coffee addict and former smoker, these are PERFECT. The coffee flavor is actually good - not artificial tasting like some brands. The higher strength is great for when I really need it, especially with morning coffee.",
        helpful: 27,
        unhelpful: 1,
      },
      {
        id: "r2",
        user: "Maria C.",
        avatar: "",
        rating: 5,
        date: "2023-08-30",
        title: "Strong but smooth",
        content: "These pack a punch but in a good way. The coffee flavor helps mask the nicotine sensation better than any other flavor I've tried. Great for when I need serious craving relief without having to use multiple pouches.",
        helpful: 16,
        unhelpful: 0,
      },
      {
        id: "r3",
        user: "Robert J.",
        avatar: "",
        rating: 4,
        date: "2023-10-22",
        title: "Good strength, flavor could be stronger",
        content: "Perfect strength for me as a former pack-a-day smoker. My only wish is that the coffee flavor was a bit stronger - it's good but fades quicker than I'd like. Still my go-to brand though.",
        helpful: 14,
        unhelpful: 2,
      }
    ]
  }
];

const ProductDetails = () => {
  const { productId } = useParams();
  
  // Find the product with matching ID
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't seem to exist.</p>
        <Link to="/tools/smokeless-directory">
          <Button>Return to Directory</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container py-12">
      <Link to="/tools/smokeless-directory" className="inline-flex items-center text-fresh-500 hover:text-fresh-600 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Directory
      </Link>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-start gap-6 flex-col sm:flex-row mb-8">
            <div className="w-full sm:w-1/3 flex-shrink-0">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto rounded-lg border shadow-sm"
              />
            </div>
            
            <div className="flex-1">
              <div className="mb-2">
                <Badge className="bg-fresh-300 hover:bg-fresh-400">{product.type}</Badge>
                <Badge variant="outline" className="ml-2">{product.nicotineStrength}mg</Badge>
              </div>
              
              <h1 className="text-3xl font-bold mb-1">{product.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">by {product.brand}</p>
              
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 font-medium">{product.rating}</span>
                <span className="ml-1 text-sm text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium mb-2">Flavor Profile</h3>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map(flavor => (
                    <Badge key={flavor} variant="secondary">{flavor}</Badge>
                  ))}
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Button className="bg-fresh-300 hover:bg-fresh-400">
                  Where to Buy
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Save for Later
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="health">Health Notes</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Product Details</h2>
              <p className="mb-4">{product.longDescription}</p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Usage Instructions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Open the can and remove one pouch.</li>
                      <li>Place the pouch between your upper lip and gum.</li>
                      <li>Leave in place for up to 30-60 minutes.</li>
                      <li>Dispose of used pouch in trash (not toilet).</li>
                    </ol>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Storage Instructions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Store in a cool, dry place.</li>
                      <li>Keep away from direct sunlight.</li>
                      <li>Keep out of reach of children and pets.</li>
                      <li>Product best when used within 3 months of opening.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Technical Specifications</h2>
              <Card>
                <CardContent className="pt-6">
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-sm font-medium text-muted-foreground">{key}</dt>
                        <dd className="mt-1">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="health" className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Health Information</h2>
              <Card>
                <CardHeader className="bg-amber-50">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <CardTitle>Important Health Notes</CardTitle>
                      <CardDescription className="text-amber-800">
                        Please read this information carefully before using this product.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <p>{product.healthNotes}</p>
                    
                    <h3 className="font-semibold">General Nicotine Warnings</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Nicotine is an addictive chemical</li>
                      <li>Not suitable for non-nicotine users</li>
                      <li>Not recommended for pregnant or nursing women</li>
                      <li>May cause increased heart rate and blood pressure</li>
                      <li>Keep out of reach of children and pets</li>
                      <li>May cause gum irritation or mouth sores in some users</li>
                    </ul>
                    
                    <div className="bg-blue-50 p-4 rounded-md">
                      <h3 className="font-semibold text-blue-800 mb-2">Expert Assessment</h3>
                      <p className="text-blue-800">
                        While all nicotine products carry risks, smokeless nicotine pouches generally present fewer health risks compared to combustible tobacco products as they don't contain tobacco leaf or produce harmful smoke. However, nicotine itself remains addictive and can have cardiovascular effects.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Customer Reviews</h2>
                <Button>Write a Review</Button>
              </div>
              
              <div className="space-y-6">
                {product.reviews.map(review => (
                  <Card key={review.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{review.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            {review.avatar && <AvatarImage src={review.avatar} alt={review.user} />}
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{review.user}</h4>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <h5 className="font-medium mb-2">{review.title}</h5>
                      <p className="text-muted-foreground">{review.content}</p>
                    </CardContent>
                    <CardFooter>
                      <div className="flex items-center gap-4 text-sm">
                        <span>Was this helpful?</span>
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{review.helpful}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <ThumbsDown className="h-4 w-4" />
                          <span>{review.unhelpful}</span>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="mb-6 sticky top-4">
            <CardHeader>
              <CardTitle>Where to Buy</CardTitle>
              <CardDescription>
                Price range: {product.price}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {product.vendors.map((vendor, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{vendor.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{vendor.price}</span>
                    <Button variant="outline" size="sm" asChild className="h-8">
                      <a href={vendor.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
                        Visit
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              *Prices are approximate and subject to change
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Similar Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src="https://via.placeholder.com/50x50" 
                  alt="VELO Mint" 
                  className="w-12 h-12 rounded border"
                />
                <div className="flex-1">
                  <h4 className="font-medium">VELO Mint</h4>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-xs">4.0</span>
                  </div>
                </div>
                <Badge variant="outline">4mg</Badge>
              </div>
              
              <div className="flex items-center gap-3">
                <img 
                  src="https://via.placeholder.com/50x50" 
                  alt="ON! Mint" 
                  className="w-12 h-12 rounded border"
                />
                <div className="flex-1">
                  <h4 className="font-medium">ON! Mint</h4>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-xs">4.3</span>
                  </div>
                </div>
                <Badge variant="outline">4mg</Badge>
              </div>
              
              <div className="flex items-center gap-3">
                <img 
                  src="https://via.placeholder.com/50x50" 
                  alt="White Fox Mint" 
                  className="w-12 h-12 rounded border"
                />
                <div className="flex-1">
                  <h4 className="font-medium">White Fox Mint</h4>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-xs">4.7</span>
                  </div>
                </div>
                <Badge variant="outline">16mg</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="w-full" asChild>
                <Link to="/tools/smokeless-directory">View more products</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
