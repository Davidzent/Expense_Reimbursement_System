const maninfo = JSON.parse(localStorage.getItem('userinfo'));
var tbl = document.getElementById('accountinfo');

var editor = document.getElementById('accountEditor');
var editbutton = document.getElementById('showEditor');


editbutton.addEventListener('click', editAccount);
editor.addEventListener('submit', submitInfo);

var acctNCell = document.createElement('tr')
var nameCell = document.createElement('tr');
var lnameCell = document.createElement('tr');
var emailCell = document.createElement('tr');
var passCell = document.createElement('tr');

acctNCell.innerHTML = `${maninfo.userName}`;
nameCell.innerHTML =  `${maninfo.fName}`;
lnameCell.innerHTML = `${maninfo.lName}`;
emailCell.innerHTML = `${maninfo.email}`;
passCell.innerHTML = `${maninfo.password}`;


tbl.appendChild(acctNCell);
tbl.appendChild(nameCell);
tbl.appendChild(lnameCell);
tbl.appendChild(emailCell);
tbl.appendChild(passCell);

async function editAccount(event){
    
    event.preventDefault();
    editor.innerHTML=`<label for='<label for='username'>Username</label>
    <input id = 'username' name = 'username' type = 'text'/>
    <label for='password'>password</label>
    <input id = 'password' name = 'password' type = 'text'/>
    <label for ='fname'>first name</label>
    <input id = 'fname' name = 'fname' type = 'text'/>
    <label for = 'lname'>last name</label> 
    <input id = 'lname' name = 'lname' type = 'text'/>
    <label for = 'email'>email</label>
    <input id = 'email' name = 'email' type = 'text'/>
    <input type='submit' id='submission' value='register'/>`
    
    
}

async function submitInfo(event){
    event.preventDefault();
    const formData = new FormData(this);
        
        ajax("post","/manager/update",formData).then(function (){
            alert("you've updated");
            document.getElementById('username').value="";
            document.getElementById('password').value="";
            document.getElementById('fname').value="";
            document.getElementById('lname').value="";
            document.getElementById('email').value="";
        });
}
