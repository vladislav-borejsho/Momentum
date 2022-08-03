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
    const timeOfDay = getTimeofDay();
    const greetingText = `Good ${timeOfDay}`;
    greeting.textContent = greetingText;
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
}

function setLocalStorage () {
    const inputName = document.querySelector('.name')
    localStorage.setItem('name', inputName.value)
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        inputName.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)

                    // 3. Слайдер изображений //

body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/01.jpg')";