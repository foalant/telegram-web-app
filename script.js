let userId = null;
let userProgress = {};

async function getUserId() {
    // Получаем userId из Telegram через API
    const response = await fetch(`https://api.telegram.org/bot${TOKEN}/getMe`);
    const data = await response.json();
    return data.result.id;
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

function collectCoins(event) {
    const currentTime = Date.now();

    // Если прошло больше 24 часов с последнего клика, сбрасываем счетчик кликов
    if (currentTime - lastClickTime > resetTime) {
        clicks = 0;
        lastClickTime = currentTime;
    }

    // Определяем количество нажатий при мульти-нажатии
    const touchCount = event.touches ? event.touches.length : 1;

    if (clicks + touchCount <= 10000) { // Увеличен максимальный счетчик до 10000
        coins += touchCount;
        clicks += touchCount;
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

// Добавляем поддержку мульти-нажатий для сенсорных устройств
document.getElementById('clickerImage').addEventListener('touchstart', collectCoins);
document.getElementById('clickerImage').addEventListener('mousedown', collectCoins);
