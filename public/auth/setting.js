let username = document.getElementById('username')
let loginEmail = document.getElementById('emailLogin')
let scoreEmail = document.getElementById('emailScore')
let password = document.getElementById('password')
let email = document.getElementById('emailLogin')
let email2 = document.getElementById('emailScore')
let currentPassword = document.getElementById('password')
let confirmBtn = document.getElementById('okay')
let edit = document.getElementById('edit')
let done = document.getElementById('done')
let newPassword = document.getElementById('new')
edit.hidden = true;
newPassword.hidden = true;


    //ログイン中のユーザー情報取得
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
            localStorage.removeItem("jwtToken");
            window.location.href = "intro";
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
        username.value = data.user.username;
        email.value = data.user.email;
        email2.value = data.user.email2;
    })
    .catch(error => {
        console.error('Error:', error);
    });


document.getElementById("back").addEventListener('click', function () {
    window.location.href = '/home';
})

edit.addEventListener('click', function () {
    done.hidden = false;
    newPassword.hidden = false;
})

done.addEventListener('click', async function () {
    
    newPassword.hidden = true;



    username = document.getElementById('username')
    email = document.getElementById('emailLogin')
    email2 = document.getElementById('emailScore')
    currentPassword = document.getElementById('password')
    newPassword = document.getElementById('new')

    username = username.value;
    email = email.value;
    email2 = email2.value;
    currentPassword = currentPassword.value;
    newPassword = newPassword.value;

    try {
      //ログイン中のユーザー情報取得
        let token = localStorage.getItem('jwtToken');
        const response = await fetch('/auth/verify-token', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data, token);
        const userId = data.user._id;

        const res = await fetch('/setting/update-user-info', {
            method: 'POST',
            body: JSON.stringify({
            userId,
            username,
            email,
            email2,
            currentPassword,
            newPassword,
            }),
            headers: {
            'Content-Type': 'application/json'
            },
        });

        if (res.ok) {
            const data = await res.json();
            console.log('Update success', data);
            window.location.href = "/setting"
        } else {
            const errorData = await res.json();
            console.log('Registration failed', errorData);
        }
    } catch (error) {
        console.log(error);
    }
});

