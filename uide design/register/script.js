let submity = document.getElementById('submit')

submity.addEventListener('click', (data) => {
    data.preventDefault()
    let names = document.getElementById('name'),
        select = document.getElementById('select'),
        email = document.getElementById('email').value,
        phone = document.getElementById('phone'),
        password = document.getElementById('password').value

    let datas = {
        'email' : email,
        'password' : password
    }
    start()
    console.log(email)
    async function start(){
        const url = 'http://localhost:8000/api/v1/auths'
        var request = new Request(url, {
            method: 'POST',
            body:  JSON.stringify(datas),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        fetch(request)
    }
})



