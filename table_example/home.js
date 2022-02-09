let URL = 'http://localhost:8080/manager/list/employee';


let form = document.getElementById('form');

form.addEventListener('submit', submitform);

async function submitform(event){
    event.preventDefault();


    //const formData = new FormData(this);

    let req = await fetch(URL, {
        method: 'get',
        // body: formData
    });
    let res2 = JSON.parse(await req.text());
    //Table options
    let th=['Edit','Username','First Name','Last Name','Role']; //headers of the table
    let index=res2;                             //data to be placed in the table
    let checkbox=[                                      //checkbox and primary value
        ['edit','users_ID','users_ID']
    ];
    let info=[
        //type , class       name       value
        ['text','userName','username','userName'],          //
        ['text','firstname','fname','fName'],
        ['text','lastname','lname','lName'],
        //value     class
        ['role_ID','role'],

    ];
    let submitvals={
        length:1,
        0:{
            id: 'CreateFromtable',
            value: "Upload to Database",
            type: 'submit'
        }
    };
    let checkboxmains = ["edit"];
    let checkboxothers = [];
    let pclass = ["userName","firstname",'lastname'];
    let display='adminphase2';
    max=-1;
    filters=3;
    results=document.getElementsByClassName(display);


    createtable('FileTable',th,checkbox,info,res2,submitvals,display,max,filters);
    //Only one checkbox is possible at a time
    onlyonecheckbox();
    ptoanyinput(checkboxmains,checkboxothers,pclass,"text");

    document.getElementById('CreateFromtable').addEventListener('click',function (e) {
        submitfile.call(this, e);
    });
    console.log(res2);
    
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
        if(th[i]=='Edit'||th[i]=='Remove'||th[i]=='Verify'||th[i]=='Logout'){
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
    //document.addEventListener('click',(e) => sort.call(this, e));
    //".filtertag").on('change',(e) => updatetable.call(this, e));
    // $(".sort").on('click',(e) => sort.call(this, e));

    //sort
    function sort(e){
        if(!e.target.className.includes("sort"))return;
        let table,
            index,          //the position to be sort on
            type,           //the type to be sort on (date,checkbox,text/number)
            arrow,
            th,
            tr;
        index = $( e.currentTarget ).attr( 'value' ).split(' ');
        // index = e.currentTarget.defaultValue.split(' ');
        type=index[0];
        index=parseInt(index[1]);
        table = document.getElementById(id);

        //the type of sort decending(smallest) or ascending (biggest)
        th=table.rows[0].getElementsByTagName("TH")[index];
        arrow=th.childNodes[1];
        tr = table.rows;

        //This shit took me almost an hour
        //get the cell value function
        const getCellValue = (tr, index) => tr.children[index].innerText || tr.children[index].textContent || tr.children[index].childNodes[0].checked;

        //simple swap arrow function
        let jArrow = $( arrow );
        //change all current up and downs to neutrual
        $( '.sort.fa-sort-up' ).removeClass( 'fa-sort-up' ).addClass( 'fa-sort');
        $( '.sort.fa-sort-down' ).removeClass( 'fa-sort-down' ).addClass( 'fa-sort');
        const swaparrow = (asc) => asc ? $( arrow ).attr( 'class', 'fas fa-sort-up sort biggest boldup') : $( arrow ).attr( 'class', 'fas fa-sort-down sort smallest bolddown');

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
        if(!e.target.className.includes("filter")&&!e.target.className.includes("filtertag")){return}
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
            updatepages = true;
            page = document.getElementsByClassName('newpage');
            for ( let i = 1; i < page.length - 1; i++ ) {
                page[i].value = i;
            }
            page[0].style.display = '';
            currentpage = 0;
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
                        txtValue = td.textContent || td.innerText;
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
                page = document.getElementsByClassName('newpage');
                newpages=(x/max)+1;
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
        cols = cols.filter( s => s !== 'Edit' && s !== 'Remove'&& s !== 'Logout' && s!=='Verify');
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