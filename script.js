// Global variables
let userName = '';
let startDate = new Date('2024-01-01'); // You can customize this date

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    createFallingHearts();
    createFloatingEmojis();
    
    // Try to play background music (user interaction required)
    const bgMusic = document.getElementById('bgMusic');
    document.addEventListener('click', function() {
        bgMusic.play().catch(e => console.log('Music play failed:', e));
    }, { once: true });
});

// Create falling hearts background
function createFallingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartSymbols = ['💖', '💕', '💗', '💓', '💝', '❤️', '💜', '💙'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 5000);
    }, 300);
}

// Create floating emojis
function createFloatingEmojis() {
    const emojisContainer = document.getElementById('floatingEmojis');
    const emojis = ['😍', '🥰', '😘', '💋', '🌹', '🦋', '✨', '🌸'];
    
    setInterval(() => {
        const emoji = document.createElement('div');
        emoji.className = 'floating-emoji';
        emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.top = Math.random() * 100 + '%';
        emoji.style.animationDelay = Math.random() * 2 + 's';
        
        emojisContainer.appendChild(emoji);
        
        // Remove emoji after animation
        setTimeout(() => {
            if (emoji.parentNode) {
                emoji.parentNode.removeChild(emoji);
            }
        }, 4000);
    }, 1000);
}

// Start confession process
function startConfession() {
    showScreen('nameScreen');
    
    // Add typewriter effect to the question
    setTimeout(() => {
        const typewriterElement = document.querySelector('.typewriter');
        typewriterElement.style.animation = 'none';
        typewriterElement.style.borderRight = 'none';
        setTimeout(() => {
            typewriterElement.style.animation = 'typing 3s steps(20), blink-caret 0.75s step-end infinite';
        }, 100);
    }, 100);
}

// Show confession with name
function showConfession() {
    const nameInput = document.getElementById('nameInput');
    userName = nameInput.value.trim();
    
    if (!userName) {
        alert('Tolong masukkan nama dulu ya! 💕');
        return;
    }
    
    // Update the confession screen with user's name
    const dearName = document.getElementById('dearName');
    dearName.textContent = `Untuk ${userName} tersayang,`;
    
    // Set the love message with typewriter effect
    const loveMessage = document.getElementById('loveMessage');
    loveMessage.innerHTML = `
        <p>Aku sudah lama ingin mengatakannya, tapi baru sekarang aku punya keberanian...</p>
        <p>Setiap hari bersamamu adalah keajaiban. Senyummu membuat duniaku lebih cerah, dan kehadiranmu membuat hidupku lebih bermakna.</p>
        <p>Aku mencintaimu, ${userName}. Bukan hanya karena kecantikanmu, tapi karena siapa dirimu yang luar biasa.</p>
        <p>Maukah kamu menjadi bagian dari hidupku? ❤️</p>
    `;
    
    showScreen('confessionScreen');
}

// Show screen function
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.add('hidden'));
    
    // Show target screen
    document.getElementById(screenId).classList.remove('hidden');
}

// Handle Yes response
function showYesResponse() {
    showScreen('yesScreen');
    createConfetti();
    
    // Create celebration sound effect
    playNotificationSound();
}

// Handle No response with running button
function handleNoResponse() {
    const noBtn = document.getElementById('noBtn');
    const responses = [
        'Ayo dong... 🥺',
        'Yakin nggak? 😢',
        'Coba pikir lagi... 💔',
        'Jangan gitu dong... 😭',
        'Plisss... 🙏',
        'Aku serius lho... 💕'
    ];
    
    // Change button text randomly
    noBtn.textContent = responses[Math.floor(Math.random() * responses.length)];
    
    // Make button run away
    const randomX = Math.random() * (window.innerWidth - 200);
    const randomY = Math.random() * (window.innerHeight - 100);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '1000';
    
    // Reset button position after animation
    setTimeout(() => {
        noBtn.style.position = '';
        noBtn.style.left = '';
        noBtn.style.top = '';
        noBtn.style.zIndex = '';
        noBtn.textContent = 'Nggak 😅';
    }, 2000);
}

// Create confetti animation
function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#ff7675', '#fd79a8'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 4000);
        }, i * 20);
    }
}

// Play notification sound
function playNotificationSound() {
    // Create a simple beep sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Audio context not supported:', e);
    }
}

// Show gallery modal
function showGallery() {
    document.getElementById('galleryModal').classList.remove('hidden');
}

// Show days counter modal
function showDaysCounter() {
    updateDaysCounter();
    document.getElementById('daysModal').classList.remove('hidden');
}

// Show letter modal
function showLetter() {
    document.getElementById('letterModal').classList.remove('hidden');
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// Update days counter
function updateDaysCounter() {
    const now = new Date();
    const timeDiff = now.getTime() - startDate.getTime();
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    document.getElementById('daysCount').textContent = days;
    document.getElementById('hoursCount').textContent = hours;
    document.getElementById('minutesCount').textContent = minutes;
}

// Share to WhatsApp
function shareToWhatsApp() {
    const message = `💕 ${userName} sudah menerima ungkapan perasaanku! Kami sekarang bersama dan bahagia! ❤️`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Share to Instagram
function shareToInstagram() {
    // Since Instagram doesn't have direct sharing URL, we'll copy text to clipboard
    const message = `💕 ${userName} sudah menerima ungkapan perasaanku! Kami sekarang bersama dan bahagia! ❤️ #Love #Confession #Happy`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(message).then(() => {
            alert('Pesan sudah disalin! Sekarang buka Instagram dan paste di story atau post kamu! 💕');
        }).catch(() => {
            // Fallback for older browsers
            fallbackCopyTextToClipboard(message);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(message);
    }
}

// Fallback copy to clipboard
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        alert('Pesan sudah disalin! Sekarang buka Instagram dan paste di story atau post kamu! 💕');
    } catch (err) {
        alert('Gagal menyalin pesan. Silakan salin manual: ' + text);
    }
    
    document.body.removeChild(textArea);
}

// Handle Enter key in name input
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const nameInput = document.getElementById('nameInput');
        if (nameInput && !nameInput.classList.contains('hidden') && nameInput === document.activeElement) {
            showConfession();
        }
    }
});

// Close modals when clicking outside
window.addEventListener('click', function(e) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
});

// Prevent context menu for a more app-like experience
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Add some easter eggs
let clickCount = 0;
document.addEventListener('click', function() {
    clickCount++;
    if (clickCount === 50) {
        alert('Wow! Kamu sudah klik 50 kali! Kamu pasti sangat excited! 😄💕');
    }
});

// Konami code easter egg
let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            alert('🎉 KONAMI CODE! Kamu menemukan easter egg! Extra love untuk kamu! 💕✨');
            createConfetti();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});
