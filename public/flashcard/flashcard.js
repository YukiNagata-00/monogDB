var user;
//ログイン中のユーザー情報取得
let token = localStorage.getItem('jwtToken');
    fetch('/auth/verify-token', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        user =data;
        console.log(user)
    })
    .catch(error => {
        console.error('Error:', error);
    });



const params = window.location.search;
console.log(params);
const foodId = new URLSearchParams(params).get("id");
console.log(foodId);
var foodData;

    fetch(`/game/flashcard/getOneFood?foodId=${foodId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        foodData = data;
        console.log(data);
        showCard();
    })
    .catch(error => {
        console.error('Error:', error);
    });


let foodImg = document.getElementById("foodImg");
let arrowRight = document.getElementById("arrow-right");
let arrowLeft = document.getElementById("arrow-left");
let foodName = document.getElementById("foodName");
let ura = document.getElementById("ura");
let heart = document.getElementById("heart");



// //クリックするとflip するためのcode//
var card = document.querySelector('.card');

card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
});

let back = document.getElementById("back")
back.addEventListener('click', function () {
    window.location.href = '/game/flashcard/start';

})



// //カードを表示させる機能
function showCard(){
    console.log(foodData);
    console.log(user.user.favorites.length);
    foodName.innerText =foodData.name ;
    ura.innerText =foodData.carbo ;
    foodImg.src = '/images/foods/' + foodData.image; 

    if(user.user.favorites.includes(foodData._id)){
        heart.checked =true;
    }else{
        heart.checked =false;
    }
};
// //右矢印をクリックしたら次のカードへうつる
arrowRight.addEventListener('click', function(){
    fetch(`/game/flashcard/getNextFood?foodId=${foodId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        console.log(response)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.nextFoodId);
        window.location.href = `/game/flashcard/play?id=${data.nextFoodId}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// //左矢印をクリックしたら前のカードへうつる
arrowLeft.addEventListener('click', function(){
    fetch(`/game/flashcard/getPreviousFood?foodId=${foodId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        console.log(response)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.previousFoodId);
        window.location.href = `/game/flashcard/play?id=${data.previousFoodId}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

//お気に入り
heart.addEventListener('click', function(){

    fetch('/game/flashcard/updateFavorite', {
        method:'POST',
        body: JSON.stringify({ userId: user.user._id , foodId: foodData._id}),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        console.log(response)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error:', error);
    })
});


