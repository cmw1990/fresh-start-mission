
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.bc3d3b6c15684d6fb0f3245f1ecec6d4',
  appName: 'fresh-start-mission',
  webDir: 'dist',
  server: {
    url: 'https://bc3d3b6c-1568-4d6f-b0f3-245f1ecec6d4.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#38B2AC",
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
