// ============================================
// APPLE WATCH INTEGRATION CODE
// Add this code to your script.js Vue app
// ============================================

// Add these methods to your Vue app's methods section:

const watchIntegrationMethods = {
    // Initialize Watch Sync on app mount
    async initWatchSync() {
        if (!window.WatchSync) {
            console.log('WatchSync not available (web or Android)');
            return;
        }

        const isConnected = await WatchSync.isConnected();
        if (isConnected) {
            console.log('✅ Apple Watch connected');
            this.isWatchConnected = true;
        } else {
            console.log('⌚ Apple Watch not connected');
            this.isWatchConnected = false;
        }
    },

    // Sync current word list to Apple Watch
    async syncWordsToWatch() {
        if (!window.WatchSync || !this.isWatchConnected) return;

        try {
            // Only sync filtered/active words to avoid overwhelming the watch
            const wordsToSync = this.filteredWords.slice(0, 100); // Limit to 100 words
            await WatchSync.syncWords(wordsToSync);
            console.log(`📱→⌚ Synced ${wordsToSync.length} words to Watch`);
        } catch (error) {
            console.error('Error syncing words to watch:', error);
        }
    },

    // Sync current word index to Apple Watch
    async syncCurrentIndexToWatch() {
        if (!window.WatchSync || !this.isWatchConnected) return;

        try {
            await WatchSync.syncCurrentIndex(this.currentWordIndex);
        } catch (error) {
            console.error('Error syncing index to watch:', error);
        }
    },

    // Listen for index changes from Watch
    setupWatchListeners() {
        if (!window.Capacitor) return;

        // Listen for notifications from iOS
        window.addEventListener('watchIndexChanged', (event) => {
            const newIndex = event.detail?.index;
            if (newIndex !== undefined && newIndex !== this.currentWordIndex) {
                console.log(`⌚→📱 Watch changed to word ${newIndex}`);
                this.currentWordIndex = newIndex;
                if (this.currentWordIndex >= 0) {
                    this.playActiveWord();
                }
            }
        });
    }
};

// ============================================
// INTEGRATION POINTS
// Add these calls to your existing methods:
// ============================================

/*
1. In mounted() lifecycle hook:
   mounted() {
       this.loadWords();
       this.setupKeyboardListeners();
       this.initWatchSync();        // ADD THIS
       this.setupWatchListeners();  // ADD THIS
   }

2. In startSession():
   startSession() {
       // ... existing code ...
       this.currentWordIndex = 0;
       this.playActiveWord();
       this.syncWordsToWatch();     // ADD THIS
   }

3. In playNext():
   playNext() {
       if (this.currentWordIndex < this.words.length - 1) {
           // ... existing code ...
           this.currentWordIndex++;
           this.playActiveWord();
           this.syncCurrentIndexToWatch();  // ADD THIS
       } else {
           this.handleSessionEnd();
       }
   }

4. In playPrev():
   playPrev() {
       if (this.currentWordIndex > 0) {
           // ... existing code ...
           this.currentWordIndex--;
           this.playActiveWord();
           this.syncCurrentIndexToWatch();  // ADD THIS
       }
   }

5. In setMode():
   setMode(mode) {
       // ... existing code ...
       this.currentMode = mode;
       this.currentWordIndex = -1;
       this.syncWordsToWatch();     // ADD THIS (when mode changes)
   }

6. Add to data():
   data() {
       return {
           // ... existing data properties ...
           isWatchConnected: false,  // ADD THIS
       }
   }
*/

// Export for reference
if (typeof module !== 'undefined' && module.exports) {
    module.exports = watchIntegrationMethods;
}
