/**
 * watch-sync.js
 * 
 * JavaScript bridge for syncing flashcards with Apple Watch
 * Include this file in your index.html
 */

const WatchSync = {
    /**
     * Check if Apple Watch is connected
     */
    async isConnected() {
        try {
            if (!window.Capacitor || !window.Capacitor.Plugins.WatchSync) {
                console.log('WatchSync plugin not available');
                return false;
            }

            const result = await window.Capacitor.Plugins.WatchSync.isWatchConnected();
            return result.connected;
        } catch (error) {
            console.error('Error checking watch connection:', error);
            return false;
        }
    },

    /**
     * Sync current word list to Apple Watch
     * @param {Array} words - Array of word objects
     */
    async syncWords(words) {
        try {
            if (!window.Capacitor || !window.Capacitor.Plugins.WatchSync) {
                console.log('WatchSync plugin not available');
                return;
            }

            // Convert words to format suitable for watch
            const watchWords = words.map(word => ({
                pinyin: word.pinyin,
                hanzi: word.chinese,
                english: word.english,
                categories: word.categories || [],
                image: word.image
            }));

            await window.Capacitor.Plugins.WatchSync.syncWords({ words: watchWords });
            console.log(`Synced ${words.length} words to Apple Watch`);
        } catch (error) {
            console.error('Error syncing words to watch:', error);
        }
    },

    /**
     * Sync current flashcard index to Apple Watch
     * @param {number} index - Current word index
     */
    async syncCurrentIndex(index) {
        try {
            if (!window.Capacitor || !window.Capacitor.Plugins.WatchSync) {
                return;
            }

            await window.Capacitor.Plugins.WatchSync.syncCurrentIndex({ index });
        } catch (error) {
            console.error('Error syncing index to watch:', error);
        }
    }
};

// Make available globally
window.WatchSync = WatchSync;
