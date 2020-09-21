import { WEATHERBIT_KEY } from "./keys.js";
const inputValue = document.querySelector(".inputValue");
const countryCode = document.querySelector(".countryCode");
const outputData = document.querySelector(".output-data");
const city = document.getElementById("city");
const currentImage = document.getElementById("current-image");
const temp = document.getElementById("temp");
const max = document.getElementById("max");
const min = document.getElementById("min");
const description = document.getElementById("description");
const forcast = document.querySelector("#forcast");

let getWeather = () => {
  axios
    .get(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=${inputValue.value}&country=${countryCode.value}&key=${WEATHERBIT_KEY}`
    )
    .then((response) => {
      console.log(response);
      let data = response.data.data
      city.innerHTML = `Details for: ${response.data.city_name}`;
      temp.innerHTML = `Current temperature: ${data[0].temp}`;
      max.innerHTML = `Max: ${data[0].max_temp}`;
      min.innerHTML = `Min: ${data[0].min_temp}`;
      let icon = data[0].weather.icon;
      currentImage.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
      description.innerHTML = `Description: ${data[0].weather.description}`;
      forcast.innerHTML = "";
      for (let i = 1; i < 8; i++) {
        icon = data[i].weather.icon;
        let day = document.createElement("div");
        let dayImg = document.createElement("img");
        let dayName = document.createElement("p");
        let dayMax = document.createElement("p");
        let dayMin = document.createElement("p");

        day.appendChild(dayName);
        day.appendChild(dayImg);
        day.appendChild(dayMax);
        day.appendChild(dayMin);
        forcast.appendChild(day);

        dayName.innerHTML = dayOfTheWeek(data[i].datetime);
        dayImg.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
        dayMax.innerHTML = `Max: ${data[i].max_temp}`;
        dayMin.innerHTML = `Min: ${data[i].min_temp}`;
      }
    })
    .catch((err) => console.log(err));
};

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayOfTheWeek = (date) => {
  let d = new Date(date);
  return weekday[d.getDay()];
};

document.querySelector(".button").addEventListener("click", getWeather);
