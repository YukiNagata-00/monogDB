/* eslint-disable no-unused-vars */
const url = window.location.href; // Get current URL
const parts = url.split('/');
const selectString = parts[4];

const afterBtn = document.getElementById('after')
const beforeBtn = document.getElementById('before')

let index = 0;
const foodName = document.getElementById('foodName')
const foodImg = document.getElementById('foodImg')

let incorrect = JSON.parse(localStorage.getItem('incorrect'));
console.log(incorrect)
updateCard();

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

afterBtn.addEventListener('click', function(){
    if(index+1==incorrect.length){
        index = 0;
    }else{
        index++;
    }

    updateCard();

})

beforeBtn.addEventListener('click', function(){
    if(index==0){
        index = incorrect.length-1;
    }else{
        index--;
    }
    updateCard();
})

function updateCard(){
    console.log(incorrect[index])
    foodName.innerText = incorrect[index].name;
    foodImg.src = '/images/foods/' + incorrect[index].image;
}




let select = document.getElementById("next")
select.addEventListener('click', function () {

    console.log(2)
    window.location.href = "/home";

})