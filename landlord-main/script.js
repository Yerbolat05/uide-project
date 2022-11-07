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

function sendEmail(){
    let email = document.getElementById('email').value
        region = document.getElementById('region').value
        flat_count = document.getElementById('number').value
        phone = document.getElementById('phone').value

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "askar.mygal@gmail.com",
        Password : "8EABDA4640052A0F882229D0800D6709F8DC",
        To : 'uide.form@gmail.com',
        From : "askar.mygal@gmail.com",
        Subject : "New Landlord Message",
        Body : `Здравствуйте мой email - ${email} Я хочу работать с вами!. 
                У меня ${flat_count} квартир. Район ${region}. Мой телефон номер ${phone}.`
    }).then(
      message => swal({
        position: 'top-end',
        title: 'Заявка успешно отправлено!',
        showConfirmButton: false,
        timer: 1500
      })
    );
}