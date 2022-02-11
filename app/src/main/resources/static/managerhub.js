const URL = 'http://localhost:7000';
var welcomeMessage = document.getElementById('welcomemessage');
var manInfo = JSON.parse(localStorage.getItem('managerinfo'));

let form3 = document.getElementById('logoutform');
form3.addEventListener('submit', logout);


async function logout(event){
    event.preventDefault();

    await fetch(`${URL}/logout`, {
        method: 'post',

    }).then(function (response){
        return response.text();
    }).then(function (text){
        console.log(text);
        window.location.replace(`${URL}/home.html`);
    })
   
}

welcomeMessage.innerText= `welcome ${manInfo['userName']}`;