const url = window.location.href; // Get current URL
const parts = url.split('/');
const selectString = parts[4];

fetch(`/game/${selectString}/score`)
    .then(response => response.json())
    .then(data => {
        let score = data.score;
        console.log(score);
        document.getElementById('score').innerText = score;
    })
    .catch(error => {
        console.error(error);
    });

let select = document.getElementById("next")
select.addEventListener('click', function () {

    console.log(2)
    window.location.href = "/home";

})