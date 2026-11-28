# 📋 Apple Watch Setup Checklist

## ✅ Completed (By AI)

- [x] Created 4 WatchOS Swift files
- [x] Created 3 iOS integration files  
- [x] Created JavaScript bridge (watch-sync.js)
- [x] Updated index.html with script tag
- [x] Updated script.js with Watch sync methods
- [x] Added sync calls to navigation methods
- [x] Created comprehensive documentation
- [x] Generated architecture diagram
- [x] Generated Watch UI mockup

## 🔲 Your Tasks (In Xcode)

### 1. Open Project

```bash
cd /Users/ricardoperez/pcode/learn_chinese/magic
open ios/App/App.xcodeproj
```

### 2. Add Watch Target

- [ ] File → New → Target
- [ ] Select: watchOS → Watch App
- [ ] Product Name: `MandarinWatch`
- [ ] Click Finish
- [ ] Click Activate

### 3. Add Watch Files

- [ ] In Project Navigator, right-click **MandarinWatch Watch App** folder
- [ ] Select "Add Files to 'App'..."
- [ ] Navigate to `ios/MandarinWatch Watch App/`
- [ ] Select all 4 .swift files:
  - [ ] MandarinWatchApp.swift
  - [ ] ContentView.swift
  - [ ] WatchConnectivityManager.swift
  - [ ] WordData.swift
- [ ] Ensure **MandarinWatch Watch App** target is checked
- [ ] Click Add

### 4. Add iOS Files

- [ ] In Project Navigator, right-click **App** folder (iOS target)
- [ ] Select "Add Files to 'App'..."
- [ ] Navigate to `ios/App/App/`
- [ ] Select all 3 files:
  - [ ] PhoneConnectivityManager.swift
  - [ ] WatchSyncPlugin.swift
  - [ ] WatchSyncPlugin.m
- [ ] Ensure **App** target is checked (NOT Watch target)
- [ ] Click Add

### 5. Update Info.plist

- [ ] Open `ios/App/App/Info.plist`
- [ ] Right-click → Open As → Source Code
- [ ] Add before `</dict>`:

```xml
<key>NSSupportsWatchConnectivity</key>
<true/>
```

- [ ] Save file

### 6. Update AppDelegate

- [ ] Open `ios/App/App/AppDelegate.swift`
- [ ] Add at top with other imports:

```swift
import WatchConnectivity
```

- [ ] Find `application(_:didFinishLaunchingWithOptions:)` method
- [ ] Add this line inside the method:

```swift
_ = PhoneConnectivityManager.shared
```

- [ ] Save file

### 7. Build iOS App

- [ ] Select **App** scheme (top left)
- [ ] Select iPhone simulator or device
- [ ] Click Run (▶️) or Cmd+R
- [ ] Verify app builds successfully

### 8. Build Watch App

- [ ] Select **MandarinWatch Watch App** scheme (top left)
- [ ] Select Apple Watch simulator (e.g., Apple Watch Series 9 - 45mm)
- [ ] Click Run (▶️) or Cmd+R
- [ ] Verify Watch app builds successfully

### 9. Test Sync

- [ ] Run iOS app on simulator/device
- [ ] Run Watch app on Watch simulator
- [ ] On iPhone: Start a session
- [ ] On Watch: Verify flashcards appear
- [ ] On iPhone: Tap Next
- [ ] On Watch: Verify card updates
- [ ] On Watch: Tap → button
- [ ] On iPhone: Verify card updates

### 10. Test on Real Devices (Optional)

- [ ] Connect iPhone with paired Apple Watch
- [ ] Select iPhone as destination in Xcode
- [ ] Run the app
- [ ] Watch app installs automatically
- [ ] Test all features on real hardware

## 🐛 Troubleshooting

### Build Errors

- [ ] Clean build folder: Product → Clean Build Folder
- [ ] Delete derived data:

```bash
rm -rf ~/Library/Developer/Xcode/DerivedData
```

- [ ] Restart Xcode

### Files Not Found

- [ ] Verify files exist in correct directories
- [ ] Check file paths in terminal:

```bash
ls -la ios/MandarinWatch\ Watch\ App/
ls -la ios/App/App/PhoneConnectivityManager.swift
```

### Watch Not Connecting

- [ ] Ensure iPhone and Watch are paired
- [ ] Check Bluetooth is enabled
- [ ] Restart both devices
- [ ] Verify WatchConnectivity is activated

### Images Not Showing

- [ ] First sync may be slow (base64 conversion)
- [ ] Check console for errors
- [ ] Verify image paths in words_data.js

## 📱 Testing Scenarios

### Basic Functionality

- [ ] Watch shows "Waiting for iPhone" when not synced
- [ ] Starting session on iPhone syncs to Watch
- [ ] Images display correctly on Watch
- [ ] Chinese characters render properly
- [ ] Pinyin displays correctly
- [ ] English translation shows
- [ ] Category badges appear

### Navigation

- [ ] Next button works on Watch
- [ ] Previous button works on Watch
- [ ] iPhone follows Watch navigation
- [ ] Watch follows iPhone navigation
- [ ] Progress indicator updates (e.g., "5/100")

### Settings

- [ ] Menu button (•••) opens on Watch
- [ ] Toggle Pinyin works
- [ ] Toggle English works
- [ ] Settings persist during session

### Edge Cases

- [ ] Works with 1 word
- [ ] Works with 100+ words
- [ ] Handles missing images gracefully
- [ ] Works when switching modes on iPhone
- [ ] Handles Watch app restart
- [ ] Handles iPhone app restart

## 📊 Success Criteria

You'll know it's working when:

- ✅ Watch app builds without errors
- ✅ iOS app builds without errors
- ✅ Watch shows flashcards when iPhone starts session
- ✅ Navigation works bidirectionally
- ✅ Images appear on Watch
- ✅ No console errors related to WatchConnectivity

## 📚 Reference Documents

- **WATCH_IMPLEMENTATION_SUMMARY.md** - Complete overview
- **WATCH_SETUP.md** - Detailed setup guide
- **WATCH_QUICK_START.md** - Quick reference
- **watch-integration-guide.js** - Code examples

## 🎯 Next Steps After Setup

Once everything works:

1. Test with different learning modes
2. Try with various word counts
3. Test on real Apple Watch hardware
4. Consider adding audio playback
5. Explore Watch complications
6. Add haptic feedback for tones

## ⏱️ Estimated Time

- **Xcode Setup**: 15-20 minutes
- **First Build**: 5-10 minutes
- **Testing**: 10-15 minutes
- **Total**: ~30-45 minutes

## 🆘 Need Help?

If you get stuck:

1. Check the error message in Xcode
2. Review the documentation files
3. Verify all files are in correct targets
4. Clean and rebuild
5. Check console logs for WatchConnectivity errors

---

**Ready?** Open Xcode and start with Step 1! 🚀

**Current Status**: All code is ready, just needs Xcode configuration!
