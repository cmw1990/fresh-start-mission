
import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Search, Filter, Star, ChevronDown, ChevronUp, Star as StarIcon, ExternalLink, AlertCircle, ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Accordion, AccordionContent, AccordionItem, AccordionTrigger 
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Example smokeless product data
const smokelessProducts = [
  {
    id: "1",
    name: "ZYN Smooth",
    brand: "ZYN",
    nicotineStrength: 6,
    type: "Pouch",
    flavors: ["Mint", "Coffee", "Citrus"],
    rating: 4.7,
    reviewCount: 342,
    description: "ZYN Smooth nicotine pouches provide a discreet, smoke-free, and spit-free way to enjoy nicotine. These small pouches fit comfortably under your upper lip and deliver nicotine for up to an hour.",
    price: "$4.99 - $5.99",
    image: "https://via.placeholder.com/300x200?text=Product+Image",
    chemicalConcerns: "Low",
    gumHealthImpact: "Minimal",
    availableIn: ["USA", "Sweden", "UK", "Germany"],
    releaseMethod: "Gradual release",
  },
  {
    id: "2",
    name: "ON! Original",
    brand: "ON!",
    nicotineStrength: 4,
    type: "Pouch",
    flavors: ["Original", "Mint", "Berry"],
    rating: 4.5,
    reviewCount: 287,
    description: "ON! nicotine pouches offer a tobacco-free way to enjoy nicotine. These slim, discrete pouches release nicotine quickly and come in various strengths to suit different preferences.",
    price: "$3.99 - $4.99",
    image: "https://via.placeholder.com/300x200?text=Product+Image",
    chemicalConcerns: "Low",
    gumHealthImpact: "Low",
    availableIn: ["USA", "Canada", "Switzerland"],
    releaseMethod: "Quick release",
  },
  {
    id: "3",
    name: "Rogue Wintergreen",
    brand: "Rogue",
    nicotineStrength: 6,
    type: "Pouch",
    flavors: ["Wintergreen", "Peppermint", "Honey Lemon"],
    rating: 4.2,
    reviewCount: 198,
    description: "Rogue nicotine pouches deliver a satisfying experience in a smoke-free, spit-free format. These discrete pouches fit comfortably under your lip and provide up to 60 minutes of nicotine delivery.",
    price: "$3.50 - $4.50",
    image: "https://via.placeholder.com/300x200?text=Product+Image",
    chemicalConcerns: "Medium",
    gumHealthImpact: "Low-Medium",
    availableIn: ["USA", "Canada"],
    releaseMethod: "Standard release",
  },
  {
    id: "4",
    name: "VELO Ice Cool",
    brand: "VELO",
    nicotineStrength: 4,
    type: "Pouch",
    flavors: ["Ice Cool Mint", "Citrus Blend", "Berry Frost"],
    rating: 4.3,
    reviewCount: 256,
    description: "VELO nicotine pouches provide a refreshing and discrete way to enjoy nicotine. These pouches release flavor and nicotine gradually for a satisfying experience.",
    price: "$4.29 - $5.29",
    image: "https://via.placeholder.com/300x200?text=Product+Image",
    chemicalConcerns: "Low",
    gumHealthImpact: "Low",
    availableIn: ["USA", "UK", "Sweden", "Denmark"],
    releaseMethod: "Gradual release",
  },
  {
    id: "5",
    name: "Zyn Cool Mint",
    brand: "ZYN",
    nicotineStrength: 3,
    type: "Pouch",
    flavors: ["Cool Mint", "Wintergreen", "Cinnamon"],
    rating: 4.8,
    reviewCount: 423,
    description: "ZYN Cool Mint provides a refreshing mint flavor in a discreet, tobacco-free nicotine pouch. Perfect for on-the-go use with a balanced nicotine delivery.",
    price: "$4.99 - $5.99",
    image: "https://via.placeholder.com/300x200?text=Product+Image",
    chemicalConcerns: "Low",
    gumHealthImpact: "Minimal",
    availableIn: ["USA", "Sweden", "Norway", "Denmark"],
    releaseMethod: "Gradual release",
  },
  {
    id: "6",
    name: "LUCY Wintergreen",
    brand: "LUCY",
    nicotineStrength: 4,
    type: "Gum",
    flavors: ["Wintergreen", "Cinnamon", "Pomegranate"],
    rating: 4.1,
    reviewCount: 167,
    description: "LUCY nicotine gum provides a familiar format for nicotine delivery. The wintergreen flavor offers a refreshing taste while delivering nicotine to help manage cravings.",
    price: "$5.99 - $6.99",
    image: "https://via.placeholder.com/300x200?text=Product+Image",
    chemicalConcerns: "Low",
    gumHealthImpact: "Low",
    availableIn: ["USA"],
    releaseMethod: "Quick release",
  },
  {
    id: "7",
    name: "RUSH Extra Strong",
    brand: "RUSH",
    nicotineStrength: 9,
    type: "Pouch",
    flavors: ["Mint", "Original"],
    rating: 4.5,
    reviewCount: 156,
    description: "RUSH Extra Strong delivers a powerful nicotine experience for those seeking higher strength options. These pouches provide a satisfying experience with a quick onset.",
    price: "$4.49 - $5.49",
    image: "https://via.placeholder.com/300x200?text=Product+Image",
    chemicalConcerns: "Medium",
    gumHealthImpact: "Medium",
    availableIn: ["Sweden", "Finland", "Norway"],
    releaseMethod: "Fast release",
  },
  {
    id: "8",
    name: "VELO Citrus",
    brand: "VELO",
    nicotineStrength: 2,
    type: "Pouch",
    flavors: ["Citrus", "Mint", "Coffee"],
    rating: 3.9,
    reviewCount: 178,
    description: "VELO Citrus offers a mild nicotine experience with a refreshing citrus flavor. These pouches are perfect for beginners or those who prefer a lighter nicotine strength.",
    price: "$4.29 - $5.29",
    image: "https://via.placeholder.com/300x200?text=Product+Image",
    chemicalConcerns: "Low",
    gumHealthImpact: "Low",
    availableIn: ["USA", "UK", "Italy", "Germany"],
    releaseMethod: "Standard release",
  }
];

