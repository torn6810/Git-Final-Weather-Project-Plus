let now=new Date();
let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let day=days[now.getDay()];
let month=months[now.getMonth()];
let date=[now.getDate()];
let currentHour=[now.getHours()];
if (currentHour<10){
  currentHour=`0${currentHour}`;
}
let minutes=[now.getMinutes()];
if (minutes<10){
  minutes=`0${minutes}`;
}
let displayHour=document.querySelector("#day-time");

displayHour.innerHTML=`${day}, ${month} ${date}, ${currentHour}:${minutes}`

function search (city){
  let apiKey="1a865f34c72d6db62ee55e7dce90a4b3";
  let units="imperial";
  let apiEndpoint="https://api.openweathermap.org/data/2.5/weather";
  let apiUrl=`${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function searchInput(event){
  event.preventDefault();
  let city=document.querySelector("#city-input").value;
  search(city);
  }

function formatForecastDay(timestamp){
let date=new Date(timestamp *1000);
let day=date.getDay();
let days=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return days[day];
}


function displayForecast (response){
  let dailyForecast=response.data.daily;
  let forecast=document.querySelector("#forecast");
  forecast.innerHTML="Forecast";
  //let days=["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  let forecastHTML=`<div class="row">`;
  dailyForecast.forEach(function(forecastDay, index){
    if (index<7){
    forecastHTML=
    forecastHTML+
    `
    <div class="col day">
                ${formatForecastDay(forecastDay.dt)}
        <div class="weather-icon">
            <img 
            src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
            alt="daily forecast weather icons"
            width="75" 
            />
              <div class="weather-forecast-temp">
                
                  <span class="weather-forecast-temp-high">H: ${Math.round(forecastDay.temp.max)}°F</span> 
                    <br/>
                  <span class="weather-forecast-temp-low">L: ${Math.round(forecastDay.temp.min)}°F</span> 
              </div>
        </div>
    </div>      
    `;
  }
  });
  forecastHTML=forecastHTML+`</div>`;
  forecast.innerHTML=forecastHTML;
}  

function getForecastWeather(coordinates){
  
  let apiKey="1a865f34c72d6db62ee55e7dce90a4b3";
  let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}


function displayWeather(response){
  let cityHeading=document.querySelector("#city-country");
  let showTemp=document.querySelector("#current-temp");
  let description=document.querySelector("#weather-description");
  let precipitation=document.querySelector("#humidity");
  let windSpeed=document.querySelector("#wind-speed");
  let localIcon=document.querySelector("#local-icon");

  fahrenheitDisplay=response.data.main.temp;

  cityHeading.innerHTML=response.data.name;
  showTemp.innerHTML=`${Math.round(response.data.main.temp)}`; 
  description.innerHTML=response.data.weather[0].description;
  precipitation.innerHTML=`Humidity: ${Math.round(response.data.main.humidity)} %`;
  windSpeed.innerHTML=`Wind Speed: ${Math.round(response.data.wind.speed)} m/h`;
  localIcon.setAttribute(
   "src", 
   `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` 
  );
  localIcon.setAttribute("alt", response.data.weather[0].description
  );
  getForecastWeather(response.data.coord);
}

function searchFahrenheit(event){
  event.preventDefault();
  let temperatureElement=document.querySelector("#current-temp");
  temperatureElement.innerHTML=Math.round(fahrenheitDisplay);
  fahrenheitLink.classList.add("main-unit");
  celsiusLink.classList.remove("main-unit");
}
function searchCelsius(event){
  event.preventDefault();
  let temperatureElement=document.querySelector("#current-temp");
  let celsiusDisplay=(fahrenheitDisplay-32)*5/9;
  temperatureElement.innerHTML=Math.round(celsiusDisplay);
  celsiusLink.classList.add("main-unit");
  fahrenheitLink.classList.remove("main-unit");
}

let cityInput=document.querySelector("#search-city");
cityInput.addEventListener("click", searchInput);
search ("Seattle");



let fahrenheitTemperature=document.querySelector("#fahrenheit");
fahrenheitTemperature.addEventListener("click", searchFahrenheit);
let celsiusTemperature=document.querySelector("#celsius");
celsiusTemperature.addEventListener("click", searchCelsius); 

let fahrenheitLink=document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", searchFahrenheit);
let celsiusLink=document.querySelector("#celsius");
celsiusLink.addEventListener("click", searchCelsius);



