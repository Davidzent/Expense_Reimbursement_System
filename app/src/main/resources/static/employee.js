
let form = document.getElementById('loginform');
let errMess = document.getElementById('error');
let usrn = document.getElementById("username");
let psw = document.getElementById("password");

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
        if(!text||text==='Incorrect credentials'){
            psw.value="";
            errMess.innerText=text;
        }else{
            localStorage.setItem('employeeInfo',text);
            window.location.replace(`${REDIRURL}/employeehub.html`);
        }
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
        (text2);
        window.location.replace(`${REDIRURL}/employeehub.html`);
    })
}

