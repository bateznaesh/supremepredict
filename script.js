// JavaScript for Game Logic and Cheat Menu
let multiplier = 0;
let crashPoint = null;
let interval;
const multiplierDisplay = document.getElementById('multiplier');
const startButton = document.getElementById('start-button');
const adminButton = document.getElementById('admin-button');
const cheatMenu = document.getElementById('cheat-menu');
const cheatInput = document.getElementById('predetermined-crash');
const applyCheatButton = document.getElementById('apply-cheat');
const crashMessage = document.getElementById('crash-message'); // New crash message element

// Start the game on button click
startButton.addEventListener('click', () => {
    const selectedBookmaker = document.getElementById('bookmaker-select').value;
    if (!selectedBookmaker) {
        alert("Моля, изберете букмейкър!");
        return;
    }
    startGame();
});

// Function to start the game with animation
function startGame() {
    multiplier = 0.00;
    crashPoint = parseFloat(cheatInput.value) || Math.random() * 10 + 1; // Use cheat multiplier or random
    multiplierDisplay.innerHTML = `${multiplier.toFixed(2)}<span class="multiplier-x">x</span>`;
    crashMessage.innerHTML = ""; // Clear any previous crash message
    startButton.disabled = true;

    let timeElapsed = 0;
    const animationDuration = 3000; // 3 seconds
    const stepDuration = 50;

    interval = setInterval(() => {
        timeElapsed += stepDuration;
        multiplier += (crashPoint / (animationDuration / stepDuration));
        
        if (timeElapsed >= animationDuration || multiplier >= crashPoint) {
            clearInterval(interval);
            startButton.disabled = false;
            multiplierDisplay.innerHTML = `${crashPoint.toFixed(2)}<span class="multiplier-x">x</span>`;
            crashMessage.innerHTML = `Crash! Multiplier reached ${crashPoint.toFixed(2)}x`; // Display crash message
        } else {
            multiplierDisplay.innerHTML = `${multiplier.toFixed(2)}<span class="multiplier-x">x</span>`;
        }
    }, stepDuration);
}

// Toggle Cheat Menu visibility on Admin button click
adminButton.addEventListener('click', (e) => {
    e.preventDefault();
    cheatMenu.classList.toggle('hidden');
});

// Apply cheat on button click in cheat menu
applyCheatButton.addEventListener('click', () => {
    const cheatValue = parseFloat(cheatInput.value);
    if (isNaN(cheatValue) || cheatValue < 1) {
        alert("Please enter a valid crash multiplier.");
    } else {
        crashPoint = cheatValue;
        alert(`Next crash multiplier set to ${cheatValue}`);
        cheatMenu.classList.add('hidden');
    }
});