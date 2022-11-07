var accessToken = localStorage.getItem('access')
var refreshToken = localStorage.getItem('refresh')
let ads = document.getElementById('pages_ad')

start()
async function start(){
    console.log('Enter start')
    var url = 'http://localhost:8000/api/v1/building'
    var response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization' : 'Usr' + accessToken
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log('DATA ------')
        data.data.forEach(element => {
            console.log(element)
            ads.innerHTML = `
                <h1>${element.name}</h1>
                <h3>${element.flat_count}-комнатная</h3>
                <h3>${element.range}</h3>
                `
            ads.style.color = '#4E7CFF'
            ads.style.textAlign = 'center'
            ads.style.margin = '0px auto'
            ads.style.border = '1px black solid'
            ads.style.width = '500px'
            ads.style.width = '250px'
        });
    })
    .catch(err => {
        console.log(err)
    })
}


let image = document.getElementById('file'),
    text_name = document.getElementById('text_name'),
    term = document.getElementById('term'),
    price = document.getElementById('price'),
    number_flat = document.getElementById('number_flat'),
    number_floor = document.getElementById('number_floor'),
    number_bed = document.getElementById('number_bed'),
    number_balcony = document.getElementById('number_balcony'),
    number_bath = document.getElementById('number_bath'),
    text_near = document.getElementById('text_near'),
    namese = document.getElementById('namese'),
    city = document.getElementById('city'),
    submit = document.getElementById('submit')

let datas = {
    'id' : 8,
    'image' : 'https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-ru.jpg',
    'name' : 'Girl',
    'range' : 'посуточна',
    'flat_count' : 1,
    'floor' : 2,
    'bed_count' : 1,
    'balcony_count' : 1,
    'bathroom_count' : 1,
    'landmark' : 'Hospital',
    'description' : {
        'text' : 'Cool'
    },
    'city' : 'Karaganda',
    'price' : 5000,
    'datetimes_created' : '022-06-06T12:57:15.663620+06:00',
    'datetimes_updated' : '022-06-06T12:57:15.663620+06:00',
    'names' : 'https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-ru.jpg'
}



submit.addEventListener('click', (data) => {
    data.preventDefault()
    console.log(datas)
    create()
    async function create(){
        const url = 'http://localhost:8000/api/v1/building'
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




let about_btn = document.getElementById("about"),
    ask_btn = document.getElementById('ask'),
    contact_btn = document.getElementById('contact'),
    like_btn = document.getElementById('like_btn'),
    home_btn = document.getElementById('home_btn'),
    like_container = document.getElementById('like_container'),
    main = document.getElementById('main'),
    add_btn = document.getElementById('add_btn'),
    create_ad = document.getElementById('create_ad'),
    msg_content = document.getElementById('msg_content'),
    msg_btn = document.getElementById('message_btn')

about_btn.addEventListener('click', function(){
    swal({
        imageUrl: '../images/logo-popup.png',
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: 'Custom image',
        html: '<strong>Uide</strong> - сайт для аренды недвижимости. <br> Мы только в Караганде! (не на долго) <br> Автор прокта: Калиев Ерболат Маратович...'
    })
  });

ask_btn.addEventListener('click', function() {
    swal({
        title: '<h3 style="color: #4E7CFF;">Вопросы и ответы</h3>',
        html: '<div><details style="font-family: Verdana, Geneva, Tahoma, sans-serif;"><summary style="color:black;">Для чего нужен?</summary><span style="font-size:15px;">Чтобы пользователь искал себе квартиру<span></deatils></div><br><div><details style="font-family: Verdana, Geneva, Tahoma, sans-serif;"><summary style="color:black;">Для кого это приложение?</summary><span style="font-size:15px;">Для всех<span></deatils></div><br><div><details style="font-family: Verdana, Geneva, Tahoma, sans-serif;"><summary style="color:black;">Как на этом зарабатовать?</summary><span style="font-size:15px;">Если ты арендодатель то отправь нам заявку<span></deatils></div>'
    })
})

contact_btn.addEventListener('click', function() {
    swal({
        title: '<h3 style="color: #4E7CFF;">Наши контакты</h3>',
        html: '<strong>Сотрудничество</strong>: trend.movies@mail.ru <br> <strong>Телефон</strong>: +7 776 537 2121 | +7 776 203 5150 <br> <strong>Instagram</strong>: <a href="https://www.instagram.com/yerb0/" style="text-decoration: none; color: #7797FF" target="blank">uide_kz</a>'
    })
})

like_btn.addEventListener('click', function() {
    main.style.display = 'none'
    like_container.style.display = 'block'
    ads.style.display = 'none'
    create_ad.style.display = 'none',
    msg_content.style.display = 'none'
})
home_btn.addEventListener('click', function() {
    main.style.display = 'block'
    like_container.style.display = 'none'
    ads.style.display = 'block'
    create_ad.style.display = 'none'
    msg_content.style.display = 'none'
})
add_btn.addEventListener('click', function() {
    main.style.display = 'none'
    like_container.style.display = 'none'
    ads.style.display = 'none'
    create_ad.style.display = 'block'
    msg_content.style.display = 'none'
})
msg_btn.addEventListener('click', function() {
    main.style.display = 'none'
    like_container.style.display = 'none'
    ads.style.display = 'none'
    create_ad.style.display = 'none'
    msg_content.style.display = 'block'
})


let cabinet_btn = document.getElementById('cabinet_btn')
cabinet_btn.addEventListener('click', function() {
    location.href = '../'
})