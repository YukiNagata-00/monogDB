/* eslint-disable no-unused-vars */
console.log(2)

let loginBtn = document.getElementById('login')
let signupBtn = document.getElementById('signup')

loginBtn.addEventListener('click', function(){
    window.location.href = "/auth/login";
})

signupBtn.addEventListener('click', function(){
    window.location.href = "/auth/signup";
})
