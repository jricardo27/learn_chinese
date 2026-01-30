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

echo "✅ Sync complete!"
echo ""
echo "To build/run the native apps:"
echo "----------------------------"
echo "iOS:     npx cap open ios"
echo "Android: npx cap open android"
echo "----------------------------"
