const emmpinfo = JSON.parse(localStorage.getItem('employeeInfo'));
(emmpinfo);
var tbl = document.getElementById('accountinfo');
var accounteditor = document.getElementById('editaccount');
var accountform = document.getElementById('newinfo');

accounteditor.addEventListener('click', editAccount);

var acctNCell = document.createElement('tr')
var nameCell = document.createElement('tr');
var lnameCell = document.createElement('tr');
var emailCell = document.createElement('tr');
var passCell = document.createElement('tr');

acctNCell.innerHTML = `${emmpinfo.userName}`;
nameCell.innerHTML =  `${emmpinfo.fName}`;
lnameCell.innerHTML = `${emmpinfo.lName}`;
emailCell.innerHTML = `${emmpinfo.email}`;
passCell.innerHTML = `${emmpinfo.password}`;


tbl.appendChild(acctNCell);
tbl.appendChild(nameCell);
tbl.appendChild(lnameCell);
tbl.appendChild(emailCell);
tbl.appendChild(passCell);

async function editAccount(event,form){
    
    event.preventDefault();
    if(event.target.type=='button'){
        accountform.innerHTML=`<label for='changeusername'>changeusername</label>`
        
    }
    else{
        const formData = new FormData(form);
        ajax("post","/employee/reim/request",formData);
        

    }
    
}
