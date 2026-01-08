// Создание снежинок
const snowflakesContainer = document.getElementById('snowflakes');
const snowflakeChars = ['❄', '❅', '❆'];

for (let i = 0; i < 100; i++) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.textContent = snowflakeChars[Math.floor(Math.random() * 3)];
    snowflake.style.left = Math.random() * 100 + '%';
    snowflake.style.fontSize = (0.5 + Math.random() * 1) + 'em';
    snowflake.style.animationDuration = (3 + Math.random() * 4) + 's';
    snowflake.style.animationDelay = Math.random() * 5 + 's';
    snowflakesContainer.appendChild(snowflake);
}

// Параллакс эффект
const bgLayer = document.getElementById('bg-layer');

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    bgLayer.style.transform = `translate(${x}px, ${y}px)`;
});

const clicker = document.getElementById('clicker');
const clicksDisplay = document.getElementById('clicks');
const winContainer = document.getElementById('win-container');
const star1 = document.getElementById('star1');
const star2 = document.getElementById('star2');
const star3 = document.getElementById('star3');
const winStar1 = document.getElementById('win-star1');
const winStar2 = document.getElementById('win-star2');
const winStar3 = document.getElementById('win-star3');
const timerDisplay = document.getElementById('timer');
const bestTimeDisplay = document.getElementById('best-time');
const startScreen = document.getElementById('start-screen');
const level1Btn = document.getElementById('level1-btn');
const level2Btn = document.getElementById('level2-btn');
const dlcBtn = document.getElementById('dlc-btn');
const dlcScreen = document.getElementById('dlc-screen');
const dlcLevel1Btn = document.getElementById('dlc-level1-btn');
const dlcLevel2Btn = document.getElementById('dlc-level2-btn');
const dlcLevel3Btn = document.getElementById('dlc-level3-btn');
const dlcBackBtn = document.getElementById('dlc-back-btn');
const menuBtn = document.getElementById('menu-btn');
const nextLevelBtn = document.getElementById('next-level-btn');
const gameUI = document.getElementById('game-ui');
const finishImg = document.getElementById('finish-img');
const pauseBtn = document.getElementById('pause-btn');
const pauseMenu = document.getElementById('pause-menu');
const resumeBtn = document.getElementById('resume-btn');
const restartBtn = document.getElementById('restart-btn');
const pauseMenuBtn = document.getElementById('pause-menu-btn');
const winGif = document.getElementById('win-gif');
const loseContainer = document.getElementById('lose-container');
const loseTimeDisplay = document.getElementById('lose-time-display');
const loseMenuBtn = document.getElementById('lose-menu-btn');
const retryBtn = document.getElementById('retry-btn');
const volumeSlider = document.getElementById('volume-slider');
const muteBtn = document.getElementById('mute-btn');
const menuVolumeSlider = document.getElementById('menu-volume-slider');
const menuMuteBtn = document.getElementById('menu-mute-btn');
const sfxSlider = document.getElementById('sfx-slider');
const sfxMuteBtn = document.getElementById('sfx-mute-btn');
const menuSfxSlider = document.getElementById('menu-sfx-slider');
const menuSfxMuteBtn = document.getElementById('menu-sfx-mute-btn');
const bonusRewardBtn = document.getElementById('bonus-reward-btn');
const bonusFullscreen = document.getElementById('bonus-fullscreen');
const bonusMenuBtn = document.getElementById('bonus-menu-btn');

