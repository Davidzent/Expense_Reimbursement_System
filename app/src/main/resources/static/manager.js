import {URL} from './utils/utils.js';


let form = document.getElementById('loginform');
let errMess = document.getElementById('incorrectLogin');


form.addEventListener('submit', submitform);

 async function submitform(event){
    event.preventDefault();


    const formData = new FormData(this);
    

    await fetch(`${URL}/manager/login`, {

        method: 'post',

        body: formData
    }).then(function (response){
        return response.text();
    }).then(function (text) {
        localStorage.setItem('managerinfo',text);
        window.location.replace(`${URL}/managerhub.html`);
    })
}

