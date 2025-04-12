
import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "white",
          color: "black",
          border: "1px solid #e2e8f0",
        },
        success: {
          style: {
            background: "#10b981",
            color: "white",
            border: "none",
          },
        },
        error: {
          style: {
            background: "#ef4444",
            color: "white",
            border: "none",
          },
        },
        warning: {
          style: {
            background: "#f59e0b",
            color: "white",
            border: "none",
          },
        },
        info: {
          style: {
            background: "#3b82f6",
            color: "white",
            border: "none",
          },
        },
      }}
      closeButton
      richColors
    />
  );
}
