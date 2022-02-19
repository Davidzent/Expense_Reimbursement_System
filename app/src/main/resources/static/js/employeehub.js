const results=document.getElementById('result');
const filters=document.getElementById('filters');
const adminphase2=document.getElementById('adminphase2');
const adminphase2pages=document.getElementById('adminphase2pages');
const accountportal=document.getElementById('getaccount');

document.getElementById("welcomeMessage").innerHTML=`Welcome ${JSON.parse(localStorage.getItem('userinfo')).fName} ${JSON.parse(localStorage.getItem('userinfo')).lName}`


document.getElementById('reimRequest').addEventListener('click',reimRequest);
document.getElementById('logout').addEventListener('click', logout);
document.getElementById('ViewPending').addEventListener('click',viewPending);
document.getElementById('ViewApprove').addEventListener('click',viewApprove);
document.getElementById('ViewDeny').addEventListener('click',viewDeny);
accountportal.addEventListener('click', redirctAccount);


async function reimRequest(event){
    event.preventDefault();
    clear();
    let formParams={
        inputs:[
            {name:"amount",title:"Amount: ",id:"amount",options:`step="any" required`,type:"number"},
            {name:"description",title:"Description: ",id:"description",options:"required",type:"text"}
        ],
        selects:[
            {
                name:"typeid",
                title:"Type: ",
                id:"typeid",
                options:[
                    {value:1,title:"Lodging"},
                    {value:1,title:"Travel"},
                    {value:1,title:"Food"},
                    {value:1,title:"Other"},
                ]
            }
        ],
    }
    let footer=`Creat Reimbursement`;
    let display = 'result';

    await CreateModal("Create Reimbursement","CrtReim",formParams,footer,display)
    document.getElementById("CrtReim").addEventListener('submit',reimRequestSubmit);
}

async function reimRequestSubmit(event){
    event.preventDefault();
    const formData = new FormData(this);
    ajax("post","/employee/reim/request",formData).then(function (){
        alert("The request was submitted");
    });
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
    basicFormat(data);
}
async function viewApprove(event){
    event.preventDefault();
    let data = await ajax("get","/employee/reim/list?statusid=2",null);
    basicFormat(data);
}
async function viewDeny(event){
    event.preventDefault();
    let data = await ajax("get","/employee/reim/list?statusid=3",null);
    basicFormat(data);
}

async function basicFormat(data){
    for (const e of data) {
        e.submitted = new Date(e.submitted).toLocaleString("en","UTC");
        e.type_ID=type(e.type_ID);
        e.status_ID=status(e.status_ID);
        e.amount=await formatMoney(e.amount);
    }
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