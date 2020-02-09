
const darkSkyKey = '776681cd1b856d7f09336e76c87ef4e6';

let latitude = null;
let longitude = null;
let weatherData = null;
let searchData = null;

let button = document.getElementById("get-location");
let latText = document.getElementById("latitude");
let longText = document.getElementById("longitude");
let mapImage = document.getElementById('map');


//Use Browser Geolocation to pull Latitude and Longitude
button.addEventListener("click", function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    latText.innerText = `Estas localizado en ${latitude.toFixed(2)}° latitud por `;
    longText.innerText =`${longitude.toFixed(2)}° longitud.`;
    getDarkSkyData(darkSkyKey, latitude, longitude);
  });
});


// Make the API call to Dark Sky and receive data
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
        updatePage(weatherData);
        return weatherData;
    }

    latText.innerText = `Estas localizado en ${latitude.toFixed(2)}° latitud por `;
    longText.innerText =`${longitude.toFixed(2)}° longitud.`;
    getMapBoxImage(latitude, longitude);
}

// Update the page with the received Dark Sky Data
function updatePage(json) {
    currentWeather = document.querySelector('#current-weather');
    currentCity = document.querySelector('#current-city');
    currentTemp = document.querySelector('#current-temp');
    currentFeelsLike = document.querySelector('#feels-like');
    currentHumidity = document.querySelector('#current-humidity');


    currentWeather.textContent = json.minutely ? json.minutely.summary : json.hourly.summary;
    currentTemp.textContent = `Temperatura: ${Math.round(json.currently.temperature)} ℉`;
    currentFeelsLike.textContent = `Se siente como: ${Math.round(json.currently.apparentTemperature)} ℉`;
    currentHumidity.textContent = `Humedad: ${parseFloat(json.currently.humidity) * 100}%`;
}

// Use MapBox to display an image map per your latitude and longitude
function getMapBoxImage(latitude, longitude) {
    mapImage.src = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/${longitude},${latitude},9/297x200?access_token=pk.eyJ1IjoiYXJ0cm9kcmlndWV6IiwiYSI6ImNrNmJxYTh0MzByNWYzcHJ6cGJ3N3doZGkifQ.3F4_kRcNUf6ucC1Om0eC3Q`
}

function findMyCity() {
    let searchString = document.getElementById("mySearch").value;
    let mapBoxCityAPI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchString}.json?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g&cachebuster=1581226421146&autocomplete=true`;
    let searchList = document.getElementById("search-results");


    // Grab JSON data from MapBox API
    let request = new XMLHttpRequest();
    request.open('GET', mapBoxCityAPI);
    request.responseType = 'json';
    request.send();

    let searchResultCities = null;
    request.onload = function() {
        searchData = request.response;
        // updatePage(weatherData);
        searchResultCities = searchData.features
        searchResultCities.map(city => {
            // console.log(city.place_name);
            // console.log(searchList);
            latitude = city.center[1];
            longitude = city.center[0];
            console.log(latitude, longitude);
            // searchList.innerHTML += "<li>" + city.place_name + "</li>";
            searchList.innerHTML += `<li onclick="getDarkSkyData(darkSkyKey, ${latitude}, ${longitude})" >${city.place_name}</li>`;
        });
        return searchData;
    }
    
}