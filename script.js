let userId = null;
let userProgress = {};

async function getUserId() {
    // Получаем userId из Telegram через URL параметр
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

    document.getElementById('coinCount').innerText = 'Монеты: ' + coins;
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

const resetTime = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах
let lastClickTime = Date.now();

document.addEventListener('DOMContentLoaded', loadProgress);

function collectCoins() {
    const currentTime = Date.now();

    // Если прошло больше 24 часов с последнего клика, сбрасываем счетчик кликов
    if (currentTime - lastClickTime > resetTime) {
        clicks = 0;
        lastClickTime = currentTime;
    }

    // Прибавляем только 1 за одно нажатие
    if (clicks + 1 <= 10000) { // Увеличен максимальный счетчик до 10000
        coins += 1;
        clicks += 1;
        document.getElementById('coinCount').innerText = 'Монеты: ' + coins;
        saveProgress();

        // Анимация изменения изображения
        let image = document.getElementById('clickerImage');
        image.src = 'https://sun9-69.userapi.com/sun9-73/mB_jNmfFUOZUF9RpG1Hx2AIftxKBO879DCEcYw/XsskELnUErI.jpg';

        // Возврат к исходному изображению после небольшой задержки
        setTimeout(() => {
            image.src = 'https://i.postimg.cc/wBDHJRZk/83ffb5.png';
        }, 50); // Быстрее обрабатывает нажатие
    } else {
        alert('Вы достигли максимального количества кликов за 24 часа.');
    }
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
    document.getElementById('bonusScreen').classList.add('hidden');
    document.getElementById('promoScreen').classList.add('hidden');
    document.getElementById('mainScreen').classList.remove('hidden');
}
