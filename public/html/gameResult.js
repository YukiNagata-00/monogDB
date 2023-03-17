/* eslint-disable no-unused-vars */
const url = window.location.href; // Get current URL
const parts = url.split('/');
const selectString = parts[4];

const afterBtn = document.getElementById('after')
const beforeBtn = document.getElementById('before')
const carb = document.getElementById('carbNum')
carb.hidden = true;
let index = 0;
const foodName = document.getElementById('foodName')
const foodImg = document.getElementById('foodImg') 
const card = document.getElementById('card')
const card2 = document.getElementById('card2')
const nextBtn = document.getElementById('navi')
const incorrect = JSON.parse(localStorage.getItem('incorrect'));
card2.hidden= true;
if(incorrect.length == 0){
    nextBtn.hidden= true;
    card.hidden= true;
    card2.hidden= false;

}else{
    updateCard(); 
}


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

afterBtn.addEventListener('click', function () {
    if (index + 1 == incorrect.length) {
        index = 0;
    } else {
        index++;
    }

    updateCard();

})

beforeBtn.addEventListener('click', function () {
    if (index == 0) {
        index = incorrect.length - 1;
    } else {
        index--;
    }
    updateCard();
})

card.addEventListener('click', function () {
    carb.innerText = incorrect[index].carbo;
    if (carb.hidden == true) {
        showBack()
    } else {
        showFront()
    }

})

function updateCard() {
    showFront()
    foodName.innerText = incorrect[index].foodname;
    foodImg.src = '/images/foods/' + incorrect[index].image;
}

function showFront() {
    carb.hidden = true;
    foodName.hidden = false;
    foodImg.hidden = false;
}

function showBack() {
    carb.hidden = false;
    foodName.hidden = true;
    foodImg.hidden = true;
}

let select = document.getElementById("next")
select.addEventListener('click', function () {

    console.log(2)
    window.location.href = "/home";

})