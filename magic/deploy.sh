#!/bin/bash

# Exit on error
set -e

# Configuration
DIST_FOLDER="gh-pages-deploy"
MAIN_HTML="magic.html"

echo "🚀 Starting deployment to GitHub Pages..."

# Check if git is configured
if [ -z "$(git config --get remote.origin.url)" ]; then
    echo "❌ Error: No remote 'origin' found. Please check your git configuration."
    exit 1
fi

# 1. Prepare directory
echo "🧹 Cleaning up previous builds..."
rm -rf $DIST_FOLDER
mkdir $DIST_FOLDER

# 2. Copy files
echo "📦 Copying assets..."
# Rename entry point to index.html so it loads automatically
cp "$MAIN_HTML" "$DIST_FOLDER/index.html" 
cp script.js "$DIST_FOLDER/"
cp style.css "$DIST_FOLDER/"

# Copy data files
if [ -f "words_data.js" ]; then cp words_data.js "$DIST_FOLDER/"; fi
if [ -f "words_analysis.js" ]; then cp words_analysis.js "$DIST_FOLDER/"; fi
if [ -f "all_words.json" ]; then cp all_words.json "$DIST_FOLDER/"; fi

# Copy resources
# Use -R to copy directories recursively
echo "   - Copying audio..."
if [ -d "audio" ]; then cp -R audio "$DIST_FOLDER/"; fi

echo "   - Copying images..."
if [ -d "images" ]; then cp -R images "$DIST_FOLDER/"; fi

# 3. Initialize and Push
echo "📤 Pushing to gh-pages..."

# Get the current remote URL
REMOTE_URL=$(git config --get remote.origin.url)

cd $DIST_FOLDER
git init
git checkout -b gh-pages
git add .
git commit -m "Deploy to GitHub Pages - $(date)"

# Force push to the gh-pages branch of the remote
git remote add origin "$REMOTE_URL"
git push -f origin gh-pages

# Cleanup
cd ..
rm -rf $DIST_FOLDER

echo "✅ Deployment successful!"
echo "🌍 Your site will be available shortly at your GitHub Pages URL."
