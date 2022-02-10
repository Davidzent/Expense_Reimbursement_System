let URL = 'http://localhost:8080/login/employee';

console.log('test');

let form = document.getElementById('form');

form.addEventListener('submit', submitform);

function submitform(event){
    event.preventDefault();
    

    const formData = new FormData(this);

    fetch(URL, {
        method: 'post',
        body: formData
    }).then(function (response){
        return response.text();
    }).then(function (text) {
        console.log(text);
    })
}




