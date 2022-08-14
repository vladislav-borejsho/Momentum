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
    console.log(data);
}
getQuotes()