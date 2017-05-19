$(document).ready(function () {
  /*--------------------------------------------------------------
  # Define global variables
  --------------------------------------------------------------*/
  var weatherData, temp, wind, icon;
  var lat = 42;
  var lng = 41;
  var measurement = "imperial";
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
    temp = weatherData.currently.temperature
    $("#temp").html(weatherData.currently.temperature + "&deg;F");
    $("#currentWeather").html(weatherData.currently.summary);
    var icon = weatherData.currently.icon;
    // Add Sky Icon
    var skycons = new Skycons({
      "color": "black"
    });
    // Add canvas by ID
    skycons.add("weather-icon", icon);
    // Start animation!
    skycons.play();
  }

  /*--------------------------------------------------------------
  # switchDegrees()
  --------------------------------------------------------------*/
  function convert() {
    if (measurement === "imperial") { // If 'murica measurements
      measurement = "metric"; // Change to metric
      temp = (temp - 32) * (5 / 9); // Change to Celsius ( c = f - 32 *(5/9))
      $("#temp").fadeOut(300, function () { //Neat fade effect
        $("button>span").html("F"); // Make the button say "Show in °F"
        $("#temp").html(Math.round(temp) + "&deg;C"); // Display temperature as `XX°C`
        $("#temp").fadeIn(300); // Fade it in
      });
    } else { //Otherwise it's metric
      measurement = "imperial"; // Change to American / Imperial measurements
      temp = temp * 9 / 5 + 32; // Change to Fahrenheit (F = C * 9 / 5 + 32)
      $("#temp").fadeOut(300, function () {
        $("button>span").html("C"); // Make the button say "Show in °C"
        $("#temp").html(Math.round(temp) + "&deg;F"); // Display temperature as `XX°F`
        $("#temp").fadeIn(300); // Fade them in
      });
    }
  }
  /*--------------------------------------------------------------
  ## Convert button click handler | When you click the "Show in °X" button
  --------------------------------------------------------------*/
  $("#switch").click(function () {
    convert();
  });
});
