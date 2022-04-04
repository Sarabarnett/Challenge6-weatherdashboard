

$(document).ready(function () {
  //search button function
  $("#submitSearch").on("click", function () {
    var cityName = $("#city-name").val();
    
    getCurrentWeather(cityName);
    getFutureForcast(cityName);

    //clear input box
    $("#city-name").val("");
  })
})

//get items from search history from localstorage
var cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];
  if (cityHistory.length > 0) {
    getCurrentWeather(cityHistory[cityHistory.length - 1]);
  }
  //creat new list item for search history cities
  for (var i = 0; i < cityHistory.length; i++) {
    createListItem(cityHistory[i]);
  }

  function createListItem(text) {
    var cityList = $("<li>").addClass("list-group-item").text(text);
    $(".cityHistory").append(cityList);
    }

  //get current weather data 
  function getCurrentWeather() {
    var city = $("#city-name").val();
    
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=fe7d04271c1a604e39530bb51dc1d610&units=imperial"
    )
    .then(function (response) {
      return response.json();
    })
    //create HTML card with api data
    .then(function (data) {
      console.log(data);
      if (cityHistory.indexOf(city) === -1) {
        cityHistory.push(city);
        localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
        createListItem(city);
      }

      //remove content from today's weather section
      $("#todayForecast").empty();

      //create HTML section with api data
      var cityTitle = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
      var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
      var card = $("<div>").addClass("card");
      var cardBody = $("<div>").addClass("card-body");
      var temperature = $("<p>").addClass("card-text").text("Temp: " + data.main.temp + " °F");
      var wind = $("<p>").addClass("card-text").text("Wind: " + data.wind.speed + " MPH");
      var humidity = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + " %");
    
      //append to page
      cityTitle.append(weatherIcon);
      cardBody.append(cityTitle, temperature, wind, humidity);
      card.append(cardBody);
      $("#todayForecast").append(card);
    
    });
  }


  function getFutureForcast() {
    var city = $("#city-name").val();
    console.log(city);
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=fe7d04271c1a604e39530bb51dc1d610&units=imperial"
    )
    .then(function (response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);

      //create header
      $("#futureForecast").html("<h3 class=\"m-2\">5-Day Forecast:</h3>").append("<div class=\"container\">");

    //   //loop over data 5x
      for (var i =0; i < 41; i+=8) {

        //remove characters from dt_txt data
         var date = data.list[i].dt_txt;
         var newDate = date.replace('18:00:00', '');
    
      
      var forecastRow =$("<div>").addClass("row justify-content-between");
      var forecastHeader=$("<h3>").addClass("m-2").text("5-Day Forecast:");
      var dateFiveDay = $("<h3>").addClass("card-title").text(new Date(newDate).toLocaleDateString());
      var iconFiveDay = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
      var cardFiveDay = $("<div>").addClass("col-3 card bg-dark text-white m-1");
      var cardBodyFiveDay = $("<div>").addClass("card-body p-3");
      var tempFiveDay = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp + " °F");
      var windFiveDay = $("<p>").addClass("card-text").text("Wind: " + data.list[i].wind.speed + " MPH");
      var humidityFiveDay = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + " %");
        
        //append to page
        cardBodyFiveDay.append(dateFiveDay, iconFiveDay, tempFiveDay, windFiveDay, humidityFiveDay);
        cardFiveDay.append(cardBodyFiveDay);
        forecastRow.append(cardFiveDay);
        $("#futureForecast").append(forecastRow);

    }
  });
}