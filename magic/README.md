# Mandarin Learner - Mobile & Web

A comprehensive Mandarin learning application with support for Audio Shadowing, Active Recall, Quizzes, and more. Optimized for both web and mobile usage.

## 📱 Mobile Development (iOS & Android)

This project uses **Capacitor.js** to run as a native mobile application.

### Prerequisites

- **Node.js**: installed on your system.
- **Xcode**: For iOS builds (macOS only).
- **Android Studio**: For Android builds.

### Setting Up & Syncing

If you make any changes to the code (`index.html`, `script.js`, `style.css`), you need to sync those changes to the native platforms:

```bash
# Using the provided script
./build-mobile.sh

# OR using npm
npm run sync
```

### Compiling and Running

#### iOS

1. Open the project in Xcode:

   ```bash
   npx cap open ios
   ```

2. In Xcode, select your target device/simulator and click the **Play** button to build and run.

#### Android

1. Open the project in Android Studio:

   ```bash
   npx cap open android
   ```

2. In Android Studio, click the **Run** button (green arrow) to build and run on your device or emulator.

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
