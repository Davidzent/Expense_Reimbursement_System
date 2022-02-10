let URL = 'http://localhost:8080';

let form = document.getElementById('loginform');
let logoutform = document.getElementById('logoutform');

form.addEventListener('submit', submitform);
logoutform.addEventListener('submit', logout);


async function submitform(event){
    event.preventDefault();


    const formData = new FormData(this);
    
    await fetch(`${URL}/login/manager`, {

        method: 'post',
        body: formData
    }).then(function (response){
        
        return response.text();
    }).then(function (text) {
        console.log(text);
        localStorage.setItem('managerinfo', text);
        window.location.replace(`${URL}/managerhub.html`);
    })
}


