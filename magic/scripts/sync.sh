#!/bin/bash
set -e
rm -rf www
mkdir -p www
cp index.html script.js style.css www/
cp -R audio images www/
find . -maxdepth 1 -name 'words_*.js' -exec cp {} www/ \;
npx cap sync
