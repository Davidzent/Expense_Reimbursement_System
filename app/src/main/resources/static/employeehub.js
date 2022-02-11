import {createtable,type,status,URL,ajax} from './utils/utils.js';


document.getElementById('logout').addEventListener('click', logout);
document.getElementById('ViewPending').addEventListener('click',viewPending);
document.getElementById('reimRequest').addEventListener('click',reimRequest);

async function logout(event){
    event.preventDefault();
    ajax("post","/logout",null);
}

async function reimRequest(event){
    event.preventDefault();
    const formData = new FormData(this);
    ajax("post","/employee/reim/request",formData);
}

async function viewPending(event){
    event.preventDefault();
    let data = await ajax("get","/employee/reim/list?statusid=1",null);

    data.forEach((e)=>{
        e.submitted = new Date(e.submitted).toLocaleString("en","UTC");
        e.type_ID=type(e.type_ID);
        e.status_ID=status(e.status_ID);
    });



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
    let max=-1;
    let filters=4;
    createtable('FileTable',th,checkbox,info,data,submitvals,display,max,filters);
}
