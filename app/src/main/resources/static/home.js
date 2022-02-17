//import {createtable,type,status,URL,ajax} from './utils/utils.js';

document.getElementById('Registerempl').addEventListener('click',register);
document.getElementById('Registerman').addEventListener('click',register);
document.getElementById('registerform').addEventListener('submit',submitHandler);

var dest;

async function submitHandler(e){
    
    if(e.submitter.defaultValue=="register"){
        register(e,this);
    }
}


const registerInfo=document.getElementById('registerform');






async function register(event,form){
    event.preventDefault();
   
    if(event.target.value == 'Register Employee'){
        dest = "/employee/register";
        
    }else{
        dest = "/manager/register";
    }
    if(event.target.type=='button'){
            registerInfo.innerHTML = `<label for='username'>Username</label>
            <input id = 'username' name = 'username' type = 'text' required/>
            <label for='password'>password</label>
            <input id = 'password' name = 'password' type = 'text' required/>
            <label for ='fname'>first name</label>
            <input id = 'fname' name = 'fname' type = 'text' required/>
            <label for = 'lname'>last name</label> 
            <input id = 'lname' name = 'lname' type = 'text' required/>
            <label for = 'email'>email</label>
            <input id = 'email' name = 'email' type = 'text' required/>
            <input type='submit' id='submission' value='register'/>  `

    }
    else{

       
        
        const formData = new FormData(form);
        ajax("post",dest,formData).then(function (){
            alert("you are registered");
            document.getElementById('username').value="";
            document.getElementById('password').value="";
            document.getElementById('fname').value="";
            document.getElementById('lname').value="";
            document.getElementById('email').value="";
        });
        
        
    }
}



