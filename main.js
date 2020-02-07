
const darkSkyKey = '776681cd1b856d7f09336e76c87ef4e6';
// let latitude = 40.676022;
// let longitude = -73.917931;
let latitude = null;
let longitude = null;
let weatherData = null;

let button = document.getElementById("get-location");
let latText = document.getElementById("latitude");
let longText = document.getElementById("longitude");


button.addEventListener("click", function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    latText.innerText = `Estas localizado en ${latitude.toFixed(2)}° latitud por `;
    longText.innerText =`${longitude.toFixed(2)}° longitud.`;
    getDarkSkyData(darkSkyKey, latitude, longitude);
  });
});


function getDarkSkyData(darkSkyKey, latitude, longitude) {
    // API URL with CORS Anywhere to avoid CORS error
    let darkSkyAPI = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkSkyKey}/${latitude},${longitude}?lang=es`
    console.log(darkSkyAPI);

    // Grab JSON data from Dark Sky API
    let request = new XMLHttpRequest();
    request.open('GET', darkSkyAPI);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        weatherData = request.response;
        // printData(weatherData);
        console.log("hola!")
        updatePage(weatherData);
        return weatherData;
    }
}

function updatePage(json) {
    currentWeather = document.querySelector('#current-weather');
    currentCity = document.querySelector('#current-city');
    currentTemp = document.querySelector('#current-temp');
    currentFeelsLike = document.querySelector('#feels-like');
    currentHumidity = document.querySelector('#current-humidity');


    currentWeather.textContent = json.minutely.summary;
    // currentWeather.textContent = json.currently.summary;
    currentTemp.textContent = `Temperatura: ${json.currently.temperature} ℉`;
    currentFeelsLike.textContent = `Se siente como: ${json.currently.apparentTemperature} ℉`;
    currentHumidity.textContent = `Humedad: ${parseFloat(json.currently.humidity) * 100}%`;
}