// Музыка
const bgMusic = new Audio('хем.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.5;

const menuMusic = new Audio('ттк.mp3');
menuMusic.loop = true;
menuMusic.volume = 0.5;

const clickSound = new Audio('хлопок.mp3');
clickSound.volume = 0.5;

// Предзагрузка звуков для уменьшения задержки
const preloadedClickSounds = [];
const preloadedLevelSounds = [];
const SOUND_POOL_SIZE = 5;

for (let i = 0; i < SOUND_POOL_SIZE; i++) {
    const clickAudio = new Audio('хлопок.mp3');
    clickAudio.preload = 'auto';
    preloadedClickSounds.push(clickAudio);
    
    const levelAudio = new Audio('ня.mp3');
    levelAudio.preload = 'auto';
    preloadedLevelSounds.push(levelAudio);
}

let clickSoundIndex = 0;
let levelSoundIndex = 0;

// Функция воспроизведения звука клика (использует пул предзагруженных звуков)
function playClickSound() {
    if (isSfxMuted) return;
    const sound = preloadedClickSounds[clickSoundIndex];
    sound.volume = currentSfxVolume;
    sound.currentTime = 0;
    sound.play().catch(() => {});
    clickSoundIndex = (clickSoundIndex + 1) % SOUND_POOL_SIZE;
}

// Функция воспроизведения звука выбора уровня
function playLevelSelectSound() {
    if (isSfxMuted) return;
    const sound = preloadedLevelSounds[levelSoundIndex];
    sound.volume = currentSfxVolume;
    sound.currentTime = 0;
    sound.play().catch(() => {});
    levelSoundIndex = (levelSoundIndex + 1) % SOUND_POOL_SIZE;
}

let isMuted = localStorage.getItem('isMuted') === 'true';
let isSfxMuted = localStorage.getItem('isSfxMuted') === 'true';
let musicStarted = false;
let currentVolume = parseFloat(localStorage.getItem('volume')) || 0.5;
let currentSfxVolume = parseFloat(localStorage.getItem('sfxVolume')) || 0.5;

// Функция для синхронизации всех контролов громкости музыки
function syncVolumeControls(volume) {
    currentVolume = volume;
    localStorage.setItem('volume', volume);
    volumeSlider.value = volume * 100;
    menuVolumeSlider.value = volume * 100;
    bgMusic.volume = volume;
    menuMusic.volume = volume;
}

// Функция для синхронизации всех контролов громкости звуков
function syncSfxVolumeControls(volume) {
    currentSfxVolume = volume;
    localStorage.setItem('sfxVolume', volume);
    sfxSlider.value = volume * 100;
    menuSfxSlider.value = volume * 100;
}

// Инициализация громкости из localStorage
bgMusic.volume = currentVolume;
menuMusic.volume = currentVolume;
volumeSlider.value = currentVolume * 100;
menuVolumeSlider.value = currentVolume * 100;
sfxSlider.value = currentSfxVolume * 100;
menuSfxSlider.value = currentSfxVolume * 100;

function syncMuteButtons() {
    if (isMuted) {
        muteBtn.textContent = '🔈';
        muteBtn.classList.add('muted');
        menuMuteBtn.textContent = '🔈';
        menuMuteBtn.classList.add('muted');
    } else {
        muteBtn.textContent = '🔇';
        muteBtn.classList.remove('muted');
        menuMuteBtn.textContent = '🔇';
        menuMuteBtn.classList.remove('muted');
    }
}

function syncSfxMuteButtons() {
    if (isSfxMuted) {
        sfxMuteBtn.textContent = '🔈';
        sfxMuteBtn.classList.add('muted');
        menuSfxMuteBtn.textContent = '🔈';
        menuSfxMuteBtn.classList.add('muted');
    } else {
        sfxMuteBtn.textContent = '🔇';
        sfxMuteBtn.classList.remove('muted');
        menuSfxMuteBtn.textContent = '🔇';
        menuSfxMuteBtn.classList.remove('muted');
    }
}

syncMuteButtons();
syncSfxMuteButtons();

// Запуск музыки меню при первом взаимодействии
function initMenuMusic() {
    if (!musicStarted) {
        musicStarted = true;
    }
    if (!isMuted && !gameStarted) {
        menuMusic.play().catch(() => {});
    }
}

// Слушаем все возможные события взаимодействия
['click', 'touchstart', 'touchend', 'keydown', 'keyup', 'mousedown', 'pointerdown', 'scroll', 'input', 'change'].forEach(event => {
    document.addEventListener(event, initMenuMusic, { passive: true });
});

// Попытка автозапуска (сработает если браузер разрешает)
window.addEventListener('load', () => {
    if (!isMuted) {
        menuMusic.play().catch(() => {});
    }
    checkDLCUnlock();
});

let clicks = 0;
let currentBottom = 50;
const step = 15;
const finishLine = 280;

// Адаптивная финишная линия
function getFinishLine() {
    if (window.innerWidth <= 480) {
        return 180;
    } else if (window.innerWidth <= 768) {
        return 220;
    }
    return finishLine;
}

const STAR_3 = 5;
const STAR_2 = 8;
const STAR_1 = 12;

// Адаптивные цели для телефонов (на телефоне сложнее кликать)
function getStarGoals() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        return { star3: 8, star2: 11, star1: 14, timeLimit: 15 };
    }
    return { star3: STAR_3, star2: STAR_2, star1: STAR_1, timeLimit: 15 };
}

