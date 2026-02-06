# Apple Watch Companion App - Quick Reference

## 📱 What Was Created

### WatchOS App (SwiftUI)

A native Apple Watch app that displays your Mandarin flashcards with:

- ✅ Real-time sync with iPhone
- ✅ Image display
- ✅ Chinese characters, Pinyin, and English
- ✅ Navigation (Previous/Next buttons)
- ✅ Toggle visibility for Pinyin/English
- ✅ Progress indicator (e.g., "5/100")

### iPhone Integration (Swift + Capacitor)

- **PhoneConnectivityManager**: Manages WatchConnectivity on iPhone side
- **WatchSyncPlugin**: Capacitor plugin exposing Watch sync to JavaScript
- **JavaScript Bridge**: `watch-sync.js` provides easy API for your Vue app

### Vue.js Integration

Your `script.js` now includes:

- `initWatchSync()` - Checks if Watch is connected
- `syncWordsToWatch()` - Sends word list to Watch
- `syncCurrentIndexToWatch()` - Syncs current flashcard
- `setupWatchListeners()` - Listens for Watch navigation

## 🚀 Next Steps

### 1. Open Xcode and Add Watch Target

```bash
cd /Users/ricardoperez/pcode/learn_chinese/magic
open ios/App/App.xcodeproj
```

In Xcode:

1. **File → New → Target**
2. Select **watchOS → Watch App**
3. Name it **MandarinWatch**
4. Click **Finish** and **Activate**

### 2. Add Swift Files to Xcode

#### For Watch App Target

Drag these files into the **MandarinWatch Watch App** group:

- `ios/MandarinWatch Watch App/MandarinWatchApp.swift`
- `ios/MandarinWatch Watch App/ContentView.swift`
- `ios/MandarinWatch Watch App/WatchConnectivityManager.swift`
- `ios/MandarinWatch Watch App/WordData.swift`

#### For iOS App Target

Drag these files into the **App** group:

- `ios/App/App/PhoneConnectivityManager.swift`
- `ios/App/App/WatchSyncPlugin.swift`
- `ios/App/App/WatchSyncPlugin.m`

### 3. Update Info.plist

Add to `ios/App/App/Info.plist`:

```xml
<key>NSSupportsWatchConnectivity</key>
<true/>
```

### 4. Initialize in AppDelegate

Edit `ios/App/App/AppDelegate.swift`:

```swift
import WatchConnectivity  // Add at top

// In application(_:didFinishLaunchingWithOptions:)
_ = PhoneConnectivityManager.shared  // Add this line
```

### 5. Build and Test

**For iOS Simulator:**

```bash
cd ios/App
npx cap sync ios
npx cap open ios
```

**For Watch Simulator:**

- In Xcode, select **MandarinWatch Watch App** scheme
- Choose a Watch simulator (e.g., Apple Watch Series 9)
- Click **Run** ▶️

**For Real Devices:**

- Connect iPhone with paired Apple Watch
- Select iPhone as destination
- Run the app - Watch app installs automatically

## 📊 How It Works

### Data Flow: iPhone → Watch

```
Vue.js (script.js)
  ↓ calls
WatchSync.syncWords()
  ↓ via Capacitor
WatchSyncPlugin.swift
  ↓ via WatchConnectivity
PhoneConnectivityManager
  ↓ sends to
Apple Watch
  ↓ receives in
WatchConnectivityManager
  ↓ updates
ContentView (displays flashcard)
```

### Data Flow: Watch → iPhone

```
Watch Navigation (Next/Prev button)
  ↓ calls
WatchConnectivityManager.sendCurrentIndex()
  ↓ via WatchConnectivity
PhoneConnectivityManager
  ↓ posts notification
JavaScript event listener
  ↓ updates
Vue.js currentWordIndex
  ↓ plays
New flashcard
```

## 🎯 Usage

### On iPhone

1. Open Mandarin Learner app
2. Select any mode (Standard, Shadowing, Quiz, etc.)
3. Click "Start Session"
4. **Automatic**: Words sync to Watch

### On Apple Watch

1. Open Mandarin Learner app on Watch
2. See the same flashcard as iPhone
3. Use **←** and **→** buttons to navigate
4. Tap **•••** to toggle Pinyin/English
5. **Automatic**: iPhone follows Watch navigation

## 🔧 Troubleshooting

### "WatchSync not available"

- This is normal on web browsers and Android
- Only works on iOS with paired Apple Watch

### Watch shows "Waiting for iPhone"

1. Ensure iPhone app is running
2. Check Watch is paired and unlocked
3. Restart both devices
4. Check Bluetooth is enabled

### Images not showing on Watch

- Images are converted to base64 (takes time)
- First sync may be slow
- Subsequent syncs use cached data

### Build errors in Xcode

```bash
# Clean build
rm -rf ~/Library/Developer/Xcode/DerivedData
cd ios/App
xcodebuild clean
```

## 📝 Files Modified

✅ `index.html` - Added `watch-sync.js` script tag
✅ `script.js` - Added Watch sync methods and calls
✅ Created 7 new Swift files for Watch app
✅ Created `watch-sync.js` JavaScript bridge
✅ Created `WATCH_SETUP.md` detailed guide

## 🎨 Customization Ideas

### Add to Watch App

- [ ] Haptic feedback for tones
- [ ] Audio playback (requires audio files on Watch)
- [ ] Quiz mode on Watch
- [ ] Complications for quick access
- [ ] Standalone mode (works without iPhone)

### Add to iPhone App

- [ ] Watch connection indicator in UI
- [ ] Manual sync button
- [ ] Sync statistics
- [ ] Choose which words to sync (favorites, recent, etc.)

## 📚 Resources

- [Apple WatchConnectivity Framework](https://developer.apple.com/documentation/watchconnectivity)
- [SwiftUI for watchOS](https://developer.apple.com/documentation/swiftui)
- [Capacitor iOS Plugins](https://capacitorjs.com/docs/plugins/ios)

## 🆘 Need Help?

Check the detailed setup guide:

```bash
cat WATCH_SETUP.md
```

Or review the integration code:

```bash
cat watch-integration-guide.js
```

---

**Status**: ✅ All files created and integrated
**Next**: Open Xcode and add the Watch target!
