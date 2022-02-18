
window.onload = async function (){
    let text=await ajax("get","/employee/verify",null);
    ("result: ",text);
}

var URL = "http://localhost:7000";          //user site
var REDIRURL = URL;

// const URL = "http://35.193.86.50:7000";                              //online
// const REDIRURL = "https://storage.cloud.google.com/project01-html"   //online

function status(status_ID){
    switch(status_ID){
        case 1:return "Pending";
        case 2:return "Accepted";
        case 3:return "Denied";
        default: return "Not Found";
    }
}

function type(type_ID){
    switch(type_ID){
        case 1:return "Lodging";
        case 2:return "Travel";
        case 3:return "Food";
        case 4:return "Other";
        default: return "Not Found";
    }
}

async function ajax(method,u,data){
    let req;
    if(data){
        req = await fetch((URL+u), {
            method: method,
            body: data
        });
    }else{
        req = await fetch((URL+u), {
            method: method
        });
    }
    
    return req.json().catch((e)=>"");
}

async function formatMoney(value){
    return await formatter.format(value);
}

// Create our number formatter.
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});


//login 
async function login(e){
    e.preventDefault();
    let option=e.currentTarget.id.replace("login","").toLowerCase();
    let formParams={
        inputs:[
            {name:"username",title:"Username: ",id:"username",options:"required",type:"text"},
            {name:"password",title:"Password: ",id:"password",options:"required",type:"password"},
        ],
        selects:[]
    }
    let footer=`login`;
    let display = 'displayModal';

    await CreateModal("Login","Loginform",formParams,footer,display)

    document.getElementById("Loginform").addEventListener('submit',function (e){
        loginSubmit(this,e,option)
    });
}

async function loginSubmit(form,event,option){
    event.preventDefault();
    
    const formData = new FormData(form);
    await fetch(`${URL}/${option}/login`, {
        method: 'post',
        body: formData
    }).then(function (response){
        return response.text();
    }).then(function (text) {
        if(!text||text==='Incorrect credentials'){
            ModalErrors(null,`Incorrect Credentials`);
        }else{
            localStorage.setItem('userinfo',text);
            window.location.replace(`${REDIRURL}/${option}hub.html`);
        }
    })
}

//update account

async function updateAcct(e){
    e.preventDefault();
    let option=e.currentTarget.id.replace("update","").toLowerCase();
    let formParams={
        inputs:[
            {name:"username",title:"Username: ",id:"username",options:"required",type:"text"},
            {name:"password",title:"Password: ",id:"password",options:"required",type:"password"},
            {name:"fname",title:"First Name: ",id:"fname",options:"fname",type:"text"},
            {name:"lname",title:"Last Name: ",id:"lname",options:"lname",type:"text"},
            {name:"email",title:"Email: ",id:"email",options:"required",type:"text"},
        ],
        selects:[]
    }
    let footer=`Update`;
    let display = 'displayModal';
    await CreateModal("Update","Updateform",formParams,footer,display)

    document.getElementById("Updateform").addEventListener('submit',function (e){
        updateSubmit(this,e,option)
    });
}

async function updateSubmit(form,event,option){
    event.preventDefault();
    const formData = new FormData(form);
    ajax("post",`/${option}/update`,formData).then(function (e){
        alert("Your account is updated");
        user={
            userName:document.getElementById('username').value,
            password:document.getElementById('password').value,
            fName:document.getElementById('fname').value,
            lName:document.getElementById('lname').value,
            email:document.getElementById('email').value
        }
        localStorage.setItem('userinfo',JSON.stringify(user));
        window.location.replace(`${REDIRURL}/${option}Acct.html`);
    });
}

//register

async function register(e){
    e.preventDefault();
    let option=e.currentTarget.id.replace("register","").toLowerCase();
    let formParams={
        inputs:[
            {name:"username",title:"Username: ",id:"username",options:"required",type:"text"},
            {name:"password",title:"Password: ",id:"password",options:"required",type:"password"},
            {name:"fname",title:"First Name: ",id:"fname",options:"fname",type:"text"},
            {name:"lname",title:"Last Name: ",id:"lname",options:"lname",type:"text"},
            {name:"email",title:"Email: ",id:"email",options:"required",type:"text"},
        ],
        selects:[]
    }
    let footer=`Register`;
    let display = 'displayModal';

    await CreateModal("Register","Registerform",formParams,footer,display)

    document.getElementById("Registerform").addEventListener('submit',function (e){
        registerSubmit(this,e,option)
    });
}

