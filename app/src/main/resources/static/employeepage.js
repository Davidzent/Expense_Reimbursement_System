
let URL = 'http://localhost:8080/login/employee';

let URL2 = 'http://localhost:8080/employee/reim/request';

console.log('test');

let form = document.getElementById('form');
let form2 = document.getElementById('form2');
let form3 = document.getElementById('form3');

form.addEventListener('submit', submitform);
form2.addEventListener('submit', submitrequest);
form3.addEventListener('submit', verify);


function verify(event){
    event.preventDefault();

    fetch('http://localhost:8080/verify',{
        method:'get'
    });
}

function submitform(event){
    event.preventDefault();


    const formData = new FormData(this);
    
    fetch(URL, {
        // mode:'no-cors',
        // origin:'hey',
        method: 'post',
        // credentials: "include",
        // headers:{
        //     "Access-Control-Allow-Origin":"*"
        // },
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

    fetch(URL2, {
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

