
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

    let favorite = document.getElementById("favoriteBtn")
    favorite.addEventListener('click', function () {
        window.location.href = '/game/flashcard/favorite';

    })
    let addcard = document.getElementById("addcardBtn")
    addcard.addEventListener('click', function () {
        window.location.href = '/game/flashcard/addcard';

    })


