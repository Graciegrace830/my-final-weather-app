let apiKey = "85b1a28ca46b3f3c328f27d1cd004107";
let baseCity = "";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${baseCity}&appid=${apiKey}&units=metric`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let completeDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return completeDay[day];
}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div">`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "dff5c692192605ee5ed7f95b423ae857";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function displayTemp(response) {
  let currentIcon = document.querySelector(".icon");
  currentIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemp = response.data.main.temp;

  let currentTemperature = Math.round(celsiusTemp);
  let currentTemp = document.querySelector("h1");
  currentTemp.innerHTML = `${currentTemperature}`;

  let windSpeed = Math.round(response.data.wind.speed);
  let currentSpeed = document.querySelector("#wind-speed");
  currentSpeed.innerHTML = `${windSpeed}`;

  let desc = response.data.weather[0].description;
  let currentDesc = document.querySelector("#description");
  currentDesc.innerHTML = `${desc}`;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${humidity}`;

  let currentCity = response.data.name;
  let showcurrentCity = document.querySelector("h2");
  showcurrentCity.innerHTML = `${currentCity}`;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "85b1a28ca46b3f3c328f27d1cd004107";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function editCity(event) {
  event.preventDefault();
  let updateCity = document.querySelector("#name");
  let cityName = document.querySelector("h2");
  cityName.innerHTML = `${updateCity.value}`;
  getWeather(updateCity.value);
}

function getWeather(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

let inputCity = document.querySelector("#city-search");
inputCity.addEventListener("submit", editCity);

let nowDate = new Date();
let dateToday = document.querySelector(".date-today");
let dayToday = document.querySelector(".day-today");
let timeToday = document.querySelector(".time-today");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentYear = nowDate.getFullYear();
let currentDay = days[nowDate.getDay()];
let currentMonth = months[nowDate.getMonth()];
let currentDate = nowDate.getDate();
let thisHour = nowDate.getHours();
let thisMinute = nowDate.getMinutes();

let formattedDate = `${currentMonth} ${currentDate}, ${currentYear}`;
dayToday.innerHTML = `${currentDay}`;
dateToday.innerHTML = `${formattedDate}`;

if (thisHour < 10) {
  thisHour = "0" + thisHour;
}
if (thisMinute < 10) {
  thisMinute = "0" + thisMinute;
}
timeToday.innerHTML = `${thisHour}:${thisMinute}`;

//axios.get(apiUrl).then(displayTemp);

function showFahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("h1");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = document.querySelector("h1");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celcius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("Paris");
