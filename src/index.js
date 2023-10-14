let apiKey = "85b1a28ca46b3f3c328f27d1cd004107";
let baseCity = "New York";
let theUrl = `https://api.openweathermap.org/data/2.5/weather?q=${baseCity}&appid=${apiKey}&units=metric`;

function displayTemp(response) {
  let currentIcon = document.querySelector(".icon");
  currentIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let currentTemperature = Math.round(response.data.main.temp);
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

axios.get(theUrl).then(displayTemp);
