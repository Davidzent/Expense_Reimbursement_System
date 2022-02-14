import {createtable,type,status,URL,ajax} from './utils/utils.js';

const URL2 = 'http://localhost:7000';
var welcomeMessage = document.getElementById('welcomemessage');
var manInfo = JSON.parse(localStorage.getItem('managerinfo'));
var reimbursments = document.getElementById('reimbursments');

const results=document.getElementById('result');
const filters=document.getElementById('filters');
const adminphase2=document.getElementById('adminphase2');
const adminphase2pages=document.getElementById('adminphase2pages');

let riemform = document.getElementById('getriems');
let form3 = document.getElementById('logoutform');

riemform.addEventListener('submit', getReims);
form3.addEventListener('submit', logout);



async function logout(event){
    event.preventDefault();

    await fetch(`${URL2}/logout`, {
        method: 'post',

    }).then(function (response){
        return response.text();
    }).then(function (text){
        console.log(text);
        localStorage.clear();
        window.location.replace(`${URL2}/home.html`);
    })
   
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
    let data = await ajax("get","/manager/reim/list?statusid=1",null);

    data.forEach((e)=>{
        e.submitted = new Date(e.submitted).toLocaleString("en","UTC");
        e.type_ID=type(e.type_ID);
        e.status_ID=status(e.status_ID);
    });


    clear();
    //Table options
    let th=['Validate','Deny','Amount','Description','Submitted','Type','Status']; //headers of the table
    let checkbox=[
        ['Validate','reimid','reimid'],  

        ['Deny','reimid','reimid']       //['class','name',data[index]]
    ];    
                                             //checkbox and primary value
    
    let info=[
        //value     class
        ['amount','Amount'],
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
    let x = await ajax("post","/manager/reim/validate",formData);
    await getReims(event);
}

async function deny(event){
    event.preventDefault();
    let formData = new FormData;
    formData.append('reimid', this.value);
    formData.append('statusid', 3);
    let y = await ajax("post","/manager/reim/validate",formData);
    await getReims(event);
}

async function clear(){
    results.innerHTML="";
    filters.innerHTML="";
    adminphase2.innerHTML="";
    adminphase2pages.innerHTML="";
}

welcomeMessage.innerText= `welcome ${manInfo['userName']}`;