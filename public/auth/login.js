
async function addLoginCounting(data){
    const loginCountRes = await fetch('/auth/update-login-count', {
        method: 'POST',
        body: JSON.stringify({ userId: data.user._id }), 
        headers: {
            'Authorization': `Bearer ${data.token}`,
            'Content-Type': 'application/json'
        }
    });
    
    if (!loginCountRes.ok) {
        const errorData = await loginCountRes.json();
        console.log('Failed to update login count', errorData);
    }
}


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
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data)mail
        addLoginCounting(data);
        window.location.href = '/home';

    })
    .catch(error => {
        console.error('Error:', error);
    });



let continueBtn = document.getElementById('okay')
let forgotBtn = document.getElementById('forgotButton')
let signupBtn = document.getElementById('createButton')
let emailErr = document.getElementById('emailMessage')
let passwordErr = document.getElementById('passwordMessage')


forgotBtn.addEventListener('click', function () {
    console.log('forgot password buttion clicked')
})

signupBtn.addEventListener('click', function () {
    window.location.href = '/auth/signup';
})


continueBtn.addEventListener('click', async function () {

    let email = document.getElementById('emailInput')
    let password = document.getElementById('passwordInput')

    email = email.value;
    password = password.value;

    emailErr.innerHTML = ''
    passwordErr.innerHTML = ''

    try {
mail
            const res = await fetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });
            
            if (res.ok) {
                const data = await res.json();
                console.log('Registration successful', data);
                console.log(data.token);
                addLoginCounting(data);
                localStorage.setItem('jwtToken', data.token);
                window.location.href = '/home'; //ホーム画面へ
            } else {
                const errorData = await res.json();
                console.log('Registration failed', errorData);

        const res = await fetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (res.ok) {
            const data = await res.json();
            console.log('Registration successful', data);
            console.log(data.token);
            localStorage.setItem('jwtToken', data.token);
            window.location.href = '/home'; //ホーム画面へ
        } else {
            const errorData = await res.json();
            console.log('Registration failed', errorData);

            for (let i = 0; i < errorData.errors.length; i++) {
                if (errorData.errors[i].param == 'email') {
                    emailErr.innerHTML = errorData.errors[i].msg
                }
                if (errorData.errors[i].param == 'password') {
                    passwordErr.innerHTML = errorData.errors[i].msg
                }


            }


        }

    } catch (error) {
        console.log(error);
    }
})