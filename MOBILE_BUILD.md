
# Mission Fresh Mobile App - Build Instructions

Mission Fresh is built using Capacitor to provide a native mobile experience on iOS and Android devices.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- For iOS development:
  - macOS
  - Xcode (latest version recommended)
  - CocoaPods
- For Android development:
  - Android Studio
  - JDK 11 or higher
  - Android SDK

## Project Setup

1. Clone the repository and install dependencies:

```bash
git clone [repository-url]
cd mission-fresh
npm install
```

## Building the Project

1. First, build the web application:

```bash
npm run build
```

2. Sync the web assets with Capacitor:

```bash
npx cap sync
```

## Adding Native Platforms

If you haven't added platforms yet:

### For iOS:

```bash
npx cap add ios
```

### For Android:

```bash
npx cap add android
```

## Running on Native Platforms

### iOS

```bash
npx cap open ios
```

This will open the project in Xcode. From there, connect your device or select a simulator, then click the play button to run.

### Android

```bash
npx cap open android
```

This will open the project in Android Studio. Connect your device or select an emulator, then click the run button.

## Updating the App after Code Changes

When you make changes to the web code:

1. Rebuild the web app:

```bash
npm run build
```

2. Sync the changes to the native projects:

```bash
npx cap sync
```

3. Open the native project and run it:

```bash
npx cap open ios
# or
npx cap open android
```

## Live Reload Development

For faster development with live reload:

1. Start the development server:

```bash
npm run dev
```

2. Update the `capacitor.config.ts` file temporarily:

```typescript
server: {
  url: "http://YOUR_LOCAL_IP:5173",
  cleartext: true
}
```

3. Sync the changes:

```bash
npx cap sync
```

4. Open and run the native project.

## Native Features

Mission Fresh uses the following Capacitor plugins:

- `@capacitor/haptics` - For tactile feedback
- Health (future implementation) - For step tracking
- PushNotifications (future implementation) - For notifications

## Troubleshooting

### iOS Build Issues

- If you encounter pod installation issues, try:
  ```bash
  cd ios/App
  pod install --repo-update
  ```

### Android Build Issues

- If you encounter gradle sync issues, try:
  - Open Android Studio
  - Go to File > Sync Project with Gradle Files
  - Build > Clean Project
  - Build > Rebuild Project

## App Store / Play Store Deployment

Detailed instructions for app store deployments can be found in DEPLOYMENT.md (to be created when ready for production).

## Architecture

The mobile app shares the same codebase as the web application, with special considerations for mobile UX:
- Mobile-specific navigation (bottom tabs)
- Native integrations (Haptics, Health API)
- Offline support
- Responsive layouts optimized for mobile screens

