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

displayHour.innerHTML=`${day} ${month} ${date} ${currentHour}:${minutes}`

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

function displayWeather(response){
  let cityHeading=document.querySelector("#city-country");
  cityHeading.innerHTML=response.data.name;
  let showTemp=document.querySelector("#current-temp");
  showTemp.innerHTML=`${Math.round(response.data.main.temp)}`; 

}
let cityInput=document.querySelector("#search-city");
cityInput.addEventListener("click", searchInput);

search ("Seattle");