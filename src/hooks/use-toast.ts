
// This is a wrapper around sonner to maintain backward compatibility
// with any code that might be using the older useToast hook
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
};

// Simple toast function that maps our parameters to sonner
function toast({ title, description, action }: ToastProps) {
  return sonnerToast(title || "", {
    description,
    action,
  });
}

// Mock the old useToast hook API with sonner's functions
function useToast() {
  return {
    toast: (props: ToastProps) => toast(props),
    dismiss: sonnerToast.dismiss,
    // Fixed: Removed duplicate "toast" property and used direct methods instead
    error: (title: string, options?: any) => sonnerToast.error(title, options),
    success: (title: string, options?: any) => sonnerToast.success(title, options),
    info: (title: string, options?: any) => sonnerToast.info(title, options),
    warning: (title: string, options?: any) => sonnerToast.warning(title, options),
  };
}

export { useToast, toast };
