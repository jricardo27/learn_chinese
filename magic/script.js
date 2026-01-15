const { createApp } = Vue;

const TOTAL_WORDS = 414;
const WORD_PREFIX = "word_";
const IMAGE_EXTENSION = ".jpg";
const AUDIO_EXTENSION = ".mp3";

createApp({
    data() {
        return {
            words: [],
            currentMode: 'home',
            currentWordIndex: -1, // -1: welcome, -2: grid, >=0: active word
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

            // Quiz state
            quizScore: { correct: 0, wrong: 0 },
            quizChoices: [],
            quizAnswered: false,
            quizCorrectId: null,
            quizSelectedId: null,

            // Shadowing state
            shadowingState: 'idle', // idle, recording, playback
            autoRecord: true,
            mediaRecorder: null,
            audioChunks: [],

            statusText: 'Choose a mode to start learning',

            modes: [
                { id: 'standard', title: 'Standard Mode', icon: 'fa-book-reader', iconClass: 'standard-icon', desc: 'Focused single-word view with auto-play options.' },
                { id: 'recall', title: 'Active Recall', icon: 'fa-brain', iconClass: 'recall-icon', desc: 'Test your memory by hiding Pinyin or Mandarin.' },
                { id: 'shadowing', title: 'Shadowing', icon: 'fa-microphone-alt', iconClass: 'shadowing-icon', desc: 'Listen and record yourself to perfect your accent.' },
                { id: 'quiz', title: 'Quiz Mode', icon: 'fa-vial', iconClass: 'quiz-icon', desc: 'Challenge yourself with a 4-choice quiz.' }
            ]
        };
    },
    computed: {
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
            // In Vue, the overlay is just a view of the activeWord if currentWordIndex >= 0
            // and we are not in "browse grid first" mode (-2)
            return (this.currentWordIndex >= 0) ? this.activeWord : null;
        },
        activeWordId() {
            return this.activeWord ? this.activeWord.id : null;
        },
        isRecallRevealed() {
            return this.recallRevealedId === this.activeWordId;
        },
        currentModeConfig() {
            return this.modes.find(m => m.id === this.currentMode) || {};
        },
        shadowingStatusText() {
            if (this.shadowingState === 'idle') return this.isLooping ? 'Auto-continuing...' : 'Ready to practice';
            if (this.shadowingState === 'recording') return 'Recording... (3 seconds)';
            if (this.shadowingState === 'playback') return 'Playing your recording...';
            return '';
        },
        shadowingStatusIcon() {
            if (this.shadowingState === 'idle') return this.isLooping ? 'fas fa-sync' : 'fas fa-info-circle';
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
            return (this.shadowingState === 'idle' ? 'Start Practice' : 'Play Audio');
        },
        shadowingMainActionIcon() {
            if (this.isLooping) return 'fas fa-pause';
            return (this.shadowingState === 'idle' ? 'fas fa-play' : 'fas fa-redo');
        }
    },
    methods: {
        async loadWords() {
            try {
                let data = (typeof WORDS_DATA !== 'undefined') ? WORDS_DATA : {};
                if (Object.keys(data).length === 0) {
                    const response = await fetch('all_words.json');
                    data = await response.json();
                }

                const loadedWords = [];
                for (let i = 0; i < TOTAL_WORDS; i++) {
                    const wordNumber = i.toString().padStart(3, '0');
                    const filename = `${WORD_PREFIX}${wordNumber}${IMAGE_EXTENSION}`;
                    const wordData = data[filename];

                    if (wordData) {
                        loadedWords.push({
                            id: i,
                            chinese: wordData.hanzi,
                            pinyin: wordData.pinyin,
                            english: wordData.english,
                            image: `images/${filename}`,
                            audio: `audio/${WORD_PREFIX}${wordNumber}${AUDIO_EXTENSION}`,
                            number: i + 1
                        });
                    }
                }
                // Shuffle by default
                this.words = loadedWords.sort(() => Math.random() - 0.5);
            } catch (error) {
                console.error('Error loading word data:', error);
            }
        },
        setMode(mode) {
            this.stopPlayback();
            this.currentMode = mode;
            this.currentWordIndex = -1;

            if (mode === 'quiz') {
                this.quizScore = { correct: 0, wrong: 0 };
            }
            if (mode === 'recall') {
                this.hideChinese = true;
                this.hidePinyin = true;
            }
            if (mode === 'shadowing') {
                this.initVoiceRecorder();
            }
            this.statusText = mode === 'home' ? 'Choose a mode to start learning' : `${this.currentModeConfig.title} Initialized`;
        },
        onModeChange() {
            const mode = this.currentMode;
            this.setMode(mode);
        },
        startSession() {
            this.currentWordIndex = 0;
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

            if (this.currentMode === 'quiz') {
                this.setupQuiz(word);
            }

            // Normal audio playback
            this.currentAudio = new Audio(word.audio);
            this.currentAudio.volume = this.volume / 100;

            this.currentAudio.onended = () => {
                this.onAudioEnded();
            };

            try {
                // For modes like Standard/Shadowing, we might want to delay start slightly
                const delay = (this.currentMode === 'standard' || this.currentMode === 'shadowing') ? 100 : 0;
                setTimeout(() => {
                    if (this.currentAudio) this.currentAudio.play();
                }, delay);
            } catch (e) {
                console.error("Audio play failed", e);
            }
        },
        onAudioEnded() {
            if (this.currentMode === 'shadowing' && this.autoRecord) {
                this.startRecordingSequence();
            } else if (this.isLooping && this.autoContinue) {
                this.handleAutoNext();
            } else {
                this.isPlaying = false;
            }
        },
        handleAutoNext() {
            const delay = this.playDelay * 1000;
            this.statusText = `Next in ${this.playDelay}s...`;
            this.autoNextTimeout = setTimeout(() => {
                this.playNext();
            }, delay);
        },
        playNext() {
            if (this.currentWordIndex < this.words.length - 1) {
                this.currentWordIndex++;
                this.playActiveWord();
            } else {
                this.stopPlayback();
            }
        },
        playPrev() {
            if (this.currentWordIndex > 0) {
                this.currentWordIndex--;
                this.playActiveWord();
            }
        },
        togglePlayPause() {
            if (this.isPlaying) {
                this.pausePlayback();
            } else {
                if (this.currentWordIndex < 0) this.startSession();
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
            this.currentWordIndex = (this.currentMode === 'home') ? -1 : -1;
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
            if (this.currentMode === 'standard' || this.currentMode === 'shadowing') {
                this.isLooping = !this.isLooping;
                if (this.isLooping) this.playActiveWord(true);
                else this.stopAudioOnly();
            } else {
                this.playActiveWord(true);
            }
        },
        // --- Mode Specific Logic ---

        // Quiz
        setupQuiz(word) {
            const choices = [word];
            const usedIds = new Set([word.id]);
            while (choices.length < 4) {
                const rand = this.words[Math.floor(Math.random() * this.words.length)];
                if (!usedIds.has(rand.id)) {
                    choices.push(rand);
                    usedIds.add(rand.id);
                }
            }
            this.quizChoices = choices.sort(() => Math.random() - 0.5);
            this.quizAnswered = false;
            this.quizCorrectId = word.id;
            this.quizSelectedId = null;
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

            setTimeout(() => {
                if (this.isLooping || this.autoContinue) {
                    this.playNext();
                } else {
                    this.isPlaying = false;
                }
            }, 2000);
        },
        getQuizBtnClass(choice) {
            if (!this.quizAnswered) return '';
            if (choice.id === this.quizCorrectId) return 'correct';
            if (choice.id === this.quizSelectedId) return 'wrong';
            return '';
        },

        // Recall
        revealRecall() {
            this.recallRevealedId = this.activeWordId;
            const audio = new Audio(this.activeWord.audio);
            audio.play();
        },

        // Shadowing
        async initVoiceRecorder() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                this.mediaRecorder = new MediaRecorder(stream);
                this.mediaRecorder.ondataavailable = e => this.audioChunks.push(e.data);
                this.mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                    this.userAudio = new Audio(URL.createObjectURL(audioBlob));
                    this.playUserRecording();
                };
            } catch (err) {
                console.error("Mic access denied", err);
            }
        },
        handleShadowingMainAction() {
            this.isLooping = !this.isLooping;
            if (this.isLooping) this.playActiveWord(true);
            else this.stopAudioOnly();
        },
        startRecordingSequence() {
            if (!this.mediaRecorder) return;
            this.shadowingState = 'recording';
            this.audioChunks = [];
            this.mediaRecorder.start();

            setTimeout(() => {
                if (this.mediaRecorder.state === 'recording') {
                    this.mediaRecorder.stop();
                }
            }, 3000);
        },
        playUserRecording() {
            if (!this.userAudio) return;
            this.shadowingState = 'playback';
            this.userAudio.play();
            this.userAudio.onended = () => {
                this.shadowingState = 'idle';
                if (this.isLooping && this.autoContinue) {
                    setTimeout(() => this.playNext(), 500);
                }
            };
        },
        startManualRecording() {
            this.startRecordingSequence();
        },
        stopManualRecording() {
            if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
                this.mediaRecorder.stop();
            }
        },

        // --- Utils ---
        shuffleWords() {
            this.words.sort(() => Math.random() - 0.5);
            if (this.currentWordIndex >= 0) {
                // If in session, jump to new first word
                this.currentWordIndex = 0;
                this.playActiveWord(true);
            }
        },
        shuffleArray(array) {
            return array.sort(() => Math.random() - 0.5);
        },
        setupKeyboardListeners() {
            window.addEventListener('keydown', (e) => {
                if (this.currentMode === 'home') return;

                if (e.code === 'Space') {
                    e.preventDefault();
                    if (this.interactiveLoop && this.isPlaying) {
                        // Space might act as "Continue" in some modes
                    } else {
                        this.togglePlayPause();
                    }
                } else if (e.code === 'ArrowRight') {
                    this.playNext();
                } else if (e.code === 'ArrowLeft') {
                    this.playPrev();
                } else if (e.code === 'Escape') {
                    this.stopPlayback();
                }
            });
        }
    },
    mounted() {
        this.loadWords();
        this.setupKeyboardListeners();
    }
}).mount('#app');