async function registerSubmit(form,event,option){
    event.preventDefault();
    const formData = new FormData(form);
    ajax("post",`/${option}/register`,formData).then(function (){
        alert("you are registered");
        document.getElementById('username').value="";
        document.getElementById('password').value="";
        document.getElementById('fname').value="";
        document.getElementById('lname').value="";
        document.getElementById('email').value="";
    });
}

// Modal Stuff 

/**
 * 
 * @param {{id,error}[]} ParamsE //parameters errors containing the error id and  
 * @param {string}   gError  //general error
 */

function ModalErrors(ParamsE,gError){
    if(ParamsE){
        for(let param of ParamsE){
            document.getElementById(`${param.id}error`).innerText=param.error;
        }
    }
    
    document.getElementById(`gError`).innerText=gError;
}

/**
 * 
 * @param {string} title 
 * @param {{name,title,type,id,options}[]} formParams
 * @param {string} footer 
 */
function CreateModal(title,id,formParams,footer,display){
    let html=
    `<form id ='${id}'>
    <div id="modalShadow" class="modalShadow">
        <div id="modal" class="modal">
            <div id="modalWrapper" class="modalWrapper">
                <div id = "modalHeaderWrapper" class="modalHeaderWrapper">
                    <span id='closeModal' class="close">&times;</span><p class="title">${title}</p>
                </div>
                <div id = "modalContentWrapper" class="modalContentWrapper">
                    <div id="modalContent" class="modalContent">`;                   
                    for(let input of formParams.inputs){
                        html+=
                        `<div>
                            <label for='${input.name}'>${input.title}</label>
                            <input id='${input.id}' name='${input.name}' type='${input.type}' ${input.options}/>
                            <p id = "${input.id}error" class="error" ></p>
                        </div>`;
                    }
                    for(let select of formParams.selects){
                        html+=
                        `<label for='${select.name}'>${select.title}</label>
                        <select name="${select.name}" id="${select.id}">`
                        for(let option of select.options){
                            html+=`<option value="${option.value}">${option.title}</option>`
                        }  
                        html+=`</select>`
                    }
                html +=
                    `</div>
                </div>
                <div id="modalFooterWrapper" class="modalFooterWrapper">
                    <div id="modalFooter" class="modalFooter">
                        <p id="gError" class="error"></p>
                        <input id="submitter" type='submit' value='${footer}'/>
                    </div>
                </div>
            </div>
        </div>
    </div></form>`

    document.getElementById(display).innerHTML=html;
    // modal.style.display = "block";
    document.getElementById("closeModal").onclick = function() {
        document.getElementById(display).innerHTML="";
    }

}




// regex['password'] = /.*(?=.{10,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[&"'(\-_)=~#{[|`\\^@\]}^document.getElementById(*???%,;:!?./?+]).*/;
// regex['strongPassword'] = /^(?!.*(.)\1{1})(?=(.*[\d]){2,})(?=(.*[a-z]){2,})(?=(.*[A-Z]){2,})(?=(.*[@#document.getElementById(%!]){2,})(?:[\da-zA-Z@#document.getElementById(%!]){15,100}document.getElementById(/;
// regex['email'] = /[a-z0-9!#document.getElementById(%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#document.getElementById(%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
// regex['name'] = /^[^0-9\.\,\"\?\!\;\:\#\document.getElementById(\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]{2,50}document.getElementById(/;

// String.match(regex['type']);

// 

