import {createtable,type,status,URL,REDIRURL,ajax} from './utils/utils.js';



const results=document.getElementById('result');
const filters=document.getElementById('filters');
const adminphase2=document.getElementById('adminphase2');
const adminphase2pages=document.getElementById('adminphase2pages');
const accountportal=document.getElementById('getaccount');

document.getElementById("welcomeMessage").innerHTML=`Welcome ${JSON.parse(localStorage.getItem('employeeInfo')).fName}`


document.getElementById('UserAction').addEventListener('submit',submitHandler);

document.getElementById('reimRequest').addEventListener('click',reimRequest);
document.getElementById('logout').addEventListener('click', logout);
document.getElementById('ViewPending').addEventListener('click',viewPending);
document.getElementById('ViewApprove').addEventListener('click',viewApprove);
document.getElementById('ViewDeny').addEventListener('click',viewDeny);
accountportal.addEventListener('click', redirctAccount);


async function submitHandler(e){
    if(e.submitter.defaultValue=="request"){
        reimRequest(e,this);
    }
}


async function reimRequest(event,form){
    
    event.preventDefault();
    if(event.target.type=='button'){
        clear();
        results.innerHTML=`<label for='amount'>Amount</label>
        <input id = 'amount' name = 'amount' type = 'number' step="any" required/>
        <label for='description'>description</label>
        <input id = 'description' name = 'description' type = 'text' required/>
        <label for ='typeid'>type</label>
        <input id = 'typeid' name = 'typeid' type = 'number' required/>
        <input type='submit' value='request'/>`
    }
    else{
        const formData = new FormData(form);
        ajax("post","/employee/reim/request",formData).then(function (){
            alert("The request was submitted");
            document.getElementById('amount').value="";
            document.getElementById('typeid').value="";
            document.getElementById('description').value="";
        });
        

    }
    
}

async function logout(event){
    event.preventDefault();
    ajax("post","/logout",null);
    localStorage.clear();
    window.location.replace(`${REDIRURL}/home.html`);


}
async function redirctAccount(event){
    event.preventDefault();
    window.location.href = `${REDIRURL}/employeeAcct.html`;
}

async function viewPending(event){
    event.preventDefault();
    let data = await ajax("get","/employee/reim/list?statusid=1",null);

    data.forEach((e)=>{
        e.submitted = new Date(e.submitted).toLocaleString("en","UTC");
        e.type_ID=type(e.type_ID);
        e.status_ID=status(e.status_ID);
    });

    basicFormat(data);
}
async function viewApprove(event){
    event.preventDefault();
    let data = await ajax("get","/employee/reim/list?statusid=2",null);

    data.forEach((e)=>{
        e.submitted = new Date(e.submitted).toLocaleString("en","UTC");
        e.type_ID=type(e.type_ID);
        e.status_ID=status(e.status_ID);
    });

    basicFormat(data);
}
async function viewDeny(event){
    event.preventDefault();
    let data = await ajax("get","/employee/reim/list?statusid=3",null);

    data.forEach((e)=>{
        e.submitted = new Date(e.submitted).toLocaleString("en","UTC");
        e.type_ID=type(e.type_ID);
        e.status_ID=status(e.status_ID);
    });

    basicFormat(data);
}

function basicFormat(data){
    clear();
    //Table options
    let th=['Amount','Description','Submitted','Type','Status']; //headers of the table
    let checkbox=[];                                             //checkbox and primary value
    
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
}

async function clear(){
    results.innerHTML="";
    filters.innerHTML="";
    adminphase2.innerHTML="";
    adminphase2pages.innerHTML="";
}