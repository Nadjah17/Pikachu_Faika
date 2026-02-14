// Data & Config
const pikachuMsgs = [
    "« Pikaaa 💕 Tu me manques »",
    "« Ton copain pense à toi très fort »",
    "« Je suis ton doudou, même à distance »",
    "« Crois en toi, tu es géniale ! »",
    "« Pika Pika ! (Je t'aime) »"
];

const dailyMsgs = [
    "« Bois de l’eau et pense à lui 💧 »",
    "« Tu es la plus précieuse 💛 »",
    "« Pikachu veille sur toi »",
    "« Il te choisit tous les jours »",
    "« Prends soin de toi aujourd'hui »",
    "« Regarde le ciel, il regarde le même »"
];

// Elements
const sections = document.querySelectorAll('section');
const pikachuImg = document.getElementById('pikachu-img');
const pikachuMsg = document.getElementById('pikachu-msg');
const heartsContainer = document.getElementById('hearts-container');
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
const themeBtn = document.getElementById('theme-btn');
const hugArmsElement = document.querySelector('#hug-pikachu .hug-arms');

// State
let musicPlaying = false;
let isDarkMode = false;
let hugArmTimer;

// Router Function
function router(sectionId) {
    sections.forEach(sec => {
        sec.classList.add('hidden');
        sec.classList.remove('active');
    });
    
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');
    }

    // Specific logic per section
    if (sectionId === 'miss-you') {
        updateMissYouMessage();
    }
    if (sectionId === 'hug') {
        animateHugArms();
    }
}

function animateHugArms() {
    if (!hugArmsElement) return;

    hugArmsElement.classList.remove('hugging');
    void hugArmsElement.offsetWidth;
    hugArmsElement.classList.add('hugging');

    clearTimeout(hugArmTimer);
    hugArmTimer = setTimeout(() => {
        hugArmsElement.classList.remove('hugging');
    }, 1100);
}

// Pikachu Interaction (Home)
if (pikachuImg) {
    pikachuImg.addEventListener('click', () => {
        // Change message
        const randomMsg = pikachuMsgs[Math.floor(Math.random() * pikachuMsgs.length)];
        pikachuMsg.textContent = randomMsg;
        
        // Animation
        pikachuImg.parentElement.classList.remove('bounce');
        void pikachuImg.parentElement.offsetWidth; // Trigger reflow
        pikachuImg.parentElement.classList.add('bounce');

        createHeart(window.innerWidth / 2, window.innerHeight / 2);
    });
}

// Hug Feature
function sendHug() {
    const hugMsg = document.getElementById('hug-msg');
    const msgs = [
        "« Tu es en sécurité ici »",
        "« Même loin, je te serre fort »",
        "« Il t’aime plus que tout »",
        "« Respire, tout va bien aller »"
    ];
    hugMsg.textContent = msgs[Math.floor(Math.random() * msgs.length)];
    
    // Re-trigger animation
    const imgContainer = document.querySelector('#hug .pikachu-container');
    imgContainer.classList.remove('zoom-in');
    void imgContainer.offsetWidth;
    imgContainer.classList.add('zoom-in');

    for(let i=0; i<5; i++) {
        setTimeout(() => {
            createHeart(window.innerWidth / 2 + (Math.random()*100 - 50), window.innerHeight / 2 + (Math.random()*100 - 50));
        }, i * 200);
    }

    animateHugArms();
}

// Daily Message
function newDailyMessage() {
    const msgBox = document.getElementById('daily-msg');
    msgBox.textContent = dailyMsgs[Math.floor(Math.random() * dailyMsgs.length)];
}

// Miss You Logic (Time based)
function updateMissYouMessage() {
    const hour = new Date().getHours();
    const msgBox = document.getElementById('time-based-msg');
    const title = document.getElementById('miss-you-title');
    const missYouImg = document.getElementById('miss-you-img');

    if (hour >= 6 && hour < 12) {
        title.textContent = "Bon matin Faika ☀";
        msgBox.textContent = "« Passe une belle journée, il pense à toi en se levant. »";
        missYouImg.src = "assets/pikachu_happy.png";
    } else if (hour >= 12 && hour < 21) {
        title.textContent = "Courage pour ta journée 💪";
        msgBox.textContent = "« Il est fier de tout ce que tu fais. »";
        missYouImg.src = "assets/pikachu_happy.png";
    } else {
        title.textContent = "Bonne nuit Faika 🌙";
        msgBox.textContent = "« Même quand tu dors, il t’aime. Fais de beaux rêves. »";
        missYouImg.src = "assets/pikachu_sleep.png";
    }
}

// Floating Hearts
function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 2000);
}

document.addEventListener('click', (e) => {
    createHeart(e.clientX, e.clientY);
});

// Controls
musicBtn.addEventListener('click', () => {
    if (musicPlaying) {
        bgMusic.pause();
        musicBtn.textContent = "🎵";
    } else {
        bgMusic.play();
        musicBtn.textContent = "🔊";
    }
    musicPlaying = !musicPlaying;
});

themeBtn.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    themeBtn.textContent = isDarkMode ? "☀" : "🌙";
});

// Initialize
newDailyMessage();

function tryAutoPlayMusic() {
    if (!bgMusic) return;

    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            musicPlaying = true;
            musicBtn.textContent = "🔊";
        }).catch(() => {
            musicPlaying = false;
            musicBtn.textContent = "🎵";
        });
    } else {
        musicPlaying = true;
        musicBtn.textContent = "🔊";
    }
}

tryAutoPlayMusic();
