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
        
        this.init();
    }
    
    init() {
        this.loadWords();
        this.setupEventListeners();
        this.updateWordCount();
    }
    
    loadWords() {
        // Generate word data based on your file naming convention
        for (let i = 0; i < TOTAL_WORDS; i++) {
            const wordNumber = i.toString().padStart(3, '0');
            this.words.push({
                id: i,
                name: `Word ${i + 1}`, // You can replace with actual word names
                image: `images/${WORD_PREFIX}${wordNumber}${IMAGE_EXTENSION}`,
                audio: `audio/${WORD_PREFIX}${wordNumber}${AUDIO_EXTENSION}`,
                number: i + 1
            });
        }
        this.renderWords();
    }
    
    renderWords(filteredWords = null) {
        const wordsToRender = filteredWords || this.words;
        const container = document.getElementById('word-container');
        
        container.innerHTML = wordsToRender.map(word => `
            <div class="word-card" data-id="${word.id}">
                <img src="${word.image}" alt="${word.name}" class="word-image">
                <div class="word-info">
                    <h3>${word.name}</h3>
                    <p>Word #${word.number}</p>
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
                this.playWord(wordId);
            });
        });
    }
    
    playWord(wordId) {
        const word = this.words.find(w => w.id === wordId);
        if (!word) return;
        
        // Stop current audio
        if (this.currentAudio) {
            this.currentAudio.pause();
        }
        
        // Remove playing class from all cards
        document.querySelectorAll('.word-card').forEach(card => {
            card.classList.remove('playing');
        });
        
        // Add playing class to current card
        const currentCard = document.querySelector(`.word-card[data-id="${wordId}"]`);
        if (currentCard) {
            currentCard.classList.add('playing');
            currentCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        // Play audio
        this.currentAudio = new Audio(word.audio);
        this.currentWordIndex = wordId;
        
        this.currentAudio.addEventListener('canplaythrough', () => {
            this.currentAudio.play();
            document.getElementById('current-word').textContent = `Now playing: ${word.name}`;
        });
        
        this.currentAudio.addEventListener('ended', () => {
            if (currentCard) currentCard.classList.remove('playing');
            if (this.isPlayingAll) {
                this.playNextInQueue();
            }
        });
        
        // Set volume
        const volume = document.getElementById('volume').value / 100;
        this.currentAudio.volume = volume;
    }
    
    playAllWords() {
        this.isPlayingAll = true;
        this.playAllQueue = [...this.words].map(w => w.id);
        this.playNextInQueue();
    }
    
    playNextInQueue() {
        if (this.playAllQueue.length === 0) {
            this.isPlayingAll = false;
            document.getElementById('current-word').textContent = 'All words played!';
            return;
        }
        
        const nextWordId = this.playAllQueue.shift();
        this.playWord(nextWordId);
    }
    
    setupEventListeners() {
        // Search
        document.getElementById('search').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = this.words.filter(word => 
                word.name.toLowerCase().includes(searchTerm) ||
                word.number.toString().includes(searchTerm)
            );
            this.renderWords(filtered);
            this.updateWordCount(filtered.length);
        });
        
        // Shuffle
        document.getElementById('shuffle').addEventListener('click', () => {
            const shuffled = [...this.words].sort(() => Math.random() - 0.5);
            this.renderWords(shuffled);
        });
        
        // Play All
        document.getElementById('playAll').addEventListener('click', () => {
            this.playAllWords();
        });
        
        // Player controls
        document.getElementById('prev').addEventListener('click', () => {
            if (this.currentWordIndex > 0) {
                this.playWord(this.currentWordIndex - 1);
            }
        });
        
        document.getElementById('playPause').addEventListener('click', () => {
            if (this.currentAudio) {
                if (this.currentAudio.paused) {
                    this.currentAudio.play();
                    document.getElementById('playPause').innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    this.currentAudio.pause();
                    document.getElementById('playPause').innerHTML = '<i class="fas fa-play"></i>';
                }
            }
        });
        
        document.getElementById('next').addEventListener('click', () => {
            if (this.currentWordIndex < this.words.length - 1) {
                this.playWord(this.currentWordIndex + 1);
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
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    document.getElementById('playPause').click();
                    break;
                case 'ArrowLeft':
                    document.getElementById('prev').click();
                    break;
                case 'ArrowRight':
                    document.getElementById('next').click();
                    break;
                case 'Escape':
                    if (this.currentAudio) {
                        this.currentAudio.pause();
                        this.currentAudio.currentTime = 0;
                        document.querySelectorAll('.word-card').forEach(card => {
                            card.classList.remove('playing');
                        });
                    }
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
