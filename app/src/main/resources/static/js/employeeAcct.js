const emmpinfo = JSON.parse(localStorage.getItem('userinfo'));
var tbl = document.getElementById('accountinfo');

var editbutton = document.getElementById('employeeupdate');


editbutton.addEventListener('click', updateAcct);

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