
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";

interface NicotineUseTabProps {
  nicotineUse: "yes" | "no";
  setNicotineUse: (value: "yes" | "no") => void;
  productType: string;
  setProductType: (value: string) => void;
  quantity: string;
  setQuantity: (value: string) => void;
  errors?: Record<string, string>;
}

const NicotineUseTab: React.FC<NicotineUseTabProps> = ({
  nicotineUse,
  setNicotineUse,
  productType,
  setProductType,
  quantity,
  setQuantity,
  errors = {}
}) => {
  return (
    <TabsContent value="nicotine" className="space-y-4 py-4">
      <Card>
        <CardHeader>
          <CardTitle>Nicotine Use Today</CardTitle>
          <CardDescription>
            Record whether you used nicotine products today and details about usage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-3">Did you use nicotine today?</h3>
              <RadioGroup 
                value={nicotineUse} 
                onValueChange={(value) => setNicotineUse(value as "yes" | "no")}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="nicotine-yes" />
                  <Label htmlFor="nicotine-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="nicotine-no" />
                  <Label htmlFor="nicotine-no">No</Label>
                </div>
              </RadioGroup>
              {errors.nicotineUse && (
                <p className="text-sm font-medium text-destructive mt-2">{errors.nicotineUse}</p>
              )}
            </div>

            {nicotineUse === "yes" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="product-type">Product Type</Label>
                  <Select 
                    value={productType} 
                    onValueChange={setProductType}
                    name="product-type"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cigarette">Cigarette</SelectItem>
                      <SelectItem value="vape">Vape / E-cigarette</SelectItem>
                      <SelectItem value="pouch">Nicotine Pouch</SelectItem>
                      <SelectItem value="gum">Nicotine Gum</SelectItem>
                      <SelectItem value="patch">Nicotine Patch</SelectItem>
                      <SelectItem value="cigar">Cigar</SelectItem>
                      <SelectItem value="pipe">Pipe</SelectItem>
                      <SelectItem value="hookah">Hookah</SelectItem>
                      <SelectItem value="dip">Smokeless Tobacco (Dip)</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.productType && (
                    <p className="text-sm font-medium text-destructive mt-2">{errors.productType}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">
                    {productType === "cigarette" && "How many cigarettes?"}
                    {productType === "vape" && "How many puffs? (estimate)"}
                    {productType === "pouch" && "How many pouches?"}
                    {(productType === "gum" || productType === "patch") && "How many pieces/patches?"}
                    {productType === "cigar" && "How many cigars?"}
                    {productType === "pipe" && "How many bowls?"}
                    {productType === "hookah" && "How many sessions?"}
                    {productType === "dip" && "How many pinches/dips?"}
                    {(productType === "other" || !productType) && "Quantity used"}
                  </Label>
                  <Input 
                    id="quantity"
                    type="number" 
                    min="0"
                    placeholder="Enter quantity" 
                    value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  {errors.quantity && (
                    <p className="text-sm font-medium text-destructive mt-2">{errors.quantity}</p>
                  )}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default NicotineUseTab;
