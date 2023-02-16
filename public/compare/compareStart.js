/**
 * スタートボタンを押すと、API'/game/compare/getFood'を叩き、localStrageに取得したデータを格納。プレイ画面に遷移する。
 */


window.onload = function () {
    document.getElementById("back").addEventListener('click', function () {
        window.location.href = '/home';

    })


}

document.querySelector('#start').addEventListener('click', function () {
    fetch('/game/compare/getFood')
        .then(response => response.json())
        .then(data => {
            console.log('success');
            localStorage.setItem("questions", JSON.stringify(data));
            window.location.href = "/game/compare/play";
        })
        .catch(error => console.error(error));
});