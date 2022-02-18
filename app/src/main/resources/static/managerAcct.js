const maninfo = JSON.parse(localStorage.getItem('managerinfo'));
(maninfo);
var tbl = document.getElementById('accountinfo');



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