function updateStarGoalsDisplay() {
    const goals = getStarGoals();
    const starGoalsEl = document.querySelector('.star-goals');
    if (starGoalsEl) {
        starGoalsEl.textContent = `⭐<${goals.star1}с | ⭐⭐<${goals.star2}с | ⭐⭐⭐<${goals.star3}с | ⏱️${goals.timeLimit}с`;
    }
}

let startTime = null;
let timerInterval = null;
let gameStarted = false;
let currentLevel = 1;
let winSound = null;
let isPaused = false;
let pausedTime = 0;
let fallInterval = null;
const fallSpeed = 25; // пикселей в секунду (базовая скорость падения)

const levels = {
    1: { finishImg: 'zzz.png', bgClass: '', winGif: 'удачное.gif' },
    2: { finishImg: '5d896950-fa4d-45b9-9c4e-6f9ca252e2b4.png', bgClass: 'level-2', winGif: 'акулка.gif' },
    // DLC уровни
    3: { finishImg: 'косплей 1.png', bgClass: 'level-dlc', winGif: 'мда.gif' },
    4: { finishImg: 'косплей 2.png', bgClass: 'level-dlc', winGif: 'лиса.gif' },
    5: { finishImg: 'весельчак.png', bgClass: 'level-dlc', winGif: 'сладкий.mp4', isVideo: true }
};

function getBestTime(level) {
    return localStorage.getItem('bestTime_level' + level);
}

function setBestTime(level, time) {
    localStorage.setItem('bestTime_level' + level, time);
}

function getLevelStars(level) {
    return parseInt(localStorage.getItem('stars_level' + level)) || 0;
}

function setLevelStars(level, stars) {
    const currentStars = getLevelStars(level);
    if (stars > currentStars) {
        localStorage.setItem('stars_level' + level, stars);
    }
}

function checkDLCUnlock() {
    const level1Stars = getLevelStars(1);
    const level2Stars = getLevelStars(2);
    
    if (level1Stars >= 3 && level2Stars >= 3) {
        dlcBtn.classList.remove('locked');
        dlcBtn.disabled = false;
        dlcBtn.textContent = '⭐ DLC ⭐';
    } else {
        dlcBtn.classList.add('locked');
        dlcBtn.disabled = true;
        dlcBtn.textContent = `🔒 DLC (${level1Stars}/3 + ${level2Stars}/3)`;
    }
}

function updateBestTimeDisplay() {
    const best = getBestTime(currentLevel);
    bestTimeDisplay.textContent = best ? best + 'сек' : '-';
}

