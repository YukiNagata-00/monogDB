let addBtn = document.getElementById('okay')
let foodname = document.getElementById('foodname')
let picture = document.getElementById('picture')
let carbCount =document.getElementById('carbCount')


addBtn.addEventListener('click', async function (){
    
  
    foodname = foodname.value;
    picture = picture.value;
    carbCount = carbCount.value;

    try{
        const res = await fetch('/flashcard/addcard', {
            method: 'POST',
            body :JSON.stringify({
                foodname,
                picture,
                carbCount

            })
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