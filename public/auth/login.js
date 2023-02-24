let continueBtn = document.getElementById('okay')

continueBtn.addEventListener('click', async function(){

    let email = document.getElementById('emailInput')
    let password = document.getElementById('passwordInput')
    
    email = email.value;
    password = password.value;

    try {
            const res = await fetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });
            
            if (res.ok) {
                const data = await res.json();
                console.log('Registration successful', data);
                window.location.href = '/home'; //ホーム画面へ
            } else {
                const errorData = await res.json();
                console.log('Registration failed', errorData);
            }
            
    } catch (error) {
            console.log(error);
    }
}
)