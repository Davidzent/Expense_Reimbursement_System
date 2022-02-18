const emmpinfo = JSON.parse(localStorage.getItem('userinfo'));
var tbl = document.getElementById('accountinfo');

var editbutton = document.getElementById('employeeupdate');


editbutton.addEventListener('click', updateAcct);

var acctNCell = document.createElement('tr')
var nameCell = document.createElement('tr');
var lnameCell = document.createElement('tr');
var emailCell = document.createElement('tr');
var passCell = document.createElement('tr');

acctNCell.innerHTML = `Username: ${emmpinfo.userName}`;
nameCell.innerHTML =  `Firstname: ${emmpinfo.fName}`;
lnameCell.innerHTML = `lastname: ${emmpinfo.lName}`;
emailCell.innerHTML = `email: ${emmpinfo.email}`;
passCell.innerHTML = `password: ${emmpinfo.password}`;


tbl.appendChild(acctNCell);
tbl.appendChild(nameCell);
tbl.appendChild(lnameCell);
tbl.appendChild(emailCell);
tbl.appendChild(passCell);