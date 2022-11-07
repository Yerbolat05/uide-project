let about_btn = document.getElementById("about"),
    ask_btn = document.getElementById('ask'),
    contact_btn = document.getElementById('contact')

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

let center = [49.803418067312236,73.08978554410159]
function init() {
    let map = new ymaps.Map('map', {
        center: center,
        zoom: 17
    });

    let placemark_one = new ymaps.Placemark([49.80317995439671,73.08928173489292], {}, {
            preset: 'islands#circleIcon',
            iconColor: '#7797FF'
    });

    let placemark_two = new ymaps.Placemark([49.803186898391175,73.08921736187655], {}, {
            preset: 'islands#circleIcon',
            iconColor: '#7797FF'
    });

    let placemark_three = new ymaps.Placemark([49.80315434840846,73.0892180324327], {}, {
            preset: 'islands#circleIcon',
            iconColor: '#7797FF'
    });

    let placemark_four = new ymaps.Placemark([49.80309966438796,73.08904972381701], {}, {
            preset: 'islands#circleIcon',
            iconColor: '#7797FF'
    });

    let placemark_five = new ymaps.Placemark([49.80310877839569,73.08901418454754], {}, {
            preset: 'islands#circleIcon',
            iconColor: '#7797FF'
    });

    let placemark_six = new ymaps.Placemark([49.803043678302615,73.08878887899029], {}, {
            preset: 'islands#circleIcon',
            iconColor: '#7797FF'
    });
    
    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил

    map.geoObjects.add(placemark_one)
    .add(placemark_two)
    .add(placemark_two)
    .add(placemark_three)
    .add(placemark_four)
    .add(placemark_five)
    .add(placemark_six)
}

ymaps.ready(init)



var accessToken = localStorage.getItem('access')
var refreshToken = localStorage.getItem('refresh')
let ad_pages = document.getElementById('ad_pages')

start()
async function start(){
    console.log('Enter start')
    var url = 'http://localhost:8000/api/v1/buildings'
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
            ad_pages.innerHTML += `
                <div style="width: 775px; height:310px; margin-bottom: 10px; border:0.3px solid rgba(0, 0, 0, 0.587); font-family: 'Jost', sans-serif;">
                    
                    <div>
                        <p style="margin-left: 10px; font-size: 20px; color: 4C4C4C;">${element.name}</p>
                        <p style="margin-top: -15px; margin-left: 10px; font-weight: large;">${element.city}</p>
                    </div>

                    <div style="display: flex; flex-direction: row;">

                        <div style="display: flex; margin: 10px; margin-top: -10px;">
                            <img style="width: 450px; height: 230px;" src="${element.image}">
                        <div>

                        <div style="margin: 10px;">
                            <p>Цена : ${element.price}₸</p>
                            <p>${element.flat_count} комнатая </p>
                            <p>Срок аренды : ${element.range}</p>
                            <p>Рядом : ${element.landmark}</p>
                            <button style="width: 150px; height: 30px; background-color: #5C6698; color: white; font-size: 16px; border: none; border-radius: 5px;">Позвонить</button>
                        </div>

                    </div>
                    
                <div>


                `


        });
    })
    .catch(err => {
        console.log(err)
    })
}