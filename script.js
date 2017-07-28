document.addEventListener('DOMContentLoaded', function () {
  getLocation();
});

document.getElementById("switchtemp").addEventListener('click', convertTemp);
// document.getElementById("loadweather").addEventListener('click', loadWeather);

var weatherData, temp, wind, icon, fetchURL, skycons;
var lat = 42;
var lng = 41;
var measurement = "imperial";
var baseURL = "https://api.darksky.net/forecast/c0e823d8c84f968c97291b5c57af2288/";


// function loadWeather() {
//   getWeather();
//   document.getElementById("loadweather").style.display = "none";
//   document.getElementById("status").style.display = "block";
// };

function getLocation() {
  navigator.geolocation.getCurrentPosition(function (position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    getWeather()
  })
}

function getWeather() {
  var fetchURL = baseURL + lat + "," + lng;
  fetch(fetchURL, {
    cache: "reload"
  })
    .then(
    function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      // Examine the text in the response
      response.json().then(function (data) {
        weatherData = data;
        console.log(data);
        showWeather();
      });
    }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });

}

function showWeather() {
  document.getElementsByClassName("timezone")[0].innerHTML = weatherData.timezone;
  document.getElementsByClassName("temperature")[0].innerHTML = weatherData.currently.temperature; //+ "&deg;F";
  document.getElementsByClassName("summary")[0].innerHTML = weatherData.currently.summary;
  var icon = weatherData.currently.icon;
  var skycons = new Skycons({
    "color": "white"
  });
  skycons.add("weather-icon", icon);
  skycons.play();
  convertTemp();
}

function convertTemp() {
  temp = weatherData.currently.temperature
  if (measurement === "imperial") {
    measurement = "metric";
    temp = (temp - 32) * (5 / 9);
    document.getElementById("switchtemp").innerHTML = "Show in &degF";
    document.getElementsByClassName("temperature")[0].innerHTML = Math.round(temp) + "&deg;C";
  }
  else {
    measurement = "imperial";
    temp = temp * 9 / 5 + 32;
    document.getElementById("switchtemp").innerHTML = "Show in &degC";
    document.getElementsByClassName("temperature")[0].innerHTML = Math.round(temp) + "&deg;F";
  }
}
