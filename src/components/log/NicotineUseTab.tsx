
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NicotineUseTabProps {
  nicotineUse: "yes" | "no";
  setNicotineUse: (value: "yes" | "no") => void;
  productType: string;
  setProductType: (value: string) => void;
  quantity: string;
  setQuantity: (value: string) => void;
}

const NicotineUseTab = ({
  nicotineUse,
  setNicotineUse,
  productType,
  setProductType,
  quantity,
  setQuantity
}: NicotineUseTabProps) => {
  return (
    <TabsContent value="nicotine" className="space-y-4 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Nicotine Use</CardTitle>
          <CardDescription>
            Log any nicotine products you used today
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Did you use any nicotine products today?</Label>
            <div className="flex gap-4">
              <Button 
                type="button"
                variant={nicotineUse === "no" ? "default" : "outline"}
                className={nicotineUse === "no" ? "bg-fresh-300 hover:bg-fresh-400" : ""}
                onClick={() => setNicotineUse("no")}
              >
                No
              </Button>
              <Button 
                type="button"
                variant={nicotineUse === "yes" ? "default" : "outline"}
                className={nicotineUse === "yes" ? "bg-fresh-300 hover:bg-fresh-400" : ""}
                onClick={() => setNicotineUse("yes")}
              >
                Yes
              </Button>
            </div>
          </div>

          {nicotineUse === "yes" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="product-type">Type of Product</Label>
                <Select value={productType} onValueChange={setProductType}>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">
                  {productType === "cigarette" 
                    ? "Number of cigarettes" 
                    : productType === "vape" 
                      ? "Approximate puffs" 
                      : "Quantity"}
                </Label>
                <Input 
                  id="quantity" 
                  type="number" 
                  min="0" 
                  value={quantity} 
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default NicotineUseTab;
