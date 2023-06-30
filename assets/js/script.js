var cityInput = document.getElementById("cityInput");
var submitBtn = document.getElementById("submitBtn");
var apiKey = "4ac1d8bc8e944a8ebd3d136661e206ba";

if (localStorage.getItem("city") !== null) {
    renderRecents();
}

function search() {

    var day1 = document.getElementById("day1");
    var day2 = document.getElementById("day2");
    var day3 = document.getElementById("day3");
    var day4 = document.getElementById("day4");
    var day5 = document.getElementById("day5");

    day1.innerHTML = "";
    day2.innerHTML = "";
    day3.innerHTML = "";
    day4.innerHTML = "";
    day5.innerHTML = "";

    var saveCity = cityInput.value;
    var city = cityInput.value.replace(/ /g, "%20");

    if (localStorage.getItem("city") === null) {
        localStorage.setItem("city", JSON.stringify([]));
    }
    
   

    var cityArray = JSON.parse(localStorage.getItem("city"));
    cityArray.push(saveCity);
    localStorage.setItem("city", JSON.stringify(cityArray));
    renderRecents();




    cityInput.value = "";

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            createWeatherCard(data.list);
            console.log(data);
        })
        .catch(function (error) {
            console.log(error);
            alert("Please enter a valid city name");
        })
}

function renderRecents() {

    var recentsTab = document.getElementById("recentsDiv");
    recentsTab.innerHTML = "";
    var recents = JSON.parse(localStorage.getItem("city"));
    k = recents.length-1;
    for (var i = 0; i < 5; i++) {
        if (recents[k] === undefined) {
            break;
        }
        var recentEl = document.createElement("p");
        recentEl.textContent = recents[k];
        recentEl.addEventListener("click", function (event) {
            cityInput.value = this.textContent;
            search();
        })
        recentsTab.appendChild(recentEl);
        k--;
    }
}




submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    search();
})



function createWeatherCard(list) {
    var k = 0;
    for (var i = 1; i < 6; i++) {

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

