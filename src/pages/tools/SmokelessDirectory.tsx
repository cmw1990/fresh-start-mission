import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { SmokelessProduct, SmokelessVendor } from "@/lib/supabase";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search, Filter, Star, ChevronDown, ChevronUp, Star as StarIcon, ExternalLink, AlertCircle, ShieldCheck, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Accordion, AccordionContent, AccordionItem, AccordionTrigger 
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Product {
  id: string;
  name: string;
  brand: string;
  nicotine_strength_mg?: number | null;
  flavor_category?: string | null;
  rating?: number | null;
  review_count?: number | null;
  description?: string | null;
  image_url?: string | null;
  chemical_concerns?: string | null;
  gum_health_impact?: string | null;
  created_at?: string;
  updated_at?: string;
}

interface Vendor {
  id: string;
  name: string;
  website_url?: string | null;
  rating?: number | null;
  review_count?: number | null;
  shipping_info_summary?: string | null;
  description?: string | null;
  affiliate_link_template?: string | null;
  logo_url?: string | null;
  regions_served?: string[] | null;
  created_at?: string;
  updated_at?: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const renderStars = (rating: number | null | undefined) => {
    const safeRating = rating || 0;
    const fullStars = Math.floor(safeRating);
    const hasHalfStar = safeRating % 1 >= 0.5;

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
        <span className="ml-2 text-sm font-medium">{safeRating.toFixed(1)}</span>
        <span className="ml-1 text-sm text-muted-foreground">({product.review_count || 0})</span>
      </div>
    );
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <Link to={`/tools/smokeless-directory/${product.id}`}>
        <CardHeader className="p-4 bg-muted">
          <div className="aspect-w-16 aspect-h-9 flex items-center justify-center h-32">
            <img 
              src={product.image_url || '/placeholder.svg'}
              alt={product.name}
              className="object-contain max-h-full w-auto rounded-md"
            />
          </div>
        </CardHeader>
      </Link>
      
      <CardContent className="p-4 space-y-2 flex-grow">
        <div className="flex justify-between items-start">
          <Link to={`/tools/smokeless-directory/${product.id}`} className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold hover:text-primary truncate" title={product.name}>
              {product.name}
            </CardTitle>
          </Link>
          {product.brand && <Badge variant="outline" className="ml-2 flex-shrink-0">{product.brand}</Badge>}
        </div>
        
        <div className="flex items-center justify-between mb-2 text-sm">
          <div className="flex items-center space-x-2">
            {product.nicotine_strength_mg !== null && product.nicotine_strength_mg !== undefined && <Badge variant="secondary">{product.nicotine_strength_mg}mg</Badge>}
            {product.flavor_category && <span className="text-muted-foreground">{product.flavor_category}</span>}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description || 'No description available.'}
        </p>

      </CardContent>
      
      <CardFooter className="p-4 flex justify-between items-center bg-gray-50/50 border-t">
        <Link to={`/tools/smokeless-directory/${product.id}`}>
          <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80">
            View Details
          </Button>
        </Link>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          {renderStars(product.rating)}
        </div>
      </CardFooter>
    </Card>
  );
};

