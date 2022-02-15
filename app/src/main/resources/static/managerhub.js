import {createtable,type,status,URL,ajax} from './utils/utils.js';

var welcomeMessage = document.getElementById('welcomemessage');
var manInfo = JSON.parse(localStorage.getItem('managerinfo'));
var reimbursments = document.getElementById('reimbursments');
const accountportal=document.getElementById('getaccount');

const results=document.getElementById('result');
const filters=document.getElementById('filters');
const adminphase2=document.getElementById('adminphase2');
const adminphase2pages=document.getElementById('adminphase2pages');

let riemform = document.getElementById('getriems');
let resolvedform = document.getElementById('getresolved');
let form3 = document.getElementById('logoutform');

riemform.addEventListener('submit', getReims);
form3.addEventListener('submit', logout);
resolvedform.addEventListener('submit', getReims);
accountportal.addEventListener('click', redirctAccount);




async function logout(event){
    event.preventDefault();

    await fetch(`${URL}/logout`, {
        method: 'post',

    }).then(function (response){
        return response.text();
    }).then(function (text){
        console.log(text);
        localStorage.clear();
        window.location.replace(`${URL}/home.html`);
    })
   
}

async function redirctAccount(event){
    event.preventDefault();
    window.location.href = `${URL}/managerAcct.html`;
}

/*
async function getReims(event){
    event.preventDefault();

    await fetch(`${URL}/reim`, {
        method: 'get',
    }).then(function (response){
        return response.text();
    }).then(function (text){
        console.log(text);
    })

}
*/

async function getReims(event){
    event.preventDefault();
    if(event.target.id === 'getriems'){
        locationURL = "/manager/reim/list?statusid=1";
    }
    else if(event.target.id === 'getresolved'){
        locationURL = '/manager/reim/list?statusid=2';
    }
    
    let data = await ajax("get",`${locationURL}`,null);

    console.log(data);

    data.forEach((e)=>{
        e.submitted = new Date(e.submitted).toLocaleString("en","UTC");
        e.type_ID=type(e.type_ID);
        e.status_ID=status(e.status_ID);
    });

    


    clear();
    //Table options
    let th=['Validate','Deny','Amount', 'first','last','Description','Submitted','Type','Status']; //headers of the table
    let checkbox=[
        ['Validate','reimid','reimid'],  

        ['Deny','reimid','reimid']       //['class','name',data[index]]
    ];    
                                             //checkbox and primary value
    
    let info=[
        //value     class
        ['amount','Amount'],
        ['authorfName','first'],
        ['authorLName','last'],
        ['description','Description'],
        ['submitted','Submitted'],
        ['type_ID','Type'],
        ['status_ID','Status'],

    ];
    let submitvals={
        length:0,
    };
    let display='adminphase2';
    let max= -1;
    let filters=4;
    createtable('FileTable',th,checkbox,info,data,submitvals,display,max,filters);
    Array.from(document.getElementsByClassName('Validate')).forEach((e)=>e.addEventListener('change',validate));
    Array.from(document.getElementsByClassName('Deny')).forEach((e)=>e.addEventListener('change',deny));
}





async function validate(event){
    event.preventDefault();
    let formData = new FormData;
    formData.append('reimid', this.value);
    formData.append('statusid', 2);
    await ajax("post","/manager/reim/validate",formData);
    getReims(event);
}

async function deny(event){
    event.preventDefault();
    let formData = new FormData;
    formData.append('reimid', this.value);
    formData.append('statusid', 3);
    await ajax("post","/manager/reim/validate",formData);
    getReims(event);
}

async function clear(){
    results.innerHTML="";
    filters.innerHTML="";
    adminphase2.innerHTML="";
    adminphase2pages.innerHTML="";
}

welcomeMessage.innerText= `welcome ${manInfo['userName']}`;