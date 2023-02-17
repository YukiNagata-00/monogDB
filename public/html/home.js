window.onload = function () {

    let select = document.getElementById("selectBtn")
    select.addEventListener('click', function () {
        window.location.href = '/game/select/start';

    })

    let compare = document.getElementById("compareBtn")
    compare.addEventListener('click', function () {
        window.location.href = '/game/compare/start';

    })

    
    document.querySelector('#flashcard_start').addEventListener('click', function() {
    fetch('/game/flashcard/getFood')
    .then(response => response.json())
    .then(data => {
        console.log('success');
        localStorage.setItem("cards", JSON.stringify(data));
        window.location.href = "/game/flashcard/start";
    })
    .catch(error => console.error(error));
    });
}

