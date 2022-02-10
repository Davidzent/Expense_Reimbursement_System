
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
        if(text === 'Incorrect credentials'){
            console.log('entered wrong information');
            errMess.innerText = 'Wrong login information';
        }else{
            
        localStorage.setItem('employeeInfo', text);
        window.location.href = `${URL}/employeehub.html`;
        }
        
    })
}



