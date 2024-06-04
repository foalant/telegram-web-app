let coins = localStorage.getItem('coins') ? parseInt(localStorage.getItem('coins')) : 0;
let clicks = localStorage.getItem('clicks') ? parseInt(localStorage.getItem('clicks')) : 0;

const resetTime = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах
let lastClickTime = localStorage.getItem('lastClickTime') ? parseInt(localStorage.getItem('lastClickTime')) : Date.now();

document.getElementById('coinCount').innerText = 'Coins: ' + coins;

function collectCoins() {
    const currentTime = Date.now();

    // Если прошло больше 24 часов с последнего клика, сбрасываем счетчик кликов
    if (currentTime - lastClickTime > resetTime) {
        clicks = 0;
        localStorage.setItem('clicks', clicks);
        lastClickTime = currentTime;
        localStorage.setItem('lastClickTime', lastClickTime);
    }

    if (clicks < 100) {
        coins += 1;
        clicks += 1;
        document.getElementById('coinCount').innerText = 'Coins: ' + coins;
        localStorage.setItem('coins', coins);
        localStorage.setItem('clicks', clicks);

        // Анимация изменения изображения
        let image = document.getElementById('clickerImage');
        image.src = 'https://sun9-69.userapi.com/sun9-73/mB_jNmfFUOZUF9RpG1Hx2AIftxKBO879DCEcYw/XsskELnUErI.jpg';

        // Возврат к исходному изображению после небольшой задержки
        setTimeout(() => {
            image.src = 'https://i.postimg.cc/wBDHJRZk/83ffb5.png';
        }, 100);
    } else {
        alert('You have reached the maximum number of clicks for today.');
    }
}