// Example verified vendors
const verifiedVendors = [
  {
    id: "v1",
    name: "Nicotine Express",
    website: "https://nicotineexpress.example.com",
    rating: 4.7,
    reviewCount: 342,
    shippingCountries: ["USA", "Canada"],
    description: "Fast shipping on all major smokeless nicotine brands with competitive pricing.",
    affiliateLink: "https://nicotineexpress.example.com/ref?id=missionfresh"
  },
  {
    id: "v2",
    name: "PouchDirect",
    website: "https://pouchdirect.example.com",
    rating: 4.5,
    reviewCount: 287,
    shippingCountries: ["USA", "UK", "EU"],
    description: "Specializing in nicotine pouches with the widest selection of brands and flavors.",
    affiliateLink: "https://pouchdirect.example.com/partner/missionfresh"
  },
  {
    id: "v3",
    name: "SmokelessWorld",
    website: "https://smokelessworld.example.com",
    rating: 4.2,
    reviewCount: 198,
    shippingCountries: ["Worldwide"],
    description: "Global shipping on premium smokeless products with discrete packaging.",
    affiliateLink: "https://smokelessworld.example.com?aff=missionfresh"
  }
];

const ProductCard = ({ product }: { product: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Generate stars for rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={cn(
              "fill-current", 
              i < fullStars 
                ? "text-amber-400" 
                : i === fullStars && hasHalfStar 
                ? "text-amber-400" 
                : "text-gray-300"
            )}
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating}</span>
        <span className="ml-1 text-sm text-muted-foreground">({product.reviewCount})</span>
      </div>
    );
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200",
      isExpanded ? "shadow-md" : "",
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <Badge variant="outline" className="ml-2">{product.type}</Badge>
        </div>
        <CardDescription>{product.brand}</CardDescription>
        {renderStars(product.rating)}
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Badge variant="secondary" className="mr-2">{product.nicotineStrength}mg</Badge>
            <span className="text-sm text-muted-foreground">{product.flavors.join(", ")}</span>
          </div>
          <span className="text-sm font-medium">{product.price}</span>
        </div>
        
        {isExpanded && (
          <div className="mt-4 space-y-4">
            <p className="text-sm">{product.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Chemical Concerns</h4>
                <div className="flex items-center">
                  <Badge 
                    variant={product.chemicalConcerns === "Low" ? "outline" : "default"}
                    className={cn(
                      product.chemicalConcerns === "Low" && "bg-green-50 text-green-700 border-green-200",
                      product.chemicalConcerns === "Medium" && "bg-amber-50 text-amber-700 border-amber-200",
                      product.chemicalConcerns === "High" && "bg-red-50 text-red-700 border-red-200"
                    )}
                  >
                    {product.chemicalConcerns}
                  </Badge>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Gum Health Impact</h4>
                <div className="flex items-center">
                  <Badge 
                    variant={product.gumHealthImpact === "Minimal" ? "outline" : "default"}
                    className={cn(
                      (product.gumHealthImpact === "Minimal" || product.gumHealthImpact === "Low") && "bg-green-50 text-green-700 border-green-200",
                      product.gumHealthImpact === "Low-Medium" && "bg-yellow-50 text-yellow-700 border-yellow-200",
                      product.gumHealthImpact === "Medium" && "bg-amber-50 text-amber-700 border-amber-200",
                      product.gumHealthImpact === "High" && "bg-red-50 text-red-700 border-red-200"
                    )}
                  >
                    {product.gumHealthImpact}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Available In</h4>
              <div className="flex flex-wrap gap-1">
                {product.availableIn.map((country: string) => (
                  <Badge key={country} variant="outline" className="text-xs">{country}</Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Release Method</h4>
              <span className="text-sm">{product.releaseMethod}</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-1">
        <div className="w-full flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-sm px-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <><ChevronUp size={16} className="mr-1" /> Less Details</>
            ) : (
              <><ChevronDown size={16} className="mr-1" /> More Details</>
            )}
          </Button>
          <Button variant="default" size="sm" className="ml-auto text-sm bg-fresh-300 hover:bg-fresh-400">
            View Vendors
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const VendorCard = ({ vendor }: { vendor: any }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            {vendor.name}
            <ShieldCheck size={16} className="ml-2 text-green-500" />
          </CardTitle>
          <div className="flex items-center">
            <StarIcon size={16} className="text-amber-400 fill-current mr-1" />
            <span className="text-sm">{vendor.rating}</span>
          </div>
        </div>
        <CardDescription className="flex items-center">
          <ExternalLink size={14} className="mr-1" />
          <a 
            href={vendor.affiliateLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-fresh-500 hover:underline"
          >
            Visit Website
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm mb-2">{vendor.description}</p>
        <div>
          <h4 className="text-sm font-medium mb-1">Ships To</h4>
          <div className="flex flex-wrap gap-1">
            {vendor.shippingCountries.map((country: string) => (
              <Badge key={country} variant="outline" className="text-xs">{country}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          variant="default" 
          size="sm" 
          className="w-full bg-fresh-300 hover:bg-fresh-400"
          onClick={() => window.open(vendor.affiliateLink, '_blank')}
        >
          Visit Store (Affiliate)
        </Button>
      </CardFooter>
    </Card>
  );
};

const SmokelessDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [nicotineRange, setNicotineRange] = useState([0, 10]);
  const [selectedTab, setSelectedTab] = useState("products");
  
  // Filter products based on search and filters
  const filteredProducts = smokelessProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || product.type === selectedType;
    const matchesBrand = selectedBrand === "all" || product.brand === selectedBrand;
    const matchesNicotine = product.nicotineStrength >= nicotineRange[0] && 
                             product.nicotineStrength <= nicotineRange[1];
    
    return matchesSearch && matchesType && matchesBrand && matchesNicotine;
  });
  
  // Get unique types and brands for filters
  const productTypes = ["all", ...Array.from(new Set(smokelessProducts.map(p => p.type)))];
  const productBrands = ["all", ...Array.from(new Set(smokelessProducts.map(p => p.brand)))];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Smokeless Nicotine Directory</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore our comprehensive directory of smokeless nicotine products and find the right option for your fresh journey.
        </p>
        <div className="flex items-center justify-center mt-6">
          <AlertCircle size={18} className="text-amber-500 mr-2" />
          <p className="text-sm font-medium">
            Mission Fresh provides this information for educational purposes and doesn't endorse specific products.
          </p>
        </div>
      </div>

      <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="w-full mb-6">
        <TabsList className="grid grid-cols-2 max-w-[400px] mx-auto">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="vendors">Verified Vendors</TabsTrigger>
        </TabsList>
      </Tabs>

      <TabsContent value="products" className="mt-0">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products or brands..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="sm:w-auto flex items-center gap-2"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter size={16} />
            Filters
            {filterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>

        {filterOpen && (
          <Card className="mb-6 shadow-sm">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Product Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {productTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type === "all" ? "All Types" : type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Brand</label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {productBrands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand === "all" ? "All Brands" : brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="lg:col-span-2">
                  <label className="text-sm font-medium mb-2 block">
                    Nicotine Strength: {nicotineRange[0]}mg - {nicotineRange[1]}mg
                  </label>
                  <Slider
                    defaultValue={[0, 10]}
                    min={0}
                    max={10}
                    step={1}
                    value={nicotineRange}
                    onValueChange={setNicotineRange}
                    className="py-4"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedType("all");
                    setSelectedBrand("all");
                    setNicotineRange([0, 10]);
                    setSearchTerm("");
                  }}
                  className="mr-2"
                >
                  Reset Filters
                </Button>
                <Button 
                  onClick={() => setFilterOpen(false)}
                  className="bg-fresh-300 hover:bg-fresh-400"
                >
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mb-4">
          <p className="text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-lg font-medium">No products found</p>
              <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSelectedType("all");
                setSelectedBrand("all");
                setNicotineRange([0, 10]);
                setSearchTerm("");
              }}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="vendors" className="mt-0">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Verified Vendors</h2>
          <p className="text-muted-foreground mb-2">
            These vendors have been reviewed for reliability, shipping practices, and customer service. 
            Links below are affiliate links that help support Mission Fresh.
          </p>
          <div className="flex items-center p-3 bg-blue-50 text-blue-700 rounded-md">
            <AlertCircle size={18} className="flex-shrink-0 mr-2" />
            <p className="text-sm">
              Always check local regulations before ordering. Some countries have restrictions on nicotine products.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verifiedVendors.map(vendor => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>

        <Accordion type="single" collapsible className="w-full mt-12">
          <AccordionItem value="shipping-regulations">
            <AccordionTrigger>Shipping Regulations by Country</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">United States</h3>
                  <p className="text-sm text-muted-foreground">
                    Tobacco-free nicotine products can be shipped to most states, but some have age verification requirements. 
                    Some vendors may not ship to states like Utah, Arkansas, or Maine due to local regulations.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">European Union</h3>
                  <p className="text-sm text-muted-foreground">
                    Regulations vary by country. The EU has a general limit of 20mg/g nicotine in pouches, but many countries 
                    have specific restrictions or bans.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">United Kingdom</h3>
                  <p className="text-sm text-muted-foreground">
                    Nicotine pouches are legal with strength limitations. Shipping is generally reliable with standard age verification.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Canada</h3>
                  <p className="text-sm text-muted-foreground">
                    Nicotine pouches exist in a regulatory gray area. Some vendors ship to Canada, but orders may occasionally be held at customs.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Australia</h3>
                  <p className="text-sm text-muted-foreground">
                    Nicotine products generally require a prescription. Most vendors will not ship directly to Australia.
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-amber-50 text-amber-700 rounded-md">
                <p className="text-sm font-medium">Disclaimer</p>
                <p className="text-sm">
                  This information may change as regulations evolve. Always check the most current regulations and vendor policies before ordering.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq">
            <AccordionTrigger>Frequently Asked Questions</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Are smokeless nicotine products safer than cigarettes?</h3>
                  <p className="text-sm text-muted-foreground">
                    While no nicotine product is completely safe, smokeless options eliminate the harmful combustion chemicals found in cigarettes, 
                    which are responsible for many smoking-related diseases. However, nicotine itself still carries cardiovascular risks and is addictive.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">How do I choose the right nicotine strength?</h3>
                  <p className="text-sm text-muted-foreground">
                    If you're a heavy smoker (20+ cigarettes daily), start with higher strength options (6-8mg). 
                    Moderate smokers (10-20 daily) might prefer 3-6mg options. Light smokers should consider starting with 2-3mg products.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">How long do pouches last?</h3>
                  <p className="text-sm text-muted-foreground">
                    Most pouches are designed to be used for 30-60 minutes, though the nicotine release is typically strongest in the first 20-30 minutes.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Do these products stain teeth?</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlike traditional tobacco products, modern nicotine pouches generally do not stain teeth as they don't contain tobacco leaf.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Are these products suitable for quitting smoking?</h3>
                  <p className="text-sm text-muted-foreground">
                    Many users find smokeless nicotine products helpful in transitioning away from cigarettes. 
                    However, medically approved nicotine replacement therapies (NRT) like patches, gums, and lozenges are specifically designed and tested for smoking cessation.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>

      <div className="mt-12 p-6 bg-fresh-50 border border-fresh-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Explore More Support Options</h2>
        <div className="space-y-2">
          <p>Mission Fresh provides a comprehensive approach to nicotine reduction and cessation.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <a href="/tools/nrt-guide" className="inline-flex items-center justify-center rounded-md border border-fresh-200 bg-white hover:bg-fresh-50 px-4 py-2">
              NRT Guide
            </a>
            <a href="/tools/quit-methods" className="inline-flex items-center justify-center rounded-md border border-fresh-200 bg-white hover:bg-fresh-50 px-4 py-2">
              Quitting Methods
            </a>
            <a href="/app/dashboard" className="inline-flex items-center justify-center rounded-md bg-fresh-300 hover:bg-fresh-400 text-white px-4 py-2">
              Start Your Fresh Journey
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmokelessDirectory;
