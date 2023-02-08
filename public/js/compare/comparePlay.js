
/**
 * このファイルを読み込むとき、LocalStrageに格納されているFoodデータをコンソールに表示する
 */
window.onload = function() {
    const questions = JSON.parse(localStorage.getItem("questions"));
    console.log(questions)
};
