
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { updateUserProfile, getUserProfile } from '@/services/profileService';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, User2, Loader2, Save, Lock, ShieldCheck, Info, Phone, Award } from 'lucide-react';
import { toast } from 'sonner';
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';
import PageBreadcrumb from '@/components/common/PageBreadcrumb';

const Profile = () => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { impact } = useHaptics();
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const profile = await getUserProfile();
        if (profile) {
          setFirstName(profile.first_name || '');
          setLastName(profile.last_name || '');
          setAvatarUrl(profile.avatar_url || '');
          setPhoneNumber(profile.phone_number || '');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile information');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [user]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSaving(true);
    try {
      await updateUserProfile({
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        avatar_url: avatarUrl,
        phone_number: phoneNumber
      });
      
      toast.success('Profile updated successfully');
      impact(HapticImpact.LIGHT);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };
  
  const getInitials = () => {
    let initials = '';
    if (firstName) initials += firstName[0].toUpperCase();
    if (lastName) initials += lastName[0].toUpperCase();
    return initials || (user?.email ? user.email[0].toUpperCase() : 'U');
  };
  
  if (loading) {
    return (
      <div className="container py-8">
        <PageBreadcrumb />
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and account settings
        </p>
      </div>
      
      <div className="grid gap-6">
        <Tabs defaultValue="information" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
            <TabsTrigger value="information">Personal Info</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="information" className="space-y-6 pt-4">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                      <CardTitle className="text-lg">Personal Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </div>
                    <div className="flex justify-center">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={avatarUrl} alt={`${firstName} ${lastName}`} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                            {getInitials()}
                          </AvatarFallback>
                        </Avatar>
                        <Button
                          type="button"
                          variant="secondary"
                          size="icon"
                          className="absolute -bottom-2 -right-2 rounded-full h-8 w-8"
                          onClick={() => {
                            // In a real app, this would open a file picker
                            const url = prompt('Enter avatar URL:', avatarUrl);
                            if (url) setAvatarUrl(url);
                          }}
                        >
                          <Camera className="h-4 w-4" />
                          <span className="sr-only">Change avatar</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={user?.email || ''} disabled />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input 
                        id="first-name" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Your first name"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input 
                        id="last-name" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input 
                      id="phone" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="avatar-url">Profile picture URL</Label>
                    <Input 
                      id="avatar-url" 
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      placeholder="https://example.com/your-profile-image.jpg"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter a direct URL to an image for your profile picture
                    </p>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-amber-500" />
                  <CardTitle className="text-lg">Password & Security</CardTitle>
                </div>
                <CardDescription>Manage your password and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="flex items-start space-x-4">
                    <ShieldCheck className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-medium">Password</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Change your password regularly to keep your account secure
                      </p>
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-blue-500 mt-1" />
                    <div>
                      <h3 className="font-medium">Two-factor Authentication</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Add an extra layer of security to your account
                      </p>
                      <Button variant="outline">Set Up 2FA</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Info className="h-6 w-6 text-purple-500 mt-1" />
                    <div>
                      <h3 className="font-medium">Login History</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Review recent login activity on your account
                      </p>
                      <Button variant="outline">View History</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <CardTitle className="text-lg">Your Achievements</CardTitle>
                </div>
                <CardDescription>Track your progress and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                  <Award className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-3" />
                  <h3 className="font-medium text-lg">No achievements yet</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Continue your nicotine-free journey to earn badges and milestones
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
