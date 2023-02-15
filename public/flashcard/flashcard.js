
/**
 * このファイルを読み込むとき、LocalStrageに格納されているFoodデータをコンソールに表示する
 */
window.onload = function() {
    const cards = JSON.parse(localStorage.getItem("cards"));
    console.log(cards)
};