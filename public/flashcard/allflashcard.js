let user;
const params = window.location.search;
const foodId = new URLSearchParams(params).get("id");
const username = new URLSearchParams(params).get("user");

console.log(user);
let foodData;
let foodImg = document.getElementById("foodImg");
let arrowRight = document.getElementById("arrow-right");
let arrowLeft = document.getElementById("arrow-left");
let foodName = document.getElementById("foodName");
let ura = document.getElementById("ura");
let heart = document.getElementById("heart");


function getOneFood(username){
    fetch(`/game/flashcard/getOneFood?user=${username}&foodId=${foodId}`, {
        method: 'POST',
        body :JSON.stringify({
            type: user.user._id

        }),
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
        console.log(foodData);
        showCard();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


// //カードを表示させる機能
function showCard(){
    if (!foodData) {
        console.log('foodData is undefined');
        return;
    }

    foodName.innerText =foodData.name ;
    ura.innerText =foodData.carbo ;
    foodImg.src = '/images/foods/' + foodData.image; 

    if(user.user.favorites.includes(foodData._id)){
        heart.checked =true;
    }else{
        heart.checked =false;
    }
};

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
            localStorage.removeItem("jwtToken");
            window.location.href = "intro";
        }
        return response.json();
    })
    .then(data => {
        user =data;
        console.log(user)
        getOneFood(username);
        
    })
    .catch(error => {
        console.error('Error:', error);
    });




// //クリックするとflip するためのcode//
var card = document.querySelector('.card');

card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
});

let back = document.getElementById("back")
back.addEventListener('click', function () {
    window.location.href = '/game/flashcard/start';

})




// //右矢印をクリックしたら次のカードへうつる
arrowRight.addEventListener('click', function(){
    fetch(`/game/flashcard/getNextFood2?$user=${username}&foodId=${foodId}`, {
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
        window.location.href = `/game/flashcard/play?user=${username}&id=${data.nextFoodId}`;
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


