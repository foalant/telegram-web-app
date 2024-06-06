let userId = null;
let userProgress = {};
let bufferImage = new Image();

async function getUserId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('user_id');
}

async function loadProgress() {
    userId = await getUserId();
    const storedProgress = localStorage.getItem('userProgress');
    if (storedProgress) {
        userProgress = JSON.parse(storedProgress);
    }

    if (userProgress[userId]) {
        coins = userProgress[userId].coins;
        clicks = userProgress[userId].clicks;
        lastClickTime = userProgress[userId].lastClickTime;
    } else {
        coins = 0;
        clicks = 0;
        lastClickTime = Date.now();
    }

    document.getElementById('coinCount').innerText = 'C-Tokens: ' + coins;
}

function saveProgress() {
    if (!userId) return;
    userProgress[userId] = {
        coins: coins,
        clicks: clicks,
        lastClickTime: lastClickTime
    };
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
}

let coins = 0;
let clicks = 0;

const resetTime = 24 * 60 * 60 * 1000;
let lastClickTime = Date.now();

document.addEventListener('DOMContentLoaded', loadProgress);

bufferImage.src = 'https://i.ibb.co/gTpR0hn/83ffb5.png';

function collectCoins() {
    const currentTime = Date.now();

    if (currentTime - lastClickTime > resetTime) {
        clicks = 0;
        lastClickTime = currentTime;
    }

    if (clicks + 1 <= 10000) {
        coins += 1;
        clicks += 1;
        document.getElementById('coinCount').innerText = 'C-Tokens: ' + coins;
        saveProgress();

        let image = document.getElementById('clickerImage');
        image.src = bufferImage.src;

        setTimeout(() => {
            image.src = 'https://i.ibb.co/gTpR0hn/83ffb5.png';
        }, 50);
    } else {
        alert('Вы достигли максимального количества кликов за 24 часа.');
    }
}

function showUpgradeScreen() {
    document.getElementById('mainScreen').classList.add('hidden');
    document.getElementById('upgradeScreen').classList.remove('hidden');
}

function showBonusScreen() {
    document.getElementById('mainScreen').classList.add('hidden');
    document.getElementById('bonusScreen').classList.remove('hidden');
}

function showPromoScreen() {
    document.getElementById('mainScreen').classList.add('hidden');
    document.getElementById('promoScreen').classList.remove('hidden');
}

function showMainScreen() {
    document.getElementById('upgradeScreen').classList.add('hidden');
    document.getElementById('bonusScreen').classList.add('hidden');
    document.getElementById('promoScreen').classList.add('hidden');
    document.getElementById('mainScreen').classList.remove('hidden');
}
