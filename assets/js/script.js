$(document).ready(function () {
  //search button function
  $("#submitSearch").on("click", function () {
    var city = $("#citySearch").val();
    //clear input box
    $("#citySearch").val("");

    getWeather(city);
    getForcast(city);
  })
})