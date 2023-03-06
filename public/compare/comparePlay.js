/* eslint-disable no-unused-vars */
/**
 * このファイルを読み込むとき、LocalStrageに格納されているFoodデータをコンソールに表示する
 */
window.onload = function () {
    const questions = JSON.parse(localStorage.getItem("questions"));

};


document.getElementById("closeBtn").addEventListener('click', function () {
    window.location.href = '/home';

})


let index = 0;
const questions = JSON.parse(localStorage.getItem("questions"));

const foodName1 = document.getElementById('foodName1');
const foodImg1 = document.getElementById('foodImg1');
const foodName2 = document.getElementById('foodName2');
const foodImg2 = document.getElementById('foodImg2');
const carb1 = document.getElementById('foodCarb1');
const carb2 = document.getElementById('foodCarb2');
const hint= document.getElementById('hint');
const options = document.querySelectorAll('.option');

const afterAnswerArea = document.getElementById('after_answer');
const comment = document.getElementById('comment');
const next = document.getElementById('next');
afterAnswerArea.hidden = true;
carb1.hidden = true;
carb2.hidden = true;
hint.hidden= false;
let result = [];
let score = 0;
updateQuestion();

document.getElementById('closeBtn').addEventListener('click', function () {
    window.location.href = "/home";
})


options.forEach(function (element) {
    element.addEventListener("click", function () {
        hint.hidden= true;
        let larger;
        let food1 = questions[index].carbo
        let food2 = questions[index + 1].carbo
        if (food1 > food2) {
            larger = questions[index].name;
        } else {
            larger = questions[index + 1].name;
        }
        carb1.innerText = questions[index].carbo
        carb2.innerText = questions[index + 1].carbo
        console.log(larger)
        //選択肢クリック時に正誤判定し、選択肢に色をつけ、「次へ」ボタンと「コメント」を表示させる。
        options.forEach(elm => {
            if (elm.innerText.trim() === larger) {
                elm.classList.add('correct')
                console.log("correct")
            } else {
                elm.classList.add('miss')
            }
            
        })

        if (element.className.includes('correct')) {
            comment.innerText = "正解！";
            score++;
            result.push('o');
        } else {
            comment.innerText = "惜しい！";
            result.push('x');
        }
        
        afterAnswerArea.hidden = false;
        carb1.hidden = false;
        carb2.hidden = false;
        foodImg1.hidden = true;
        foodImg2.hidden = true;
        
    });
});

//次の問題へ
next.addEventListener('click', () => {
    index += 2;
    if (index >= 5) {
        console.log('finish');
        console.log(result);
        console.log(score);

        const params = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                score: score
            })
        };
        fetch('/game/select/score', params)
            .then(response => {
                if (response.ok) {
                    window.location.href = '/game/select/result';
                }
            })
            .catch(error => {
                console.error(error);
            });


    } else {
        console.log(result);
        console.log(score);
        updateQuestion();
    }

})

function updateQuestion() {
    console.log(questions[index])
    console.log(questions[index + 1])

    foodName1.innerText = questions[index].name;
    foodImg1.src = '/images/foods/' + questions[index].image;
    foodName2.innerText = questions[index + 1].name;
    foodImg2.src = '/images/foods/' + questions[index + 1].image;

    for (let i = 0; i < 2; i++) {

        options[i].classList.remove('correct');
        options[i].classList.remove('miss');
    }
    afterAnswerArea.hidden = true;
    carb1.hidden = true;
    carb2.hidden = true;
    foodImg1.hidden = false;
    foodImg2.hidden = false;
    hint.hidden= false;

}