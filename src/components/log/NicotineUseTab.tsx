
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { FormMessage } from '@/components/ui/form';

interface NicotineUseTabProps {
  nicotineUse: 'yes' | 'no';
  setNicotineUse: (value: 'yes' | 'no') => void;
  productType: string;
  setProductType: (value: string) => void;
  quantity: string;
  setQuantity: (value: string) => void;
  errors: Record<string, string>;
}

const NicotineUseTab: React.FC<NicotineUseTabProps> = ({
  nicotineUse,
  setNicotineUse,
  productType,
  setProductType,
  quantity,
  setQuantity,
  errors
}) => {
  return (
    <TabsContent value="nicotine" className="py-4">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Did you use nicotine today?</h3>
          <RadioGroup 
            value={nicotineUse} 
            onValueChange={(value) => setNicotineUse(value as 'yes' | 'no')} 
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">No</Label>
            </div>
          </RadioGroup>
          {errors.nicotineUse && (
            <FormMessage>{errors.nicotineUse}</FormMessage>
          )}
        </div>

        {nicotineUse === 'yes' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="product-type">What product did you use?</Label>
              <Select
                value={productType}
                onValueChange={setProductType}
              >
                <SelectTrigger id="product-type" className="w-full">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cigarette">Cigarette</SelectItem>
                  <SelectItem value="vape">Vape / E-cigarette</SelectItem>
                  <SelectItem value="pouch">Nicotine Pouch</SelectItem>
                  <SelectItem value="gum">Nicotine Gum</SelectItem>
                  <SelectItem value="patch">Nicotine Patch</SelectItem>
                  <SelectItem value="dip">Dip / Chew</SelectItem>
                  <SelectItem value="cigar">Cigar</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.productType && (
                <FormMessage>{errors.productType}</FormMessage>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">How much did you use?</Label>
              <Input 
                id="quantity" 
                type="number" 
                placeholder={getPlaceholderByProduct(productType)}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="0"
              />
              <p className="text-xs text-muted-foreground">
                {getHelperTextByProduct(productType)}
              </p>
              {errors.quantity && (
                <FormMessage>{errors.quantity}</FormMessage>
              )}
            </div>
          </>
        )}
      </div>
    </TabsContent>
  );
};

function getPlaceholderByProduct(productType: string): string {
  switch (productType) {
    case 'cigarette': return 'Number of cigarettes';
    case 'vape': return 'Puffs or ml used';
    case 'pouch': return 'Number of pouches';
    case 'gum': return 'Pieces of gum';
    case 'dip': return 'Number of pinches';
    case 'patch': return 'Number of patches';
    case 'cigar': return 'Number of cigars';
    default: return 'Amount used';
  }
}

function getHelperTextByProduct(productType: string): string {
  switch (productType) {
    case 'cigarette': return 'Enter the number of cigarettes smoked';
    case 'vape': return 'Enter approximate number of puffs or ml of e-liquid';
    case 'pouch': return 'Enter the number of pouches used';
    case 'gum': return 'Enter the number of pieces of nicotine gum used';
    case 'dip': return 'Enter the number of times you dipped';
    case 'patch': return 'Enter the number of patches applied';
    case 'cigar': return 'Enter the number of cigars smoked';
    default: return 'Enter the approximate amount used';
  }
}

export default NicotineUseTab;
