window.onload = function () {

    let select = document.getElementById("selectBtn")
    select.addEventListener('click', function () {
        console.log("select button clicked")
        window.location.href = '/game/select/start';

    })
    
    document.querySelector('#flashcard_start').addEventListener('click', function() {
    fetch('/game/flashcard/getFood')
    .then(response => response.json())
    .then(data => {
        console.log('success');
        localStorage.setItem("cards", JSON.stringify(data));
        window.location.href = "/game/flashcard/";
    })
    .catch(error => console.error(error));
    });
}

