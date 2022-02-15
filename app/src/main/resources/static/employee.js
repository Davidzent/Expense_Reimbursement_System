import {URL,REDIRURL} from './utils/utils.js';


let form = document.getElementById('loginform');
let errMess = document.getElementById('incorrectLogin');


form.addEventListener('submit', submitform);

 async function submitform(event){
    event.preventDefault();


    const formData = new FormData(this);
    

    await fetch(`${URL}/employee/login`, {

        method: 'post',

        body: formData
    }).then(function (response){
        return response.text();
    }).then(function (text) {
        localStorage.setItem('employeeInfo',text);
        window.location.replace(`${REDIRURL}/employeehub.html`);
    })
}

function submitrequest(event){
    event.preventDefault();

    const formData2 = new FormData(this);

    fetch(`${URL}/employee/reim/request`, {
        // mode:'no-cors',
        method: 'post',
        // credentials: "include",
        body: formData2
    }).then(function (response){
        return response.text();
    }).then(function(text2){
        console.log(text2);
        window.location.replace(`${REDIRURL}/employeehub.html`);
    })
}

