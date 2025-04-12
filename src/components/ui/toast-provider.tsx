
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
        classNames: {
          success: "bg-green-500 text-white border-none",
          error: "bg-red-500 text-white border-none",
          warning: "bg-amber-500 text-white border-none",
          info: "bg-blue-500 text-white border-none",
        },
      }}
      closeButton
      richColors
      expand={true}
      duration={4000}
      visibleToasts={3}
      pauseWhenPageIsHidden={true}
    />
  );
}
