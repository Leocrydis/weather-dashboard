var cities = [];
var InputSearchEl = document.querySelector("#searchcity");
var cityEl = document.querySelector("#city");
var historyEl = document.querySelector("#history-btns");
var currentWeatherEl = document.querySelector("#currentweather");
var searchedCityEl = document.querySelector("#searchedfor");
var weatherContainerEl = document.querySelector("#weathercontainer");
var fiveDaysEl = document.querySelector("#fiveday");
var forecastEl = document.querySelector("#forecast");
var displayFiveEl = document.querySelector("#fivedisplay")
const apiKey = "ba15b27266bffaba3eddbabf2e5d0d21";

var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
}

//Connect API
var cityWeather = function(city){
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`


fetch(apiUrl).then(function(response){
    if(response.ok){
        console.log(response);
        response.json().then(function(data){
            console.log(data);
            getWeather(data,city);
        });
    }else{
        alert("Error");
    }   
})
.catch(function(error){
    alert("Unable to connect");
});
};

//Form Stuff
var formSubmitHandler = function(event){
    event.preventDefault();
    var city = cityEl.value.trim();
    if(city){
        cityWeather(city);
    } else {
        alert("Enter a city");
    }
    saveSearch();
} 

//Weather Variables
var getWeather = function(weather, city){
    weatherContainerEl.textContent = "";
    searchedCityEl.textContent = city;

    var date = document.createElement("span");
    date.textContent = "(" + moment(weather.dt.value).add(10, 'days').calendar() + ")";
    searchedCityEl.appendChild(date);

    var icon = document.createElement("img");
    icon.setAttribute("src", "https://openweathermap.org/img/wn/${weather.weather[0].icon}.png");
    searchedCityEl.appendChild(icon);

    var wind = document.createElement("span");
    wind.textContent = "Wind Speed: " + weather.wind.speed + "MPH";
    wind.classList = "list-group-item";
    searchedCityEl.appendChild(wind);

    var temp = document.createElement("span");
    temp.textContent = "Temperature: " + weather.main.temp + "ºF";
    temp.classList = "list-group-item";
    searchedCityEl.appendChild(temp);

    var humidity = document.createElement("span");
    humidity.textContent = "Humidity: " + weather.main.humidity + "%";
    humidity.classList = "list-group-item";
    searchedCityEl.appendChild(humidity);
} 


//Five Day Forecast
var getFiveDays = function(city){
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`;
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayFiveDays(data,city);
            });
        }else{
            alert("Error");
        };   
    })
    .catch(function(error){
        alert("Unable to connect");
    });
};

var displayFiveEL = function(forecast){
    displayFiveEl.textContent = "";
    forecastEl.textContent = "5 Day Forecast:";
    forecastEl.classList = "p-3 mb-2 bg-dark text-white";
}
//Make Action Work on "Submit"
InputSearchEl.addEventListener("submit",formSubmitHandler);