/* eslint-disable no-unused-vars */
// const  axiosInstance  = require('axiosClient');



let continueBtn = document.getElementById('okay')
let loginBtn = document.getElementById('createBtn')
let usernameError = document.getElementById('usernameMessage')
let emailError = document.getElementById('emailMessage')
let password1Error = document.getElementById('password1Message')
let password2Error = document.getElementById('password2Message')

function clearAll(){
    usernameError.innerHTML = ''
    emailError.innerHTML = ''
    password1Error.innerHTML = ''
    password2Error.innerHTML = ''
}

continueBtn.addEventListener('click', async function () {
    clearAll()

    let email = document.getElementById('emailInput')
    let username = document.getElementById('userNameInput')
    let password = document.getElementById('passwordInput')
    let passwordConfirmation = document.getElementById('passwordInput2')

    email = email.value;
    username = username.value;
    password = password.value;
    passwordConfirmation = passwordConfirmation.value;

    try {
        const res = await fetch('/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password,
                passwordConfirmation
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (res.ok) {
            const data = await res.json();
            console.log('Registration successful', data);
            localStorage.setItem('jwtToken', data.token);
            window.location.href = '/auth/login';

        } else {
            const errorData = await res.json();
            //errorData.errors.pop()

            for (let i = 0; i < errorData.errors.length; i++) {
                if (errorData.errors[i].param == 'username') {
                    usernameError.innerHTML = errorData.errors[i].msg
                }
                if (errorData.errors[i].param == 'email') {
                    emailError.innerHTML = errorData.errors[i].msg
                }
                if (errorData.errors[i].param == 'password') {
                    password1Error.innerHTML = errorData.errors[i].msg
                }

                if (errorData.errors[i].param == 'passwordConfirmation') {
                    password2Error.innerHTML = errorData.errors[i].msg
                }
            }
            console.log(errorData)

        }
    } catch (error) {
        console.log(error);
    }


})

loginBtn.addEventListener('click',function(){
    window.location.href = "/auth/login";
})