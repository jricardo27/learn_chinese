#!/bin/bash

# Mandarin Learner - Mobile Build Script
# This script syncs web assets to iOS and Android platforms

set -e

echo "📦 Preparing web assets..."
# Create/Clean www directory
mkdir -p www
rm -rf www/*

# Copy web files
cp index.html script.js style.css words_data.js words_analysis.js www/
cp -R audio images www/

echo "🔄 Syncing with Capacitor..."
npx cap sync

echo "🏗️ Building Android APK..."
cd android
./gradlew assembleDebug
cd ..

echo "🏗️ Building iOS (CLI)..."
# Note: iOS build requires valid signing which is usually handled in Xcode
# This command will attempt to build the project
npx cap build ios --no-open

echo "✅ Build and Sync complete!"
echo ""
echo "Files generated:"
echo "----------------------------"
echo "Android APK:  android/app/build/outputs/apk/debug/app-debug.apk"
echo "iOS Build:    ios/App/Build (Check Xcode for final IPA)"
echo "----------------------------"
echo "To run on device:"
echo "Android: npx cap run android"
echo "iOS:     npx cap run ios"