function resetGame() {
    clicks = 0;
    currentBottom = 50;
    startTime = null;
    pausedTime = 0;
    isPaused = false;
    gameStarted = false;
    clicksDisplay.textContent = '0';
    timerDisplay.textContent = '0.0';
    clicker.style.bottom = '50px';
    clicker.style.cursor = 'pointer';
    star1.classList.remove('earned');
    star2.classList.remove('earned');
    star3.classList.remove('earned');
    winStar1.classList.remove('earned');
    winStar2.classList.remove('earned');
    winStar3.classList.remove('earned');
    pauseMenu.classList.add('hidden');
    loseContainer.classList.add('hidden');
    bonusRewardBtn.style.display = 'none';
    bonusFullscreen.classList.add('hidden');
    if (winSound) {
        winSound.pause();
        winSound = null;
    }
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    if (fallInterval) {
        clearInterval(fallInterval);
        fallInterval = null;
    }
}

function startLevel(level) {
    resetGame();
    currentLevel = level;
    document.body.className = levels[level].bgClass;
    finishImg.src = levels[level].finishImg;
    startScreen.classList.add('hidden');
    dlcScreen.classList.add('hidden');
    winContainer.classList.add('hidden');
    loseContainer.classList.add('hidden');
    gameUI.classList.remove('hidden');
    clicker.classList.remove('hidden');
    bgLayer.classList.add('darkened');
    gameStarted = true;
    updateBestTimeDisplay();
    updateStarGoalsDisplay();
    
    // Переключение музыки
    menuMusic.pause();
    menuMusic.currentTime = 0;
    if (!isMuted) {
        bgMusic.volume = currentVolume;
        bgMusic.currentTime = 0;
        bgMusic.play().catch(() => {});
    }
    
    // Скрыть кнопку "Следующий уровень" на последнем уровне основной игры или DLC
    if (level === 2 || level === 5) {
        nextLevelBtn.style.display = 'none';
    } else {
        nextLevelBtn.style.display = 'block';
    }
}

function goToMenu() {
    resetGame();
    winContainer.classList.add('hidden');
    loseContainer.classList.add('hidden');
    gameUI.classList.add('hidden');
    clicker.classList.add('hidden');
    dlcScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    bgLayer.classList.remove('darkened');
    bgMusic.pause();
    bgMusic.currentTime = 0;
    if (!isMuted) {
        menuMusic.play().catch(() => {});
    }
    document.body.className = '';
    checkDLCUnlock();
}

function togglePause() {
    if (!gameStarted || currentBottom >= window.innerHeight - getFinishLine()) return;
    
    isPaused = !isPaused;
    
    if (isPaused) {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        if (fallInterval) {
            clearInterval(fallInterval);
            fallInterval = null;
        }
        if (startTime) {
            pausedTime += Date.now() - startTime;
        }
        bgMusic.pause();
        pauseMenu.classList.remove('hidden');
    } else {
        pauseMenu.classList.add('hidden');
        if (!isMuted) {
            bgMusic.play().catch(() => {});
        }
        if (pausedTime > 0) {
            startTime = Date.now();
            timerInterval = setInterval(updateTimer, 100);
            fallInterval = setInterval(fallDown, 16);
        }
    }
}

pauseBtn.addEventListener('click', togglePause);
resumeBtn.addEventListener('click', togglePause);
restartBtn.addEventListener('click', () => startLevel(currentLevel));
pauseMenuBtn.addEventListener('click', goToMenu);
loseMenuBtn.addEventListener('click', goToMenu);
retryBtn.addEventListener('click', () => startLevel(currentLevel));

// Управление громкостью (в паузе)
volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    syncVolumeControls(volume);
    initMenuMusic();
});

// Управление громкостью (в меню)
menuVolumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    syncVolumeControls(volume);
    if (!gameStarted && !isMuted) {
        menuMusic.play().catch(() => {});
    }
});

// Управление громкостью звуков (в паузе)
sfxSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    syncSfxVolumeControls(volume);
});

// Управление громкостью звуков (в меню)
menuSfxSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    syncSfxVolumeControls(volume);
});

function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem('isMuted', isMuted);
    if (isMuted) {
        bgMusic.pause();
        menuMusic.pause();
    } else {
        if (gameStarted) {
            bgMusic.play().catch(() => {});
        } else {
            menuMusic.play().catch(() => {});
        }
    }
    syncMuteButtons();
}

