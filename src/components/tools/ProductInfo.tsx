
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    category: string;
    nicotine_content: string;
    manufacturer: string;
    image_url?: string;
    average_rating?: number;
    brand?: string;
    created_at?: string;
    expert_notes_chemicals?: string;
    expert_notes_gum_health?: string;
    flavor_category?: string;
    ingredients?: string[];
    user_rating_avg?: number;
    nicotine_strength_mg?: number;
    user_rating_count?: number;
  };
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{product.name}</span>
          {product.average_rating && (
            <span className="flex items-center text-sm">
              <Star className="h-4 w-4 fill-primary text-primary mr-1" />
              {product.average_rating.toFixed(1)}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className={`grid ${isMobile ? 'gap-4' : 'gap-6 lg:grid-cols-2'}`}>
        {product.image_url && (
          <img 
            src={product.image_url} 
            alt={product.name}
            className="w-full max-w-md mx-auto rounded-lg shadow-lg"
          />
        )}
        <div className="grid gap-4">
          <p className="text-muted-foreground">{product.description}</p>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="font-medium">Manufacturer</p>
              <p className="text-muted-foreground">{product.manufacturer}</p>
            </div>
            <div>
              <p className="font-medium">Category</p>
              <p className="text-muted-foreground">{product.category}</p>
            </div>
            <div>
              <p className="font-medium">Price</p>
              <p className="text-muted-foreground">{product.price}</p>
            </div>
            <div>
              <p className="font-medium">Nicotine Content</p>
              <p className="text-muted-foreground">{product.nicotine_content}</p>
            </div>
          </div>
          {product.expert_notes_chemicals && (
            <div className="mt-4">
              <p className="font-medium">Expert Notes on Chemicals</p>
              <p className="text-muted-foreground">{product.expert_notes_chemicals}</p>
            </div>
          )}
          {product.expert_notes_gum_health && (
            <div className="mt-2">
              <p className="font-medium">Expert Notes on Gum Health</p>
              <p className="text-muted-foreground">{product.expert_notes_gum_health}</p>
            </div>
          )}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="mt-2">
              <p className="font-medium">Ingredients</p>
              <p className="text-muted-foreground">{product.ingredients.join(', ')}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductInfo;
