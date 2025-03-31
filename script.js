// DOM Elements
const saveBtn = document.getElementById('save-btn');
const usernameInput = document.getElementById('username');
const themeSelect = document.getElementById('theme');
const animatedBox = document.getElementById('animated-box');
const bounceBtn = document.getElementById('bounce-btn');
const spinBtn = document.getElementById('spin-btn');
const colorBtn = document.getElementById('color-btn');

// Load saved preferences
function loadPreferences() {
    const savedUsername = localStorage.getItem('username');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedUsername) {
        usernameInput.value = savedUsername;
    }
    
    if (savedTheme) {
        themeSelect.value = savedTheme;
        applyTheme(savedTheme);
    }
}

// Save preferences to localStorage
function savePreferences() {
    const username = usernameInput.value.trim();
    const theme = themeSelect.value;
    
    localStorage.setItem('username', username);
    localStorage.setItem('theme', theme);
    
    applyTheme(theme);
    
    // Show confirmation animation
    saveBtn.classList.add('pulse');
    setTimeout(() => {
        saveBtn.classList.remove('pulse');
    }, 2000);
}

// Apply selected theme
function applyTheme(theme) {
    document.body.className = '';
    document.body.classList.add(`${theme}-theme`);
}

// Animation functions
function triggerAnimation(animationClass) {
    // Reset any ongoing animations
    animatedBox.className = 'box';
    
    // Force reflow to restart animation
    void animatedBox.offsetWidth;
    
    // Add new animation class
    animatedBox.classList.add(animationClass);
    
    // Remove animation class after it completes
    const animationDuration = {
        'bounce': 1000,
        'spin': 1500,
        'color-change': 2000
    }[animationClass] || 0;
    
    setTimeout(() => {
        animatedBox.classList.remove(animationClass);
    }, animationDuration);
}

// Event Listeners
saveBtn.addEventListener('click', savePreferences);
bounceBtn.addEventListener('click', () => triggerAnimation('bounce'));
spinBtn.addEventListener('click', () => triggerAnimation('spin'));
colorBtn.addEventListener('click', () => triggerAnimation('color-change'));

// Initialize
loadPreferences();
