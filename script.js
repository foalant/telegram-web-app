let coins = localStorage.getItem('coins') ? parseInt(localStorage.getItem('coins')) : 0;
let clicks = localStorage.getItem('clicks') ? parseInt(localStorage.getItem('clicks')) : 0;

const resetTime = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах
let lastClickTime = localStorage.getItem('lastClickTime') ? parseInt(localStorage.getItem('lastClickTime')) : Date.now();

document.getElementById('coinCount').innerText = 'Монеты: ' + coins;

function collectCoins(event) {
    const currentTime = Date.now();

    // Если прошло больше 24 часов с последнего клика, сбрасываем счетчик кликов
    if (currentTime - lastClickTime > resetTime) {
        clicks = 0;
        localStorage.setItem('clicks', clicks);
        lastClickTime = currentTime;
        localStorage.setItem('lastClickTime', lastClickTime);
    }

    // Определяем количество нажатий при мульти-нажатии
    const touchCount = event.touches ? event.touches.length : 1;

    if (clicks < 10000) { // Увеличен максимальный счетчик до 10000
        coins += touchCount;
        clicks += touchCount;
        document.getElementById('coinCount').innerText = 'Монеты: ' + coins;
        localStorage.setItem('coins', coins);
        localStorage.setItem('clicks', clicks);

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
