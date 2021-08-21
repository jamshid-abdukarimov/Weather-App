"use strict";

const api = {
  key: "d68f88a58ef9db19de4374b280b711d1",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    setResults(searchBox.value);
    searchBox.reset();
  }
});

function setResults(query) {
  fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => weather.json())
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".city");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".date");
  date.innerHTML = dateBuilder(now);

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let mainWeather = document.querySelector(".weather");
  mainWeather.innerHTML = `${weather.weather[0].main}`;

  let hilow = document.querySelector(".hi-low");
  hilow.innerHTML = `${Math.round(weather.main.temp_max)}°C / ${Math.round(
    weather.main.temp_min
  )}°C`;
}

function dateBuilder(j) {
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

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[j.getDay()];
  let date = j.getDate();
  let month = months[j.getMonth()];
  let year = j.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
