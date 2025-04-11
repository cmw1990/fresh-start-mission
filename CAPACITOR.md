
# Mission Fresh Mobile App

This project now supports mobile app development using Capacitor, allowing you to run the app on iOS and Android devices with native capabilities.

## How to Run the Mobile App

### Prerequisites

- Node.js and npm installed
- For iOS: macOS with Xcode installed
- For Android: Android Studio installed

### Steps to Build and Run

1. **Export to GitHub**:
   - Click the "Export to GitHub" button in the Lovable interface
   - Clone your repository to your local machine

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Add platforms**:
   ```bash
   npx cap add ios
   npx cap add android
   ```

4. **Build the web app**:
   ```bash
   npm run build
   ```

5. **Sync with Capacitor**:
   ```bash
   npx cap sync
   ```

6. **Open in IDE and run**:
   - For iOS: `npx cap open ios`
   - For Android: `npx cap open android`

## Native Features

The Mission Fresh mobile app offers several native features:

- Step tracking: Track your daily steps and earn rewards
- Push notifications: Get reminders for your goals
- Offline usage: Log your progress even without internet
- Mobile-optimized UI: Designed specifically for mobile devices

## Troubleshooting

If you encounter issues:

1. Make sure you have the latest dependencies with `npm install`
2. Try running `npx cap update` to update Capacitor
3. Check that your development environment is properly set up for mobile development
4. Run `npx cap doctor` to diagnose issues

## Adding More Native Features

To add more native features, you can install Capacitor plugins:

```bash
npm install @capacitor/plugin-name
npx cap sync
```

For example, to add camera functionality:
```bash
npm install @capacitor/camera
npx cap sync
```
