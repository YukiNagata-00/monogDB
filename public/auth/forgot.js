/* eslint-disable no-unused-vars */
let backBtn = document.getElementById('back')
let emailErr = document.getElementById('emailMessage')
let confirm = document.getElementById('okay')
let sendMsg = document.getElementById('emailSent')
sendMsg.hidden= true;

backBtn.addEventListener('click', function () {
    window.location.href = '/auth/login';
})

confirm.addEventListener('click', function () {

    sendMsg.hidden= false;
    

})
