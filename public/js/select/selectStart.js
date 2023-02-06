console.log("dd");


document.querySelector('#start').addEventListener('click', function() {
    fetch('/game/select/play')
    .then(response => response.json())
    .then(data => {
        console.log('success');
    localStorage.setItem("questions", JSON.stringify(data));
    window.location.href = "/game/select/playing";
    })
    .catch(error => console.error(error));
    });