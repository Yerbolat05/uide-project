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
            console.log(data.data[0])
            ads.innerHTML += `
                <div class:ads_pages style="width: 270px; height:350px; 
                    text-align: center; border:0.3px solid rgba(0, 0, 0, 0.587); 
                    margin: 10px; font-family: 'Jost', sans-serif; border-radius: 5px;">
                        
                        <img style="width: 270px; height: 190px; border-top-left-radius: 3px; 
                        border-top-right-radius: 3px;" src="${element.image}">
                        
                        <p style="font-size: 23px; color: #333333; margin-top: -5px;">${element.name}</p>
                        
                        <p style="font-size: 18px; color: rgba(0, 0, 0, 0.687); 
                        margin-top: -25px;">г.${element.city}</p>
                        
                        <p style="font-size: 18px; color: rgba(0, 0, 0, 0.687); 
                        margin-top: -23px;">${element.flat_count} комнат | ${element.range} | ${element.price}₸</p>
                <div>
                <button type="button" id="detail" style="background-color: white; border: none; color: #444655; font-size: 15px; cursor: pointer;">Подробнее</button>
                `

                let detail = document.getElementById('detail')
                detail.addEventListener('click', function() {
                    console.log('5')
                    localStorage.setItem('id',`${element.id}`)
                    location.href = './detail/'
                })
            
        });
    })
    .catch(err => {
        console.log(err)
    })
}

// Create -----------------------------------------------
let submit = document.getElementById('submit')
submit.addEventListener('click', (data) => {
    data.preventDefault()
    let image = document.getElementById('file').files,
    text_name = document.getElementById('text_name').value,
    term = document.getElementById('term').value,
    price = document.getElementById('price').value,
    number_flat = document.getElementById('number_flat').value,
    number_floor = document.getElementById('number_floor').value,
    number_bed = document.getElementById('number_bed').value,
    number_balcony = document.getElementById('number_balcony').value,
    number_bath = document.getElementById('number_bath').value,
    text_near = document.getElementById('text_near').value,
    description = document.getElementById('description').value,
    city = document.getElementById('city').value,
    number = document.getElementById('phone').value


    let datas = {
        'image' : image,
        'name' : text_name,
        'range' : term,
        'flat_count' : number_flat,
        'floor' : number_floor,
        'bed_count' : number_bed,
        'balcony_count' : number_balcony,
        'bathroom_count' : number_bath,
        'landmark' : text_near,
        'description' : description,
        'city' : city,
        'price' : price,
        'number' : number
    }
    console.log(datas)
    create()
    async function create(){
        const url = 'http://localhost:8000/api/v1/building'
        var request = new Request(url, {
            method: 'POST',
            body:  JSON.stringify(datas),
            headers: {
                'Content-Type': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        });
        fetch(request)
}
})

// Cabinet -----------------------------------------------

let username = document.getElementById('username')
    email = localStorage.getItem('email')

username.textContent = 'Здравствуй, '+ email

let public = document.getElementById('public')
public.addEventListener('click', function() {
    main.style.display = 'none'
    like_container.style.display = 'none'
    ads.style.display = 'none'
    create_ad.style.display = 'block'
    msg_content.style.display = 'none'
    cabinet_content.style.display  = 'none'
})


// Pop UP & Header -----------------------------------------------
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
    msg_btn = document.getElementById('message_btn'),
    cabinet_content = document.getElementById('cabinet_content'),
    cabinet_btn = document.getElementById('cabinet_btn'),
    still_block = document.getElementById('still_block'),
    still_ad = document.getElementById('still_ad'),
    house_on = document.getElementById('house_on'),
    house_off = document.getElementById('house_off'),
    heart_off = document.getElementById('heart_off'),
    heart_on = document.getElementById('heart_on'),
    plus_off = document.getElementById('plus_off'),
    plus_on = document.getElementById('plus_on'),
    chat_off = document.getElementById('chat_off'),
    chat_on = document.getElementById('chat_on'),
    person_off = document.getElementById('person_off'),
    person_on = document.getElementById('person_on')

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

like_btn.addEventListener('click', function() {
    main.style.display = 'none'
    like_container.style.display = 'block'
    ads.style.display = 'none'
    create_ad.style.display = 'none'
    msg_content.style.display = 'none'
    cabinet_content.style.display  = 'none'
    still_block.style.display = 'none'
    house_off.style.display = 'block'
    house_on.style.display = 'none'
    heart_off.style.display = 'none'
    heart_on.style.display = 'block'
    plus_on.style.display = 'none'
    plus_off.style.display = 'block'
    chat_on.style.display = 'none'
    chat_off.style.display = 'block'
    person_on.style.display = 'none'
    person_off.style.display = 'block'
})
home_btn.addEventListener('click', function() {
    main.style.display = 'block'
    like_container.style.display = 'none'
    ads.style.display = 'flex'
    create_ad.style.display = 'none'
    msg_content.style.display = 'none'
    cabinet_content.style.display  = 'none'
    still_block.style.display = 'block'
    house_off.style.display = 'none'
    house_on.style.display = 'block'
    heart_off.style.display = 'block'
    heart_on.style.display = 'none'
    plus_on.style.display = 'none'
    plus_off.style.display = 'block'
    chat_on.style.display = 'none'
    chat_off.style.display = 'block'
    person_on.style.display = 'none'
    person_off.style.display = 'block'
})
add_btn.addEventListener('click', function() {
    main.style.display = 'none'
    like_container.style.display = 'none'
    ads.style.display = 'none'
    create_ad.style.display = 'block'
    msg_content.style.display = 'none'
    cabinet_content.style.display  = 'none'
    still_block.style.display = 'none'
    house_off.style.display = 'block'
    house_on.style.display = 'none'
    heart_off.style.display = 'block'
    heart_on.style.display = 'none'
    plus_on.style.display = 'block'
    plus_off.style.display = 'none'
    chat_on.style.display = 'none'
    chat_off.style.display = 'block'
    person_on.style.display = 'none'
    person_off.style.display = 'block'
})
msg_btn.addEventListener('click', function() {
    main.style.display = 'none'
    like_container.style.display = 'none'
    ads.style.display = 'none'
    create_ad.style.display = 'none'
    msg_content.style.display = 'block'
    cabinet_content.style.display  = 'none'
    still_block.style.display = 'none'
    house_off.style.display = 'block'
    house_on.style.display = 'none'
    heart_off.style.display = 'block'
    heart_on.style.display = 'on'
    plus_on.style.display = 'none'
    plus_off.style.display = 'block'
    chat_on.style.display = 'block'
    chat_off.style.display = 'none'
    person_on.style.display = 'none'
    person_off.style.display = 'block'
})
cabinet_btn.addEventListener('click', function() {
    main.style.display = 'none'
    like_container.style.display = 'none'
    ads.style.display = 'none'
    create_ad.style.display = 'none'
    msg_content.style.display = 'none'
    cabinet_content.style.display  = 'block'
    still_block.style.display = 'none'
    house_off.style.display = 'block'
    house_on.style.display = 'none'
    heart_off.style.display = 'block'
    heart_on.style.display = 'on'
    plus_on.style.display = 'none'
    plus_off.style.display = 'block'
    chat_on.style.display = 'none'
    chat_off.style.display = 'block'
    person_on.style.display = 'block'
    person_off.style.display = 'none'
})

still_ad.addEventListener('click', function() {
    location.href = '../view-more'
})
