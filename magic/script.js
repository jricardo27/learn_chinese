const { createApp } = Vue;

const TOTAL_WORDS = 414;
const WORD_PREFIX = "word_";
const IMAGE_EXTENSION = ".jpg";
const AUDIO_EXTENSION = ".mp3";

createApp({
    data() {
        return {
            masterWords: [], // Original sequential order
            shuffledWords: [], // Random order
            isShuffled: true,
            currentMode: 'home',
            currentWordIndex: -1,
            searchQuery: '',
            volume: 80,
            playDelay: 3.5,
            interactiveLoop: false,

            // Player state
            isPlaying: false,
            isLooping: false,
            currentAudio: null,
            userAudio: null,
            autoContinue: true,

            // Mode-specific state
            recallRevealedId: null,
            hideChinese: true,
            hidePinyin: true,

            // Quiz/Game state
            quizScore: { correct: 0, wrong: 0 },
            quizChoices: [],
            quizAnswered: false,
            quizCorrectId: null,
            quizSelectedId: null,
            userInput: '',
            writingStatus: '', // 'correct', 'wrong', ''

            // Writing state
            writingTarget: 'hanzi', // 'hanzi' or 'pinyin'

            // Shadowing state
            shadowingState: 'idle',
            autoRecord: true,
            mediaRecorder: null,
            audioChunks: [],

            statusText: 'Choose a mode to start learning',

            modes: [
                { id: 'standard', title: 'Standard Mode', icon: 'fa-book-reader', iconClass: 'standard-icon', desc: 'Focused single-word view with auto-play options.' },
                { id: 'recall', title: 'Active Recall', icon: 'fa-brain', iconClass: 'recall-icon', desc: 'Test your memory by hiding Pinyin or Mandarin.' },
                { id: 'shadowing', title: 'Shadowing', icon: 'fa-microphone-alt', iconClass: 'shadowing-icon', desc: 'Perfect your accent with recording feedback.' },
                { id: 'quiz', title: 'Quiz Mode', icon: 'fa-question-circle', iconClass: 'quiz-icon', desc: 'Match images to Hanzi with similar character counts.' },
                { id: 'writing', title: 'Writing Practice', icon: 'fa-pencil-alt', iconClass: 'standard-icon', desc: 'Challenge your writing skills.' },
                { id: 'classifierMatch', title: 'Classifier Quiz', icon: 'fa-cubes', iconClass: 'recall-icon', desc: 'Choose the correct classifier for the object.' }
            ]
        };
    },
    computed: {
        words() {
            return this.isShuffled ? this.shuffledWords : this.masterWords;
        },
        filteredWords() {
            if (!this.searchQuery) return this.words;
            const q = this.searchQuery.toLowerCase();
            return this.words.filter(w =>
                w.chinese.toLowerCase().includes(q) ||
                w.pinyin.toLowerCase().includes(q) ||
                w.english.toLowerCase().includes(q) ||
                w.number.toString().includes(q)
            );
        },
        activeWord() {
            if (this.currentWordIndex >= 0 && this.currentWordIndex < this.words.length) {
                return this.words[this.currentWordIndex];
            }
            return null;
        },
        overlayWord() {
            return (this.currentWordIndex >= 0) ? this.activeWord : null;
        },
        activeWordId() {
            return this.activeWord ? this.activeWord.id : null;
        },
        isRecallRevealed() {
            return this.recallRevealedId === this.activeWordId;
        },
        currentModeConfig() {
            return this.modes.find(m => m.id === this.currentMode) || { title: 'Home', icon: 'fa-home', desc: '' };
        },
        isQuizLikeMode() {
            const quizModes = ['quiz', 'animalMatch', 'categoryMatch'];
            return quizModes.includes(this.currentMode);
        },
        shadowingStatusText() {
            if (this.shadowingState === 'idle') return this.isLooping ? 'Auto-continuing...' : 'Ready to practice';
            if (this.shadowingState === 'recording') return 'Recording... (3 seconds)';
            if (this.shadowingState === 'playback') return 'Playing your recording...';
            return '';
        },
        shadowingStatusIcon() {
            if (this.shadowingState === 'idle') return this.isLooping ? 'fas fa-sync' : 'fas fa-check';
            if (this.shadowingState === 'recording') return 'fas fa-microphone';
            if (this.shadowingState === 'playback') return 'fas fa-headphones';
            return 'fas fa-volume-up';
        },
        shadowingStatusClass() {
            return {
                'playing': this.isLooping || this.shadowingState === 'playback',
                'recording': this.shadowingState === 'recording'
            };
        },
        shadowingMainActionText() {
            if (this.isLooping) return 'Pause Practice';
            return 'Start Practice';
        },
        shadowingMainActionIcon() {
            if (this.isLooping) return 'fas fa-pause';
            return 'fas fa-play';
        }
    },
    methods: {
        async loadWords() {
            try {
                let data = (typeof WORDS_DATA !== 'undefined') ? WORDS_DATA : {};
                const loadedWords = [];
                // Sort keys to maintain stable order before shuffle
                const filenames = Object.keys(data).sort();

                for (let i = 0; i < filenames.length; i++) {
                    const filename = filenames[i];
                    // Verify if filename matches format
                    if (!filename.startsWith(WORD_PREFIX)) continue;

                    const wordData = data[filename];
                    if (wordData) {
                        loadedWords.push({
                            id: i,
                            chinese: wordData.hanzi,
                            pinyin: wordData.pinyin,
                            english: wordData.english,
                            image: `images/${filename}`,
                            // Extract number from filename for audio mapping
                            audio: `audio/${filename.replace(IMAGE_EXTENSION, AUDIO_EXTENSION)}`,
                            number: i + 1,
                            categories: wordData.categories || [],
                            tones: wordData.tones || [],
                            classifier: wordData.classifier || null
                        });
                    }
                }
                this.masterWords = loadedWords;
                this.shuffledWords = [...loadedWords].sort(() => Math.random() - 0.5);
            } catch (error) {
                console.error('Error loading word data:', error);
            }
        },
        speak(text) {
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'zh-CN';
                window.speechSynthesis.speak(utterance);
            }
        },
        setMode(mode) {
            this.stopPlayback();
            this.currentMode = mode;
            this.currentWordIndex = -1;

            // Reset state
            this.quizScore = { correct: 0, wrong: 0 };
            this.quizAnswered = false;
            this.userInput = '';
            this.writingStatus = '';
            this.recallRevealedId = null;
            this.shadowingState = 'idle';
            this.writingTarget = 'hanzi'; // default

            if (mode === 'recall') {
                this.hideChinese = true;
                this.hidePinyin = true;
                // Auto-continue not relevant for Recall usually, but user said disable it or it's irrelevant.
                // We'll just leave local state as is, but can hide option in UI.
            }
            if (mode === 'shadowing') {
                this.initVoiceRecorder();
            }
            this.statusText = mode === 'home' ? 'Choose a mode to start learning' : `${this.currentModeConfig.title} Initialized`;
        },
        onModeChange() {
            this.setMode(this.currentMode);
        },
        toggleOrder() {
            this.isShuffled = !this.isShuffled;
        },
        startSession() {
            if (this.isShuffled) {
                this.shuffledWords = [...this.masterWords].sort(() => Math.random() - 0.5);
            }
            this.currentWordIndex = 0;

            // Start logic logic
            if (this.currentMode === 'shadowing') {
                // Shadowing starts loop immediately
                this.isLooping = true;
            }
            this.playActiveWord(true);
        },
        onCardClick(word) {
            const index = this.words.findIndex(w => w.id === word.id);
            if (index !== -1) {
                this.currentWordIndex = index;
                this.playActiveWord(true);
            }
        },
        async playActiveWord(userInitiated = false) {
            const word = this.activeWord;
            if (!word) return;

            this.stopAudioOnly();
            this.isPlaying = true;
            this.statusText = `Playing: ${word.chinese}`;

            // Only Reset sub-state if it's a new word (or full replay), not just "Listen" button in writing mode
            // We'll detect "Listen" button by checking if we are already on this word content-wise
            // But simplify: writing mode "Listen" just plays audio.
            if (this.currentMode !== 'writing') {
                this.quizAnswered = false;
                // this.userInput = ''; // Don't clear here, verify button needs it. Clear in playNext.
                this.writingStatus = '';
                this.recallRevealedId = null;
            } else {
                // In writing mode, if userInitiated (Listen button), don't clear input.
                // If it's a new word navigation, clear input.
                // We handle clearing in playNext/Prev
            }

            if (this.isQuizLikeMode && !this.quizAnswered) { // Only setup if not already answered (prevent reshuffle on replay)
                this.setupQuiz(word);
            } else if (this.currentMode === 'classifierMatch' && !this.quizAnswered) {
                this.setupClassifierQuiz(word);
            } else if (this.currentMode === 'writing') {
                setTimeout(() => {
                    const input = document.querySelector('.writing-input');
                    if (input) input.focus();
                }, 100);
            }

            // Normal audio playback
            this.currentAudio = new Audio(word.audio);
            this.currentAudio.volume = this.volume / 100;
            this.currentAudio.onended = () => this.onAudioEnded();

            try {
                // Play immediately for standard, shadowing, quiz, or user initiated (Listen button)
                const autoPlayModes = ['standard', 'shadowing', 'quiz'];
                if (autoPlayModes.includes(this.currentMode) || userInitiated) {
                    this.currentAudio.play();
                } else if (this.currentMode !== 'writing') {
                    // 
                }
            } catch (e) {
                console.error("Audio play failed", e);
            }
        },
        onAudioEnded() {
            if (this.currentMode === 'shadowing' && this.autoRecord) {
                this.startRecordingSequence();
            } else if (this.currentMode === 'standard' && this.autoContinue) {
                this.handleAutoNext();
            } else if (this.isLooping && this.autoContinue && !this.isQuizLikeMode && this.currentMode !== 'writing') {
                this.handleAutoNext();
            } else {
                this.isPlaying = false;
            }
        },
        handleAutoNext() {
            const delay = this.playDelay * 1000;
            this.statusText = `Next in ${this.playDelay}s...`;
            this.autoNextTimeout = setTimeout(() => this.playNext(), delay);
        },
        playNext() {
            if (this.currentWordIndex < this.words.length - 1) {
                this.userInput = ''; // Clear for next word
                this.quizAnswered = false;
                this.currentWordIndex++;
                this.playActiveWord();
            } else {
                this.stopPlayback();
            }
        },
        playPrev() {
            if (this.currentWordIndex > 0) {
                this.userInput = '';
                this.quizAnswered = false;
                this.currentWordIndex--;
                this.playActiveWord();
            }
        },
        togglePlayPause() {
            if (this.isPlaying) this.pausePlayback();
            else {
                if (this.currentWordIndex < 0) this.startSession();
                else if (this.currentAudio) this.currentAudio.play();
                else this.playActiveWord(true);
            }
        },
        pausePlayback() {
            this.isLooping = false;
            this.isPlaying = false;
            this.stopAudioOnly();
        },
        stopPlayback() {
            this.isLooping = false;
            this.isPlaying = false;
            this.stopAudioOnly();
            this.currentWordIndex = -1;
            if (this.autoNextTimeout) clearTimeout(this.autoNextTimeout);
            this.shadowingState = 'idle';
        },
        stopAudioOnly() {
            if (this.currentAudio) {
                this.currentAudio.pause();
                this.currentAudio = null;
            }
            if (this.userAudio) {
                this.userAudio.pause();
                this.userAudio = null;
            }
            if (this.autoNextTimeout) clearTimeout(this.autoNextTimeout);
        },
        replayAudio() {
            this.playActiveWord(true);
        },

        // --- Multi-Choice Games ---
        setupQuiz(word) {
            const choices = [word];
            const usedIds = new Set([word.id]);
            const targetLength = word.chinese.length;
            const targetCategory = word.categories && word.categories.length > 0 ? word.categories[0] : null;

            // Strategy: 
            // 1. Same Length + Same Category (Best)
            // 2. Same Length (Good)
            // 3. Fallback (Any)

            let candidates = this.masterWords.filter(w => !usedIds.has(w.id));

            // 1. Filter by Length
            let lengthMatches = candidates.filter(w => w.chinese.length === targetLength);
            // If strictly same length is too few, fallback to strict length being the ONLY pool if we have enough
            // If we don't have enough, we'll allow +/-1 length from the start
            if (lengthMatches.length < 3) {
                lengthMatches = candidates.filter(w => Math.abs(w.chinese.length - targetLength) <= 1);
            }

            // 2. Prioritize Category within Length Matches
            let categoryMatches = [];
            if (targetCategory) {
                categoryMatches = lengthMatches.filter(w => w.categories && w.categories.includes(targetCategory));
            }

            // 3. Other Length Matches (different category)
            let otherLengthMatches = lengthMatches.filter(w => !categoryMatches.includes(w));

            // Helper to fill choices
            const fillChoices = (pool) => {
                while (choices.length < 4 && pool.length > 0) {
                    const idx = Math.floor(Math.random() * pool.length);
                    const chosen = pool[idx];
                    choices.push(chosen);
                    usedIds.add(chosen.id);
                    pool.splice(idx, 1);
                }
            };

            fillChoices(categoryMatches);      // First priority
            fillChoices(otherLengthMatches);   // Second priority

            // If still not enough, look at global candidates again (ignoring length if desperate, but typically should be fine)
            if (choices.length < 4) {
                let remaining = candidates.filter(w => !usedIds.has(w.id));
                fillChoices(remaining);
            }

            this.quizChoices = choices.sort(() => Math.random() - 0.5);
            this.quizCorrectId = word.id;
        },
        getChoiceLabel(choice) {
            if (this.currentMode === 'categoryMatch') {
                return choice.categories[0] || 'Uncategorized';
            }
            if (this.currentMode === 'animalMatch') {
                const match = choice.chinese.match(/([一二三四五六七八九十].)/);
                return match ? match[1] : choice.chinese;
            }
            return choice.chinese;
        },
        handleQuizAnswer(choice) {
            if (this.quizAnswered) return;
            this.quizAnswered = true;
            this.quizSelectedId = choice.id;

            if (choice.id === this.quizCorrectId) {
                this.quizScore.correct++;
                this.statusText = "✅ Correct!";
            } else {
                this.quizScore.wrong++;
                this.statusText = "❌ Wrong!";
            }

            if (this.autoContinue) setTimeout(() => this.playNext(), 2000);
        },
        getQuizBtnClass(choice) {
            if (!this.quizAnswered) return '';
            if (choice.id === this.quizCorrectId) return 'correct';
            if (choice.id === this.quizSelectedId) return 'wrong';
            return '';
        },

        // --- Classifier Quiz ---
        setupClassifierQuiz(word) {
            const correct = word.classifier || '个';
            const commonClassifiers = ['个', '只', '棵', '片', '条', '面', '座', '台', '把', '朵', '只'];
            const choices = new Set([correct]);
            while (choices.size < 4) {
                choices.add(commonClassifiers[Math.floor(Math.random() * commonClassifiers.length)]);
            }
            this.quizChoices = Array.from(choices).sort(() => Math.random() - 0.5);
            this.quizAnswered = false;
        },
        handleClassifierAnswer(choice) {
            if (this.quizAnswered) return;
            this.quizAnswered = true;
            this.quizSelectedId = choice;
            const correct = this.activeWord.classifier || '个';
            if (choice === correct) {
                this.quizScore.correct++;
                // TTS Feedback
                const textToSpeak = `一${correct} ${this.activeWord.chinese}`; // e.g. "Yi ge ping guo"
                this.speak(textToSpeak);
            } else {
                this.quizScore.wrong++;
            }
            if (this.autoContinue) setTimeout(() => this.playNext(), 2000);
        },
        getClassifierBtnClass(choice) {
            if (!this.quizAnswered) return '';
            const correct = this.activeWord.classifier || '个';
            if (choice === correct) return 'correct';
            if (choice === this.quizSelectedId) return 'wrong';
            return '';
        },

        // --- Writing Practice ---
        checkWritingAnswer() {
            if (this.quizAnswered) return;
            // writingTarget can be 'hanzi' or 'pinyin'
            const correct = this.writingTarget === 'pinyin' ? this.activeWord.pinyin : this.activeWord.chinese;

            // Normalize
            // Remvoe tones for looser check? User didn't request tones check disable, stick to strict string match first
            // but trim spaces.
            const input = this.userInput.trim();
            const target = correct.trim();

            // Simple validation
            if (input === target || (target.includes(input) && input.length >= 1 && this.writingTarget === 'hanzi')) {
                this.writingStatus = 'correct';
                this.quizScore.correct++;
                this.statusText = "✅ Correct!";
            } else {
                this.writingStatus = 'wrong';
                this.quizScore.wrong++;
                this.statusText = "❌ Try Again";
            }
            this.quizAnswered = true;
            if (this.autoContinue) setTimeout(() => this.playNext(), 2000);
        },

        // --- Recall/Shadowing Helpers ---
        revealRecall() {
            this.recallRevealedId = this.activeWordId;
            if (this.currentAudio) this.currentAudio.play();
        },
        async initVoiceRecorder() {
            if (this.mediaRecorder) return;
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                this.mediaRecorder = new MediaRecorder(stream);
                this.mediaRecorder.ondataavailable = e => this.audioChunks.push(e.data);
                this.mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                    this.userAudio = new Audio(URL.createObjectURL(audioBlob));
                    this.playUserRecording();
                };
            } catch (err) { console.error("Mic access denied", err); }
        },
        handleShadowingMainAction() {
            this.isLooping = !this.isLooping;
            if (this.isLooping) {
                if (this.shadowingState === 'idle') this.playActiveWord(true);
            }
            else this.stopAudioOnly();
        },
        startRecordingSequence() {
            if (!this.mediaRecorder) return;
            this.shadowingState = 'recording';
            this.audioChunks = [];
            this.mediaRecorder.start();
            setTimeout(() => { if (this.mediaRecorder.state === 'recording') this.mediaRecorder.stop(); }, 3000);
        },
        playUserRecording() {
            if (!this.userAudio) return;
            this.shadowingState = 'playback';
            this.userAudio.play();
            this.userAudio.onended = () => {
                this.shadowingState = 'idle';
                if (this.isLooping && this.autoContinue) setTimeout(() => this.playNext(), 800);
            };
        },
        startManualRecording() { this.startRecordingSequence(); },
        stopManualRecording() { if (this.mediaRecorder && this.mediaRecorder.state === 'recording') this.mediaRecorder.stop(); },

        // --- Global Utils ---
        shuffleWords() {
            this.shuffledWords.sort(() => Math.random() - 0.5);
            this.isShuffled = true;
            if (this.currentWordIndex >= 0) {
                this.currentWordIndex = 0;
                this.playActiveWord(true);
            }
        },
        setupKeyboardListeners() {
            window.addEventListener('keydown', (e) => {
                if (this.currentMode === 'home') return;
                // Allow enter to submit writing
                if (e.code === 'Enter' && this.currentMode === 'writing') {
                    this.checkWritingAnswer();
                    return;
                }

                if (document.activeElement.tagName === 'INPUT' && e.code !== 'Escape') return;

                if (e.code === 'Space') {
                    e.preventDefault();
                    this.togglePlayPause();
                } else if (e.code === 'ArrowRight') this.playNext();
                else if (e.code === 'ArrowLeft') this.playPrev();
                else if (e.code === 'Escape') this.stopPlayback();
            });
        }
    },
    mounted() {
        this.loadWords();
        this.setupKeyboardListeners();
    }
}).mount('#app');
