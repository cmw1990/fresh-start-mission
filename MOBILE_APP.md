
# Mission Fresh Mobile App

This project supports mobile app deployment using Capacitor, allowing users to experience a native app-like experience on iOS and Android devices.

## Features

- Native mobile navigation
- Step tracking integration with device health APIs
- Haptic feedback for interactions
- Offline support with data synchronization
- Push notifications
- Responsive UI optimized for mobile

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

## Native Integrations

The Mission Fresh mobile app leverages several native device capabilities:

### Step Tracking

The app integrates with Apple HealthKit (iOS) and Google Fit (Android) to track steps automatically. This data is used for the step rewards program.

### Haptic Feedback

The app uses device haptics to provide tactile feedback for important interactions like logging data, completing exercises, and earning rewards.

### Push Notifications

Push notifications are implemented for:
- Daily reminders to log data
- Congratulatory messages for milestones
- Reward notifications
- Craving support prompts

### Offline Support

The app includes robust offline support, allowing users to:
- Log data without an internet connection
- View cached data and progress
- Automatically sync when connectivity is restored

## Development Notes

### Project Structure

- `src/components/mobile/` - Mobile-specific components
- `src/hooks/useHaptics.ts` - Hook for haptic feedback
- `src/hooks/use-mobile.ts` - Utility for detecting mobile devices
- `capacitor.config.ts` - Capacitor configuration

### Capacitor Plugins Used

- `@capacitor/haptics` - For haptic feedback
- `@capacitor/push-notifications` - For push notifications
- (Add any other plugins you're using)

### Testing on Physical Devices

1. Build the project: `npm run build`
2. Sync Capacitor: `npx cap sync`
3. Open the native IDE:
   - iOS: `npx cap open ios`
   - Android: `npx cap open android`
4. Run the app on your connected device or emulator

## Troubleshooting

If you encounter issues:

1. Make sure you have the latest dependencies with `npm install`
2. Try running `npx cap update` to update Capacitor
3. Check that your development environment is properly set up for mobile development
4. Run `npx cap doctor` to diagnose issues
