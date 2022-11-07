let errormsg = document.getElementById('error_msg')
let xhr = new XMLHttpRequest()
xhr.open('POST','http://localhost:8000/api/token/')

let formUser = document.forms.authorization 
function reload() {
    location.reload();
}
formUser.addEventListener('submit', (data) => {
    var jsonForm = new FormData(formUser)
    data.preventDefault()
    console.log('------------------');
    xhr.responseType = 'json'
    xhr.send(jsonForm)
    xhr.onload = (res) => {
        if(xhr.status != 200){
            console.log(`Error. Status ${xhr.status}: ${xhr.statusText}`)
        }
        if(xhr.status == 401){
            console.log(xhr.response)
            errormsg.textContent = 'Такой учетной записи не существует'
            errormsg.style.color = 'red'
            errormsg.style.fontSize = '15px'
            errormsg.style.fontFamily = 'Verdana'
            setTimeout(reload, 1250)
            
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

let about_btn = document.getElementById("about"),
    ask_btn = document.getElementById('ask'),
    contact_btn = document.getElementById('contact')

    about_btn.addEventListener('click', function(){
        swal({
            imageUrl: '../images/logo-popup.png',
            imageWidth: 100,
            imageHeight: 100,
            imageAlt: 'Custom image',
            html: '<strong>Uide</strong> - сайт для аренды недвижимости. <br> Мы только в Караганде! (не на долго) <br> Автор проекта: Калиев Ерболат Маратович...'
        })
      });
    
    ask_btn.addEventListener('click', function() {
        swal({
            title: '<h3>Вопросы и ответы</h3>',
            html: '<div style="width=100px;">\
                        <details style="font-family:">\
                            <summary style="color: #444655; font-size: 23px;">Арендодателям</summary>\
                            <details>\
                                <summary style="color: #7797FF; font-size: 20px;">Как работать здесь?</summary>\
                                <h4 style="width:240px; margin-left: 115px; margin-top: 3px;">Тут очень просто отправь нам свою заявку!</h4>\
                            </details>\
                        </deatils>\
                    </div>\
                    <br>\
                    <div style="margin-right: 20px;">\
                        <details style="font-family:;">\
                            <summary style="color: #444655; font-size: 23px;">Арендателям</summary>\
                        </deatils>\
                    </div>\
                    <br>'
        })
    })
    
    contact_btn.addEventListener('click', function() {
        swal({
            title: '<h3 style="color: #4E7CFF;">Наши контакты</h3>',
            html: '<strong>Сотрудничество</strong>: trend.movies@mail.ru <br> <strong>Телефон</strong>: +7 776 537 2121 | +7 776 203 5150 <br> <strong>Instagram</strong>: <a href="https://www.instagram.com/yerb0/" style="text-decoration: none; color: #7797FF" target="blank">uide_kz</a>'
        })
    })

