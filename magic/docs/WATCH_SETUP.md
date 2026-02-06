# Apple Watch Companion App Setup Guide

## Overview

This guide will help you add an Apple Watch companion app to your Mandarin Learner application. The watch app will display flashcards synchronized with your iPhone app in real-time.

## Files Created

### WatchOS App Files (in `ios/MandarinWatch Watch App/`)

1. **MandarinWatchApp.swift** - Main app entry point
2. **ContentView.swift** - Watch UI displaying flashcards
3. **WatchConnectivityManager.swift** - Handles Watch-side communication
4. **WordData.swift** - Data model for words

### iOS App Files (in `ios/App/App/`)

1. **PhoneConnectivityManager.swift** - Handles iPhone-side communication
2. **WatchSyncPlugin.swift** - Capacitor plugin for JavaScript bridge
3. **WatchSyncPlugin.m** - Objective-C bridge registration

### JavaScript Files

1. **watch-sync.js** - JavaScript API for syncing with Watch

## Setup Instructions

### Step 1: Add Watch App Target in Xcode

1. Open your project in Xcode:

   ```bash
   open ios/App/App.xcodeproj
   ```

2. In Xcode, go to **File → New → Target**

3. Select **watchOS → Watch App** and click **Next**

4. Configure the target:
   - **Product Name**: `MandarinWatch`
   - **Organization Identifier**: (use your existing identifier)
   - **Bundle Identifier**: `com.yourcompany.mandarinlearner.watchkitapp`
   - **Language**: Swift
   - **User Interface**: SwiftUI
   - Click **Finish**

5. When prompted "Activate 'MandarinWatch' scheme?", click **Activate**

### Step 2: Add WatchOS Files to Xcode

1. In Xcode's Project Navigator, right-click on the **MandarinWatch Watch App** folder

2. Select **Add Files to "App"...**

3. Navigate to `ios/MandarinWatch Watch App/` and select all 4 Swift files:
   - MandarinWatchApp.swift
   - ContentView.swift
   - WatchConnectivityManager.swift
   - WordData.swift

4. Make sure **"MandarinWatch Watch App"** target is checked

5. Click **Add**

### Step 3: Add iOS Files to Xcode

1. In Xcode's Project Navigator, right-click on the **App** folder (under the iOS app target)

2. Select **Add Files to "App"...**

3. Add these files to the **App** target:
   - PhoneConnectivityManager.swift
   - WatchSyncPlugin.swift
   - WatchSyncPlugin.m

4. Make sure only the **App** target is checked (NOT the Watch target)

### Step 4: Configure Capabilities

#### For iOS App Target

1. Select your project in Xcode
2. Select the **App** target
3. Go to **Signing & Capabilities** tab
4. Click **+ Capability**
5. Add **Background Modes**
6. Check **Remote notifications** (if not already checked)

#### For Watch App Target

1. Select the **MandarinWatch Watch App** target
2. Go to **Signing & Capabilities** tab
3. Ensure **WatchKit App** is present

### Step 5: Update Info.plist

Add WatchConnectivity usage to your iOS app's Info.plist:

1. Open `ios/App/App/Info.plist`
2. Add this key-value pair:

   ```xml
   <key>NSSupportsWatchConnectivity</key>
   <true/>
   ```

### Step 6: Integrate JavaScript Bridge

1. Add the watch-sync.js script to your `index.html`:

```html
<!-- Add this before script.js -->
<script src="watch-sync.js"></script>
```

1. Update your `script.js` to sync with the watch. Add these methods to your Vue app:

```javascript
// In your Vue app's methods section
async syncToWatch() {
    if (!window.WatchSync) return;
    
    const isConnected = await WatchSync.isConnected();
    if (!isConnected) {
        console.log('Apple Watch not connected');
        return;
    }
    
    // Sync current word list
    await WatchSync.syncWords(this.words);
},

async syncCurrentWordIndex() {
    if (!window.WatchSync) return;
    await WatchSync.syncCurrentIndex(this.currentWordIndex);
},
```

1. Call these methods at appropriate times:

```javascript
// When starting a session
startSession() {
    // ... existing code ...
    this.syncToWatch(); // Add this
},

// When changing words
playNext() {
    // ... existing code ...
    this.syncCurrentWordIndex(); // Add this
},

playPrev() {
    // ... existing code ...
    this.syncCurrentWordIndex(); // Add this
},
```

### Step 7: Initialize Phone Connectivity Manager

Add this to your iOS app's AppDelegate or main app file:

1. Open `ios/App/App/AppDelegate.swift`

2. Add at the top:

```swift
import WatchConnectivity
```

1. In the `application(_:didFinishLaunchingWithOptions:)` method, add:

```swift
// Initialize Watch Connectivity
_ = PhoneConnectivityManager.shared
```

### Step 8: Build and Run

1. **Build for iOS Simulator/Device:**

   ```bash
   cd ios/App
   xcodebuild -scheme App -configuration Debug
   ```

2. **Build for Watch Simulator:**
   - In Xcode, select **MandarinWatch Watch App** scheme
   - Select a Watch simulator (e.g., Apple Watch Series 9 - 45mm)
   - Click **Run** (▶️)

3. **Test on Real Devices:**
   - Connect your iPhone
   - Pair your Apple Watch with the iPhone
   - Select your iPhone as the destination in Xcode
   - Run the iOS app
   - The Watch app will automatically install

## Usage

### On iPhone

1. Open the Mandarin Learner app
2. Start any learning mode (Standard, Recall, Shadowing, etc.)
3. The current word list will automatically sync to your Watch

### On Apple Watch

1. Open the Mandarin Learner app on your Watch
2. You'll see the same flashcard as on your iPhone
3. Swipe or use the navigation buttons to move between words
4. Toggle Pinyin/English visibility using the menu button (•••)

## Features

✅ **Real-time Sync**: Watch displays the same word as iPhone
✅ **Offline Support**: Words are cached on Watch
✅ **Navigation**: Previous/Next buttons on Watch
✅ **Customization**: Toggle Pinyin and English translations
✅ **Images**: Flashcard images are synced to Watch
✅ **Progress**: Shows current position (e.g., "5/100")

## Troubleshooting

### Watch app doesn't receive data

1. Ensure both devices are on the same Apple ID
2. Check that Watch is paired and unlocked
3. Verify WatchConnectivity is activated in both apps
4. Try restarting both devices

### Images not showing

- Images are converted to base64 and may take time to sync
- Large image sets may need optimization
- Check that image paths are correct in `words_data.js`

### Build errors

- Clean build folder: **Product → Clean Build Folder** in Xcode
- Delete derived data: `rm -rf ~/Library/Developer/Xcode/DerivedData`
- Ensure all files are added to correct targets

## Next Steps

Consider adding these enhancements:

- [ ] Audio playback on Watch (using haptics for tone indication)
- [ ] Quiz mode on Watch
- [ ] Progress tracking and statistics
- [ ] Complications for quick access
- [ ] Standalone Watch app (works without iPhone)

## Support

For issues or questions, check:

- Apple's WatchConnectivity documentation
- Capacitor iOS plugin documentation
- SwiftUI documentation for Watch

---

**Note**: This is a companion app that requires the iPhone app to be running for initial sync. For a fully standalone Watch app, additional development would be needed.
