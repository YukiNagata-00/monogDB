
/**
 * このファイルを読み込むとき、LocalStrageに格納されているFoodデータをコンソールに表示する
 */
window.onload = function() {
    const questions = JSON.parse(localStorage.getItem("questions"));
    console.log(questions)
};

window.onload = function () {
    document.getElementById("closeBtn").addEventListener('click', function () {
        window.location.href = '/home';

    })


}