console.log("dd");
const gameSelectRoutes = require('./routes/gameSelect')
app.use("/game/select", gameSelectRoutes);

document.querySelector('#start').addEventListener('click', function() {
    fetch('/play')
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("questions", JSON.stringify(data));
        window.location.href = "selectPlay.html";
    })
    .catch(error => console.error(error));
});