/* Creates a Table with filters, pages and limit to the table
id: The table ID
th: The headers for the table
checkbox: if wanted to include checkbox in the table [class,name,valuefromdata]
info: Array holding the [type,class,name,valuefromdata] or [valuefromdata,class] for normal text without being input
data: Data to be put in the table 2D array [index][valuefromdata]
data=[
    0=>['valuefromdata'=>12345,'class'=>('classname1' 'classname2')]    //no type just put it in the table
    1=>['type'=>text,                   'class'=>('classname1' 'classname2') 'name'=>name,'valuefromdata'=>(text)]
    2=>['type'=>date,                   'class'=>('classname1' 'classname2') 'name'=>name,'valuefromdata'=>(normal date no conversion needed)]
    2=>['type'=>datetime-local-convert, 'class'=>('classname1' 'classname2') 'name'=>name,'valuefromdata'=>(date in stamp seconds)]
    3=>['type'=>button,                 'class'=>('classname1' 'classname2') 'name'=>name,'valuefromdata'=>(the button value)]
]
the name is for document.getElementById(_POST
submitvals: array of buttons = {
    type:"type",
    id:"ID"
    value:"value"
}
display: The place to display the table
max: Maximum number of values in table
filters: Number of filters in tables (will be put in filters class div)
Note: the class needs to be the same as the column headert text value for the filters without spaces
*/
function createtable(id,th,checkbox,info,data,submitvals,display,max,filters,extraBtn){
    extraBtn = false;
    let results = document.getElementsByClassName(display)[0];
    let pageresults = document.getElementsByClassName(display+"pages")[0];
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }; //for the date
    //results.fadeIn();
    let html="<table id='"+id+"' class='dataTable'><thead><tr>";
    let currentpage=0;
    let asc=[];
    let cnt=0;
    for(let i=0;i<th.length;i++){
        if(th[i]=='Edit'||th[i]=='Remove'||th[i]=='Validate'||th[i]=='Deny'){
            html +='<th>'+th[i]+'<i class="fas fa-sort sort smallest" value="checkbox '+i+'"></th>';
            cnt++;
        }
        else if(info[i-cnt][0]=='date'){
            html +='<th>'+th[i]+'<i class="fas fa-sort sort smallest" value="date '+i+'"></th>';
        }else{
            html +='<th>'+th[i]+'<i class="fas fa-sort sort smallest" value="text '+i+'"></th>';
        }
        asc.push(false);
    }
    html +="</tr></thead><tbody>"
    for(let i=0;i<data.length;i++){
        if(i<max||max==-1){
            html+="<tr>";
        }
        else {
            html+="<tr style='display: none;'>";
        }
        for(let x=0;x<checkbox.length;x++){
            html+="<td class='center'>"+
            "<input id = '"+i+"' class='"+checkbox[x][0]+"' name = '"+checkbox[x][1]+"["+i+"]' value='"+data[i][checkbox[x][2]]+"' type='checkbox' /></td>";
        }

        for (let j=0;j<info.length;j++){
            if(info[j][0]=='text'){
                html+="<td class='vcenter'>"+
                "<input class='"+info[j][1]+i+"' name = '"+info[j][2]+"["+i+"]' value='"+data[i][info[j][3]]+"' type='hidden' />"+
                "<p class = '"+info[j][1]+i+"'>"+data[i][info[j][3]]+"</p></td>"+
                "</td>";
            }
            else if(info[j][0]=='datetime-local-convert'){
                let time=new Date(data[i][info[j][3]]);
                time=time.toLocaleString('en-US' );//time.toLocaleDateString("en-US",options)+" "+time.toLocaleTimeString('en-US');
                if(time.includes("Invalid Date")){
                    time="No Logout";
                }
                html+="<td class = 'wide vcenter'>"+
                "<input class='"+info[j][1]+i+"' name = '"+info[j][2]+"["+i+"]' value='"+data[i][info[j][3]]+"' type='hidden' />"+
                "<p class = '"+info[j][1]+i+"'>"+time+"</p></td>";
            }
            else if(info[j][0]=='date'){
                html+="<td class = 'wide vcenter'>"+
                "<input class='"+info[j][1]+i+"' name = '"+info[j][2]+"["+i+"]' value='"+data[i][info[j][3]]+"' type='hidden' />"+
                "<p class = '"+info[j][1]+i+"'>"+data[i][info[j][3]]+"</p></td>";
            }
            else if(info[j][0]=='button'){
                html+="<td class = 'wide vcenter'>"+
                "<input class='"+info[j][1]+"' name = '"+info[j][2]+"["+i+"]' value='"+info[j][3]+"' type='button' /></td>";
            }
            else {
                html += "<td class='vcenter "+info[j][1]+"'>"+data[i][info[j][0]]+"</td>";
            }
            //"section"

        }
        html+="</tr>";

    }
    if(submitvals!==false){
        html+='</tbody><tfoot><tr><td colspan="'+th.length+'">'
        //new feature for multiple buttons in the footer.
        for(let i=0;i<submitvals.length;i++){
            if( submitvals[i].type == 'fakeInput' )

                html+= '<span id="'+submitvals[i].id+'" class="'+opt(submitvals[i].class)+'">'+submitvals[i].value+'</span>';
            else
                html+= '<input id="'+submitvals[i].id+'" type = "'+submitvals[i].type+'" value = "'+submitvals[i].value+'"/>';
        }
        html += '</td></tr></tfoot></table>';
    }


    results.innerHTML=html;

    //filters
    addfilter(id,"",filters);
    document.addEventListener('keyup',(e) => updatetable.call(this, e));
    document.addEventListener('change',(e) => updatetable.call(this, e));
    Array.from(document.getElementsByTagName('th')).forEach((t)=>{
        t.addEventListener('click',(e)=> sort.call(this, e));
    });
    //document.addEventListener('click',(e) => sort.call(this, e));
    //$(".filtertag").on('change',(e) => updatetable.call(this, e));
    // $(".sort").on('click',(e) => sort.call(this, e));

    //sort
    function sort(e){
        let table,
            index,          //the position to be sort on
            arrow,
            tr;

        index = th.indexOf(e.target.innerText);
        table = document.getElementById(id);

        //the type of sort decending(smallest) or ascending (biggest)
        let ths=table.rows[0].getElementsByTagName("TH")[index];
        arrow=ths.childNodes[1];
        tr = table.rows;

        //This shit took me almost an hour
        //get the cell value function
        const getCellValue = (tr, index) => tr.children[index].innerText || tr.children[index].textContent || tr.children[index].childNodes[0].checked;

        //simple swap arrow function
        // let jArrow = $( arrow );
        //change all current up and downs to neutrual
        // $( '.sort.fa-sort-up' ).removeClass( 'fa-sort-up' ).addClass( 'fa-sort');
        // $( '.sort.fa-sort-down' ).removeClass( 'fa-sort-down' ).addClass( 'fa-sort');
        const swaparrow = (asc) => asc ? arrow.className = 'fas fa-sort-up sort biggest boldup':arrow.className='fas fa-sort-down sort smallest bolddown';

        // unbold one if it is not the same index as the one clicked
        const bold = (arrow , indx) => index!=indx?arrow.className = arrow.className.replace(/smallest bolddown|biggest boldup/gi,"smallest"):asc;

        // unbold all
        Array.from(table.rows[0].getElementsByTagName("TH"))
            .forEach(( arrow, index) => bold(arrow.childNodes[1],index) );

        //compares two values
            //if they are number just check whichone is greater by subtracting v1 and v2 (v1 is smaller when the result is negative)
            //else just use localecompare to check if it is a string
            //for now I don't want to check for dates but I believe the localeCompare deals with that (I hope)
        const comparer = (index, asc) => (a, b) => ((v1, v2) =>
            v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
            )(getCellValue(asc ? a : b, index), getCellValue(asc ? b : a, index), swaparrow(asc));

        //do the work...
        Array.from(table.tBodies[0].querySelectorAll('tr')) //get all the tr from the first table tbody so that it does not get the theader and tfoot ones
            //sort function from Array
            .sort(comparer(index, asc[index] = !asc[index]))        //swap from asc to desc everytime it is click
            .forEach(rows => table.tBodies[0].appendChild(rows) );  //insert into the tbody the new organized values

        //update the table to prevent erros from pages
        updatetable(false);

    }

    //pages
    if(max!=-1){
        let npages=data.length/max;
        html ="<input class='newpage' type='button' value='..' style='display: none;'>";
        for(let i=0;i<npages&&i<=10;i++){
            if(i==10){
                html += "<input id='newpage' class='newpage' type='button' value='...' >"
            }else{
                html += "<input id='newpage' class='newpage' type='button' value='"+(i+1)+"' >"
            }
        }
        pageresults.innerHTML=html;
        //document.getElementById("newpage").on('click', (e) => updatetable(e));
    }



    //general updatetable
    function updatetable(e){
        if(e&&!e.target.className.includes("filter")&&!e.target.className.includes("filtertag")){return}
        let updatepages=false;
        if ( e.type == 'click' ) {
            currentpage = ( e.currentTarget.defaultValue );
            if ( currentpage == '..' || currentpage == '...' ) {
                updatepages = true;
                page = document.getElementsByClassName('newpage');
                newpages = ( currentpage == '..' ? -10 : 10 );
                for ( let i = 1; i < page.length - 1; i++ ) {
                    page[i].value = parseInt( page[i].value ) + newpages;
                }
                page[0].style.display = '';
                currentpage = parseInt( page[1].value );
            }
            currentpage--;
            currentpage--;
        } else {
            //this fixes a bug that the pages have when you input a value in the filters and not in the first page
            if(max !== -1){
                updatepages = true;
            let page = document.getElementsByClassName('newpage');
            for ( let i = 1; i < page.length - 1; i++ ) {
                page[i].value = i;
            }
            page[0].style.display = '';
            currentpage = 0;
            }
            
            
        }

        //the table
        let table = document.getElementById(id);
        //temporal variables
        let temp= document.getElementsByClassName("filtertag");
        let temp2 =  document.getElementsByClassName("filter");
        let index = [];         //the colums to search on
        let keywords = [];      //the values to be filter on
        let x=0;                //counter for the maximum values in page & the number of matches with the filter
        let check=false;        //used later to check if the keywords matches the filters
        let inf = [];           //holds the position to be filter from the info array
        let tr;                 //tr from table
        let td;                 //td from table
        let startat=currentpage*(max==-1?0:max);    //value to start filtering from (used for pages)

        //get all the th text into an array
        let cols = th.map( ( s ) => { return s.toUpperCase().replace(/\s/g, ''); } );

        //get the info
        for (let k=0;k<temp.length;k++){
            inf[k]=info[temp[k].value][1].split(' ');
            for(let i=0;i<inf[k].length;i++){
                index[k]=cols.indexOf(inf[k][i].toUpperCase());
                if(index[k]!=-1)break;
            }
            keywords[k]=temp2[k].value.toUpperCase();
        }

        tr = table.getElementsByTagName("tr");
        if(index!=null){
            for (let i = 1; i < tr.length-1; i++) {
                check=true;
                for(let k=0;k<filters;k++){
                    td = tr[i].getElementsByTagName("td")[index[k]];
                    if(td){
                        let txtValue = td.textContent || td.innerText;
                        if (txtValue.toUpperCase().indexOf(keywords[k]) == -1) check=false;
                    }else{
                        check=false;
                    }
                }
                if(i<startat+1||(x>=max&&max!=-1)){
                    //if before or after the start of the page
                    tr[i].style.display = "none";
                    if(check&&x>=max&&max!=-1){
                        x++;
                    }
                }else{
                    if (check) {
                        tr[i].style.display = "";
                        if(x%2==1){
                            tr[i].style.backgroundColor="#cacaca";
                            x++;
                        }else{
                            tr[i].style.backgroundColor="white";
                            x++;
                        }
                    }else {
                        tr[i].style.display = "none";
                    }
                }
            }
            if((updatepages||e.type!='click')&&max!=-1){
                let page = document.getElementsByClassName('newpage');
                let newpages=(x/max)+1;
                for(let i=0;i<page.length;i++){
                    if(i<=newpages&&i<=11){
                        page[i].style.display = "";
                    }else{
                        page[i].style.display = "none";
                    }
                }
                if(startat==0){
                    page[0].style.display = "none";
                }else{
                    page[0].style.display = "";
                }
            }
        }

    }
    //adds a filter for a table to the html