muteBtn.addEventListener('click', toggleMute);
menuMuteBtn.addEventListener('click', toggleMute);

function toggleSfxMute() {
    isSfxMuted = !isSfxMuted;
    localStorage.setItem('isSfxMuted', isSfxMuted);
    syncSfxMuteButtons();
}

sfxMuteBtn.addEventListener('click', toggleSfxMute);
menuSfxMuteBtn.addEventListener('click', toggleSfxMute);

level1Btn.addEventListener('click', () => {
    playLevelSelectSound();
    startLevel(1);
});
level2Btn.addEventListener('click', () => {
    playLevelSelectSound();
    startLevel(2);
});
dlcBtn.addEventListener('click', () => {
    if (!dlcBtn.classList.contains('locked')) {
        playLevelSelectSound();
        startScreen.classList.add('hidden');
        dlcScreen.classList.remove('hidden');
    }
});
dlcLevel1Btn.addEventListener('click', () => {
    playLevelSelectSound();
    startLevel(3);
});
dlcLevel2Btn.addEventListener('click', () => {
    playLevelSelectSound();
    startLevel(4);
});
dlcLevel3Btn.addEventListener('click', () => {
    playLevelSelectSound();
    startLevel(5);
});
dlcBackBtn.addEventListener('click', () => {
    dlcScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
});
menuBtn.addEventListener('click', goToMenu);
nextLevelBtn.addEventListener('click', () => {
    if (currentLevel < Object.keys(levels).length) {
        startLevel(currentLevel + 1);
    }
});

function updateTimer() {
    const elapsed = ((pausedTime + Date.now() - startTime) / 1000).toFixed(1);
    timerDisplay.textContent = elapsed;
    
    // Проверка на поражение
    const goals = getStarGoals();
    if (parseFloat(elapsed) >= goals.timeLimit) {
        showLose(elapsed);
    }
}

// Функция опускания предмета
function fallDown() {
    if (!gameStarted || isPaused || currentBottom >= window.innerHeight - getFinishLine()) return;
    
    currentBottom -= fallSpeed / 60; // плавное падение (60 fps эквивалент)
    if (currentBottom < 50) {
        currentBottom = 50;
    }
    clicker.style.bottom = currentBottom + 'px';
}

function showLose(time) {
    clearInterval(timerInterval);
    timerInterval = null;
    clearInterval(fallInterval);
    fallInterval = null;
    gameStarted = false;
    
    // Затухание музыки
    bgMusic.volume = currentVolume * 0.3;
    
    // Останавливаем музыку меню если она играет
    menuMusic.pause();
    menuMusic.currentTime = 0;
    
    loseTimeDisplay.textContent = time;
    loseContainer.classList.remove('hidden');
    clicker.style.cursor = 'default';
}

clicker.addEventListener('click', handleClick);
clicker.addEventListener('touchstart', handleTouch, { passive: false });

function handleTouch(e) {
    e.preventDefault();
    handleClick();
}

