const { createApp } = Vue;

const WORD_PREFIX = "word_";
const IMAGE_EXTENSION = ".jpg";
const AUDIO_EXTENSION = ".mp3";
const CLASSIFIER_PINYIN = {
    "个": {
        "pinyin": "gè",
        "uses": [
            "General-purpose classifier for people, most objects, fruits, abstract things"
        ]
    },
    "只": {
        "pinyin": "zhī",
        "uses": [
            "Most small/medium animals, birds, insects",
            "Pairs of body parts (eyes, hands, feet)"
        ]
    },
    "棵": {
        "pinyin": "kē",
        "uses": [
            "Plants, trees, vegetables with stems/roots"
        ]
    },
    "片": {
        "pinyin": "piàn",
        "uses": [
            "Flat, thin, slice-like things (slices of food, leaves, areas)"
        ]
    },
    "条": {
        "pinyin": "tiáo",
        "uses": [
            "Long, thin, narrow things (fish, snakes, pants, roads, rivers)"
        ]
    },
    "面": {
        "pinyin": "miàn",
        "uses": [
            "Flat surfaces (flags, mirrors, drums, gongs)",
            "Faces of things (wall, door)"
        ]
    },
    "座": {
        "pinyin": "zuò",
        "uses": [
            "Large fixed structures (buildings, mountains, bridges, statues, towers)"
        ]
    },
    "台": {
        "pinyin": "tái",
        "uses": [
            "Appliances and machines (TV, computer, fridge, washing machine)",
            "Performances or stages"
        ]
    },
    "把": {
        "pinyin": "bǎ",
        "uses": [
            "Objects with handles (knives, chairs, umbrellas, keys, fans)"
        ]
    },
    "朵": {
        "pinyin": "duǒ",
        "uses": [
            "Flowers, clouds"
        ]
    },
    "张": {
        "pinyin": "zhāng",
        "uses": [
            "Flat surfaces/thin sheets (paper, tables, beds, tickets, photos)"
        ]
    },
    "本": {
        "pinyin": "běn",
        "uses": [
            "Books, magazines, volumes"
        ]
    },
    "辆": {
        "pinyin": "liàng",
        "uses": [
            "Vehicles with wheels (cars, bikes, buses, trains)"
        ]
    },
    "双": {
        "pinyin": "shuāng",
        "uses": [
            "Pairs (shoes, socks, gloves, eyes, hands)"
        ]
    },
    "位": {
        "pinyin": "wèi",
        "uses": [
            "Polite classifier for people (especially in formal situations)",
            "Positions/seats"
        ]
    }
};

