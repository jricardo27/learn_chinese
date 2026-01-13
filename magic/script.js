// Configuration - Update these based on your files
const TOTAL_WORDS = 391; // Change this to your total number of words
const WORD_PREFIX = "word_"; // Your filename prefix
const IMAGE_EXTENSION = ".jpg";
const AUDIO_EXTENSION = ".mp3";

class WordLearner {
    constructor() {
        this.words = [];
        this.currentAudio = null;
        this.currentWordIndex = -1;
        this.isPlayingAll = false;
        this.playAllQueue = [];
        this.interactiveMode = false;
        this.autoNextTimeout = null;

        this.init();
    }

    init() {
        this.loadWords();
        this.setupEventListeners();
        this.updateWordCount();
    }

    async loadWords() {
        try {
            const response = await fetch('all_words.json');
            const data = await response.json();

            this.words = [];

            // We'll iterate up to TOTAL_WORDS, but check if data exists
            for (let i = 0; i < TOTAL_WORDS; i++) {
                const wordNumber = i.toString().padStart(3, '0');
                const filename = `${WORD_PREFIX}${wordNumber}${IMAGE_EXTENSION}`;
                const wordData = data[filename];

                if (wordData) {
                    this.words.push({
                        id: i,
                        chinese: wordData.chinese,
                        pinyin: wordData.pinyin,
                        image: `images/${filename}`,
                        audio: `audio/${WORD_PREFIX}${wordNumber}${AUDIO_EXTENSION}`,
                        number: i + 1,
                        filename: filename
                    });
                } else {
                    // Fallback for missing words (if any) or if we want to show placeholders
                    this.words.push({
                        id: i,
                        chinese: "???",
                        pinyin: `Word ${i + 1}`,
                        image: `images/${filename}`,
                        audio: `audio/${WORD_PREFIX}${wordNumber}${AUDIO_EXTENSION}`,
                        number: i + 1,
                        filename: filename
                    });
                }
            }
            this.renderWords();
            this.updateWordCount();
        } catch (error) {
            console.error('Error loading word data:', error);
            // Fallback to procedural generation if fetch fails
            this.loadPlaceholderWords();
        }
    }

    loadPlaceholderWords() {
        for (let i = 0; i < TOTAL_WORDS; i++) {
            const wordNumber = i.toString().padStart(3, '0');
            this.words.push({
                id: i,
                chinese: `Word ${i + 1}`,
                pinyin: "",
                image: `images/${WORD_PREFIX}${wordNumber}${IMAGE_EXTENSION}`,
                audio: `audio/${WORD_PREFIX}${wordNumber}${AUDIO_EXTENSION}`,
                number: i + 1
            });
        }
        this.renderWords();
        this.updateWordCount();
    }

