var welcomeMessage = document.getElementById('welcomemessage');
var manInfo = JSON.parse(localStorage.getItem('userinfo'));
var reimbursments = document.getElementById('reimbursments');
const accountportal=document.getElementById('getaccount');
const ViewEmployees=document.getElementById('ViewEmployee');

const results=document.getElementById('result');
const filters=document.getElementById('filters');
const adminphase2=document.getElementById('adminphase2');
const adminphase2pages=document.getElementById('adminphase2pages');

let riemform = document.getElementById('getriems');
let resolvedform = document.getElementById('getresolved');
let deniedform = document.getElementById('getdenied');
let form3 = document.getElementById('logoutform');

riemform.addEventListener('click', getReims);
form3.addEventListener('click', logout);
resolvedform.addEventListener('click', getReims);
deniedform.addEventListener('click', getReims);
accountportal.addEventListener('click', redirctAccount);
ViewEmployees.addEventListener('click',ViewEmployee);


var locationURL;

welcomeMessage.innerText= `welcome ${manInfo['fName']} ${manInfo['lName']}`;



async function ViewEmployee(event){
    let data = await ajax("get","/manager/list/employee",null);
    clear();
    //Table options
    let th=['Username', 'First Name','Last Name','Email']; //headers of the table
    let checkbox=[];
    
    let info=[
        //value     class
        ['userName','Username'],
        ['fName','firstname'],
        ['lName','lastname'],
        ['email','email']

    ];
    let submitvals={
        length:0,
    };
    let display='adminphase2';
    let max= -1;
    let filters=4;
    createtable('FileTable',th,checkbox,info,data,submitvals,display,max,filters);
}

async function logout(event){
    event.preventDefault();

    await fetch(`${URL}/logout`, {
        method: 'post',

    }).then(function (response){
        return response.text();
    }).then(function (text){
        localStorage.clear();
        window.location.replace(`${REDIRURL}/home.html`);
    })
   
}

async function redirctAccount(event){
    event.preventDefault();
    window.location.href = `${REDIRURL}/managerAcct.html`;
}

/*
async function getReims(event){
    event.preventDefault();

    await fetch(`${URL}/reim`, {
        method: 'get',
    }).then(function (response){
        return response.text();
    }).then(function (text){
        (text);
    })

}
*/

async function getReims(event){
    event.preventDefault();
    let locationURL="";
    if(event.target.id === 'getdenied'){
        locationURL = '/manager/reim/list?statusid=3';
        ('true');
    }
    else if(event.target.id === 'getresolved'){
        locationURL = '/manager/reim/list?statusid=2';
    }else{
        locationURL = "/manager/reim/list?statusid=1";
        (locationURL);

    }
    
    let data = await ajax("get",`${locationURL}`,null);

    for (const e of data) {
        e.submitted = new Date(e.submitted).toLocaleString("en","UTC");
        e.type_ID=type(e.type_ID);
        e.status_ID=status(e.status_ID);
        e.amount=await formatMoney(e.amount);
    }


    clear();
    //Table options
    let th;
    let checkbox;
    if(event.target.id === 'getresolved' || event.target.id==="getdenied"){
        th=['Amount', 'First Name','Last Name','Description','Submitted','Type','Status']; //headers of the table
        checkbox=[]; 

    }else{
        th=['Validate','Deny','Amount', 'First Name','Last Name','Description','Submitted','Type','Status']; //headers of the table
        checkbox=[
            ['Validate','reimid','reimid'],  
            ['Deny','reimid','reimid']       //['class','name',data[index]]
        ];   
    }
    
    
    let info=[
        //value     class
        ['amount','Amount'],
        ['authorfName','firstname'],
        ['authorLName','lastname'],
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

