
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// Profile type for the user profile data
export type Profile = {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
};

/**
 * Get the current user's profile data
 */
export const getUserProfile = async (): Promise<Profile | null> => {
  try {
    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) return null;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();
      
    if (error) throw error;
    
    return data as Profile;
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

/**
 * Update the current user's profile
 */
export const updateUserProfile = async (profileData: Partial<Profile>): Promise<Profile | null> => {
  try {
    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) {
      toast.error('You must be logged in to update your profile');
      return null;
    }
    
    // First update the auth metadata (name)
    if (profileData.first_name || profileData.last_name) {
      const { error: updateAuthError } = await supabase.auth.updateUser({
        data: { 
          name: `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim() 
        }
      });
      
      if (updateAuthError) throw updateAuthError;
    }
    
    // Then update the profiles table
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...profileData,
        updated_at: new Date().toISOString()
      })
      .eq('id', authData.user.id)
      .select()
      .single();
      
    if (error) throw error;
    
    toast.success('Profile updated successfully');
    return data as Profile;
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    toast.error(error.message || 'Error updating profile');
    return null;
  }
};

/**
 * Upload a profile avatar
 */
export const uploadAvatar = async (file: File): Promise<string | null> => {
  try {
    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) {
      toast.error('You must be logged in to upload an avatar');
      return null;
    }
    
    const fileExt = file.name.split('.').pop();
    const filePath = `avatars/${authData.user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('user-content')
      .upload(filePath, file);
      
    if (uploadError) throw uploadError;
    
    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('user-content')
      .getPublicUrl(filePath);
      
    // Update the user profile with the avatar URL
    await updateUserProfile({ avatar_url: urlData.publicUrl });
    
    toast.success('Avatar uploaded successfully');
    return urlData.publicUrl;
  } catch (error: any) {
    console.error('Error uploading avatar:', error);
    toast.error(error.message || 'Error uploading avatar');
    return null;
  }
};