const app = createApp({
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
            playDelay: 3.5,
            interactiveLoop: false,
            mobileMenuOpen: false,

            // Player state
            isPlaying: false,
            isLooping: false,
            currentAudio: null,
            userAudio: null,
            autoContinue: true,

            // Mode-specific state
            recallRevealedId: null,
            hideChinese: true,
            hidePinyin: false,

            // Quiz/Game state
            quizScore: { correct: 0, wrong: 0 },
            quizChoices: [],
            quizAnswered: false,
            quizCorrectId: null,
            quizSelectedId: null,
            userInput: '',
            writingStatus: '', // 'correct', 'wrong', ''

            // Comparison Results
            comparisonResults: {
                overallScore: 0,
                feedback: '',
                userContour: []
            },
            compareEnabled: true, // Default to true
            recordingProgress: 0, // 0 to 100
            recordingInterval: null,

            // Writing state
            writingTarget: 'hanzi', // 'hanzi' or 'pinyin'

            // Tone Practice state
            selectedTone: 1, // 1, 2, 3, 4

            // Shadowing state
            shadowingState: 'idle',
            autoRecord: true,
            shadowingTonePractice: false, // Enable tone feedback in shadowing mode
            mediaRecorder: null,
            audioChunks: [],
            audioContext: null,
            analyser: null,
            dataArray: null,

            statusText: 'Choose a mode to start learning',
            spokenText: '', // For displaying what is being synthesized

            modes: [
                { id: 'standard', title: 'Standard Mode', icon: 'fas fa-book-reader', iconClass: 'standard-icon', desc: 'Listening practice' },
                { id: 'recall', title: 'Active Recall', icon: 'fas fa-brain', iconClass: 'recall-icon', desc: 'Test your memory by hiding Pinyin or Mandarin.' },
                { id: 'shadowing', title: 'Shadowing', icon: 'fas fa-microphone-alt', iconClass: 'shadowing-icon', desc: 'Perfect your accent with recording feedback.' },
                { id: 'tonePractice', title: 'Tone Practice', icon: 'fas fa-music', iconClass: 'quiz-icon', desc: 'Practice specific tones.' },
                { id: 'quiz', title: 'Quiz Mode', icon: 'fas fa-question-circle', iconClass: 'quiz-icon', desc: 'Match images to Hanzi.' },
                { id: 'writing', title: 'Writing Practice', icon: 'fas fa-pencil-alt', iconClass: 'standard-icon', desc: 'Challenge your writing skills.' },
                { id: 'classifierMatch', title: 'Classifier Quiz', icon: 'fas fa-cubes', iconClass: 'recall-icon', desc: 'Choose the correct classifier for the object.' }
            ]
        };
    },
    computed: {
        words() {
            if (this.currentMode === 'tonePractice') {
                // Filter by tones and sort by length
                let pool = this.masterWords.filter(w => w.tones.includes(this.selectedTone));
                // Within each length, we'll shuffle if isShuffled is on
                // but keep the primary order: length 1, then length 2, ...
                const grouped = {};
                pool.forEach(w => {
                    const len = w.chinese.length;
                    if (!grouped[len]) grouped[len] = [];
                    grouped[len].push(w);
                });

                let results = [];
                Object.keys(grouped).sort().forEach(len => {
                    let group = grouped[len];
                    if (this.isShuffled) group.sort(() => Math.random() - 0.5);
                    results = results.concat(group);
                });
                return results;
            }
            return this.isShuffled ? this.shuffledWords : this.masterWords;
        },
        currentModeTitle() {
            const mode = this.modes.find(m => m.id === this.currentMode);
            return mode ? mode.title : '';
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
            if (this.shadowingState === 'idle') {
                if (this.isLooping && this.autoContinue) return 'Auto-continuing...';
                return 'Ready to practice';
            }
            if (this.shadowingState === 'recording') return 'Recording... (3 seconds)';
            if (this.shadowingState === 'playback') return 'Playing your recording...';
            return '';
        },
        shadowingStatusIcon() {
            if (this.shadowingState === 'idle') {
                if (this.isLooping && this.autoContinue) return 'fas fa-sync';
                return 'fas fa-check';
            }
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
        },
        scoreStyle() {
            const score = this.comparisonResults.overallScore;
            let color = '#ff4d4d'; // Red
            if (score > 80) color = '#10b981'; // Green
            else if (score > 60) color = '#ff9800'; // Orange
            return { backgroundColor: color };
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
            const playSpeech = () => {
                if ('speechSynthesis' in window) {
                    // Cancel previous speech to avoid overlapping
                    window.speechSynthesis.cancel();

                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.lang = 'zh-CN';
                    utterance.rate = 0.75; // Slower for clarity
                    utterance.pitch = 1.0;

                    // Try to find a high-quality Chinese voice
                    const voices = window.speechSynthesis.getVoices();
                    const zhVoice = voices.find(v => v.lang.includes('zh') && v.name.includes('Premium')) ||
                        voices.find(v => v.lang.includes('zh'));
                    if (zhVoice) utterance.voice = zhVoice;

                    this.spokenText = text; // Update visible text
                    // Clear after speaking
                    utterance.onend = () => {
                        setTimeout(() => { if (this.spokenText === text) this.spokenText = ''; }, 1000);
                    };

                    window.speechSynthesis.speak(utterance);
                }
            };

            // Wait for audio to finish if playing
            if (this.currentAudio && !this.currentAudio.paused) {
                const originalOnEnded = this.currentAudio.onended;
                this.currentAudio.onended = (e) => {
                    if (originalOnEnded) originalOnEnded(e);
                    playSpeech();
                };
                return;
            }
            if (this.userAudio && !this.userAudio.paused) {
                const originalOnEnded = this.userAudio.onended;
                this.userAudio.onended = (e) => {
                    if (originalOnEnded) originalOnEnded(e);
                    playSpeech();
                };
                return;
            }

            playSpeech();
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
        onCompareToggle() {
            if (this.compareEnabled) {
                this.autoContinue = false;
            }
        },
        startSession() {
            if (this.isShuffled && this.currentMode !== 'tonePractice') {
                this.shuffledWords = [...this.masterWords].sort(() => Math.random() - 0.5);
            }
            this.currentWordIndex = 0;

            if (this.currentMode === 'shadowing') {
                // Ensure mutual exclusivity: Compare is not compatible with auto-continue
                if (this.compareEnabled) this.autoContinue = false;
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
            if (this.currentMode !== 'writing' && !this.quizAnswered) {
                this.quizAnswered = false;
                // this.userInput = ''; // Don't clear here, verify button needs it. Clear in playNext.
                this.writingStatus = '';
                this.recallRevealedId = null;
            }

            // Clear comparison results and canvas
            this.comparisonResults = { overallScore: 0, feedback: '', userContour: [] };
            this.recordingProgress = 0;
            const canvas = document.getElementById('toneCanvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
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
            // Removed crossOrigin = "anonymous" to avoid CORS blocks on file://
            this.currentAudio.volume = this.volume / 100;
            this.currentAudio.onended = () => this.onAudioEnded();
            this.currentAudio.onerror = (e) => {
                console.error("Audio playback error:", word.audio, e);
                this.statusText = `Audio Error: Check file path`;
            };

            try {
                // Play immediately for standard, shadowing, quiz, or user initiated (Listen button)
                const autoPlayModes = ['standard', 'shadowing', 'quiz', 'tonePractice'];
                if (autoPlayModes.includes(this.currentMode) || userInitiated) {
                    // Resume audio context if needed (browsers require user gesture)
                    if (this.audioContext && this.audioContext.state === 'suspended') {
                        this.audioContext.resume();
                    }
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
            } else if (this.isLooping && this.autoContinue && !this.isQuizLikeMode && this.currentMode !== 'writing' && this.currentMode !== 'tonePractice') {
                this.handleAutoNext();
            } else if (this.currentMode === 'tonePractice' && this.autoContinue) {
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
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
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
            if (!this.hidePinyin) {
                return `${choice.chinese} (${choice.pinyin})`;
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
                this.statusText = "✅ Correct!";
                // Speak the answer (except in 'quiz' mode as requested)
                if (this.currentMode !== 'quiz') {
                    const prefix = choice.classifier ? `一${choice.classifier}` : '';
                    this.speak(`${prefix} ${choice.chinese}`);
                }
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
            const commonClassifiers = Object.keys(CLASSIFIER_PINYIN);
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

            // Always speak the correct combination
            const textToSpeak = `一${correct} ${this.activeWord.chinese}`; // e.g. "Yi ge ping guo"
            this.speak(textToSpeak);

            if (choice === correct) {
                this.quizScore.correct++;
            } else {
                this.quizScore.wrong++;
            }
            if (this.autoContinue) setTimeout(() => this.playNext(), 2000);
        },
        repeatClassifierAudio() {
            if (!this.activeWord) return;
            const correct = this.activeWord.classifier || '个';
            const textToSpeak = `一${correct} ${this.activeWord.chinese}`;
            this.speak(textToSpeak);
        },
        getClassifierBtnClass(choice) {
            if (!this.quizAnswered) return '';
            const correct = this.activeWord.classifier || '个';
            if (choice === correct) return 'correct';
            if (choice === this.quizSelectedId) return 'wrong';
            return '';
        },
        getClassifierPinyin(char) {
            return CLASSIFIER_PINYIN[char]?.pinyin || '';
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
        getReferenceDuration() {
            if (typeof WORDS_ANALYSIS === 'undefined') return 3;
            // Match logic from compareWithReference
            const wordNum = this.activeWord.number - 1;
            const searchKey = `word_${String(wordNum).padStart(3, '0')}`;
            const actualKey = Object.keys(WORDS_ANALYSIS).find(k => k.includes(searchKey)) || searchKey;
            const analysis = WORDS_ANALYSIS[actualKey];
            return analysis ? analysis.duration : 3;
        },
        handleShadowingMainAction() {
            if (this.currentMode === 'shadowing' && this.compareEnabled) return; // Hidden in UI anyway
            this.isLooping = !this.isLooping;
            if (this.isLooping) {
                if (this.shadowingState === 'idle') this.playActiveWord(true);
            }
            else this.stopAudioOnly();
        },
        retryRecordingOnly() {
            this.comparisonResults = { overallScore: 0, feedback: '', userContour: [] };
            const canvas = document.getElementById('toneCanvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            this.startRecordingSequence();
        },
        startRecordingSequence() {
            if (!this.mediaRecorder) return;
            this.shadowingState = 'recording';
            this.audioChunks = [];
            this.recordingProgress = 0;
            this.mediaRecorder.start();

            const refDuration = this.getReferenceDuration();
            let recordTime = 3000;
            if (refDuration >= 3) {
                recordTime = (3 + (refDuration - 3) + 1) * 1000;
            }

            const startTime = Date.now();
            if (this.recordingInterval) clearInterval(this.recordingInterval);
            this.recordingInterval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                this.recordingProgress = Math.min(100, (elapsed / recordTime) * 100);
            }, 50);

            setTimeout(() => {
                if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
                    this.mediaRecorder.stop();
                }
                if (this.recordingInterval) {
                    clearInterval(this.recordingInterval);
                    this.recordingInterval = null;
                }
                this.recordingProgress = 100;
            }, recordTime);
        },
        playUserRecording() {
            if (!this.userAudio) return;
            this.shadowingState = 'playback';
            this.userAudio.play();
            this.userAudio.onended = () => {
                this.shadowingState = 'idle';
                if (this.isLooping && this.autoContinue) setTimeout(() => this.playNext(), 800);
            };

            // Trigger Comparison ONLY if enabled
            if (this.compareEnabled) {
                this.compareWithReference();
            }
        },
        async compareWithReference() {
            const wordKey = `word_${this.activeWord.number - 1}`.replace(/word_(\d)$/, 'word_00$1').replace(/word_(\d\d)$/, 'word_0$1');
            // Simplified key match based on filenames in WORDS_ANALYSIS (e.g. word_000)
            const referenceKey = Object.keys(WORDS_ANALYSIS).find(k => k.includes(this.activeWord.number - 1)) || `word_${String(this.activeWord.number - 1).padStart(3, '0')}`;

            const referenceAnalysis = (typeof WORDS_ANALYSIS !== 'undefined') ? WORDS_ANALYSIS[referenceKey] : null;

            if (!referenceAnalysis) {
                console.warn('No reference analysis found for:', referenceKey);
                return;
            }

            try {
                // Get Blob from userAudio src
                const response = await fetch(this.userAudio.src);
                const blob = await response.blob();
                const userAnalysis = await this.analyzeUserAudio(blob);

                const score = this.comparePitchContours(
                    referenceAnalysis.pitch_contour,
                    userAnalysis.pitch_contour
                );

                this.comparisonResults = {
                    overallScore: score,
                    feedback: this.generateToneFeedback(score),
                    userContour: userAnalysis.pitch_contour
                };

                this.$nextTick(() => {
                    this.drawToneContour(referenceAnalysis, userAnalysis);
                });
            } catch (err) {
                console.error("Comparison failed", err);
            }
        },
        async analyzeUserAudio(blob) {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            const ctx = this.audioContext;
            const arrayBuffer = await blob.arrayBuffer();
            const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
            const floatData = audioBuffer.getChannelData(0);
            const sampleRate = audioBuffer.sampleRate;

            // Extract pitch at intervals
            const interval = 0.02; // 20ms
            const step = Math.floor(sampleRate * interval);
            const windowSize = Math.floor(sampleRate * 0.04); // 40ms window
            const contour = [];

            for (let i = 0; i < floatData.length - windowSize; i += step) {
                const slice = floatData.slice(i, i + windowSize);
                const pitch = this.detectPitch(slice, sampleRate);
                if (pitch > 50 && pitch < 500) {
                    contour.push({ time: i / sampleRate, pitch });
                }
            }
            return { pitch_contour: contour, duration: audioBuffer.duration };
        },
        detectPitch(buffer, sampleRate) {
            // Simple Autocorrelation
            let n = buffer.length;
            let bestOffset = -1;
            let bestCorrelation = 0;

            for (let offset = Math.floor(sampleRate / 500); offset < Math.floor(sampleRate / 50); offset++) {
                let correlation = 0;
                for (let i = 0; i < n - offset; i++) {
                    correlation += buffer[i] * buffer[i + offset];
                }
                if (correlation > bestCorrelation) {
                    bestCorrelation = correlation;
                    bestOffset = offset;
                }
            }

            if (bestCorrelation > 0.1) {
                return sampleRate / bestOffset;
            }
            return -1;
        },
        comparePitchContours(refData, userData) {
            if (!refData.length || !userData.length) return 0;

            // Normalize pitch (very basic: compare shapes/gradients rather than absolute freq)
            const normalize = (data) => {
                const mean = data.reduce((a, b) => a + b.pitch, 0) / data.length;
                return data.map(p => p.pitch / mean);
            };

            const refArr = normalize(refData);
            const userArr = normalize(userData);

            // DTW-lite: Simple resampling and Euclidean distance
            const resample = (arr, points = 20) => {
                const res = [];
                for (let i = 0; i < points; i++) {
                    const idx = Math.floor(i * (arr.length / points));
                    res.push(arr[idx]);
                }
                return res;
            };

            const r20 = resample(refArr);
            const u20 = resample(userArr);

            let dist = 0;
            for (let i = 0; i < 20; i++) {
                dist += Math.abs(r20[i] - u20[i]);
            }

            const score = Math.max(0, 100 - (dist * 20));
            return Math.round(score);
        },
        generateToneFeedback(score) {
            if (score >= 85) return "Perfect! native-like pitch.";
            if (score >= 70) return "Good job! Keep it up.";
            if (score >= 50) return "Not bad. Try to match the rise/fall.";
            return "Keep practicing. Focus on the tone melody.";
        },
        drawToneContour(ref, user) {
            const canvas = document.getElementById('toneCanvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const w = canvas.width;
            const h = canvas.height;

            ctx.clearRect(0, 0, w, h);

            // Draw background grid
            ctx.strokeStyle = '#eee';
            ctx.beginPath();
            for (let i = 1; i < 4; i++) {
                ctx.moveTo(0, h * i / 4); ctx.lineTo(w, h * i / 4);
            }
            ctx.stroke();

            const drawPath = (data, color, duration) => {
                if (!data.length) return;
                ctx.strokeStyle = color;
                ctx.lineWidth = 3;
                ctx.beginPath();

                // Find local min/max for scaling
                const pitches = data.map(p => p.pitch);
                const min = Math.min(...pitches) * 0.8;
                const max = Math.max(...pitches) * 1.2;

                data.forEach((p, i) => {
                    const x = (p.time / duration) * w;
                    const y = h - ((p.pitch - min) / (max - min) * h);
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                });
                ctx.stroke();
            };

            drawPath(ref.pitch_contour, '#10b981', ref.duration); // Reference in Green
            drawPath(user.pitch_contour, '#3b82f6', user.duration); // User in Blue
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
});

app.component('mode-selector', {
    props: ['mode'],
    emits: ['change'],
    data() {
        return {
            isOpen: false,
            groups: [
                {
                    label: 'Core Modes',
                    options: [
                        { value: 'standard', label: 'Standard Mode', icon: 'fas fa-book-reader' },
                        { value: 'recall', label: 'Recall Mode', icon: 'fas fa-brain' },
                        { value: 'shadowing', label: 'Shadowing Mode', icon: 'fas fa-microphone-alt' },
                        { value: 'quiz', label: 'Quiz Mode', icon: 'fas fa-question-circle' }
                    ]
                },
                {
                    label: 'Learning Games',
                    options: [
                        { value: 'writing', label: 'Writing Practice', icon: 'fas fa-pencil-alt' },
                        { value: 'tonePractice', label: 'Tone Practice', icon: 'fas fa-music' },
                        { value: 'classifierMatch', label: 'Classifier Match', icon: 'fas fa-cubes' }
                    ]
                }
            ]
        }
    },
    computed: {
        currentLabel() {
            for (const group of this.groups) {
                const found = group.options.find(o => o.value === this.mode);
                if (found) return found.label;
            }
            return 'Select Mode';
        }
    },
    methods: {
        toggle() {
            this.isOpen = !this.isOpen;
        },
        select(value) {
            this.$emit('change', value);
            this.isOpen = false;
        },
        close(e) {
            if (!this.$el.contains(e.target)) {
                this.isOpen = false;
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.close);
    },
    unmounted() {
        document.removeEventListener('click', this.close);
    },
    template: `
        <div :class="['custom-select-container', { open: isOpen }]">
            <div class="custom-select-trigger" @click="toggle">
                <span>{{ currentLabel }}</span>
                <i class="fas fa-chevron-down arrow"></i>
            </div>
            <div class="custom-options">
                <div v-for="(group, idx) in groups" :key="idx">
                    <div class="option-group-label">{{ group.label }}</div>
                    <div v-for="option in group.options" :key="option.value"
                         :class="['custom-option', { selected: mode === option.value }]"
                         @click="select(option.value)">
                        <i :class="option.icon"></i>
                        {{ option.label }}
                    </div>
                </div>
            </div>
        </div>
    `
});

app.component('mobile-menu', {
    props: ['isOpen', 'volume', 'mode', 'count'],
    emits: ['update:volume', 'update:mode'],
    template: `
    <div :class="['controls-group', { 'show-mobile': isOpen }]">
        <mode-selector :mode="mode" @change="$emit('update:mode', $event)"></mode-selector>

        <div class="volume-controls">
            <i class="fas fa-volume-down"></i>
            <input type="range" :value="volume" @input="$emit('update:volume', +$event.target.value)" min="0" max="100">
            <i class="fas fa-volume-up"></i>
        </div>
        
        <div class="word-count-display" style="text-align: center; color: #666; font-size: 0.9em;">
            Total Words: <span style="font-weight: bold; color: #4a00e0;">{{ count }}</span>
        </div>
    </div>
    `
});

app.mount('#app');
