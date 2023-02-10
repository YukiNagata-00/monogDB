console.log("dd");

/**
 * スタートボタンを押すと、API'/game/select/getFood'を叩き、localStrageに取得したデータを格納。プレイ画面に遷移する。
 */
document.querySelector('#start').addEventListener('click', function() {
    fetch('/game/select/getFood')
    .then(response => response.json())
    .then(data => {
        console.log('success');
        localStorage.setItem("questions", JSON.stringify(data));
        window.location.href = "/game/select/play";
    })
    .catch(error => console.error(error));
    });