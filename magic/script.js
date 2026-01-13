// Configuration - Update these based on your files
const TOTAL_WORDS = 392; // Change this to your total number of words
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
        this.currentMode = 'standard'; // standard, recall, shadowing, quiz

        // Shadowing vars
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.userAudio = null;

        // Quiz vars
        this.quizCorrect = 0;
        this.quizWrong = 0;

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

    setMode(mode) {
        this.currentMode = mode;
        this.stopPlayback();

        // UI updates
        document.getElementById('recallSettings').style.display = (mode === 'recall') ? 'block' : 'none';
        document.getElementById('quizScore').style.display = (mode === 'quiz') ? 'flex' : 'none';

        // Reset quiz scores
        if (mode === 'quiz') {
            this.quizCorrect = 0;
            this.quizWrong = 0;
            this.updateQuizScore();
            document.body.classList.add('quiz-mode');
        } else {
            document.body.classList.remove('quiz-mode');
        }

        if (mode === 'shadowing') {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    this.mediaRecorder = new MediaRecorder(stream);
                    this.mediaRecorder.ondataavailable = e => {
                        this.audioChunks.push(e.data);
                    };
                    this.mediaRecorder.onstop = () => {
                        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                        this.userAudio = new Audio(URL.createObjectURL(audioBlob));
                        this.playUserRecording();
                    };
                })
                .catch(err => {
                    console.error("Mic access denied", err);
                    alert("Microphone needed for shadowing mode!");
                    document.getElementById('learningMode').value = 'standard';
                    this.setMode('standard');
                });
        }

        this.renderWords();
    }

    updateQuizScore() {
        document.getElementById('correctCount').textContent = this.quizCorrect;
        document.getElementById('wrongCount').textContent = this.quizWrong;
        // Also update live score in quiz overlay
        document.getElementById('liveCorrectCount').textContent = this.quizCorrect;
        document.getElementById('liveWrongCount').textContent = this.quizWrong;
    }

    renderWords(filteredWords = null) {
        const wordsToRender = filteredWords || this.words;
        const container = document.getElementById('word-container');

        if (this.currentMode === 'quiz') {
            container.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; text-align: center; padding: 40px 20px; color: #666;">
                    <i class="fas fa-play-circle" style="font-size: 4em; margin-bottom: 20px; color: #8e2de2;"></i>
                    <h2 style="font-size: 2em; margin-bottom: 15px;">Quiz Mode</h2>
                    <p style="font-size: 1.2em; margin-bottom: 10px;">Press the Play button to start the quiz!</p>
                    <p style="margin-top: 20px; font-size: 1.1em;">Score: <span style="color: #28a745;">✅ ${this.quizCorrect}</span> / <span style="color: #dc3545;">❌ ${this.quizWrong}</span></p>
                </div>
            `;
            return;
        }

        container.innerHTML = wordsToRender.map(word => {
            let blurPinyin = this.currentMode === 'recall' && document.getElementById('hidePinyin').checked ? 'blur-text' : '';
            let blurChinese = this.currentMode === 'recall' && document.getElementById('hideChinese').checked ? 'blur-text' : '';

            return `
            <div class="word-card" data-id="${word.id}">
                <img src="${word.image}" alt="Word Image" class="word-image">
                <div class="word-info">
                    <h3 class="${blurChinese}">${word.chinese}</h3>
                    <p class="${blurPinyin}">${word.pinyin}</p>
                    <small>#${word.number}</small>
                </div>
            </div>
        `}).join('');

        document.querySelectorAll('.word-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const wordId = parseInt(card.dataset.id);

                if (this.currentMode === 'recall') {
                    card.classList.toggle('revealed');
                }

                if (this.isPlayingAll) this.stopPlayback();
                this.playWord(wordId, true);
            });
        });
    }

    async playWord(wordId, userInitiated = false) {
        const word = this.words.find(w => w.id === wordId);
        if (!word) return;

        // Reset state
        if (this.autoNextTimeout) {
            clearTimeout(this.autoNextTimeout);
            this.autoNextTimeout = null;
        }
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        }
        if (this.userAudio) {
            this.userAudio.pause();
            this.userAudio = null;
        }

        // Quiz mode uses different rendering
        if (this.currentMode === 'quiz') {
            this.showQuizOverlay(word);
            return;
        }

        // UI Updates
        document.querySelectorAll('.word-card').forEach(c => c.classList.remove('playing'));
        const currentCard = document.querySelector(`.word-card[data-id="${wordId}"]`);
        if (currentCard) {
            currentCard.classList.add('playing');
            currentCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Logic branching based on mode
        this.currentAudio = new Audio(word.audio);
        this.currentWordIndex = wordId;

        const onAudioEnd = () => {
            if (currentCard) currentCard.classList.remove('playing');

            if (this.currentMode === 'shadowing') {
                this.startRecording();
            } else if (this.isPlayingAll) {
                this.handleAutoNext();
            } else {
                this.resetPlayButton();
            }
        };

        this.currentAudio.addEventListener('canplaythrough', () => {
            this.currentAudio.play().catch(console.error);
            this.updateStatusText(word);
            document.getElementById('playPause').innerHTML = '<i class="fas fa-pause"></i>';
        });

        this.currentAudio.addEventListener('ended', onAudioEnd);

        this.currentAudio.volume = document.getElementById('volume').value / 100;

        if (userInitiated && this.isPlayingAll) {
            const idx = this.words.indexOf(word);
            if (idx !== -1) this.playAllQueue = this.words.slice(idx + 1).map(w => w.id);
        }
    }

    showQuizOverlay(word) {
        const overlay = document.getElementById('quizOverlay');
        const quizImage = document.getElementById('quizImage');
        const quizOptions = document.getElementById('quizOptions');
        const replayBtn = document.getElementById('replayAudio');

        quizImage.src = word.image;

        // Generate choices
        const choices = [word];
        const usedIds = new Set([word.id]);

        while (choices.length < 4) {
            const randomWord = this.words[Math.floor(Math.random() * this.words.length)];
            if (!usedIds.has(randomWord.id)) {
                choices.push(randomWord);
                usedIds.add(randomWord.id);
            }
        }
        choices.sort(() => Math.random() - 0.5);

        // Render options
        quizOptions.innerHTML = choices.map(c => `
            <button class="quiz-btn" data-word-id="${c.id}" data-correct-id="${word.id}">
                ${c.chinese}
            </button>
        `).join('');

        // Add click handlers
        quizOptions.querySelectorAll('.quiz-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const selectedId = parseInt(btn.dataset.wordId);
                const correctId = parseInt(btn.dataset.correctId);
                this.handleQuizAnswer(selectedId, correctId, btn, quizOptions);
            });
        });

        // Replay button handler
        replayBtn.onclick = () => {
            if (this.currentAudio) {
                this.currentAudio.currentTime = 0;
                this.currentAudio.play();
            }
        };

        // Finish quiz button handler
        const finishBtn = document.getElementById('finishQuiz');
        finishBtn.onclick = () => {
            this.stopPlayback();
        };

        overlay.classList.remove('hidden');

        this.currentAudio = new Audio(word.audio);
        this.currentAudio.play();
        this.currentWordIndex = word.id;
        this.updateStatusText(word, "Quiz: Listen and choose!");
    }

    handleQuizAnswer(selectedId, correctId, btnElement, quizContainer) {
        // Disable all buttons
        quizContainer.querySelectorAll('.quiz-btn').forEach(btn => {
            btn.disabled = true;
        });

        if (selectedId === correctId) {
            btnElement.classList.add('correct');
            this.quizCorrect++;
            document.getElementById('current-word').textContent = "✅ Correct!";
        } else {
            btnElement.classList.add('wrong');
            this.quizWrong++;
            // Highlight correct answer
            quizContainer.querySelectorAll('.quiz-btn').forEach(btn => {
                if (parseInt(btn.dataset.wordId) === correctId) {
                    btn.classList.add('correct');
                }
            });
            document.getElementById('current-word').textContent = "❌ Wrong!";
        }

        this.updateQuizScore();

        setTimeout(() => {
            document.getElementById('quizOverlay').classList.add('hidden');
            if (this.isPlayingAll) {
                this.playNextInQueue();
            } else {
                this.renderWords(); // Update score display
            }
        }, 2000);
    }

    startRecording() {
        if (!this.mediaRecorder) return;

        this.audioChunks = [];
        this.mediaRecorder.start();
        document.getElementById('current-word').textContent = "🎤 Recording...";

        setTimeout(() => {
            if (this.mediaRecorder.state === 'recording') {
                this.mediaRecorder.stop();
            }
        }, 3000);
    }

    playUserRecording() {
        if (!this.userAudio) return;

        document.getElementById('current-word').textContent = "▶️ Replaying your voice...";
        this.userAudio.play();
        this.userAudio.onended = () => {
            if (this.isPlayingAll) {
                this.handleAutoNext();
            } else {
                this.resetPlayButton();
            }
        };
    }

    handleAutoNext() {
        if (this.interactiveMode) {
            document.getElementById('current-word').textContent = "Press SPACE for next word...";
        } else {
            document.getElementById('current-word').textContent = "Waiting...";
            const delay = parseFloat(document.getElementById('playDelay').value) * 1000 || 3500;
            this.autoNextTimeout = setTimeout(() => {
                this.playNextInQueue();
            }, delay);
        }
    }

    resetPlayButton() {
        document.getElementById('playPause').innerHTML = '<i class="fas fa-play"></i>';
    }

    updateStatusText(word, overrideText = null) {
        if (overrideText) {
            document.getElementById('current-word').textContent = overrideText;
            return;
        }
        const modeText = this.currentMode.toUpperCase();
        document.getElementById('current-word').textContent = `Now playing: ${word.chinese} (${word.pinyin}) [${modeText}]`;
    }

    playAllWords() {
        if (this.words.length === 0) return;

        this.isPlayingAll = true;

        if (this.playAllQueue.length === 0) {
            // In quiz mode, shuffle the words
            if (this.currentMode === 'quiz') {
                const shuffled = [...this.words].sort(() => Math.random() - 0.5);
                this.playAllQueue = shuffled.map(w => w.id);
            } else {
                let startIdx = 0;
                if (this.currentWordIndex !== -1) {
                    const currentWordObj = this.words.find(w => w.id === this.currentWordIndex);
                    const idx = this.words.indexOf(currentWordObj);
                    if (idx !== -1) startIdx = idx;
                }
                this.playAllQueue = this.words.slice(startIdx).map(w => w.id);
            }
        }
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

    pausePlayback() {
        if (this.currentAudio) this.currentAudio.pause();
        if (this.userAudio) this.userAudio.pause();
        if (this.autoNextTimeout) {
            clearTimeout(this.autoNextTimeout);
            this.autoNextTimeout = null;
        }
        document.getElementById('playPause').innerHTML = '<i class="fas fa-play"></i>';
    }

    stopPlayback() {
        this.isPlayingAll = false;
        this.playAllQueue = [];
        this.pausePlayback();

        if (this.currentMode === 'shadowing' && this.mediaRecorder && this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.stop();
        }

        // Hide quiz overlay if visible
        document.getElementById('quizOverlay').classList.add('hidden');

        document.getElementById('current-word').textContent = 'Stopped';
        document.querySelectorAll('.word-card').forEach(card => {
            card.classList.remove('playing');
        });

        if (this.currentMode === 'quiz') this.renderWords();
    }

    toggleInteractiveMode() {
        this.interactiveMode = !this.interactiveMode;
        const btn = document.getElementById('interactiveMode');
        btn.classList.toggle('active');
    }

    setupEventListeners() {
        document.getElementById('learningMode').addEventListener('change', (e) => {
            this.setMode(e.target.value);
        });

        document.getElementById('hidePinyin').addEventListener('change', () => this.renderWords());
        document.getElementById('hideChinese').addEventListener('change', () => this.renderWords());

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

        document.getElementById('shuffle').addEventListener('click', () => {
            this.words.sort(() => Math.random() - 0.5);
            this.renderWords();
            this.stopPlayback();
            this.currentWordIndex = -1;
        });

        document.getElementById('interactiveMode').addEventListener('click', () => {
            this.toggleInteractiveMode();
        });

        document.getElementById('stop').addEventListener('click', () => this.stopPlayback());

        document.getElementById('prev').addEventListener('click', () => {
            const currentObj = this.words.find(w => w.id === this.currentWordIndex);
            const idx = this.words.indexOf(currentObj);
            if (idx !== -1 && idx > 0) this.playWord(this.words[idx - 1].id, true);
        });

        document.getElementById('playPause').addEventListener('click', () => {
            if ((this.currentAudio && !this.currentAudio.paused) || (this.userAudio && !this.userAudio.paused)) {
                this.pausePlayback();
            } else {
                if (this.currentAudio && this.currentAudio.paused && !this.userAudio) {
                    this.currentAudio.play();
                    document.getElementById('playPause').innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    this.playAllWords();
                }
            }
        });

        document.getElementById('next').addEventListener('click', () => {
            const currentObj = this.words.find(w => w.id === this.currentWordIndex);
            const idx = this.words.indexOf(currentObj);
            if (idx !== -1 && idx < this.words.length - 1) this.playWord(this.words[idx + 1].id, true);
        });

        document.getElementById('volume').addEventListener('input', (e) => {
            if (this.currentAudio) this.currentAudio.volume = e.target.value / 100;
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === ' ' && e.target === document.body) e.preventDefault();
            switch (e.key) {
                case ' ':
                    if (this.isPlayingAll && this.interactiveMode) this.playNextInQueue();
                    else document.getElementById('playPause').click();
                    break;
                case 'ArrowLeft': document.getElementById('prev').click(); break;
                case 'ArrowRight': document.getElementById('next').click(); break;
                case 'Escape': this.stopPlayback(); break;
            }
        });
    }

    updateWordCount(count = null) {
        document.getElementById('word-count').textContent = count !== null ? count : this.words.length;
    }
}

// Global instance
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new WordLearner();
});
