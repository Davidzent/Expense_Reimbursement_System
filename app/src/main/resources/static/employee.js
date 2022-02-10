
const URL = 'http://localhost:8080';

let URL2 = 'http://localhost:8080/employee/reim/request';



let form = document.getElementById('loginform');
let errMess = document.getElementById('incorrectLogin');


form.addEventListener('submit', submitform);

 async function submitform(event){
    event.preventDefault();


    const formData = new FormData(this);
    

    await fetch(`${URL}/login/employee`, {

        method: 'post',

        body: formData
    }).then(function (response){
        
        return response.text();
    }).then(function (text) {
        console.log(text);
    })
}

function submitrequest(event){
    event.preventDefault();

    const formData2 = new FormData(this);

    fetch(URL+"/reim/request", {
        // mode:'no-cors',
        method: 'post',
        // credentials: "include",
        body: formData2
    }).then(function (response){
        return response.text();
    }).then(function(text2){
        console.log(text2);
    })
}

