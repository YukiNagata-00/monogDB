//今は使ってない
function sendToken (url, isRedirect){
    
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
    console.log(data)
    if(isRedirect){
        window.location.href = `${url}`
    }

})
.catch(error => {
    console.error('Error:', error);
});
}

