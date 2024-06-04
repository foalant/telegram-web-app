let coins = 0;

function collectCoins() {
    coins += Math.floor(Math.random() * 10) + 1;
    document.getElementById('coinCount').innerText = 'Coins: ' + coins;
}
