
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
  // Add more products as needed
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