//first <tr> needs to have <th> not <td>
function addfilter(tableid,defaultfilter,filters){
    let toaddfilter = document.getElementsByClassName('filters')[0];
    toaddfilter.innerHTML="";
    for(let j=0;j<filters;j++){

        let html="<select class='filtertag "+j+"'>";

        //get all the th text into an array
        let cols = document.getElementById(tableid).rows[0].innerText.split('\t')
        //remove the edit and remove column
        cols = cols.filter( s => s !== 'Edit' && s !== 'Remove'&& s !== 'Validate' && s!=='Deny');
        let temp=0;
        for ( let i = 0; i < cols.length; i++ ) {
            temp = cols[i];
            if (defaultfilter == ""&&i==j){
                html += "<option selected='selected' value=" + i + ">" + temp + "</option>";
            }
            else if ( defaultfilter == temp) {
                html += "<option selected='selected' value=" + i + ">" + temp + "</option>";
            } else {
                html += "<option value=" + i + ">" + temp + "</option>";
            }

        }
        html += "</select>";
        html += "<input type='text' class='filter "+j+"' placeholder='1234567' title='Select the filter and input the value.'/>"
        if(j%4==0&&j!=0){
            toaddfilter.innerHTML+=html+"<br>";
        }else{
            toaddfilter.innerHTML+=html;
        }

    }

}
}

