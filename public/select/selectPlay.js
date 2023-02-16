
/**
 * このファイルを読み込むとき、LocalStrageに格納されているFoodデータをコンソールに表示する
 */

    let index =0;
    const questions = JSON.parse(localStorage.getItem("questions"));
    const foodName = document.getElementById('foodName');
   // const foodImg = document.getElementById('foodImg');
    const options = document.querySelectorAll('.option');
    const afterAnswerArea = document.getElementById('after_answer');
    const comment = document.getElementById('comment');
    const next = document.getElementById('next');
    afterAnswerArea.hidden = true;
    let result = [];
    let point = 0;
    updateQuestion();


    options.forEach(function(element) {
        element.addEventListener("click", function() {
            //選択肢クリック時に正誤判定し、選択肢に色をつけ、「次へ」ボタンと「コメント」を表示させる。
            options.forEach(elm =>{
                console.log(elm.innerText)
                if(parseFloat(elm.innerText)=== parseFloat(questions[index].carbo)){
                    elm.classList.add('correct')
                }else{
                    elm.classList.add('miss')
                }
            })

            if(element.className.includes('correct')){
                comment.innerText = "正解！";
                point++;
                result.push('o');
            }else{
                comment.innerText = "惜しい！";
                result.push('x');
            }
            afterAnswerArea.hidden = false;
        });
    });

    //次の問題へ
    next.addEventListener('click' , ()=>{
        index++;
        if(index >= 10){
            console.log('finish');
            console.log(result);
            console.log(point);
            window.location.href = "/game/select/result";
        }else{
            console.log(result);
            console.log(point);
            updateQuestion();
        }
        
    })

function updateQuestion(){
    console.log(questions[index])
    foodName.innerText = questions[index].name;
    //foodImg.src = questions[index].image;
    let fakeOptions = generateRandomNumbers(questions[index].carbo);
    fakeOptions.push(questions[index].carbo)
    fakeOptions.sort(function() {
        return 0.5 - Math.random();
    });

    for(let i = 0; i< 3; i++){
        options[i].innerText = fakeOptions[i]
        afterAnswerArea.hidden = true;
        options[i].classList.remove('correct');
        options[i].classList.remove('miss');
    }

}

/**
 * //正解のカーボ数を受け取り、不正解の選択肢に使う数字を2つ、配列にして返す
 * @param {float} num 
 * @returns array 
 */
function generateRandomNumbers(num) {
    let minValue = Math.max(num - 8.9, 0);
    let maxValue = Math.min(num + 8.9, 10);

    let randomNum1 = parseFloat((Math.random() * (maxValue - minValue) + minValue).toFixed(1));

    let randomNum2;
    do {
        randomNum2 = parseFloat((Math.random() * (maxValue - minValue) + minValue).toFixed(1));
    } while (randomNum2 === randomNum1);

    return [randomNum1, randomNum2];
}