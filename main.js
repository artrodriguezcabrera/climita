
darkSkyKey = [DarkSkyKey]
latitude = 40.676022;
longitude = -73.917931;


let darkSkyAPI = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkSkyKey}/${latitude},${longitude}?lang=es`

console.log(darkSkyAPI);


// Grab JSON data from Dark Sky API
let request = new XMLHttpRequest();
request.open('GET', darkSkyAPI);
request.responseType = 'json';
request.send();

let weatherData = null;

request.onload = function() {
    weatherData = request.response;
    // printData(weatherData);
    // console.log("hola!")
    updatePage(weatherData);
    return weatherData;
}


// https://api.darksky.net/forecast/776681cd1b856d7f09336e76c87ef4e6/40.6760,-73.9179

// function printData(jsonObj) {
//     console.log(jsonObj);
// }

function updatePage(json) {
    currentWeather = document.querySelector('#current-weather');
    currentCity = document.querySelector('#current-city');
    currentTemp = document.querySelector('#current-temp');
    currentFeelsLike = document.querySelector('#feels-like');
    currentHumidity = document.querySelector('#current-humidity');


    currentWeather.textContent = json.minutely.summary;
    // currentWeather.textContent = json.currently.summary;
    currentTemp.textContent = `${json.currently.temperature} ℉`;
    currentFeelsLike.textContent = `${json.currently.apparentTemperature} ℉`;
    currentHumidity.textContent = `${parseFloat(json.currently.humidity) * 100}%`;

}


