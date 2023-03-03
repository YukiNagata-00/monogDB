let addBtn = document.getElementById('okay')

addBtn.addEventListener('click', async function (){

    let name = document.getElementById('foodname')
    let image = document.getElementById('picture')
    let carbo =document.getElementById('carbCount')

    console.log("test3");
    
  
    name = foodname.value;
    image = image.value;
    carbo = carbo.value;
    console.log(foodname);

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
        if(res.ok){
            const data = await res.json();
            console.log('Registration successful', data);
            alert("追加しました");
           
        }
    }catch (error) {
        console.log(error);
    }


})