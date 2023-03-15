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

    
})
.catch(error => {
    console.error('Error:', error);
});

    
    let back = document.getElementById("back");
    back.addEventListener('click', function () {
        window.location.href = '/home';

    });

    let all = document.getElementById("allBtn")
    all.addEventListener('click', function () {

        fetch('/game/flashcard/getStartAllId' , {
            method: 'POST',
            body :JSON.stringify({
                username: user.user._id

            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            window.location.href = `/game/flashcard/all?user=${data.username}&id=${data._id}`;
        })
    });

    let basic = document.getElementById("basicBtn")
    basic.addEventListener('click', function () {
        fetch('/game/flashcard/getStartId')
        .then(response => response.json())
        .then(data => {
            console.log(data._id)
            console.log(data)
            window.location.href = `/game/flashcard/play?user=${data.username}&id=${data._id}`;
        })
    });

    let favorite = document.getElementById("favoriteBtn")
    favorite.addEventListener('click', function () {
        window.location.href = '/game/flashcard/favorite';

    })

    let addshow = document.getElementById("addshowBtn")
    addshow.addEventListener('click', function () {
        window.location.href = '/game/flashcard/adds';

    })
    let addcard = document.getElementById("addcardBtn")
    addcard.addEventListener('click', function () {
        window.location.href = '/game/flashcard/addcard';

    })


