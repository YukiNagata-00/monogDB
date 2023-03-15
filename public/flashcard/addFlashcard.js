let user;
let addBtn = document.getElementById('okay')
let foodnameError = document.getElementById('foodMessage')
let imageError = document.getElementById('imageMessage')
let carboError = document.getElementById('carboMessage')
let tuika = document.getElementById('tuikaMessage')
let foodname = document.getElementById('foodname')

let imageEx = document.getElementById('imageinput')
let carbo =document.getElementById('carbCount')
let error= 0
let error1 = 0
let error2 = 0
let error3 = 0

//バリデーションの文字表示を空白にする
function clearAll(){
    foodnameError.innerHTML = ''
    imageError.innerHTML = ''
    carboError.innerHTML = ''
    tuika.innerHTML = ''
    error = 0
    error1 = 0
    error2 = 0
    error3 = 0
}

// バリデーション
function errorfunction(){
    console.log(foodname.value)
    if(foodname.value === ""){
        error++;
    }
    if(imageEx.value === ""){
       error1 ++; 
    }
    if(carbo.value === "" ){
       error2++
    }
    if( carbo.value.match(/^[0-9]+$/) !== "true"){
        error3++
     }
    console.log(error)

}

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


//追加するをクリックしたら
addBtn.addEventListener('click', async function (e){
    clearAll()
    

    let imageinput = document.querySelector("#imageinput")

    //addimageに関するコードデフォルトの挙動が起きないように
   // e.preventDefault();
 


     errorfunction();

  
    if (error > 0){
        foodnameError.innerHTML = '食べ物の名前を入力しよう！'
    }if (error1 >0){
        imageError.innerHTML = '写真をアップロードしよう！'

    }if (error2 > 0){
        
        carboError.innerHTML = 'カーボ数を入力しよう'

    

    }else{
        //inputに入ったファイルを取得
        const file = await imageinput.files[0];
        //サーバーエンドに送信するための形式が
        const formData = new FormData();
        formData.append("image",file)
                
        let  image = await imageinput.files[0].name;
        carbo = carbo.value;
        console.log(imageinput);
        console.log(user.user._id)
        let username = user.user._id

        try{
            foodname = foodname.value;
            const res = await fetch('/game/flashcard/addcard2', {
                method: 'POST',
                body :JSON.stringify({
                    foodname,
                    image,
                    carbo,
                    username
    
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log(res);
            
            const addcardimage =
                await fetch('/game/flashcard/addImage', {
                    method :'POST',
                    body: formData
        
        
                });

            if(res.ok){
                const data = await res.json();
                console.log('Registration successful', data);
                //なぜか効かないアラート
               alert("追加しました");
               tuika.innerHTML= "追加しました"
    
               
            }else{
    
                //バリデーション


    
    
            }
        }catch (error) {
            console.log(error);
        }

    }


})

let back = document.getElementById("back")
back.addEventListener('click', function () {
    window.location.href = '/game/flashcard/start';

})

