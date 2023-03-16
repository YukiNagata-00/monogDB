
let user;
const params = window.location.search;
//const foodId = new URLSearchParams(params).get("id");
let foodIndex = 0;
let foodData;
let foodImg = document.getElementById("foodImg");
let arrowRight = document.getElementById("arrow-right");
let arrowLeft = document.getElementById("arrow-left");
let foodName = document.getElementById("foodName");
let ura = document.getElementById("ura");


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
        let foodId = user.user.addcards[foodIndex];
        console.log(foodId)
        getOneAddFood(foodId);
        
    })
    .catch(error => {
        console.error('Error:', error);
    });




function getOneAddFood(foodId){
    fetch(`/game/flashcard/getOneAddFood?foodId=${foodId}`, {
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
    foodName.innerText =foodData.foodname ;
    ura.innerText =foodData.carbo ;
    foodImg.src = '/images/addcards/' + foodData.image; 


};

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
 foodIndex += 1;
 if(foodIndex === user.user.addcards.length ){
    foodName.innerText ="全部チェックしたよ";
    foodImg.src = '/images/addcards/ome.jpg'; 
}else{
 let foodId = user.user.addcards[foodIndex];
 console.log(foodIndex)
 getOneAddFood(foodId);
}


 


 console.log(user.user.addcards)
 
});

// //左矢印をクリックしたら前のカードへうつる
arrowLeft.addEventListener('click', function(){
    foodIndex -= 1;
    let foodId = user.user.addcards[foodIndex];
    console.log(foodIndex)
    getOneAddFood(foodId);

});



