
// This is a wrapper around sonner to maintain backward compatibility
// with any code that might be using the older useToast hook
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive" | "success" | "warning" | "info"; // Add variant support
};

// Simple toast function that maps our parameters to sonner
function toast({ title, description, action, variant }: ToastProps) {
  // Map variant to the appropriate sonner function
  if (variant === "destructive" || variant === "error") {
    return sonnerToast.error(title || "", {
      description,
      action,
    });
  } else if (variant === "success") {
    return sonnerToast.success(title || "", {
      description,
      action,
    });
  } else if (variant === "warning") {
    return sonnerToast.warning(title || "", {
      description,
      action,
    });
  } else if (variant === "info") {
    return sonnerToast.info(title || "", {
      description,
      action,
    });
  } else {
    // Default toast
    return sonnerToast(title || "", {
      description,
      action,
    });
  }
}

// Mock the old useToast hook API with sonner's functions
function useToast() {
  return {
    toast: (props: ToastProps) => toast(props),
    dismiss: sonnerToast.dismiss,
    error: (title: string, options?: any) => sonnerToast.error(title, options),
    success: (title: string, options?: any) => sonnerToast.success(title, options),
    info: (title: string, options?: any) => sonnerToast.info(title, options),
    warning: (title: string, options?: any) => sonnerToast.warning(title, options),
  };
}

export { useToast, toast };
