
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Star, Search, Filter, Droplets, ArrowRight } from "lucide-react";

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
  imageUrl?: string;
}

// Sample data for the directory
const sampleProducts: Product[] = [
  {
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
    description: "ZYN Cool Mint provides a refreshing minty experience with a satisfying nicotine kick. Tobacco-free and discreet."
  },
  {
    id: "2",
    name: "VELO Citrus",
    brand: "VELO",
    category: "Nicotine Pouch",
    type: "Pouch",
    nicotineStrength: "4mg",
    flavors: ["Citrus", "Orange"],
    price: "$4.49",
    rating: 4.2,
    reviewCount: 87,
    description: "VELO Citrus offers a bright, zesty flavor with a mild nicotine strength. Perfect for those seeking a fruity alternative."
  },
  {
    id: "3",
    name: "NJOY Daily",
    brand: "NJOY",
    category: "Vape",
    type: "Disposable",
    nicotineStrength: "50mg",
    flavors: ["Tobacco", "Menthol"],
    price: "$7.99",
    rating: 3.8,
    reviewCount: 156,
    description: "NJOY Daily is a ready-to-use disposable e-cigarette that requires no charging or refilling. Ideal for those seeking simplicity."
  },
  {
    id: "4",
    name: "Nicorette Gum",
    brand: "Nicorette",
    category: "NRT",
    type: "Gum",
    nicotineStrength: "2mg",
    flavors: ["Original", "Mint"],
    price: "$9.99",
    rating: 4.0,
    reviewCount: 203,
    description: "Nicorette Gum helps manage cravings through controlled nicotine release. Clinically proven to double your chances of quitting."
  },
  {
    id: "5",
    name: "JUUL Pods",
    brand: "JUUL",
    category: "Vape",
    type: "Pod System",
    nicotineStrength: "5%",
    flavors: ["Virginia Tobacco", "Menthol"],
    price: "$15.99",
    rating: 4.1,
    reviewCount: 312,
    description: "JUUL pods are designed for use with the JUUL device, offering a simple and clean nicotine delivery experience."
  },
  {
    id: "6",
    name: "ON! Coffee",
    brand: "ON!",
    category: "Nicotine Pouch",
    type: "Pouch",
    nicotineStrength: "3mg",
    flavors: ["Coffee"],
    price: "$3.99",
    rating: 3.9,
    reviewCount: 68,
    description: "ON! Coffee nicotine pouches offer a unique coffee-inspired flavor with a mild nicotine strength. No tobacco, no spitting required."
  },
  {
    id: "7",
    name: "NicoDerm CQ Patch",
    brand: "NicoDerm",
    category: "NRT",
    type: "Patch",
    nicotineStrength: "21mg",
    flavors: ["None"],
    price: "$38.99",
    rating: 4.4,
    reviewCount: 176,
    description: "NicoDerm CQ patches provide a steady flow of nicotine all day long, helping to prevent cravings before they start."
  },
  {
    id: "8",
    name: "Vuse Alto",
    brand: "Vuse",
    category: "Vape",
    type: "Pod System",
    nicotineStrength: "5%",
    flavors: ["Golden Tobacco", "Menthol", "Rich Tobacco"],
    price: "$19.99",
    rating: 4.3,
    reviewCount: 245,
    description: "The Vuse Alto device features a sleek design and prefilled pods for a hassle-free vaping experience."
  },
];

const SmokelessDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [nicotineFilter, setNicotineFilter] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const applyFilters = () => {
    let result = sampleProducts;
    
    // Apply search term
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(lowerSearchTerm) ||
        product.brand.toLowerCase().includes(lowerSearchTerm) ||
        product.description.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    // Apply nicotine strength filter
    if (nicotineFilter) {
      result = result.filter(product => {
        if (nicotineFilter === "low") {
          return product.nicotineStrength.includes("2mg") || 
                 product.nicotineStrength.includes("3mg") || 
                 product.nicotineStrength.includes("4mg");
        } else if (nicotineFilter === "medium") {
          return product.nicotineStrength.includes("5mg") || 
                 product.nicotineStrength.includes("6mg") || 
                 product.nicotineStrength.includes("8mg");
        } else if (nicotineFilter === "high") {
          return parseInt(product.nicotineStrength) > 8 || 
                 product.nicotineStrength.includes("%");
        }
        return true;
      });
    }
    
    setFilteredProducts(result);
    setDrawerOpen(false);
  };

  const resetFilters = () => {
    setCategoryFilter(null);
    setNicotineFilter(null);
    setSearchTerm("");
    setFilteredProducts(sampleProducts);
    setDrawerOpen(false);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
        {hasHalfStar && (
          <Star className="h-4 w-4 fill-amber-400 text-amber-400 fill-half" />
        )}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
        ))}
        <span className="ml-2 text-sm text-muted-foreground">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Smokeless Nicotine Directory</h1>
        <p className="text-muted-foreground mt-2">
          Browse smokeless alternatives to help with your fresh journey
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, brand, or keywords..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
          />
        </div>
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Filter Products</DrawerTitle>
              <DrawerDescription>Refine the product list to find what you're looking for.</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 space-y-6 py-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Product Category</label>
                <Select value={categoryFilter || ""} onValueChange={(val) => setCategoryFilter(val || null)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="Nicotine Pouch">Nicotine Pouch</SelectItem>
                    <SelectItem value="Vape">Vape</SelectItem>
                    <SelectItem value="NRT">NRT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Nicotine Strength</label>
                <Select value={nicotineFilter || ""} onValueChange={(val) => setNicotineFilter(val || null)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Strengths" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Strengths</SelectItem>
                    <SelectItem value="low">Low (2-4mg)</SelectItem>
                    <SelectItem value="medium">Medium (5-8mg)</SelectItem>
                    <SelectItem value="high">High (8mg+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* More filter options could be added here */}
            </div>
            <DrawerFooter>
              <Button onClick={applyFilters}>Apply Filters</Button>
              <DrawerClose asChild>
                <Button variant="outline" onClick={resetFilters}>Reset</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Button onClick={applyFilters}>Search</Button>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {product.brand}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-fresh-500 border-fresh-200 bg-fresh-50">
                    {product.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="mb-3">
                  {renderStars(product.rating)}
                  <p className="text-xs text-muted-foreground mt-1">
                    {product.reviewCount} reviews
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {product.nicotineStrength}
                  </Badge>
                  {product.flavors.map(flavor => (
                    <Badge key={flavor} variant="outline" className="text-xs">
                      {flavor}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-sm line-clamp-3 mb-4 text-muted-foreground">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">{product.price}</span>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/tools/smokeless-directory/${product.id}`} className="flex items-center gap-1">
                      <span>View Details</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Droplets className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
          <h3 className="mt-4 text-lg font-semibold">No products found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
          <Button variant="outline" className="mt-4" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      )}
      
      <div className="mt-12">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="about">
            <AccordionTrigger>About Smokeless Alternatives</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <p className="mb-4">
                Smokeless nicotine alternatives provide ways to consume nicotine without the harmful combustion process of traditional smoking. They can be part of a harm reduction approach or aid in the transition away from smoking entirely.
              </p>
              <p className="mb-4">
                Common categories include nicotine pouches (tobacco-free pouches placed between the lip and gum), vaping products (electronic devices that heat liquid containing nicotine), and nicotine replacement therapies (medically approved products like gum, patches, and lozenges).
              </p>
              <p>
                While no nicotine product is completely risk-free, smokeless alternatives generally eliminate the dangers associated with inhaling combusted tobacco, which contains thousands of harmful chemicals.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="disclaimer">
            <AccordionTrigger>Disclaimer & Information</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <p className="mb-4">
                This directory is provided for informational purposes only. Mission Fresh does not manufacture, distribute, or endorse any specific products listed here. 
              </p>
              <p className="mb-4">
                All products containing nicotine are addictive. Nicotine-free alternatives are always the healthiest choice. Consult with a healthcare professional before using any nicotine product, especially if you have health concerns or are pregnant.
              </p>
              <p>
                Some links may be affiliate links, meaning Mission Fresh may earn a commission if you make a purchase. This helps support our services at no extra cost to you.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default SmokelessDirectory;
