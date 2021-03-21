const key = '8d523de3bb97c670d9c003756634841f';

// HTML DOM elements o be updated on getting weather conditions
let place = document.querySelector('.location-timezone');
let weatherIcon = document.querySelector('.icon');
let temp = document.querySelector('.temp-degree');
let summary = document.querySelector('.temp-desc');
let msg = document.querySelector(".msg");

// initial position - Delhi
const lat = 28.6667;
const long = 77.2167;

window.addEventListener('load', () => {
    const geoApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${key}`;

    fetch(geoApi)
        .then(response => response.json())
        .then(displayResults)
        .catch(() => {
            msg.textContent = 'Please search for a valid city'
        });

    msg.textContent = "";
});

const searchBox = document.getElementById("city-name");
const searchBtn = document.querySelector(".search");

searchBtn.addEventListener('click', (e) => {
    // console.log(searchBox.value);
    getResults(searchBox.value);
});

function getResults(city) {
    const cityApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;

    fetch(cityApi)
        .then(weather => weather.json())
        .then(displayResults)
        .catch(() => {
            msg.textContent = 'Please search for a valid city'
        });

    msg.textContent = "";
}

function displayResults(data) {
    temp.textContent = data.main.temp;
    summary.textContent = data.weather[0].main;
    place.textContent = data.name + ", " + data.sys.country;
    let { icon } = data.weather[0];
    var iconurl = " http://openweathermap.org/img/wn/" + icon + "@2x.png";
    weatherIcon.setAttribute("src", iconurl);
}