let currCity = "Hanoi";
let units = "metric";
let prevCurrCity = "";

let city = document.querySelector(".weather__city");
let datetime = document.querySelector(".weather__datetime");
let weather__forecast = document.querySelector(".weather__forecast");
let weather__temperature = document.querySelector(".weather__temperature");
let weather__icon = document.querySelector(".weather__icon");
let weather__minmax = document.querySelector(".weather__minmax");
let weather__realfeel = document.querySelector(".weather__realfeel");
let weather__humidity = document.querySelector(".weather__humidity");
let weather__wind = document.querySelector(".weather__wind");
let weather__pressure = document.querySelector(".weather__pressure");
let weather__unit_celsius = document.querySelector(".weather__unit_celsius");
let weather__unit_farenheit = document.querySelector(
  ".weather__unit_farenheit"
);

// GET INPUT FUNCTION

document.querySelector(".search_button").addEventListener("click", () => {
  let search = document.querySelector(".weather__searchform");

  if (search.value !== "") {
    prevCurrCity = currCity;
    currCity = search.value;
    search.value = "";
    getWeather();
  }
});

document.querySelector(".weather__search").addEventListener("submit", (e) => {
  let search = document.querySelector(".weather__searchform");
  e.preventDefault();

  if (search.value !== "") {
    prevCurrCity = currCity;
    currCity = search.value;
    search.value = "";
    getWeather();
  }
});

// CHANGE UNITS

weather__unit_celsius.addEventListener("click", () => {
  if (units !== "metric") {
    weather__unit_celsius.classList.toggle("active_unit");
    weather__unit_farenheit.classList.toggle("active_unit");
    units = "metric";
    getWeather();
  }
});

weather__unit_farenheit.addEventListener("click", () => {
  if (units !== "imperial") {
    weather__unit_farenheit.classList.toggle("active_unit");
    weather__unit_celsius.classList.toggle("active_unit");
    units = "imperial";
    getWeather();
  }
});

// CONVERT COUNTRY CODE TO NAME
function convertCountryCode(country) {
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(country);
}

// CONVERT TIMESTAMP

function convertTimeStamp(timestamp, timezone) {
  const convertTimezone = timezone / 3600;
  const date = new Date(timestamp * 1000);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(
      convertTimezone
    )}`,
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

// API CALL FUNCTION
function getWeather() {
  const API_KEY = "27627f87df24c0220bdf5656597a11ae";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.cod !== "404") {
        city.innerHTML = `${data.name}, ${convertCountryCode(
          data.sys.country
        )}`;
        datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
        weather__forecast.innerHTML = `<p>${data.weather[0].main}</p>`;
        weather__temperature.innerHTML = `${data.main.temp.toFixed()}&#176`;
        weather__icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">`;
        weather__minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`;
        weather__realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
        weather__humidity.innerHTML = `${data.main.humidity}&#176`;
        weather__wind.innerHTML = `${data.wind.speed} ${
          units === "imperial" ? "mph" : "m/s"
        }`;
        weather__pressure.innerHTML = `${data.main.pressure} hPa`;
      } else {
        currCity = prevCurrCity;
        alert("Can't find this city name. Please try again!");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

getWeather();
