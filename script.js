let coins = 0;

function collectCoins() {
    coins += Math.floor(Math.random() * 10) + 1;
    document.getElementById('coinCount').innerText = 'Coins: ' + coins;

    // Анимация изменения изображения
    let image = document.getElementById('clickerImage');
    image.src = 'https://sun9-69.userapi.com/sun9-73/mB_jNmfFUOZUF9RpG1Hx2AIftxKBO879DCEcYw/XsskELnUErI.jpg';

    // Возврат к исходному изображению после небольшой задержки
    setTimeout(() => {
        image.src = 'https://i.postimg.cc/wBDHJRZk/83ffb5.png';
    }, 100);
}
