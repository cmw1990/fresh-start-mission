
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Plus, X } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter 
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

interface ProductSelectorProps {
  product: string;
  setProduct: (value: string) => void;
}

interface CustomProduct {
  id: string;
  name: string;
  user_id: string;
}

const ProductSelector = ({ product, setProduct }: ProductSelectorProps) => {
  const [customProductName, setCustomProductName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [recentProducts, setRecentProducts] = useState<string[]>([]);

  // Fetch user's custom products
  const { data: customProducts, refetch: refetchCustomProducts } = useQuery<CustomProduct[]>({
    queryKey: ['custom-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('custom_products')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data || [];
    },
  });

  // Get recently used products from local storage
  useEffect(() => {
    const storedProducts = localStorage.getItem('recentProducts');
    if (storedProducts) {
      try {
        const parsed = JSON.parse(storedProducts);
        setRecentProducts(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.error("Failed to parse recent products:", e);
        localStorage.removeItem('recentProducts');
      }
    }
  }, []);

  // Update recent products when product changes
  useEffect(() => {
    if (!product || product === "custom") return;
    
    setRecentProducts(prev => {
      // Move selected product to the front, or add it if it doesn't exist
      const filtered = prev.filter(p => p !== product);
      const updated = [product, ...filtered].slice(0, 5); // Keep only 5 most recent
      
      try {
        localStorage.setItem('recentProducts', JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to store recent products:", e);
      }
      
      return updated;
    });
  }, [product]);

  const handleCreateCustomProduct = async () => {
    if (!customProductName.trim()) {
      toast.error("Please enter a product name");
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('custom_products')
        .insert([{ name: customProductName.trim() }])
        .select()
        .single();
        
      if (error) throw error;
      
      toast.success(`Added "${customProductName}" to your products`);
      setCustomProductName("");
      setDialogOpen(false);
      refetchCustomProducts();
      
      // Select the new custom product
      if (data) {
        setProduct(data.id);
      }
    } catch (e) {
      console.error("Error creating custom product:", e);
      toast.error("Failed to create custom product. Please try again.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>Tell us what you're using</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={product} onValueChange={setProduct}>
          <SelectTrigger>
            <SelectValue placeholder="Select product type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cigarette">Cigarette</SelectItem>
            <SelectItem value="vape">Vape</SelectItem>
            <SelectItem value="pouch">Nicotine Pouch</SelectItem>
            <SelectItem value="gum">Nicotine Gum</SelectItem>
            <SelectItem value="patch">Nicotine Patch</SelectItem>
            <SelectItem value="cigar">Cigar</SelectItem>
            <SelectItem value="pipe">Pipe</SelectItem>
            <SelectItem value="other">Other</SelectItem>
            
            {/* Custom products section */}
            {customProducts && customProducts.length > 0 && (
              <>
                <div className="py-1.5 px-2 text-sm font-semibold text-muted-foreground">
                  Your Custom Products
                </div>
                {customProducts.map(p => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </>
            )}
            
            {/* Add custom product option */}
            <DialogTrigger asChild className="w-full" onClick={() => setDialogOpen(true)}>
              <div className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                <Plus className="mr-2 h-4 w-4" />
                <span>Add Custom Product</span>
              </div>
            </DialogTrigger>
          </SelectContent>
        </Select>
        
        {/* Recently used products */}
        {recentProducts.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">Recently used:</p>
            <div className="flex flex-wrap gap-2">
              {recentProducts.map((p) => (
                <Button
                  key={p}
                  variant={product === p ? "default" : "outline"}
                  size="sm"
                  onClick={() => setProduct(p)}
                  className="flex items-center gap-1"
                >
                  {product === p && <Check className="h-3 w-3" />}
                  {p}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Custom Product Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Custom Product</DialogTitle>
              <DialogDescription>
                Create a custom product type that isn't in the standard list.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <Input
                placeholder="Product name (e.g., Brand X Slim Pouches)"
                value={customProductName}
                onChange={(e) => setCustomProductName(e.target.value)}
              />
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button onClick={handleCreateCustomProduct}>
                <Plus className="h-4 w-4 mr-1" />
                Add Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ProductSelector;
