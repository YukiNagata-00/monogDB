window.onload = function () {

    let select = document.getElementById("selectBtn")
    select.addEventListener('click', function () {
        window.location.href = '/game/select/start';

    })

    let compare = document.getElementById("compareBtn")
    compare.addEventListener('click', function () {
        window.location.href = '/game/compare/start';

    })

    
    document.querySelector('#flashcard_start').addEventListener('click', function() {
    fetch('/game/flashcard/getFood')
    .then(response => response.json())
    .then(data => {
        console.log('success');
        localStorage.setItem("cards", JSON.stringify(data));
        window.location.href = "/game/flashcard/start";
    })
    
    fetch('/game/flashcard/getAddCard')
    .then(response => response.json())
    .then(data => {
        console.log('success');
        localStorage.setItem("addcardfile", JSON.stringify(data));
        window.location.href = "/game/flashcard/start";
    })
    .catch(error => console.error(error));
    });


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
        console.log(data)
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
    //ログアウト
    let logout = document.getElementById('logout');
    logout.addEventListener('click', ()=>{
        if (confirm("本当にログアウトして良いですか？")) {
            localStorage.removeItem("jwtToken");
            window.location.href = "intro";
          } else {
            console.log(0)
          }
        
    })

    let setting = document.getElementById('settingBtn');
    setting.addEventListener('click', ()=>{
        window.location.href = "setting";
    })
}

