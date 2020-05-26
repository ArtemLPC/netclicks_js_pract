const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';

//получаем меню

let leftMenu = document.querySelector('.left-menu');
console.log(leftMenu);
let hamburger = document.querySelector('.hamburger');
console.log(hamburger);
let tvShowsList = document.querySelector('.tv-shows__list');
console.log(tvShowsList);
let modal = document.querySelector('.modal');
console.log(modal);
// let cross = document.querySelector('.cross');
// console.log(cross);



//получение инфы от сервера
const DBService = class {
    getData = async (url) => {
        const res = await fetch(url); //fetch - API которое делает запрос на сервер и возвращает ответ?Или нет?Короче API которое есть в браузере
        console.log(res);
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`Не удалось получить данные по адресу ${url}`)
        }
    }

    getTestData =  () => {
        return this.getData('test.json')
    }
}

const renderCard = response => {
    console.log(response);
    tvShowsList.textContent = '';

    response.results.forEach(item => {

        const {backdrop_path: backdrop, 
               name: title, 
               poster_path: poster, 
               vote_average: vote
               } = item;
               
        console.log(item);

        const card = document.createElement('li');
        card.className = 'tv-shows__item';
        card.innerHTML = `
        <a href="#" class="tv-card">
                        <span class="tv-card__vote">${vote}</span>
                        <img class="tv-card__img"
                             src="${IMG_URL+poster}"
                             data-backdrop="${IMG_URL+backdrop}"
                             alt="${title}">
                        <h4 class="tv-card__head">${title}</h4>
                    </a>
        `;

        console.log(card); 

        tvShowsList.append(card);

    });

};

new DBService().getTestData().then(renderCard);







//открытие/закрытие меню
hamburger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});

//закрытие бокового меню при клике вне бокового меню
document.body.addEventListener('click', (event) => {
    if(!event.target.closest('.left-menu')){  //почитать про closest!!!
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
    }
});

//расскрытие выпадающих меню в боковом меню
leftMenu.addEventListener('click', (event) => {
    let target = event.target;
    let dropdown = target.closest('.dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        leftMenu.classList.add('openMenu');     //расскрытие бокового меню при клике на иконки при свернутом боковом меню
        hamburger.classList.add('open');        //расскрытие бокового меню при клике на иконки при свернутом боковом меню
    }
});

//открытие модального окна
tvShowsList.addEventListener('click', event => {

    event.preventDefault(); //отмена поднятия вверх при клике на ссылку со значением href='#'

    let target = event.target;
    console.log(target);
    let card = target.closest('.tv-card');
    console.log(card);

    if(card) {
        document.body.style.overflow = 'hidden';
        modal.classList.remove('hide');
    }
});

//закрытие модального окна
modal.addEventListener('click', event => {
    if(event.target.closest('.cross') ||  //определим крестик и будем по нему закрывать окно
        event.target.classList.contains('modal')) {  //определим белое пространство вне окна и будем по нему закрывать окно
        document.body.style.overflow = '';
        modal.classList.add('hide');
    } 

});


//смена карточки(картинок):
let changeImage = event => {
    let card = event.target.closest('.tv-shows__item');

    if (card) {
        let img = card.querySelector('.tv-card__img');
        console.log(img);
        let changeImg =  img.dataset.backdrop;
        console.log(changeImg);
        if (changeImg){
        img.dataset.backdrop = img.src;
        img.src = changeImg;
        }
    }
};

tvShowsList.addEventListener('mouseover', changeImage);
tvShowsList.addEventListener('mouseout', changeImage);


