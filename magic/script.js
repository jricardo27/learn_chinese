// Configuration - Update these based on your files
const TOTAL_WORDS = 414; // Change this to your total number of words
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
            let data;
            if (typeof WORDS_DATA !== 'undefined') {
                data = WORDS_DATA;
            } else {
                const response = await fetch('all_words.json');
                data = await response.json();
            }

            this.words = [];

            for (let i = 0; i < TOTAL_WORDS; i++) {
                const wordNumber = i.toString().padStart(3, '0');
                const filename = `${WORD_PREFIX}${wordNumber}${IMAGE_EXTENSION}`;
                const wordData = data[filename];

                if (wordData) {
                    this.words.push({
                        id: i,
                        chinese: wordData.hanzi,
                        pinyin: wordData.pinyin,
                        english: wordData.english,
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
                        english: "",
                        image: `images/${filename}`,
                        audio: `audio/${WORD_PREFIX}${wordNumber}${AUDIO_EXTENSION}`,
                        number: i + 1,
                        filename: filename
                    });
                }
            }
            this.renderHome();
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
        this.renderHome();
        this.updateWordCount();
    }

    setMode(mode) {
        if (mode === 'home') {
            this.renderHome();
            return;
        }

        this.currentMode = mode;
        this.currentWordIndex = -1;
        this.stopPlayback();

        // UI transitions
        document.getElementById('home-screen').style.display = 'none';
        document.getElementById('word-container').classList.remove('hidden');
        document.getElementById('goHome').style.visibility = 'visible';

        // Sync Dropdown
        const dropdown = document.getElementById('learningMode');
        if (dropdown) dropdown.value = mode;

        if (mode === 'quiz') {
            this.quizCorrect = 0;
            this.quizWrong = 0;
            this.updateQuizScore();
        }

        if (mode === 'recall') {
            document.getElementById('hidePinyin').checked = true;
            document.getElementById('hideChinese').checked = true;
        }

        if (mode === 'shadowing') {
            this.initVoiceRecorder();
        }

        this.renderWords();
    }

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
            // Don't alert, just update status in UI if needed
        }
    }

    updateQuizScore() {
        document.getElementById('correctCount').textContent = this.quizCorrect;
        document.getElementById('wrongCount').textContent = this.quizWrong;
        // Also update live score in quiz overlay
        document.getElementById('liveCorrectCount').textContent = this.quizCorrect;
        document.getElementById('liveWrongCount').textContent = this.quizWrong;
    }

    renderHome() {
        this.currentMode = 'home';
        this.stopPlayback(); // Stops audio and hides overlays

        document.getElementById('home-screen').style.display = 'block';
        document.getElementById('word-container').classList.add('hidden');

        const homeBtn = document.getElementById('goHome');
        if (homeBtn) homeBtn.style.visibility = 'hidden';
    }

    renderWords(filteredWords = null) {
        const wordsToRender = filteredWords || this.words;
        const container = document.getElementById('word-container');

        // Check if we should show mode welcome screen
        // If we are at index -1 (start of session) and not searching
        if (this.currentMode !== 'home' && this.currentWordIndex === -1 && !filteredWords) {
            container.style.display = 'block';
            const modeConfig = {
                'quiz': { title: 'Quiz Mode', icon: 'fa-vial', desc: 'Test your knowledge with 414 words.' },
                'recall': { title: 'Recall Mode', icon: 'fa-brain', desc: 'Hide Chinese or Pinyin to practice your memory.' },
                'shadowing': { title: 'Shadowing Mode', icon: 'fa-microphone', desc: 'Listen and record yourself to perfect your accent.' },
                'standard': { title: 'Standard Mode', icon: 'fa-book-open', desc: 'Traditional flashcard style learning.' }
            };

            const config = modeConfig[this.currentMode];
            container.innerHTML = `
                <div class="welcome-screen" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; text-align: center; background: #fdfbff; border-radius: 30px; box-shadow: inset 0 0 50px rgba(74,0,224,0.02);">
                    <div style="width: 120px; height: 120px; background: rgba(74,0,224,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 30px;">
                        <i class="fas ${config.icon}" style="font-size: 3.5em; color: #4a00e0;"></i>
                    </div>
                    <h2 style="font-size: 3em; color: #333; margin-bottom: 15px;">${config.title}</h2>
                    <p style="font-size: 1.2em; color: #666; max-width: 500px; margin-bottom: 40px;">${config.desc}</p>
                    <button id="startSessionBtn" style="background: linear-gradient(135deg, #4a00e0 0%, #8e2de2 100%); color: white; border: none; padding: 18px 50px; border-radius: 50px; font-size: 1.3em; font-weight: bold; cursor: pointer; transition: all 0.3s; box-shadow: 0 10px 25px rgba(74,0,224,0.3);">
                        <i class="fas fa-play" style="margin-right: 12px;"></i> Start Session
                    </button>
                    <button id="showGridBtn" style="margin-top: 20px; background: none; border: none; color: #4a00e0; font-weight: 600; cursor: pointer; text-decoration: underline;">Or browse word list first</button>
                </div>
            `;

            document.getElementById('startSessionBtn').onclick = () => {
                this.currentWordIndex = 0;
                this.playWord(this.words[0].id, true);
            };
            document.getElementById('showGridBtn').onclick = () => {
                this.currentWordIndex = -2; // Special state to skip welcome screen
                this.renderWords();
            };
            return;
        }

        container.style.display = 'grid';
        container.innerHTML = wordsToRender.map(word => {
            let blurPinyin = this.currentMode === 'recall' && document.getElementById('hidePinyin').checked ? 'blur-text' : '';
            let blurChinese = this.currentMode === 'recall' && document.getElementById('hideChinese').checked ? 'blur-text' : '';

            return `
                <div class="word-card" data-id="${word.id}">
                    <div class="word-number">#${word.number}</div>
                    <img src="${word.image}" alt="Word Image" class="word-image">
                    <div class="word-info">
                        <h3 class="${blurChinese}">${word.chinese}</h3>
                        <p class="pinyin ${blurPinyin}">${word.pinyin}</p>
                        <p class="english">${word.english || ''}</p>
                    </div>
                </div>
            `
        }).join('');

        // Card Listeners
        document.querySelectorAll('.word-card').forEach(card => {
            card.addEventListener('click', () => {
                const wordId = parseInt(card.dataset.id);
                if (this.currentMode === 'recall') {
                    card.classList.toggle('revealed');
                }
                this.playWord(wordId, true);
            });
        });
    }

    async playWord(wordId, userInitiated = false, autoPlay = false) {
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

        // Mode-specific overlays
        if (this.currentMode === 'quiz') {
            this.showQuizOverlay(word);
            return;
        }
        if (this.currentMode === 'recall') {
            this.showRecallOverlay(word);
            return;
        }
        if (this.currentMode === 'shadowing') {
            this.showShadowingOverlay(word, userInitiated || autoPlay);
            return;
        }
        if (this.currentMode === 'standard') {
            this.showStandardOverlay(word, userInitiated || autoPlay);
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
            const btn = document.getElementById('playPause');
            if (btn) btn.innerHTML = '<i class="fas fa-pause"></i>';
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

    showRecallOverlay(word) {
        const overlay = document.getElementById('recallOverlay');
        const recallCard = overlay.querySelector('.recall-card');
        const recallImage = document.getElementById('recallImage');
        const chineseDiv = document.getElementById('recallChinese');
        const pinyinDiv = document.getElementById('recallPinyin');
        const englishDiv = document.getElementById('recallEnglish');

        // Reset state
        recallCard.classList.remove('revealed');
        this.currentWordIndex = word.id;

        // Settings-based blur
        chineseDiv.classList.remove('blur-text');
        pinyinDiv.classList.remove('blur-text');
        if (englishDiv) englishDiv.classList.remove('blur-text');

        if (document.getElementById('hideChinese').checked) chineseDiv.classList.add('blur-text');
        if (document.getElementById('hidePinyin').checked) pinyinDiv.classList.add('blur-text');
        if (englishDiv && document.getElementById('hideChinese').checked) englishDiv.classList.add('blur-text');

        // Set content
        recallImage.src = word.image;
        chineseDiv.textContent = word.chinese || '???';
        pinyinDiv.textContent = word.pinyin || 'Unknown';
        if (englishDiv) englishDiv.textContent = word.english || '';

        // Handlers
        document.getElementById('recallReveal').onclick = () => {
            recallCard.classList.add('revealed');
            const audio = new Audio(word.audio);
            audio.play();
        };

        document.getElementById('recallNext').onclick = () => {
            // Find current word index in array
            const currentIdx = this.words.findIndex(w => w.id === word.id);
            if (currentIdx !== -1 && currentIdx < this.words.length - 1) {
                this.playWord(this.words[currentIdx + 1].id);
            }
        };

        document.getElementById('recallPrev').onclick = () => {
            // Find current word index in array
            const currentIdx = this.words.findIndex(w => w.id === word.id);
            if (currentIdx !== -1 && currentIdx > 0) {
                this.playWord(this.words[currentIdx - 1].id);
            }
        };

        document.getElementById('finishRecall').onclick = () => {
            this.stopPlayback();
        };

        overlay.classList.remove('hidden');
        this.updateStatusText(word, "Recall: Try to remember before revealing!");
    }

    showShadowingOverlay(word, autoPlay = false) {
        const overlay = document.getElementById('shadowingOverlay');
        const shadowingImage = document.getElementById('shadowingImage');
        const chineseDiv = document.getElementById('shadowingChinese');
        const pinyinDiv = document.getElementById('shadowingPinyin');
        const englishDiv = document.getElementById('shadowingEnglish');
        const statusDiv = document.getElementById('shadowingStatus');
        const playBtn = document.getElementById('shadowingPlay');
        const recordBtn = document.getElementById('shadowingRecord');
        const pauseBtn = document.getElementById('shadowingPause');
        const autoRecordCheckbox = document.getElementById('autoRecord');
        const autoContinueCheckbox = document.getElementById('autoContinue');

        this.currentWordIndex = word.id;
        this.shadowingState = 'idle';

        // Set content
        shadowingImage.src = word.image;
        chineseDiv.textContent = word.chinese || '???';
        pinyinDiv.textContent = word.pinyin || 'Unknown';
        if (englishDiv) englishDiv.textContent = word.english || '';

        // Initial Status
        if (autoPlay) {
            statusDiv.innerHTML = '<i class="fas fa-sync"></i> Auto-continuing...';
            statusDiv.className = 'shadowing-status playing';
        } else {
            statusDiv.innerHTML = '<i class="fas fa-info-circle"></i> Ready to practice';
            statusDiv.className = 'shadowing-status';
        }

        // Logic for Start/Pause button state
        const updatePlayButton = () => {
            if (autoContinueCheckbox.checked) {
                if (this.shadowingLoopActive) {
                    playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Practice';
                    playBtn.className = 'pause-btn'; // Re-use pause style
                    playBtn.style.background = 'linear-gradient(135deg, #ffa500 0%, #ff8c00 100%)';
                } else {
                    playBtn.innerHTML = '<i class="fas fa-play"></i> Start Practice';
                    playBtn.className = 'replay-btn';
                    playBtn.style.background = ''; // Reset to default
                }
            } else {
                playBtn.innerHTML = '<i class="fas fa-play"></i> Play Audio';
                playBtn.className = 'replay-btn';
                playBtn.style.background = '';
                this.shadowingLoopActive = false; // Disable loop if unchecked
            }
        };

        // Show/hide buttons based on settings
        const updateButtonVisibility = () => {
            updatePlayButton();
            if (autoRecordCheckbox.checked) {
                recordBtn.style.display = 'none';
                pauseBtn.style.display = 'none';
            } else {
                recordBtn.style.display = this.shadowingState === 'idle' ? 'block' : 'none';
                pauseBtn.style.display = this.shadowingState === 'recording' ? 'block' : 'none';
            }
        };

        const playAudioSequence = () => {
            statusDiv.innerHTML = '<i class="fas fa-volume-up"></i> Playing native audio...';
            statusDiv.className = 'shadowing-status playing';

            const audio = new Audio(word.audio);
            this.currentAudio = audio; // Track to stop if needed
            audio.play();

            audio.onended = () => {
                this.currentAudio = null;
                if (autoRecordCheckbox.checked) {
                    setTimeout(() => this.startShadowingRecording(word, statusDiv, updateButtonVisibility), 500);
                } else {
                    statusDiv.innerHTML = '<i class="fas fa-microphone"></i> Click Record when ready';
                    statusDiv.className = 'shadowing-status';
                    this.shadowingLoopActive = false; // Break loop if manual record
                    updateButtonVisibility();
                }
            };
        };

        // Play Loop / Start Handler
        playBtn.onclick = () => {
            if (autoContinueCheckbox.checked) {
                if (this.shadowingLoopActive) {
                    // Pause requested
                    this.shadowingLoopActive = false;
                    this.stopPlayback(false); // Stop audio/recording but keep overlay
                    updateButtonVisibility();
                    statusDiv.innerHTML = '<i class="fas fa-pause-circle"></i> Paused';
                } else {
                    // Start requested
                    this.shadowingLoopActive = true;
                    updateButtonVisibility();
                    playAudioSequence();
                }
            } else {
                // Standard Play
                playAudioSequence();
            }
        };

        // Manual record button
        recordBtn.onclick = () => {
            this.startShadowingRecording(word, statusDiv, updateButtonVisibility);
        };

        // Pause recording button
        pauseBtn.onclick = () => {
            if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
                this.mediaRecorder.stop();
                updateButtonVisibility();
            }
        };

        // Settings Listeners
        autoRecordCheckbox.onchange = updateButtonVisibility;
        autoContinueCheckbox.onchange = updateButtonVisibility;

        // Navigation (Breaks loop)
        const handleNav = (nextId) => {
            this.shadowingLoopActive = false;
            this.playWord(nextId);
        };

        document.getElementById('shadowingNext').onclick = () => {
            const currentIdx = this.words.findIndex(w => w.id === word.id);
            if (currentIdx < this.words.length - 1) handleNav(this.words[currentIdx + 1].id);
        };

        document.getElementById('shadowingPrev').onclick = () => {
            const currentIdx = this.words.findIndex(w => w.id === word.id);
            if (currentIdx > 0) handleNav(this.words[currentIdx - 1].id);
        };

        document.getElementById('finishShadowing').onclick = () => {
            this.shadowingLoopActive = false;
            this.stopPlayback();
        };

        updateButtonVisibility();
        overlay.classList.remove('hidden');
        this.updateStatusText(word, "Shadowing: Listen, then repeat!");

        if (autoPlay) {
            setTimeout(playAudioSequence, 100);
        }
    }

    startShadowingRecording(word, statusDiv, updateButtonVisibility) {
        if (!this.mediaRecorder) {
            statusDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Microphone not available';
            statusDiv.className = 'shadowing-status';
            return;
        }

        this.shadowingState = 'recording';
        this.audioChunks = [];
        this.mediaRecorder.start();

        statusDiv.innerHTML = '<i class="fas fa-microphone"></i> 🔴 Recording... (3 seconds)';
        statusDiv.className = 'shadowing-status recording';
        updateButtonVisibility();

        setTimeout(() => {
            if (this.mediaRecorder.state === 'recording') {
                this.mediaRecorder.stop();
                this.shadowingState = 'playback';
                statusDiv.innerHTML = '<i class="fas fa-headphones"></i> Playing your recording...';
                statusDiv.className = 'shadowing-status playing';
                updateButtonVisibility();

                // Check for auto-continue
                const autoContinue = document.getElementById('autoContinue');
                if (autoContinue && autoContinue.checked) {
                    setTimeout(() => {
                        const currentIdx = this.words.findIndex(w => w.id === word.id);
                        if (currentIdx !== -1 && currentIdx < this.words.length - 1) {
                            this.playWord(this.words[currentIdx + 1].id, false, true);
                        } else {
                            // If last word, stop loop
                            this.shadowingLoopActive = false;
                            statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> Practice complete!';
                            statusDiv.className = 'shadowing-status';
                            updateButtonVisibility();
                        }
                    }, 3500); // Wait for playback + buffer
                }
            }
        }, 3000);
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

    showStandardOverlay(word, autoPlay = false) {
        const overlay = document.getElementById('standardOverlay');
        const img = document.getElementById('standardImage');
        const chinese = document.getElementById('standardChinese');
        const pinyin = document.getElementById('standardPinyin');
        const english = document.getElementById('standardEnglish');
        const playBtn = document.getElementById('standardPlay');
        const autoContinue = document.getElementById('standardAutoContinue');

        this.currentWordIndex = word.id;

        img.src = word.image;
        chinese.textContent = word.chinese;
        pinyin.textContent = word.pinyin;
        if (english) english.textContent = word.english || '';

        const updatePlayButton = () => {
            if (autoContinue.checked) {
                if (this.standardLoopActive) {
                    playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
                    // Apply pause styling
                    playBtn.className = 'pause-btn';
                    playBtn.style.background = 'linear-gradient(135deg, #ffa500 0%, #ff8c00 100%)';
                } else {
                    playBtn.innerHTML = '<i class="fas fa-play"></i> Start';
                    playBtn.className = 'replay-btn';
                    playBtn.style.background = '';
                }
            } else {
                playBtn.innerHTML = '<i class="fas fa-play"></i> Play Audio';
                playBtn.className = 'replay-btn';
                playBtn.style.background = '';
                this.standardLoopActive = false;
            }
        };

        const playAudio = () => {
            const audio = new Audio(word.audio);
            this.currentAudio = audio;
            audio.play();

            audio.onended = () => {
                this.currentAudio = null;
                if (this.standardLoopActive && autoContinue.checked) {
                    const delay = parseFloat(document.getElementById('playDelay').value) * 1000 || 2000;
                    setTimeout(() => {
                        if (this.standardLoopActive) {
                            const currentIdx = this.words.findIndex(w => w.id === word.id);
                            if (currentIdx !== -1 && currentIdx < this.words.length - 1) {
                                this.playWord(this.words[currentIdx + 1].id, false, true);
                            } else {
                                this.standardLoopActive = false;
                                updatePlayButton();
                            }
                        }
                    }, delay);
                } else {
                    // If manual play, just stop (don't break loop variable if just checking audio)
                    // But here if loop was NOT active, we stay inactive.
                    updatePlayButton();
                }
            };
        };

        playBtn.onclick = () => {
            if (autoContinue.checked) {
                if (this.standardLoopActive) {
                    this.standardLoopActive = false;
                    this.stopPlayback(false);
                    updatePlayButton();
                } else {
                    this.standardLoopActive = true;
                    updatePlayButton();
                    playAudio();
                }
            } else {
                playAudio();
            }
        };

        autoContinue.onchange = updatePlayButton;

        // Navigation
        const handleNav = (nextId) => {
            this.standardLoopActive = false;
            this.playWord(nextId);
        };
        document.getElementById('standardNext').onclick = () => {
            const currentIdx = this.words.findIndex(w => w.id === word.id);
            if (currentIdx < this.words.length - 1) handleNav(this.words[currentIdx + 1].id);
        };
        document.getElementById('standardPrev').onclick = () => {
            const currentIdx = this.words.findIndex(w => w.id === word.id);
            if (currentIdx > 0) handleNav(this.words[currentIdx - 1].id);
        };
        document.getElementById('finishStandard').onclick = () => {
            this.standardLoopActive = false;
            this.stopPlayback();
        };

        updatePlayButton();
        overlay.classList.remove('hidden');
        this.updateStatusText(word, "Standard View");

        if (autoPlay) {
            setTimeout(playAudio, 100);
        }
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
        const btn = document.getElementById('playPause');
        if (btn) btn.innerHTML = '<i class="fas fa-play"></i>';
        this.isPlayingAll = false;
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
            // Shuffle words for all modes to improve learning
            const shuffled = [...this.words].sort(() => Math.random() - 0.5);
            this.playAllQueue = shuffled.map(w => w.id);
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
        const btn = document.getElementById('playPause');
        if (btn) btn.innerHTML = '<i class="fas fa-play"></i>';
    }

    stopPlayback(hideOverlays = true) {
        this.isPlayingAll = false;
        this.playAllQueue = [];
        this.pausePlayback();

        if (this.currentMode === 'shadowing' && this.mediaRecorder && this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.stop();
        }

        // Hide overlays if visible and requested
        if (hideOverlays) {
            document.getElementById('quizOverlay').classList.add('hidden');
            document.getElementById('recallOverlay').classList.add('hidden');
            document.getElementById('shadowingOverlay').classList.add('hidden');
            document.getElementById('standardOverlay').classList.add('hidden');
        }

        document.getElementById('current-word').textContent = 'Stopped';
        document.querySelectorAll('.word-card').forEach(card => {
            card.classList.remove('playing');
        });

        if (this.currentMode === 'quiz' && hideOverlays) this.renderWords();
    }

    toggleInteractiveMode() {
        this.interactiveMode = !this.interactiveMode;
    }

    setupEventListeners() {
        // Mode State
        const modeSelect = document.getElementById('learningMode');
        if (modeSelect) modeSelect.onchange = (e) => this.setMode(e.target.value);

        document.getElementById('goHome').onclick = () => this.setMode('home');

        document.getElementById('hidePinyin').addEventListener('change', () => this.renderWords());
        document.getElementById('hideChinese').addEventListener('change', () => this.renderWords());

        // Player Controls
        document.getElementById('playPause').onclick = () => this.togglePlayback();
        document.getElementById('stop').onclick = () => this.stopPlayback();
        document.getElementById('prev').onclick = () => {
            const newIndex = Math.max(0, this.currentWordIndex - 1);
            this.playWord(newIndex, true);
        };
        document.getElementById('next').onclick = () => {
            const newIndex = Math.min(this.words.length - 1, this.currentWordIndex + 1);
            this.playWord(newIndex, true);
        };

        // Interactive Loop
        document.getElementById('interactiveMode').onclick = () => this.toggleInteractiveMode();

        // Volume
        const volumeSlider = document.getElementById('volume');
        volumeSlider.addEventListener('input', (e) => {
            if (this.currentAudio) this.currentAudio.volume = e.target.value / 100;
        });

        // Search
        document.getElementById('search').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = this.words.filter(word =>
                word.chinese.includes(searchTerm) ||
                word.pinyin.toLowerCase().includes(searchTerm)
            );
            this.renderWords(filtered);
        });

        document.getElementById('shuffle').addEventListener('click', () => {
            this.words.sort(() => Math.random() - 0.5);
            this.renderWords();

            // If overlay is open, jump to the new first word
            const overlays = ['standardOverlay', 'shadowingOverlay', 'recallOverlay', 'quizOverlay'];
            const visibleOverlay = overlays.find(id => !document.getElementById(id).classList.contains('hidden'));
            if (visibleOverlay && this.words.length > 0) {
                this.playWord(this.words[0].id, true);
            }
        });

        // Keyboard Shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;

            switch (e.key) {
                case ' ': // Space triggers play/action
                    e.preventDefault();
                    if (this.currentMode === 'home') return;

                    // If an overlay is active, trigger its specific play button
                    if (!document.getElementById('standardOverlay').classList.contains('hidden')) {
                        document.getElementById('standardPlay').click();
                    } else if (!document.getElementById('shadowingOverlay').classList.contains('hidden')) {
                        document.getElementById('shadowingPlay').click();
                    } else if (!document.getElementById('recallOverlay').classList.contains('hidden')) {
                        document.getElementById('recallReveal').click();
                    } else if (!document.getElementById('quizOverlay').classList.contains('hidden')) {
                        // In quiz, space might not have a default action or pick first?
                    } else {
                        // Global toggle
                        this.togglePlayback();
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

    togglePlayback() {
        this.isPlayingAll = !this.isPlayingAll;
        const btn = document.getElementById('playPause');
        if (this.isPlayingAll) {
            btn.innerHTML = '<i class="fas fa-pause"></i>';
            if (this.currentWordIndex === -1) this.currentWordIndex = 0;
            this.playWord(this.currentWordIndex);
        } else {
            btn.innerHTML = '<i class="fas fa-play"></i>';
            this.pausePlayback();
        }
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