//checkboxmains: the name of the checkbox to press to hide/show <p> and input text/hidden
//checkboxothers: other checkboxes if onlyonecheckbox is enable else leave it empty
//pclass: the classes of the <p> tags
//type: the new type of the input
//Note: <p> tag and <input> tags need to have the same class name followed by the id : classid (nospaces)
function ptoanyinput(checkboxmains,checkboxothers,pclass,type){
    let etest = (event) => {
        let $box = event.currentTarget;
        if ($box.checked) {
            for(let j=0;j<pclass.length;j++){
                //select the hidden input with the class="class+id"
                let inputs = document.querySelectorAll("input[type='hidden'][class='" + pclass[j]+$box.id + "']");
                let p = document.querySelector("p[class='"+pclass[j]+$box.id +"']");
                p.style.display='none';
                for(let i=0;i<inputs.length;i++){
                    inputs[i].type=type;
                }
            }

        } else {
            for(let j=0;j<pclass.length;j++){
                //querySelectorAll rather than $() because for some reason it does not work with that one
                let inputs = document.querySelectorAll('input[type="'+type+'"][class="'+ pclass[j]+$box.id +'"]');
                //select the p tags
                let p = document.querySelector("p[class='"+pclass[j]+$box.id +"']");
                p.style.display='';
                for(let i=0;i<inputs.length;i++){
                    inputs[i].type="hidden";
                }
            }

        }
    };

    for(let i=0; i<checkboxmains.length; i++){
        document.querySelectorAll('[class="'+checkboxmains[i]+'"').forEach(a=>a.addEventListener('click',(e) => etest.call(this, e)));
        
    }
    //when other checkbox is click
    for(let i=0; i<checkboxothers.length; i++){
        $('.'+checkboxothers[i]).on('click', function() {
            let $box = $(this);
            if ($box.is(":checked")) {
                for(let j=0;j<pclass.length;j++){
                    //querySelectorAll rather than $() because for some reason it does not work with that one
                    let inputs = document.querySelectorAll('input[type="'+type+'"][class="'+ pclass[j]+$box.attr("id") +'"]');
                    //select the p tags
                    let p = $("p[class='"+pclass[j]+$box.attr("id")+"']");
                    p.show();
                    for(let i=0;i<inputs.length;i++){
                        inputs[i].type="hidden";
                    }
                }
            }
        });
    }
}
function onlyonecheckbox(){
    //Only one checkbox is possible at a time
    document.querySelector("input[type='checkbox']").addEventListener('click', function() {
          let $box = this;
          if ($box.checked) {
            let group = "input[type='checkbox'][value='" + $box.value + "']";
            document.querySelectorAll(group).checked=false;
            $box.checked=true;
          } else {
            $box.checked=false;
          }
    });
}
