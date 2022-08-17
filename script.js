console.log(Score 85/150

Часы и календарь 15
-время выводится в 24-часовом формате, например: 21:01:00 +5
-время обновляется каждую секунду - часы идут. Когда меняется одна из цифр, остальные при этом не меняют своё положение на странице (время не дёргается) +5
-выводится день недели, число, месяц, например: "Воскресенье, 16 мая" / "Sunday, May 16" / "Нядзеля, 16 траўня" +5

 Приветствие 10
-текст приветствия меняется в зависимости от времени суток (утро, день, вечер, ночь) +5
 -пользователь может ввести своё имя. При перезагрузке страницы приложения имя пользователя сохраняется, данные о нём хранятся в local storage +5

 Смена фонового изображения 20
 -ссылка на фоновое изображение формируется с учётом времени суток и случайного номера изображения (от 01 до 20) +5
 -изображения перелистываются последовательно - после 18 изображения идёт 19 (клик по правой стрелке), перед 18 изображением идёт 17 (клик по левой стрелке) +5
 -изображения перелистываются по кругу: после двадцатого изображения идёт первое (клик по правой стрелке), перед 1 изображением идёт 20 (клик по левой стрелке) +5
 -при смене слайдов важно обеспечить плавную смену фоновых изображений. Не должно быть состояний, когда пользователь видит частично загрузившееся изображение или страницу без фонового изображения.+5

 Виджет погоды 15
 -при перезагрузке страницы приложения указанный пользователем город сохраняется, данные о нём хранятся в local storage +5
 -для указанного пользователем населённого пункта выводятся данные о погоде, если их возвращает API. данные о погоде включают в себя: иконку погоды, описание погоды, температуру в °C, скорость ветра в м/с, относительную влажность воздуха в %. Числовые параметры погоды округляются до целых чисел +5
 -выводится уведомление об ошибке при вводе некорректных значений, для которых API не возвращает погоду (пустая строка или бессмысленный набор символов) +5

 Виджет цитата дня +10
 -при загрузке страницы приложения отображается рандомная цитата и её автор +5
 -при перезагрузке страницы цитата обновляется (заменяется на другую). Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) +5

 Аудиоплеер 15
 -при клике по кнопке Play/Pause проигрывается первый трек из блока play-list, иконка кнопки меняется на Pause +3
 -при клике по кнопке Play/Pause во время проигрывания трека, останавливается проигрывание трека, иконка кнопки меняется на Play +3
-треки пролистываются по кругу - после последнего идёт первый (клик по кнопке Play-next), перед первым - последний (клик по кнопке Play-prev) +3
 -трек, который в данный момент проигрывается, в блоке Play-list выделяется стилем +3
 -после окончания проигрывания первого трека, автоматически запускается проигрывание следующего. Треки проигрываются по кругу: после последнего снова проигрывается первый. +3)

                    //1. Часы и календарь//

const time = document.querySelector('.time')
const dateShow = document.querySelector('.date')

function showTime() {
    const date = new Date(); //получить текущие дату и время
    const currentTime = date.toLocaleTimeString(); //из строки с датой и временем получить только время
    time.textContent = currentTime; //отобразить внутри элемента время
    setTimeout(showTime,1000);//Время обновляется каждую секунду
    showDate();
    showGreeting();
}
showTime()

function showDate()  {
    const date = new Date();
    const options = {month: 'long',weekday:'long', day: 'numeric'};
    const currentDate = Intl.DateTimeFormat('en-US', options).format(date);
    dateShow.textContent = currentDate;
}

                    //2. Приветствие//

function showGreeting () {
    const greeting = document.querySelector('.greeting')
    let timeOfDay = getTimeofDay();
    const greetingText = `Good ${timeOfDay}`;
    greeting.textContent = greetingText;     
    return timeOfDay;
}
function getTimeofDay() {
    const date = new Date();
    const hours = date.getHours();
    const min = date.getMinutes();
    let greeting = '';
    if (hours > -1 && hours < 6) {
        greeting += 'night';
    } 
    else if (hours > 5 && hours < 12) {
        greeting += 'morning';
    } 
    else if (hours > 11 && hours < 18) {
        greeting += 'afternoon';
    }
    else if (hours > 17 && hours < 24) {
        greeting += 'evening';
    }
    return greeting;
    } 

