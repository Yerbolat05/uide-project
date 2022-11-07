let errormsg = document.getElementById('error_msg')
let xhr = new XMLHttpRequest()
xhr.open('POST','http://localhost:8000/api/token/')

let formUser = document.forms.authorization 
console.log(formUser)

formUser.addEventListener('submit', (data) => {
    var jsonForm = new FormData(formUser)
    data.preventDefault()
    console.log('------------------');
    xhr.responseType = 'json'
    xhr.send(jsonForm)
    xhr.onload = (res) => {
        if(xhr.status != 200){
            console.log(`Error. Status ${xhr.status}: ${xhr.statusText}`)
            console.log(xhr.response)
        }
        if(xhr.status == 401){
            console.log(xhr.response)
            errormsg.textContent = 'Такой учетной записи не существует'
            errormsg.style.color = 'red'
            errormsg.style.fontFamily = 'Verdana'
        }
        else{
            console.log(xhr.response)
            let email = document.getElementById('email')
            localStorage.setItem('email',email.value)
            localStorage.setItem('access', xhr.response.access)
            localStorage.setItem('refresh', xhr.response.refresh)
            location.href = '/uide'
        }
    }
})

