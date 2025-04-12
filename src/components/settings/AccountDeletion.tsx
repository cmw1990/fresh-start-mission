
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const AccountDeletion = () => {
  const { user, logout } = useAuth();
  const [confirmEmail, setConfirmEmail] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  
  const handleDelete = async () => {
    if (!user) return;
    
    if (confirmEmail !== user.email) {
      toast.error('Email does not match. Please try again.');
      return;
    }
    
    setIsDeleting(true);
    try {
      // First delete user data from all tables
      await supabase
        .from('user_preferences')
        .delete()
        .eq('user_id', user.id);
      
      await supabase
        .from('user_goals')
        .delete()
        .eq('user_id', user.id);
      
      await supabase
        .from('nicotine_logs')
        .delete()
        .eq('user_id', user.id);
      
      await supabase
        .from('step_rewards')
        .delete()
        .eq('user_id', user.id);
      
      await supabase
        .from('claimed_rewards')
        .delete()
        .eq('user_id', user.id);
        
      // Then delete the user profile
      await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id);
      
      // Finally delete the user
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      if (error) throw error;
      
      // Log the user out
      await logout();
      
      toast.success('Your account has been deleted successfully');
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account. Please contact support.');
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <Card className="border-destructive/20">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Trash2 className="h-5 w-5 text-destructive" />
          <div>
            <CardTitle className="text-lg text-destructive">Delete Account</CardTitle>
            <CardDescription>Permanently delete your account and all data</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Once you delete your account, all your data will be permanently removed. This action cannot be undone.
        </p>
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="py-4">
              <div className="grid gap-2">
                <Label htmlFor="confirm-email" className="font-medium">
                  Please enter your email address to confirm: {user?.email}
                </Label>
                <Input 
                  id="confirm-email" 
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={confirmEmail !== user?.email || isDeleting}
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete();
                }}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete Account'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default AccountDeletion;