function setLocalStorageName () {
    const inputName = document.querySelector('.name')
    localStorage.setItem('name', inputName.value)
}
window.addEventListener('beforeunload', setLocalStorageName)

function getLocalStorageName() {
    if (localStorage.getItem('name')) {
        inputName.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorageName)

                    // 3. Слайдер изображений //
const body = document.querySelector('body')
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')
    let timeOfDay = getTimeofDay();
    let randomNum = getRandomNum(1,20);

function getRandomNum(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min
}

function setBg() {
    const img = new Image();
    let randNum = randomNum.toString().padStart(2,'0');

    img.src = `https://raw.githubusercontent.com/vladislav-borejsho/Momentum/main/assets/img/${timeOfDay}/${randNum}.jpg`;
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`;
    }
}
setBg()

function getSlideNext () {
    if (randomNum < 20) {
        randomNum += 1;
    } else {
        randomNum = 1;
    }
    setBg()
}
function getSlidePrev () {
    if (randomNum > 2) {
        randomNum -= 1;
    } else {
        randomNum = 20;
    }
    setBg()
}
slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)

                        // 4. Виджет погоды //

const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const weatherError = document.querySelector('.weather-error')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const city = document.querySelector('.city')
city.value = getLocalStorageCity()

city.addEventListener('change', getWeather)

async function getWeather() {        
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=d5e6290f7b9ec107a419737efbb3ff86&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    try {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.ceil(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description; 
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind speed: ${Math.round(data.wind.speed)}m/s`;
        weatherError.textContent = '';
    }
    catch (er) {
        weatherIcon.className = '';
        temperature.textContent = '';
        humidity.textContent = '';
        wind.textContent = '';
        weatherDescription.textContent = '';
        weatherError.textContent = data.message;
    }
}
getWeather()

function setLocalStorageCity () {
    const city = document.querySelector('.city')
    localStorage.setItem('city', city.value)
}
window.addEventListener('beforeunload', setLocalStorageCity)

function getLocalStorageCity() {
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    } else { 
        city.value = 'Minsk';
    }
    return city.value;
}
window.addEventListener('load', getLocalStorageCity)

                        // 5. Цитата дня //
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote')

changeQuote.addEventListener('click', getQuotes)

function getRandomNumForQuote(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min
}

async function getQuotes() {
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    let randNum = getRandomNumForQuote(0,6);

    quote.textContent = data[randNum].text;
    author.textContent = data[randNum].author;
}
getQuotes()

                        // 6. Аудиоплеер //
import playList from './playList.js';
const playBtn = document.querySelector('.play')
const playNextBtn = document.querySelector('.play-next')
const playPrevBtn = document.querySelector('.play-prev')
const playListContainer = document.querySelector('.play-list')
const audio = new Audio();
    let isPlay = false;
    let playNum = 0;

function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    playNow();
        if(!isPlay) {
        audio.play(); 
        isPlay = true;
        playBtn.classList.toggle('pause');
    } else {
        audio.pause(); 
        isPlay = false;
        playBtn.classList.toggle('pause');
    }
}

function playNext() {
    if (playNum < 3) {playNum += 1;} else {playNum = 0}
    playAudio();
    if(!isPlay) {
        audio.play(); 
        isPlay = true;
        playBtn.classList.toggle('pause');
    } else {
        audio.pause(); 
        isPlay = false;
        playBtn.classList.toggle('pause');
    }
}
function playPrev() {
    if (playNum > 0) {playNum -= 1;} else {playNum = 3}
    playAudio();
    if(!isPlay) {
        audio.play(); 
        isPlay = true;
        playBtn.classList.add('pause');
    } else {
        audio.pause(); 
        isPlay = false;
        playBtn.classList.remove('pause');
    }
}

    for (let i=0; i < playList.length; i++) {
        const li = document.createElement('li')
        li.textContent = playList[i].title;
        li.classList.add('play-item');
        playListContainer.append(li);
    }   

    function playNow() {
        const playListSong = document.querySelector('.play-list');
        let playTrackNow = playListSong.children;
        for (let i=0; i <= 3; i++) {
            playTrackNow[i].classList.remove('item-active');
            } 
            playTrackNow[playNum].classList.add('item-active');
        }     
    
    
playBtn.addEventListener('click', playAudio)
playNextBtn.addEventListener('click', playNext)
playPrevBtn.addEventListener('click', playPrev)
