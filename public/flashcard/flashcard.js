
/**
 * このファイルを読み込むとき、LocalStrageに格納されているFoodデータをコンソールに表示する
 */
window.onload = function() {
    const cards = JSON.parse(localStorage.getItem("cards"));
    console.log(cards);

};
//クリックするとflip するためのcode//
var card = document.querySelector('.card');
card.addEventListener( 'click', function() {
  card.classList.toggle('is-flipped');
});



