var cityInput = document.getElementById("cityInput");
var submitBtn = document.getElementById("submitBtn");
var apiKey = "15ee655e9869842fef1d35bef76c5261";

function search(){

var city = cityInput.value.replace(/ /g, "%20");

var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;

fetch(queryURL)
.then(function(response){
    return response.json();
})
.then(function(data){
    createWeatherCard(data.list);
    console.log(data);
})
.catch(function(error){
    console.log(error);
    alert("Please enter a valid city name");
})
}




submitBtn.addEventListener("click", function(event){
    event.preventDefault();
    search();
})

function createWeatherCard(data){
    for (var i = 0; i < 5; i++)(
        
    )
}