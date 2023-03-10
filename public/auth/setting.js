/* eslint-disable no-unused-vars */

let username = document.getElementById('username')
let loginEmail = document.getElementById('emailLogin')
let scoreEmail = document.getElementById('emailScore')
let password = document.getElementById('password')
let confirmBtn = document.getElementById('okay')
let edit = document.getElementById('edit')
let done = document.getElementById('done')
let newPassword = document.getElementById('new')
done.hidden = true;
newPassword.hidden = true;

document.getElementById("back").addEventListener('click', function () {
    window.location.href = '/home';

})

edit.addEventListener('click', function () {
    done.hidden = false;
    newPassword.hidden = false;
})

done.addEventListener('click', function () {
    done.hidden = true;
    newPassword.hidden = true;
})

