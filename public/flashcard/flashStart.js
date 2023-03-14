
    let back = document.getElementById("back");
    back.addEventListener('click', function () {
        window.location.href = '/home';

    });

    let all = document.getElementById("allBtn")
    all.addEventListener('click', function () {
        fetch('/game/flashcard/getStartId')
        .then(response => response.json())
        .then(data => {
            console.log(data._id)
            window.location.href = `/game/flashcard/play?id=${data._id}`;
        })
    });

    let basic = document.getElementById("basicBtn")
    basic.addEventListener('click', function () {
        fetch('/game/flashcard/getStartId')
        .then(response => response.json())
        .then(data => {
            console.log(data._id)
            console.log(data.username)
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


