/*
var x = document.getElementById("text");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}

function getWeatherInfo() {
  $.ajax({
    url: "https://api.darksky.net/forecast/c0e823d8c84f968c97291b5c57af2288/" + position.coords.latitude + "," + position.coords.longtitude,
    success: function (json) {
      console.log(json);
      $("#locationCity").html(json.timezone);
      //$("#quote-author").html("- " + post.title);
    },
    cache: false
  });
}

$(document).ready(function () {
  getLocation();
  $("#find-me").on("click", getWeatherInfo);
});
*/

$(document).ready(function () {
  /*--------------------------------------------------------------
  # Define global variables
  --------------------------------------------------------------*/
  var weatherData, temp, wind, icon;
  var lat = 42;
  var lng = 41;
  var baseURL = "https://api.darksky.net/forecast/c0e823d8c84f968c97291b5c57af2288/";

  /*--------------------------------------------------------------
  # Init
  --------------------------------------------------------------*/
  getLocation();

  /*--------------------------------------------------------------
  # getLocation()
  --------------------------------------------------------------*/
  function getLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      // Get the coordinates of the current possition.
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      showCurrentPosition();
      getWeather();
    })
  }

  /*--------------------------------------------------------------
    # showCurrentPosition()
    --------------------------------------------------------------*/
  function showCurrentPosition() {
    $("#latitude").html(lat.toFixed(3));
    $("#longitude").html(lng.toFixed(3));
  }

  /*--------------------------------------------------------------
  # getWeather()
  --------------------------------------------------------------*/
  function getWeather() {
    $.ajax({
      url: baseURL + lat + "," + lng,
      dataType: "json",
      success: function (data) {
        console.log(data);
        weatherData = data;
        showWeather();
      }
    });
  }

  /*--------------------------------------------------------------
  # showWeather()
  --------------------------------------------------------------*/
  function showWeather() {
    $("#location").html(weatherData.timezone);
    $("#temp").html(weatherData.currently.temperature + "&deg;F");
    $("#currentWeather").html(weatherData.currently.summary);

    var icon = weatherData.currently.icon;
	  // Add Sky Icon
		var skycons = new Skycons({"color": "black"});

		// Add canvas by ID
		skycons.add("weather-icon", icon);

		// Start animation!
		skycons.play();


}
});