    renderWords(filteredWords = null) {
        // Use this.words as default to maintain shuffled order if no filter
        const wordsToRender = filteredWords || this.words;
        const container = document.getElementById('word-container');

        container.innerHTML = wordsToRender.map(word => `
            <div class="word-card" data-id="${word.id}">
                <img src="${word.image}" alt="${word.chinese}" class="word-image">
                <div class="word-info">
                    <h3>${word.chinese}</h3>
                    <p>${word.pinyin}</p>
                    <small>#${word.number}</small>
                </div>
                <div class="play-icon">
                    <i class="fas fa-volume-up"></i>
                </div>
            </div>
        `).join('');

        // Add click listeners
        document.querySelectorAll('.word-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const wordId = parseInt(card.dataset.id);
                // If in interactive mode, clicking a card simply plays it
                // If auto playing, clicking plays this word and continues sequence from here?
                // Or just stops? Let's just play this word and ensure PlayAll mode is respected or continued
                this.playWord(wordId, true); // true = user initiated
            });
        });
    }

    // userInitiated: true if clicked by user, false if automatic sequence
    playWord(wordId, userInitiated = false) {
        // Find the word object
        const word = this.words.find(w => w.id === wordId);
        if (!word) return;

        // Clear any pending timeout
        if (this.autoNextTimeout) {
            clearTimeout(this.autoNextTimeout);
            this.autoNextTimeout = null;
        }

        // Stop current audio
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        }

        // Remove playing class from all
        document.querySelectorAll('.word-card').forEach(card => {
            card.classList.remove('playing');
        });

        // Add playing class to current
        const currentCard = document.querySelector(`.word-card[data-id="${wordId}"]`);
        if (currentCard) {
            currentCard.classList.add('playing');
            currentCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // If user manually clicked a word, we effectively "jump" the queue to this position
        // and continue playing from here if we were already playing all
        if (userInitiated && this.isPlayingAll) {
            // Rebuild queue starting from the NEXT word after this one
            const currentIdxInList = this.words.indexOf(word);
            if (currentIdxInList !== -1) {
                const remaining = this.words.slice(currentIdxInList + 1).map(w => w.id);
                this.playAllQueue = remaining;
            }
        }

        // Play audio
        this.currentAudio = new Audio(word.audio);
        this.currentWordIndex = wordId;

        this.currentAudio.addEventListener('canplaythrough', () => {
            this.currentAudio.play().catch(e => console.log("Play failed (user interaction needed?)", e));
            this.updateStatusText(word);
            document.getElementById('playPause').innerHTML = '<i class="fas fa-pause"></i>';
        });

        this.currentAudio.addEventListener('ended', () => {
            if (currentCard) currentCard.classList.remove('playing');

            if (this.isPlayingAll) {
                if (this.interactiveMode) {
                    document.getElementById('current-word').textContent = "Press SPACE for next word...";
                } else {
                    document.getElementById('current-word').textContent = "Waiting...";
                    const delay = parseFloat(document.getElementById('playDelay').value) * 1000 || 3500;
                    this.autoNextTimeout = setTimeout(() => {
                        this.playNextInQueue();
                    }, delay);
                }
            } else {
                document.getElementById('playPause').innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        // volume
        const volume = document.getElementById('volume').value / 100;
        this.currentAudio.volume = volume;
    }

    updateStatusText(word) {
        const modeText = this.isPlayingAll ? (this.interactiveMode ? '(Interactive)' : '(Auto)') : '';
        document.getElementById('current-word').textContent = `Now playing: ${word.chinese} (${word.pinyin}) ${modeText}`;
    }

    playAllWords() {
        if (this.words.length === 0) return;

        this.isPlayingAll = true;

        // If we have a queue (paused state), continue. Else build new.
        if (this.playAllQueue.length === 0) {
            // If we are currently "on" a word (currentWordIndex), start from the NEXT one
            // Otherwise start from beginning
            let startIdx = 0;
            if (this.currentWordIndex !== -1) {
                const currentWordObj = this.words.find(w => w.id === this.currentWordIndex);
                const idx = this.words.indexOf(currentWordObj);
                if (idx !== -1 && idx < this.words.length - 1) {
                    startIdx = idx; // We will play THIS word first, then next?
                    // Actually, if we hit Play All, we usually want to start sequence.
                    // Let's say we start from current word.
                    startIdx = idx;
                }
            }
            this.playAllQueue = this.words.slice(startIdx).map(w => w.id);
        }

        // Play next in queue
        this.playNextInQueue();
    }

    playNextInQueue() {
        if (!this.isPlayingAll) return;

        if (this.playAllQueue.length === 0) {
            this.stopPlayback();
            document.getElementById('current-word').textContent = 'All words played!';
            return;
        }

        const nextWordId = this.playAllQueue.shift();
        this.playWord(nextWordId);
    }

    // Pause functionality (Play/Pause button behavior)
    pausePlayback() {
        if (this.currentAudio) {
            this.currentAudio.pause();
        }
        if (this.autoNextTimeout) {
            clearTimeout(this.autoNextTimeout);
            this.autoNextTimeout = null;
        }
        document.getElementById('playPause').innerHTML = '<i class="fas fa-play"></i>';
    }

    // Stop functionality
    stopPlayback() {
        this.isPlayingAll = false;
        this.playAllQueue = [];
        if (this.autoNextTimeout) {
            clearTimeout(this.autoNextTimeout);
            this.autoNextTimeout = null;
        }
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        }
        document.getElementById('playPause').innerHTML = '<i class="fas fa-play"></i>';
        document.getElementById('current-word').textContent = 'Stopped';

        document.querySelectorAll('.word-card').forEach(card => {
            card.classList.remove('playing');
        });
    }

    toggleInteractiveMode() {
        this.interactiveMode = !this.interactiveMode;
        const btn = document.getElementById('interactiveMode');

        if (this.interactiveMode) {
            btn.classList.add('active');
            // If currently waiting in auto mode, cancel timeout so we wait for user
            if (this.autoNextTimeout) {
                clearTimeout(this.autoNextTimeout);
                this.autoNextTimeout = null;
                document.getElementById('current-word').textContent = "Interactive Mode Active. Press SPACE.";
            }
        } else {
            btn.classList.remove('active');
            // If we are sitting there waiting for input, and switch to auto, trigger next immediately?
            // Or only if audio ended.
            if (this.isPlayingAll && this.currentAudio && this.currentAudio.ended) {
                this.playNextInQueue();
            }
        }
    }

    setupEventListeners() {
        // Search
        document.getElementById('search').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = this.words.filter(word =>
                word.chinese.includes(searchTerm) ||
                word.pinyin.toLowerCase().includes(searchTerm) ||
                word.number.toString().includes(searchTerm)
            );
            this.renderWords(filtered);
            this.updateWordCount(filtered.length);
        });

        // Shuffle
        document.getElementById('shuffle').addEventListener('click', () => {
            this.words.sort(() => Math.random() - 0.5);
            this.renderWords();
            this.stopPlayback(); // Reset playback logic on shuffle
            this.currentWordIndex = -1;
        });

        // Interactive Mode Toggle
        document.getElementById('interactiveMode').addEventListener('click', () => {
            this.toggleInteractiveMode();
        });

        // Stop
        document.getElementById('stop').addEventListener('click', () => {
            this.stopPlayback();
        });

        // Player controls
        document.getElementById('prev').addEventListener('click', () => {
            const currentObj = this.words.find(w => w.id === this.currentWordIndex);
            const idx = this.words.indexOf(currentObj);
            if (idx !== -1 && idx > 0) {
                this.playWord(this.words[idx - 1].id, true);
            }
        });

        // Unified Play/Pause Button
        document.getElementById('playPause').addEventListener('click', () => {
            // Logic:
            // 1. If currently playing audio, PAUSE it.
            // 2. If paused (audio exists but paused), RESUME it.
            // 3. If stopped (no audio, or sequence stopped), START sequence (Play All behavior).

            if (this.currentAudio && !this.currentAudio.paused) {
                // Case 1: Playing -> Pause
                this.pausePlayback();
            } else if (this.currentAudio && this.currentAudio.paused) {
                // Case 2: Paused -> Resume
                this.currentAudio.play();
                document.getElementById('playPause').innerHTML = '<i class="fas fa-pause"></i>';
                // If we were waiting for delay timeout, strictly speaking we aren't "paused" in audio sense
                // but we might be paused in logic.
            } else {
                // Case 3: Stopped -> Start Play All
                this.playAllWords();
            }
        });

        document.getElementById('next').addEventListener('click', () => {
            // Manually skip to next
            const currentObj = this.words.find(w => w.id === this.currentWordIndex);
            const idx = this.words.indexOf(currentObj);
            if (idx !== -1 && idx < this.words.length - 1) {
                this.playWord(this.words[idx + 1].id, true);
            }
        });

        // Volume control
        document.getElementById('volume').addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            if (this.currentAudio) {
                this.currentAudio.volume = volume;
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ' && e.target === document.body) {
                e.preventDefault();
            }

            switch (e.key) {
                case ' ':
                    // SPACE behavior:
                    // If Interactive Mode AND Playing All:
                    //    -> FORCE NEXT WORD immediately (skip current audio or wait state)
                    // If NOT Interactive:
                    //    -> Toggle Play/Pause

                    if (this.isPlayingAll && this.interactiveMode) {
                        // Force skip
                        this.playNextInQueue();
                    } else {
                        document.getElementById('playPause').click();
                    }
                    break;
                case 'ArrowLeft':
                    document.getElementById('prev').click();
                    break;
                case 'ArrowRight':
                    document.getElementById('next').click();
                    break;
                case 'Escape':
                    this.stopPlayback();
                    break;
            }
        });
    }

    updateWordCount(count = null) {
        const displayCount = count !== null ? count : this.words.length;
        document.getElementById('word-count').textContent = displayCount;
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new WordLearner();
});
