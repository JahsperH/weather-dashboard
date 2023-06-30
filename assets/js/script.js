var cityInput = document.getElementById("cityInput");
var submitBtn = document.getElementById("submitBtn");
var apiKey = "4ac1d8bc8e944a8ebd3d136661e206ba";

function search(){

var city = cityInput.value.replace(/ /g, "%20");

cityInput.value = "";

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



function createWeatherCard(list){
    var k = 0;
    for (var i = 1; i < 6; i++){

        var high = list[k].main.temp_max;
        var low = list[k].main.temp_min;
        var conditions = list[k].weather[0].main;
        var date = list[k].dt_txt;
        var icon = list[k].weather[0].icon;

        var currentArt = document.getElementById(`day${i}`);
        var dateEl = document.createElement("p");
        var iconEl = document.createElement("img");
        dateEl.textContent = date;
        currentArt.appendChild(dateEl);
    
        
        var conditionsEl = document.createElement("p");
        conditionsEl.textContent = conditions;
        currentArt.appendChild(conditionsEl);
        iconEl.setAttribute("src", "http://openweathermap.org/img/w/" + icon + ".png");
        currentArt.appendChild(iconEl);
        

        var highEl = document.createElement("p");
        highEl.textContent = "High: " + high + "°F";
        currentArt.appendChild(highEl);

        var lowEl = document.createElement("p");
        lowEl.textContent = "Low: " + low + "°F";
        currentArt.appendChild(lowEl);

        
        

        k = k + 8;
    }
}

