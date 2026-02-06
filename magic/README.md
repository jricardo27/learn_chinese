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

#### ⚠️ Note on iOS Signing (Free Accounts)

If you do not have a paid Apple Developer membership, you can still run the app on your physical iPhone using a **Free Apple ID**:

1. Open the project: `npx cap open ios`.
2. Click the blue **App** icon at the top of the sidebar.
3. Select the **App** target and go to **Signing & Capabilities**.
4. Check **Automatically manage signing** and add your free Apple ID as the **Team**.
5. On your iPhone, go to **Settings > General > VPN & Device Management** and "Trust" your Apple ID to allow the app to run.
6. *Note: Free account apps expire after 7 days and must be re-deployed from Xcode.*

---

## 🌐 Web Deployment

To deploy the application to GitHub Pages:

1. Ensure you have a git remote configured correctly.
2. Run the deployment script:

   ```bash
   ./deploy.sh
   ```

   *For more details, see [DEPLOY.md](./DEPLOY.md).*

## ⌚ Apple Watch Companion App

This project includes a **native Apple Watch companion app** that displays flashcards synchronized with your iPhone!

### Features

- ✅ Real-time sync with iPhone
- ✅ Display flashcards with images
- ✅ Bidirectional navigation
- ✅ Toggle Pinyin/English visibility
- ✅ Progress tracking

### Setup

All documentation and setup instructions are in the `docs/` directory:

```bash
# Start here for step-by-step setup
cat docs/WATCH_CHECKLIST.md
```

**Quick links:**

- [Setup Checklist](docs/WATCH_CHECKLIST.md) - Step-by-step Xcode setup
- [Implementation Summary](docs/WATCH_IMPLEMENTATION_SUMMARY.md) - Complete overview
- [Quick Start Guide](docs/WATCH_QUICK_START.md) - Quick reference
- [Architecture Diagram](docs/images/watch_app_architecture.png)
- [Interface Mockup](docs/images/watch_interface_mockup.png)

**Estimated setup time:** 30-45 minutes

---

## 🛠️ Tech Stack

- **Core**: HTML5, Vanilla CSS, Vue.js (v3)
- **Mobile**: Capacitor.js
- **Watch**: SwiftUI + WatchConnectivity
- **Audio Analysis**: Custom JS for tone comparison and shadowing.
