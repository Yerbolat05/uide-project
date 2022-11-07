var refreshToken = localStorage.getItem('refresh')
var request = {'refresh' : refreshToken}

refresh()
async function refresh(){
    console.log('Enter refresh')
    var url = 'http://localhost:8000/api/token/refresh/'
    var response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-type' : 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.access)
        localStorage.setItem('access', data.access)
    })
    .catch(err => {
        console.log(err)
    })
}