# Capacitor Sync Fix - iPhone App Build

## Issue

When trying to build the iPhone app in Xcode, you encountered:

```
Missing package product 'CapApp-SPM'
```

## Root Cause

The Capacitor dependencies were not synced to the iOS project. This happens when:

1. Dependencies are not installed (`node_modules` missing)
2. Capacitor hasn't been synced after installing dependencies
3. The `www` directory (web assets) doesn't exist

## Solution Applied

### 1. Installed Dependencies ✅

```bash
pnpm install
```

**Result:** Installed 431 packages including:

- @capacitor/core@8.0.2
- @capacitor/ios@8.0.2
- @capacitor/cli@8.0.2
- @capacitor-community/native-audio@8.0.0
- @capacitor/action-sheet@8.0.0

### 2. Created www Directory ✅

```bash
mkdir -p www
cp index.html script.js style.css words_data.js words_analysis.js watch-sync.js www/
cp -r images www/
```

**Why:** Capacitor needs a `www` directory containing the web assets that will be bundled into the iOS app.

### 3. Synced Capacitor ✅

```bash
pnpm exec cap sync ios
```

**Result:**

- ✅ Copied web assets from `www` to `ios/App/App/public`
- ✅ Created `capacitor.config.json` in iOS app
- ✅ Updated iOS plugins
- ✅ Generated `Package.swift` with all plugins
- ✅ Registered 2 Capacitor plugins:
  - @capacitor-community/native-audio
  - @capacitor/action-sheet

## What Was Fixed

### Before

- ❌ No `node_modules` directory
- ❌ No `www` directory
- ❌ Capacitor not synced
- ❌ iOS project missing SPM packages
- ❌ Build failed

### After

- ✅ Dependencies installed
- ✅ `www` directory created with web assets
- ✅ Capacitor synced to iOS project
- ✅ SPM packages configured
- ✅ Ready to build!

## Files Created/Modified

### Created

- `www/` directory with all web assets
- `ios/App/App/public/` (Capacitor copies web assets here)
- `ios/App/App/capacitor.config.json`
- Updated `Package.swift` with plugin dependencies

### Modified

- None (configuration was already correct)

## Building the iPhone App

Now you can build the iPhone app in Xcode:

### Option 1: Build in Xcode

1. Open Xcode:

   ```bash
   open ios/App/App.xcodeproj
   ```

2. Select the **App** scheme (not MandarinWatch)

3. Select your target device/simulator

4. Click **Run** (▶️) or press `Cmd+R`

### Option 2: Build from Command Line

```bash
pnpm exec cap run ios
```

## Important Notes

### When to Re-sync

You need to run `pnpm exec cap sync ios` when:

- ✅ You update web files (HTML, JS, CSS)
- ✅ You add/remove Capacitor plugins
- ✅ You update Capacitor configuration
- ✅ After pulling changes from git

### Keeping www in Sync

Since your source files are in the root directory, you have two options:

**Option A: Manual sync (current setup)**

```bash
# After making changes to web files
cp index.html script.js style.css *.js www/
pnpm exec cap sync ios
```

**Option B: Create a build script**
Create `scripts/sync-web.sh`:

```bash
#!/bin/bash
cp index.html script.js style.css words_data.js words_analysis.js watch-sync.js www/
cp -r images www/
pnpm exec cap sync ios
```

Then run:

```bash
chmod +x scripts/sync-web.sh
./scripts/sync-web.sh
```

## Troubleshooting

### Still getting "Missing package product" error?

1. **Clean Xcode build:**

   ```bash
   rm -rf ~/Library/Developer/Xcode/DerivedData
   ```

2. **Re-sync Capacitor:**

   ```bash
   pnpm exec cap sync ios
   ```

3. **Restart Xcode**

### Web changes not showing in app?

1. **Update www directory:**

   ```bash
   cp *.html *.js *.css www/
   ```

2. **Re-sync:**

   ```bash
   pnpm exec cap sync ios
   ```

3. **Rebuild in Xcode**

## Status

✅ **Dependencies installed** - pnpm install complete
✅ **www directory created** - Web assets ready
✅ **Capacitor synced** - iOS project configured
✅ **SPM packages resolved** - CapApp-SPM available
✅ **Ready to build** - iPhone app should compile successfully!

---

**Next:** Open Xcode and build the iPhone app! 🚀📱
