/* eslint-disable no-unused-vars */
const url = window.location.href; // Get current URL
const parts = url.split('/');
const selectString = parts[4];

const afterBtn = document.getElementById('after')
const beforeBtn = document.getElementById('before')
const foodName = document.getElementById('foodName')
const foodImg = document.getElementById('foodImg')

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

