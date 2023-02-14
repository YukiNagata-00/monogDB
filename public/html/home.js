window.onload = function () {

    let select = document.getElementById("selectBtn")
    select.addEventListener('click', function () {
        console.log("select button clicked")
        window.location.href = '/game/select/start';
    })
}

