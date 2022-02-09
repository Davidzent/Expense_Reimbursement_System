/*
let courses = [
    {
        course: 'MATH110',
        name: 'Intro to math',
        description: 'Learn the basics of math'
    },
    {
        course: 'READ110',
        name: 'Intro to reading',
        description: 'Learn the basics of reading'
    },
    {
        course: 'SCI110',
        name: 'Intro to science',
        description: 'Learn to science'
    }
];


console.log(courseContainer)
*/
let courseContainer = document.getElementById('courses-container');

//we want to add all of our courses to the webpage so we will through the lis of courses
function populateCourses(courses){
    for(course of courses){
        let cDiv = document.createElement('div');
        console.log(cDiv);
    
        //set the innerHTML of the new div we crated
    
        cDiv.innerHTML = `
            <h2>${course.amount}</h2>
            
        `;
        console.log(cDiv);
        cDiv.setAttribute('class', 'courses');
    
        //finally we can append courses to the container
        courseContainer.append(cDiv);
    }

}


const URL = 'http://localhost:8080';

//Doing it the old fashioned way with XHR

//immediately invoked function
//There are 4 steps in making an AJAX Request
(()=> {

    //step1. Create the new XHR object
    let xhttp = new XMLHttpRequest();

    //Step 2. create a callback function for readystatechange
    xhttp.onreadystatechange = getData = () => {
        if(xhttp.readyState === 4 && xhttp.status === 200){
            console.log(xhttp.responseText);
            let res = JSON.parse(xhttp.responseText);
            populateCourses(res);
        }
    }

    let apiUrl = `${URL}/reim`;

    //Step 3. Open the request
    xhttp.open('GET', apiUrl);

    //Step 4. Send the request
    xhttp.send();

})();
