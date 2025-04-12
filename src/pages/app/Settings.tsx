import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import NotificationPreferences from "@/components/settings/NotificationPreferences";
import ProfileSettings from "@/components/settings/ProfileSettings";
import AccountDeletion from "@/components/settings/AccountDeletion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { updateProductCosts, getUserPreferences } from "@/services/userPreferencesService";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Settings as SettingsIcon, Save } from "lucide-react";
import { useHaptics, HapticImpact } from "@/hooks/useHaptics";
import ThemeSwitcher from '@/components/settings/ThemeSwitcher';

const Settings = () => {
  const { user } = useAuth();
  const [cigaretteCost, setCigaretteCost] = useState("");
  const [vapeCost, setVapeCost] = useState("");
  const [dipCost, setDipCost] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { impact } = useHaptics();

  const { data: userPreferences, isLoading } = useQuery({
    queryKey: ['user-preferences'],
    queryFn: getUserPreferences,
    enabled: !!user,
    onSuccess: (data) => {
      if (data?.cost_per_product) {
        setCigaretteCost(data.cost_per_product.cigarette?.toString() || "");
        setVapeCost(data.cost_per_product.vape?.toString() || "");
        setDipCost(data.cost_per_product.dip?.toString() || "");
      }
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSaving(true);
    try {
      const costs = {
        cigarette: cigaretteCost ? parseFloat(cigaretteCost) : 0,
        vape: vapeCost ? parseFloat(vapeCost) : 0,
        dip: dipCost ? parseFloat(dipCost) : 0,
      };
      
      await updateProductCosts(costs);
      toast.success("Product costs updated successfully");
      impact(HapticImpact.LIGHT);
    } catch (error) {
      console.error("Error updating product costs:", error);
      toast.error("Failed to update product costs");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full space-y-6">
        <TabsList className="grid grid-cols-5 md:w-[500px]">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationPreferences />
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">Product Costs</CardTitle>
                  <CardDescription>Update the cost of various nicotine products for accurate savings calculations</CardDescription>
                </div>
                <SettingsIcon className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <div className="py-6 flex justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="cigarette-cost">Cigarette Pack Cost ($)</Label>
                      <Input
                        id="cigarette-cost"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Enter cost per pack"
                        value={cigaretteCost}
                        onChange={(e) => setCigaretteCost(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Average cost per pack of cigarettes in your location</p>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="vape-cost">Vape Pod/Cartridge Cost ($)</Label>
                      <Input
                        id="vape-cost"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Enter cost per pod/cartridge"
                        value={vapeCost}
                        onChange={(e) => setVapeCost(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Average cost per pod or cartridge</p>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="dip-cost">Smokeless Tin/Pouch Cost ($)</Label>
                      <Input
                        id="dip-cost"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Enter cost per tin/pouch"
                        value={dipCost}
                        onChange={(e) => setDipCost(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Average cost per tin or pouch of smokeless tobacco</p>
                    </div>
                  </>
                )}
              </CardContent>
              <CardContent className="pt-0">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading || isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Cost Settings
                    </>
                  )}
                </Button>
              </CardContent>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <ThemeSwitcher />
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <AccountDeletion />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