const VendorCard = ({ vendor }: { vendor: Vendor }) => {
  const getAffiliateLink = () => {
    return vendor.website_url || '#';
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            {vendor.name}
            <ShieldCheck size={16} className="ml-2 text-green-500" />
          </CardTitle>
          <div className="flex items-center">
            <StarIcon size={16} className="text-amber-400 fill-current mr-1" />
            <span className="text-sm">{vendor.rating?.toFixed(1) || 'N/A'}</span>
          </div>
        </div>
        <CardDescription className="flex items-center">
          <ExternalLink size={14} className="mr-1" />
          <a 
            href={getAffiliateLink()}
            target="_blank" 
            rel="noopener noreferrer nofollow"
            className="text-primary hover:underline truncate"
            title={vendor.website_url || ''}
          >
            {vendor.website_url ? vendor.website_url.replace(/^https?:\/\//, '') : 'Visit Website'}
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm mb-2 line-clamp-3">{vendor.description || 'No description available.'}</p>
        {vendor.regions_served && vendor.regions_served.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-1">Ships To</h4>
            <div className="flex flex-wrap gap-1">
              {vendor.regions_served.map((country: string) => (
                <Badge key={country} variant="outline" className="text-xs">{country}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <Button 
          variant="default" 
          size="sm" 
          className="w-full bg-primary hover:bg-primary/90"
          onClick={() => window.open(getAffiliateLink(), '_blank')}
          disabled={!vendor.website_url}
        >
          Visit Store {vendor.affiliate_link_template ? '(Affiliate)' : ''}
        </Button>
      </CardFooter>
    </Card>
  );
};

const fetchProducts = async (): Promise<SmokelessProduct[]> => {
  const { data, error } = await supabase
    .from('smokeless_products')
    .select('*')
    .limit(100);

  if (error) {
      console.error("Error fetching products:", error);
      throw new Error(error.message);
  }
  
  return data as SmokelessProduct[];
};

const fetchVendors = async (): Promise<SmokelessVendor[]> => {
  const { data, error } = await supabase
    .from('smokeless_vendors')
    .select('*')
    .limit(50);

  if (error) {
      console.error("Error fetching vendors:", error);
      throw new Error(error.message);
  }
   
  return data as SmokelessVendor[];
};

const SmokelessDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [nicotineRange, setNicotineRange] = useState([0, 20]);
  const [selectedTab, setSelectedTab] = useState("products");

  const { data: products, isLoading: isLoadingProducts, error: productsError } = useQuery<SmokelessProduct[]>({
    queryKey: ['smokelessProducts'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
  });

  const { data: vendors, isLoading: isLoadingVendors, error: vendorsError } = useQuery<SmokelessVendor[]>({
    queryKey: ['smokelessVendors'],
    queryFn: fetchVendors,
    staleTime: 5 * 60 * 1000,
  });

  const isLoading = isLoadingProducts || isLoadingVendors;
  const queryError = productsError || vendorsError;

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter((product) => {
      const nameMatch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const brandMatch = product.brand?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSearch = nameMatch || brandMatch;

      const matchesFlavor = selectedFlavor === "all" || product.flavor_category === selectedFlavor;
      const matchesBrandFilter = selectedBrand === "all" || product.brand === selectedBrand;
      const matchesNicotine = product.nicotine_strength_mg === null || product.nicotine_strength_mg === undefined || 
                              (product.nicotine_strength_mg >= nicotineRange[0] && 
                               product.nicotine_strength_mg <= nicotineRange[1]);
      
      return matchesSearch && matchesFlavor && matchesBrandFilter && matchesNicotine;
    });
  }, [products, searchTerm, selectedFlavor, selectedBrand, nicotineRange]);

  const productFlavors = useMemo(() => {
    if (!products) return ["all"];
    const flavors = products
      .map(p => p.flavor_category)
      .filter((f): f is string => f !== null && f !== undefined && f !== '');
    return ["all", ...Array.from(new Set(flavors)).sort()];
  }, [products]);

  const productBrands = useMemo(() => {
    if (!products) return ["all"];
    const brands = products
      .map(p => p.brand)
      .filter((b): b is string => b !== null && b !== undefined && b !== '');
    return ["all", ...Array.from(new Set(brands)).sort()];
  }, [products]);

  if (queryError) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 text-center text-red-600 bg-red-50 p-4 rounded-md">
        <div className="flex items-center justify-center">
          <AlertCircle className="mr-2" />
          <span className="font-medium">Error loading directory data:</span>
        </div>
        <p className="text-sm mt-1">{(queryError as Error).message}</p> 
        <p className="text-xs mt-2">Please ensure the backend tables (`smokeless_products`, `smokeless_vendors`) exist and types are generated (see `sb.md`).</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Smokeless Nicotine Directory</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore our comprehensive directory of smokeless nicotine products and find the right option for your fresh journey.
        </p>
        <div className="flex items-center justify-center mt-6 p-3 bg-yellow-50 text-yellow-800 rounded-md border border-yellow-200">
          <AlertCircle size={18} className="flex-shrink-0 mr-2" />
          <p className="text-sm font-medium">
            Mission Fresh provides this information for educational purposes and doesn't endorse specific products. Consult NRT guides or healthcare professionals for cessation advice.
          </p>
        </div>
      </div>

      <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="w-full mb-6">
        <TabsList className="grid grid-cols-2 max-w-sm mx-auto">
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
              aria-label="Search products"
            />
          </div>
          <Button
            variant="outline"
            className="sm:w-auto flex items-center gap-2"
            onClick={() => setFilterOpen(!filterOpen)}
            aria-expanded={filterOpen}
          >
            <Filter size={16} />
            Filters
            {filterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>

        {filterOpen && (
          <Card className="mb-6 shadow-sm border">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label htmlFor="flavor-filter" className="text-sm font-medium mb-2 block">Flavor Category</label>
                  <Select 
                    value={selectedFlavor} 
                    onValueChange={setSelectedFlavor} 
                    disabled={isLoadingProducts || productFlavors.length <= 1}
                    name="flavor-filter"
                  >
                    <SelectTrigger id="flavor-filter">
                      <SelectValue placeholder="Select flavor" />
                    </SelectTrigger>
                    <SelectContent>
                      {productFlavors.map((flavor) => (
                        <SelectItem key={flavor} value={flavor}>
                          {flavor === "all" ? "All Flavors" : flavor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="brand-filter" className="text-sm font-medium mb-2 block">Brand</label>
                  <Select 
                    value={selectedBrand} 
                    onValueChange={setSelectedBrand} 
                    disabled={isLoadingProducts || productBrands.length <= 1}
                    name="brand-filter"
                  >
                    <SelectTrigger id="brand-filter">
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
                  <label htmlFor="nicotine-slider" className="text-sm font-medium mb-2 block">
                    Nicotine Strength: {nicotineRange[0]}mg - {nicotineRange[1]}mg
                  </label>
                  <Slider
                    id="nicotine-slider"
                    min={0}
                    max={20}
                    step={1}
                    value={nicotineRange}
                    onValueChange={setNicotineRange}
                    className="py-4"
                    aria-label="Nicotine strength range slider"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setSelectedFlavor("all");
                    setSelectedBrand("all");
                    setNicotineRange([0, 20]);
                    setSearchTerm("");
                  }}
                  className="mr-2"
                >
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {isLoadingProducts ? 'Loading products...' : 
             `${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'} found`}
          </p>
        </div>

        {isLoadingProducts ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} aria-hidden="true">
                <CardHeader className="p-4 bg-muted aspect-w-16 aspect-h-9 flex items-center justify-center h-32">
                  <Skeleton className="h-full w-full" />
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
                <CardFooter className="p-4 flex justify-between items-center bg-gray-50/50 border-t">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="col-span-full text-center py-16 bg-gray-50 rounded-lg">
                <p className="text-lg font-medium text-gray-700">No products match your criteria</p>
                <p className="text-muted-foreground mt-1">Try adjusting your search or filters.</p>
                <Button variant="outline" className="mt-4" onClick={() => {
                  setSelectedFlavor("all");
                  setSelectedBrand("all");
                  setNicotineRange([0, 20]);
                  setSearchTerm("");
                  setFilterOpen(true);
                }}>
                  Reset Filters
                </Button>
              </div>
            )}
          </>
        )}
      </TabsContent>

      <TabsContent value="vendors" className="mt-0">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Verified Vendors</h2>
          <p className="text-muted-foreground mb-2">
            These vendors are commonly used in the community. Links may be affiliate links that help support Mission Fresh.
          </p>
          <div className="flex items-center p-3 bg-blue-50 text-blue-800 rounded-md border border-blue-200">
            <AlertCircle size={18} className="flex-shrink-0 mr-2" />
            <p className="text-sm">
              Always check local regulations and vendor shipping policies before ordering. Product availability and shipping restrictions vary.
            </p>
          </div>
        </div>

        {isLoadingVendors ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} aria-hidden="true">
                <CardHeader className="pb-2 space-y-2">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent className="pb-2 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
                <CardFooter className="pt-2 border-t">
                  <Skeleton className="h-9 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {vendors && vendors.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendors.map(vendor => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))}
              </div>
            ) : (
              <div className="col-span-full text-center py-16 bg-gray-50 rounded-lg">
                <p className="text-lg font-medium text-gray-700">No vendors listed yet.</p>
                <p className="text-muted-foreground mt-1">Check back later for verified vendor information.</p>
              </div>
            )}
          </>
        )}

        <Accordion type="single" collapsible className="w-full mt-12 border-t pt-8">
          <AccordionItem value="shipping-regulations">
            <AccordionTrigger className="text-lg">Shipping Regulations Overview</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium">United States</h3>
                  <p className="text-muted-foreground">
                    Varies by state. Federal PACT Act requires age verification. Some states have flavor bans or specific shipping restrictions (e.g., CA, MA, NY, NJ, RI). Always check vendor policies for your specific state.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">European Union</h3>
                  <p className="text-muted-foreground">
                    TPD regulations apply. Nicotine limit typically 20mg/ml or 20mg/pouch. Some countries have stricter limits or bans (e.g., Netherlands, Belgium ban pouches). Cross-border shipping can be complex.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">United Kingdom</h3>
                  <p className="text-muted-foreground">
                    Nicotine pouches are legal and regulated separately from vaping products. Generally easier to ship domestically.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Canada</h3>
                  <p className="text-muted-foreground">
                    Pouches containing nicotine (but not tobacco) are legal up to 4mg/pouch without prescription. Higher strengths may face import issues. Regulations are evolving.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Australia</h3>
                  <p className="text-muted-foreground">
                    Nicotine (except in traditional tobacco or approved NRT) requires a prescription for import and possession. Most overseas vendors will not ship nicotine pouches.
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-amber-50 text-amber-800 rounded-md border border-amber-200">
                <p className="text-sm font-medium">Disclaimer</p>
                <p className="text-sm">
                  Regulations change frequently. This is a general guide only. Verify current local laws and vendor shipping policies before ordering. Mission Fresh is not responsible for import issues.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq">
            <AccordionTrigger className="text-lg">Frequently Asked Questions</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium">Are smokeless nicotine products safer than cigarettes?</h3>
                  <p className="text-muted-foreground">
                    Scientific consensus indicates that non-combustible nicotine products like pouches are significantly less harmful than smoking cigarettes because they don't involve burning tobacco, which creates most harmful toxicants. However, they are not risk-free and contain addictive nicotine.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">How do I choose the right nicotine strength?</h3>
                  <p className="text-muted-foreground">
                    This is highly individual. General advice: Heavy smokers ({'>'}20/day) might start with 6-10mg+ pouches. Moderate (10-20/day) around 4-8mg. Light ({'<'}10/day) or new users often start at 2-4mg. It's often better to start lower and adjust. Consider how often you plan to use them.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">How long do pouches last?</h3>
                  <p className="text-muted-foreground">
                    Typically 20-60 minutes, depending on the brand and user preference. Nicotine release is usually strongest initially and tapers off.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Do these products stain teeth?</h3>
                  <p className="text-muted-foreground">
                    Tobacco-free nicotine pouches generally do not stain teeth, unlike traditional snus or dip which contain tobacco leaf.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Can pouches help quit smoking?</h3>
                  <p className="text-muted-foreground">
                    Many people use them as a harm reduction tool or a step towards quitting nicotine entirely. They can replace the hand-to-mouth habit and provide nicotine without combustion. However, they are not approved cessation therapies like NRT (patches, gum). Discuss options with a healthcare provider.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>

      <div className="mt-16 p-6 bg-gradient-to-r from-fresh-50 to-blue-50 border border-fresh-100 rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-3">Ready to Take Control?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Mission Fresh offers more than just information. Track your progress, manage cravings, and boost your well-being with our holistic tools.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/tools/nrt-guide">
            <Button variant="outline" className="w-full sm:w-auto">Learn About NRT</Button>
          </Link>
          <Link to="/app/dashboard">
            <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">Start Your Fresh Journey</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmokelessDirectory;