function handleClick() {
    if (!gameStarted || isPaused) return;
    if (currentBottom >= window.innerHeight - getFinishLine()) return;
    
    if (startTime === null) {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 100);
        fallInterval = setInterval(fallDown, 16); // ~60fps для плавности
    }
    
    clicks++;
    clicksDisplay.textContent = clicks;
    
    // Воспроизвести звук клика
    playClickSound();
    
    currentBottom += step;
    clicker.style.bottom = currentBottom + 'px';
    
    if (currentBottom >= window.innerHeight - getFinishLine()) {
        clearInterval(timerInterval);
        clearInterval(fallInterval);
        fallInterval = null;
        const totalTime = (pausedTime + Date.now() - startTime) / 1000;
        timerDisplay.textContent = totalTime.toFixed(1);
        
        // Затухание музыки на 70%
        bgMusic.volume = currentVolume * 0.3;
        
        const best = getBestTime(currentLevel);
        if (!best || totalTime < parseFloat(best)) {
            setBestTime(currentLevel, totalTime.toFixed(1));
            updateBestTimeDisplay();
        }
        
        const goals = getStarGoals();
        
        let stars = 0;
        if (totalTime <= goals.star3) {
            stars = 3;
        } else if (totalTime <= goals.star2) {
            stars = 2;
        } else if (totalTime <= goals.star1) {
            stars = 1;
        }
        
        if (stars >= 1) star1.classList.add('earned');
        if (stars >= 2) star2.classList.add('earned');
        if (stars >= 3) star3.classList.add('earned');
        
        // Сохранение звёзд
        setLevelStars(currentLevel, stars);
        
        winContainer.classList.remove('hidden');
        clicker.style.cursor = 'default';
        
        // Показать кнопку дополнительной награды только для DLC уровней (3, 4, 5) при 3 звёздах
        if (currentLevel >= 3 && stars === 3) {
            bonusRewardBtn.style.display = 'block';
        } else {
            bonusRewardBtn.style.display = 'none';
        }
        
        // Установка гифки/видео для текущего уровня
        const winVideo = document.getElementById('win-video');
        if (levels[currentLevel].isVideo) {
            winGif.classList.add('hidden');
            winVideo.classList.remove('hidden');
            winVideo.querySelector('source').src = levels[currentLevel].winGif;
            winVideo.load();
            winVideo.play().catch(() => {});
        } else {
            winVideo.classList.add('hidden');
            winGif.classList.remove('hidden');
            winGif.src = levels[currentLevel].winGif;
        }
        
        winSound = new Audio('оооо.mp3');
        winSound.loop = true;
        winSound.play();
        
        setTimeout(() => {
            if (stars >= 1) winStar1.classList.add('earned');
        }, 300);
        setTimeout(() => {
            if (stars >= 2) winStar2.classList.add('earned');
        }, 600);
        setTimeout(() => {
            if (stars >= 3) winStar3.classList.add('earned');
        }, 900);
    }
}

clicker.addEventListener('mousedown', (e) => {
    e.preventDefault();
});

let spacePressed = false;
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !spacePressed) {
        e.preventDefault();
        spacePressed = true;
        clicker.click();
    }
    if (e.code === 'Escape' && gameStarted && window.innerWidth > 768) {
        e.preventDefault();
        togglePause();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
        spacePressed = false;
    }
});

// Обработчик кнопки дополнительной награды
bonusRewardBtn.addEventListener('click', () => {
    bonusRewardBtn.style.display = 'none';
    const bonusGif = bonusFullscreen.querySelector('.bonus-gif');
    const bonusVideo = document.getElementById('bonus-video');
    
    // Скрыть оба элемента сначала
    bonusGif.classList.add('hidden');
    bonusVideo.classList.add('hidden');
    
    if (currentLevel === 3 || currentLevel === 5) {
        // Уровни 3 и 5 - показать видео
        bonusVideo.classList.remove('hidden');
        bonusVideo.querySelector('source').src = 'валдырь.mp4';
        bonusVideo.load();
        bonusVideo.currentTime = 0;
        bonusVideo.play().catch(() => {});
    } else if (currentLevel === 4) {
        // Уровень 4 - показать гифку
        bonusGif.classList.remove('hidden');
        bonusGif.src = '45.gif';
    }
    
    bonusFullscreen.classList.remove('hidden');
    // Остановить звук финиша
    if (winSound) {
        winSound.pause();
        winSound = null;
    }
});

// Кнопка главного меню на экране бонуса
bonusMenuBtn.addEventListener('click', () => {
    const bonusVideo = document.getElementById('bonus-video');
    bonusVideo.pause();
    bonusVideo.currentTime = 0;
    bonusFullscreen.classList.add('hidden');
    goToMenu();
});
