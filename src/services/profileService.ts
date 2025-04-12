
import { supabase } from '@/integrations/supabase/client';
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
      .maybeSingle();
      
    if (error) throw error;
    
    return data as Profile;
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

/**
 * Get a user's profile by ID (for admin or public profiles)
 */
export const getProfileById = async (userId: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
      
    if (error) throw error;
    
    return data as Profile;
  } catch (error: any) {
    console.error('Error fetching profile by ID:', error);
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
    
    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', authData.user.id)
      .maybeSingle();
      
    if (!existingProfile) {
      // Create profile if it doesn't exist
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
        
      if (error) throw error;
      
      toast.success('Profile created successfully');
      return data as Profile;
    } else {
      // Update existing profile
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
    }
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    toast.error(error.message || 'Error updating profile');
    return null;
  }
};

/**
 * Delete a user's profile (only for admin or account closure)
 */
export const deleteUserProfile = async (): Promise<boolean> => {
  try {
    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) {
      toast.error('You must be logged in to delete your profile');
      return false;
    }
    
    // Delete profile
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', authData.user.id);
      
    if (profileError) throw profileError;
    
    // Delete user account
    const { error: authError } = await supabase.auth.admin.deleteUser(
      authData.user.id
    );
    
    if (authError) throw authError;
    
    toast.success('Account deleted successfully');
    return true;
  } catch (error: any) {
    console.error('Error deleting user profile:', error);
    toast.error(error.message || 'Error deleting profile');
    return false;
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
