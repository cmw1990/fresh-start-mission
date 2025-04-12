
import { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export interface ProductSelectorProps {
  product: string;
  setProduct: React.Dispatch<React.SetStateAction<string>>;
}

const getDefaultProductOptions = (productType: string) => {
  switch (productType) {
    case 'cigarette':
      return ['Standard cigarettes', 'Hand-rolled cigarettes', 'Clove cigarettes', 'Light cigarettes'];
    case 'vape':
      return ['Disposable vape', 'Pod system', 'Box mod', 'Vape pen'];
    case 'nicotine_pouch':
      return ['Regular strength', 'Strong', 'Extra strong', 'Mini'];
    case 'smokeless_tobacco':
      return ['Snus', 'Chewing tobacco', 'Snuff', 'Dipping tobacco'];
    default:
      return [];
  }
};

export const ProductSelector = ({
  product,
  setProduct,
}: ProductSelectorProps) => {
  const { user } = useAuth();
  const defaultOptions = getDefaultProductOptions(product);
  const [options, setOptions] = useState<string[]>([...defaultOptions]);
  const [customProducts, setCustomProducts] = useState<{ name: string }[]>([]);
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customProductName, setCustomProductName] = useState('');

  // Fetch custom products from database on component mount
  useEffect(() => {
    if (user) {
      fetchCustomProducts();
    }
  }, [user, product]);

  const fetchCustomProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('custom_products')
        .select('name')
        .eq('user_id', user?.id);

      if (error) throw error;
      if (data && data.length > 0) {
        // Add custom products to options if they're not already included
        const customNames = data.map(product => product.name);
        setCustomProducts(data);
        
        // Update options with custom products
        setOptions(prev => {
          const uniqueNames = new Set([...defaultOptions, ...prev, ...customNames]);
          return Array.from(uniqueNames);
        });
      }
    } catch (error) {
      console.error("Error fetching custom products:", error);
    }
  };

  const addCustomProduct = async () => {
    if (!customProductName.trim()) {
      toast.error("Please enter a product name");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to add custom products");
      return;
    }

    try {
      // Add to database
      const { error } = await supabase
        .from('custom_products')
        .insert({ 
          name: customProductName,
          user_id: user.id 
        });

      if (error) throw error;

      // Update local state
      setOptions(prev => [...prev, customProductName]);
      setCustomProducts(prev => [...prev, { name: customProductName }]);
      setCustomProductName('');
      setShowAddCustom(false);
      
      // Select the newly added product
      setProduct(customProductName);
      
      toast.success("Custom product added!");
    } catch (error) {
      console.error("Error adding custom product:", error);
      toast.error("Failed to add custom product");
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="product-type">Product Type</Label>
      <RadioGroup
        id="product-type"
        value={product}
        onValueChange={setProduct}
        className="flex flex-col space-y-3"
      >
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`product-${option}`} />
            <Label htmlFor={`product-${option}`} className="cursor-pointer">{option}</Label>
          </div>
        ))}
      </RadioGroup>

      {showAddCustom ? (
        <div className="flex items-center space-x-2 mt-4">
          <Input
            placeholder="Enter custom product name"
            value={customProductName}
            onChange={(e) => setCustomProductName(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && addCustomProduct()}
          />
          <Button 
            type="button" 
            variant="outline" 
            size="icon" 
            onClick={() => setShowAddCustom(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <Button 
            type="button"
            onClick={addCustomProduct}
          >
            Add
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="flex items-center gap-1 mt-2"
          onClick={() => setShowAddCustom(true)}
        >
          <PlusCircle className="h-4 w-4" /> Add Custom Product
        </Button>
      )}
    </div>
  );
};
