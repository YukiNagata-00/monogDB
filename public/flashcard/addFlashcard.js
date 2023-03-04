let addBtn = document.getElementById('okay')


addBtn.addEventListener('click', async function (e){
    

    let imageinput = document.querySelector("#imageinput")

    //addimageに関するコードデフォルトの挙動が起きないように
    e.preventDefault();
    //inputに入ったファイルを取得
    const file = await imageinput.files[0];
    //サーバーエンドに送信するための形式が
    const formData = new FormData();
    formData.append("image",file)

    let name = document.getElementById('foodname')
   // let image = document.getElementById('picture')
    let carbo =document.getElementById('carbCount')


    console.log("test3");
    
  
    name = name.value;
    let  image = await imageinput.files[0].name;
    carbo = carbo.value;
    console.log(name);

    try{
        const res = await fetch('/game/flashcard/addcard2', {
            method: 'POST',
            body :JSON.stringify({
                name,
                image,
                carbo

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
            alert("追加しました");
           
        }
    }catch (error) {
        console.log(error);
    }


})