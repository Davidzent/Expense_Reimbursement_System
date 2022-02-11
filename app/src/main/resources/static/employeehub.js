const URL = "http://localhost:7000";

let form2 = document.getElementById('submitform');
let form3 = document.getElementById('logoutform');

form2.addEventListener('submit', submitrequest);
form3.addEventListener('submit', logout);

var welcomeHeader = document.getElementById('welcomeMessage');

var employeeInfo = JSON.parse(localStorage.getItem('employeeInfo'));

welcomeHeader.innerText = `Welcome ${employeeInfo['userName']}`;

async function submitrequest(event){
    event.preventDefault();

    const formData2 = new FormData(this);

   await fetch(`${URL}/employee/reim/request`, {
        method: 'post',
        body: formData2
    }).then(function (response){
        return response.text();
    }).then(function(text2){
        console.log(text2);
    })
}

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
