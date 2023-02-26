// const  axiosInstance  = require('axiosClient');



let continueBtn = document.getElementById('okay')

continueBtn.addEventListener('click', async function(){


    let email = document.getElementById('emailInput')
    let username = document.getElementById('userNameInput')
    let password = document.getElementById('passwordInput')
    let passwordConfirmation = document.getElementById('passwordInput2')

    email = email.value;
    username = username.value;
    password = password.value;
    passwordConfirmation= passwordConfirmation.value;


    try {
            const res = await fetch('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ username, email, password, passwordConfirmation }),
                headers: { 'Content-Type': 'application/json' },
            });
            
            if (res.ok) {
                const data = await res.json();
                console.log('Registration successful', data);
                localStorage.setItem('jwtToken', data.token);
                window.location.href = '/home';
            } else {
                const errorData = await res.json();
                console.log('Registration failed', errorData);
            }
    } catch (error) {
            console.log(error);
    }
}
)
