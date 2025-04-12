
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { updateUserProfile, getUserProfile } from '@/services/profileService';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Loader2, Save, UserCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';

const ProfileSettings = () => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const { impact } = useHaptics();
  
  // Load user profile data
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
        avatar_url: avatarUrl
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
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </div>
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatarUrl} alt={`${firstName} ${lastName}`} />
            <AvatarFallback className="bg-primary text-primary-foreground">{getInitials()}</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
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
  );
};

export default ProfileSettings;
