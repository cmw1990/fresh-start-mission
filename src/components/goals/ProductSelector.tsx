
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductSelectorProps {
  product: string;
  setProduct: (value: string) => void;
}

const ProductSelector = ({ product, setProduct }: ProductSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>Tell us what you're using</CardDescription>
      </CardHeader>
      <CardContent>
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
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default ProductSelector;
