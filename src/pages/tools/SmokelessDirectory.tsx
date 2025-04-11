
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { CheckIcon, FilterIcon, Search, ArrowLeft, SlidersHorizontal, X, Star } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample product data (in a real app, this would come from the database)
const products = [
  {
    id: "1",
    name: "ZYN Cool Mint",
    brand: "ZYN",
    type: "Nicotine Pouch",
    nicotineStrength: 6,
    flavors: ["Mint", "Menthol"],
    image: "https://via.placeholder.com/100x100",
    rating: 4.5,
    reviewCount: 128,
    description: "Slim portion, fresh mint flavor, moderate nicotine strength.",
  },
  {
    id: "2",
    name: "VELO Citrus",
    brand: "VELO",
    type: "Nicotine Pouch",
    nicotineStrength: 4,
    flavors: ["Citrus", "Orange"],
    image: "https://via.placeholder.com/100x100",
    rating: 4.2,
    reviewCount: 94,
    description: "All white portion with refreshing citrus flavor.",
  },
  {
    id: "3",
    name: "JUUL Virginia Tobacco",
    brand: "JUUL",
    type: "E-cigarette Pod",
    nicotineStrength: 5,
    flavors: ["Tobacco"],
    image: "https://via.placeholder.com/100x100",
    rating: 3.8,
    reviewCount: 215,
    description: "Classic tobacco flavor pod for JUUL device.",
  },
  {
    id: "4",
    name: "JUUL Mint",
    brand: "JUUL",
    type: "E-cigarette Pod",
    nicotineStrength: 3,
    flavors: ["Mint"],
    image: "https://via.placeholder.com/100x100",
    rating: 4.0,
    reviewCount: 178,
    description: "Refreshing mint flavor pod for JUUL device.",
  },
  {
    id: "5",
    name: "VUSE Alto Rich Tobacco",
    brand: "VUSE",
    type: "E-cigarette Pod",
    nicotineStrength: 5.8,
    flavors: ["Tobacco"],
    image: "https://via.placeholder.com/100x100",
    rating: 4.1,
    reviewCount: 142,
    description: "Rich tobacco flavor pod for VUSE Alto device.",
  },
  {
    id: "6",
    name: "ON! Mint",
    brand: "ON!",
    type: "Nicotine Pouch",
    nicotineStrength: 4,
    flavors: ["Mint"],
    image: "https://via.placeholder.com/100x100",
    rating: 4.3,
    reviewCount: 87,
    description: "Small, discreet nicotine pouch with mint flavor.",
  },
  {
    id: "7",
    name: "White Fox Full Charge",
    brand: "White Fox",
    type: "Nicotine Pouch",
    nicotineStrength: 16,
    flavors: ["Mint"],
    image: "https://via.placeholder.com/100x100",
    rating: 4.7,
    reviewCount: 64,
    description: "Strong nicotine pouch with intense mint flavor.",
  },
  {
    id: "8",
    name: "Nordic Spirit Bergamot Wildberry",
    brand: "Nordic Spirit",
    type: "Nicotine Pouch",
    nicotineStrength: 9,
    flavors: ["Berry", "Citrus"],
    image: "https://via.placeholder.com/100x100",
    rating: 4.4,
    reviewCount: 52,
    description: "Premium nicotine pouch with unique bergamot and wildberry flavor.",
  },
];

const brands = [...new Set(products.map(product => product.brand))];
const types = [...new Set(products.map(product => product.type))];
const flavors = [...new Set(products.flatMap(product => product.flavors))];

const SmokelessDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    brands: [] as string[],
    types: [] as string[],
    flavors: [] as string[],
    nicotineRange: [0, 20],
    rating: 0,
  });
  
  const toggleFilter = (category: 'brands' | 'types' | 'flavors', value: string) => {
    setFilters(prev => {
      if (prev[category].includes(value)) {
        return {
          ...prev,
          [category]: prev[category].filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [category]: [...prev[category], value]
        };
      }
    });
  };
  
  const clearFilters = () => {
    setFilters({
      brands: [],
      types: [],
      flavors: [],
      nicotineRange: [0, 20],
      rating: 0,
    });
  };
  
  const filteredProducts = products.filter(product => {
    // Search query filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !product.brand.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Brand filter
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }
    
    // Type filter
    if (filters.types.length > 0 && !filters.types.includes(product.type)) {
      return false;
    }
    
    // Flavor filter
    if (filters.flavors.length > 0 && !product.flavors.some(flavor => filters.flavors.includes(flavor))) {
      return false;
    }
    
    // Nicotine strength filter
    if (product.nicotineStrength < filters.nicotineRange[0] || 
        product.nicotineStrength > filters.nicotineRange[1]) {
      return false;
    }
    
    // Rating filter
    if (filters.rating > 0 && product.rating < filters.rating) {
      return false;
    }
    
    return true;
  });
  
  const activeFilterCount = 
    filters.brands.length + 
    filters.types.length + 
    filters.flavors.length + 
    (filters.nicotineRange[0] > 0 || filters.nicotineRange[1] < 20 ? 1 : 0) + 
    (filters.rating > 0 ? 1 : 0);
  
  return (
    <div className="container py-12">
      <Link to="/" className="inline-flex items-center text-fresh-500 hover:text-fresh-600 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Smokeless Nicotine Directory</h1>
        <p className="text-lg text-muted-foreground">
          Explore and compare smokeless nicotine products to find options that fit your needs
        </p>
      </div>
      
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products or brands..."
            className="pl-10"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <FilterIcon className="h-4 w-4" />
              <span>Filter</span>
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-6 w-6 p-0 flex items-center justify-center rounded-full">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[320px] sm:w-[540px] overflow-y-auto">
            <SheetHeader className="mb-6">
              <SheetTitle>Filter Products</SheetTitle>
              <SheetDescription>
                Refine your search with specific criteria
              </SheetDescription>
            </SheetHeader>
            
            {activeFilterCount > 0 && (
              <Button 
                variant="link" 
                className="text-muted-foreground py-0 h-auto mb-4"
                onClick={clearFilters}
              >
                Clear all filters
              </Button>
            )}
            
            <div className="space-y-6">
              {/* Product Type Filter */}
              <div>
                <h3 className="font-medium mb-3">Product Type</h3>
                <div className="flex flex-wrap gap-2">
                  {types.map(type => (
                    <Button 
                      key={type}
                      variant={filters.types.includes(type) ? "default" : "outline"}
                      size="sm"
                      className={filters.types.includes(type) ? "bg-fresh-300 hover:bg-fresh-400" : ""}
                      onClick={() => toggleFilter('types', type)}
                    >
                      {type}
                      {filters.types.includes(type) && <CheckIcon className="ml-2 h-3 w-3" />}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Brand Filter */}
              <div>
                <h3 className="font-medium mb-3">Brand</h3>
                <div className="flex flex-wrap gap-2">
                  {brands.map(brand => (
                    <Button 
                      key={brand}
                      variant={filters.brands.includes(brand) ? "default" : "outline"}
                      size="sm"
                      className={filters.brands.includes(brand) ? "bg-fresh-300 hover:bg-fresh-400" : ""}
                      onClick={() => toggleFilter('brands', brand)}
                    >
                      {brand}
                      {filters.brands.includes(brand) && <CheckIcon className="ml-2 h-3 w-3" />}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Flavor Filter */}
              <div>
                <h3 className="font-medium mb-3">Flavor</h3>
                <div className="flex flex-wrap gap-2">
                  {flavors.map(flavor => (
                    <Button 
                      key={flavor}
                      variant={filters.flavors.includes(flavor) ? "default" : "outline"}
                      size="sm"
                      className={filters.flavors.includes(flavor) ? "bg-fresh-300 hover:bg-fresh-400" : ""}
                      onClick={() => toggleFilter('flavors', flavor)}
                    >
                      {flavor}
                      {filters.flavors.includes(flavor) && <CheckIcon className="ml-2 h-3 w-3" />}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Nicotine Strength Filter */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Nicotine Strength</h3>
                  <span className="text-sm text-muted-foreground">
                    {filters.nicotineRange[0]}mg - {filters.nicotineRange[1]}mg
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 20]}
                  min={0}
                  max={20}
                  step={1}
                  value={filters.nicotineRange}
                  onValueChange={(value) => setFilters(prev => ({...prev, nicotineRange: value as [number, number]}))}
                  className="mb-6"
                />
              </div>
              
              {/* Minimum Rating Filter */}
              <div>
                <h3 className="font-medium mb-3">Minimum Rating</h3>
                <Select
                  value={filters.rating.toString()}
                  onValueChange={(value) => setFilters(prev => ({...prev, rating: Number(value)}))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any rating</SelectItem>
                    <SelectItem value="3">3+ stars</SelectItem>
                    <SelectItem value="3.5">3.5+ stars</SelectItem>
                    <SelectItem value="4">4+ stars</SelectItem>
                    <SelectItem value="4.5">4.5+ stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <SheetClose asChild>
                <Button className="w-full mt-6 bg-fresh-300 hover:bg-fresh-400">
                  View {filteredProducts.length} Products
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
        
        <Select defaultValue="popularity">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="rating-high">Highest Rating</SelectItem>
            <SelectItem value="rating-low">Lowest Rating</SelectItem>
            <SelectItem value="nicotine-high">Highest Nicotine</SelectItem>
            <SelectItem value="nicotine-low">Lowest Nicotine</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.brands.map(brand => (
            <Badge key={brand} variant="outline" className="flex items-center gap-1 bg-background">
              {brand}
              <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFilter('brands', brand)} />
            </Badge>
          ))}
          {filters.types.map(type => (
            <Badge key={type} variant="outline" className="flex items-center gap-1 bg-background">
              {type}
              <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFilter('types', type)} />
            </Badge>
          ))}
          {filters.flavors.map(flavor => (
            <Badge key={flavor} variant="outline" className="flex items-center gap-1 bg-background">
              {flavor}
              <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFilter('flavors', flavor)} />
            </Badge>
          ))}
          {(filters.nicotineRange[0] > 0 || filters.nicotineRange[1] < 20) && (
            <Badge variant="outline" className="flex items-center gap-1 bg-background">
              {filters.nicotineRange[0]}-{filters.nicotineRange[1]}mg nicotine
              <X className="h-3 w-3 cursor-pointer" onClick={() => setFilters(prev => ({...prev, nicotineRange: [0, 20]}))} />
            </Badge>
          )}
          {filters.rating > 0 && (
            <Badge variant="outline" className="flex items-center gap-1 bg-background">
              {filters.rating}+ stars
              <X className="h-3 w-3 cursor-pointer" onClick={() => setFilters(prev => ({...prev, rating: 0}))} />
            </Badge>
          )}
          <Button variant="ghost" size="sm" className="text-sm h-7" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">No products match your filters</p>
          <Button variant="outline" onClick={clearFilters}>Clear all filters</Button>
        </div>
      ) : (
        <>
          <div className="text-sm text-muted-foreground mb-6">
            Showing {filteredProducts.length} products
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Link key={product.id} to={`/tools/smokeless-directory/${product.id}`}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription>{product.brand}</CardDescription>
                      </div>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-16 h-16 object-cover rounded"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="outline">{product.type}</Badge>
                      <Badge variant="outline">{product.nicotineStrength}mg</Badge>
                      {product.flavors.map(flavor => (
                        <Badge key={flavor} variant="secondary">{flavor}</Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium">{product.rating}</span>
                      <span className="ml-1 text-xs text-muted-foreground">
                        ({product.reviewCount})
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-fresh-500">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SmokelessDirectory;
