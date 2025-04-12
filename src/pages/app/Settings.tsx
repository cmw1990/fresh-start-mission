import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const Settings = () => {
  const { user, signOut } = useAuth();
  
  // Get name from user_metadata or email
  const initialName = user?.user_metadata?.name || user?.email?.split('@')[0] || "";
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(user?.email || "");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real implementation, this would update the user profile in Supabase
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Profile updated successfully!");
    }, 1000);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Your email"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-fresh-300 hover:bg-fresh-400"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what you want to be notified about
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Daily Check-in Reminder</h4>
                    <p className="text-sm text-muted-foreground">
                      Remind you to log your daily progress
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Milestone Celebrations</h4>
                    <p className="text-sm text-muted-foreground">
                      Notify you when you reach important milestones
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Motivational Messages</h4>
                    <p className="text-sm text-muted-foreground">
                      Send you encouraging messages during your journey
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Step Goal Updates</h4>
                    <p className="text-sm text-muted-foreground">
                      Updates on your step goals and rewards
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Notification Channels</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifs">Email Notifications</Label>
                    <Switch id="email-notifs" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifs">Push Notifications</Label>
                    <Switch id="push-notifs" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="goals" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fresh Journey Goals</CardTitle>
              <CardDescription>
                Configure your nicotine goals and journey settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                View and modify your nicotine reduction or abstinence goals
              </p>
              <Button asChild className="bg-fresh-300 hover:bg-fresh-400">
                <a href="/app/goals">Go to Goals Page</a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account and subscription
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Password</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Change Password
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 border-t space-y-4">
                <h4 className="font-medium">Subscription</h4>
                <div className="p-4 bg-fresh-50 rounded-md">
                  <p className="text-sm font-medium">Free Trial</p>
                  <p className="text-sm text-muted-foreground">
                    You're currently on the free trial plan
                  </p>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Upgrade to Premium
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 border-t space-y-4">
                <h4 className="font-medium">Account Actions</h4>
                <div className="space-y-2 flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete Account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your
                          account and remove all your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={() => {
                            toast.error("Account deletion initiated", { 
                              description: "Please check your email to confirm."
                            });
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
