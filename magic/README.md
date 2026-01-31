# Mandarin Learner - Mobile & Web

A comprehensive Mandarin learning application with support for Audio Shadowing, Active Recall, Quizzes, and more. Optimized for both web and mobile usage.

## 📱 Mobile Development (iOS & Android)

This project uses **Capacitor.js** to run as a native mobile application.

### Prerequisites

- **Node.js**: installed on your system.
- **Xcode**: For iOS builds (macOS only).
- **Android Studio**: For Android builds.

### 🎨 Icons & Splash Screens

I have generated a premium app icon for you in the `assets/` folder. To generate all the required sizes for iOS and Android:

```bash
npm run assets
```

*Note: This will automatically update your native projects with the new icon and splash screen.*

### Setting Up & Building

You can generate the native distribution files (like the Android APK) directly from the command line:

```bash
# This script prepares assets, syncs them, and compiles the apps
./build-mobile.sh
```

### Generated Files

After running the build script, you can find the outputs at:

- **Android APK**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **iOS project**: `ios/App/App.xcworkspace` (Ready for Xcode archiving)

### Compiling and Running via CLI

Instead of opening the IDEs, you can also run directly from your terminal:

#### iOS

```bash
npx cap run ios
```

#### Android

```bash
npx cap run android
```

---

### 🛠️ Native IDEs (Alternative)

If you prefer to use the native development environments:

- **iOS Development**: Run `npx cap open ios` to open Xcode. Then build and run via the Play button.
- **Android Development**: Run `npx cap open android` to open Android Studio. Then build and run via the Run button.

---

## 🌐 Web Deployment

To deploy the application to GitHub Pages:

1. Ensure you have a git remote configured correctly.
2. Run the deployment script:

   ```bash
   ./deploy.sh
   ```

   *For more details, see [DEPLOY.md](./DEPLOY.md).*

## 🛠️ Tech Stack

- **Core**: HTML5, Vanilla CSS, Vue.js (v3)
- **Mobile**: Capacitor.js
- **Audio Analysis**: Custom JS for tone comparison and shadowing.
