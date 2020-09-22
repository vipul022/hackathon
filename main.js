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
const moreInfo = document.getElementById("more-info")
const moonPhase = document.getElementById("moon-phase")
const moonLine = document.getElementById("moon-line")
const windSpeed = document.getElementById("wind-speed")
const windGustSpeed = document.getElementById("wind-gust-speed")
const windDirection = document.getElementById("wind-direction")
const precipitation = document.getElementById("precipitation")
const uvIndex = document.getElementById("uv-index")
const humidity = document.getElementById("humidity")
const moreInfoContainer = document.getElementById("more-info-container")


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
      moreInfo.style.display = "inline-block";
      moreInfoContainer.style.display = "none"
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

      const getMoreWeather = () => {  
        if (moreInfoContainer.style.display === "none") {
          moreInfoContainer.style.display = "block";
          moreInfo.textContent = "Less Info"
        } else {
          moreInfoContainer.style.display = "none";
          moreInfo.textContent = "More Info"

        }
        precipitation.innerHTML = `Precipitation chance: ${data[0].pop}%`
        humidity.innerHTML = `Humidity: ${data[0].rh}%`
        windSpeed.innerHTML = `Wind speed: ${Math.floor(data[0].wind_spd)} knots`
        windGustSpeed.innerHTML = `Wind gust speed: ${Math.floor(data[0].wind_gust_spd)} knots`
        windDirection.innerHTML = `Wind direction: ${data[0].wind_cdir_full}`
        uvIndex.innerHTML = `UV Index: ${Math.floor(data[0].uv)}`  
        moonPhase.src = "/moonphases/moons2.png";
        moonLine.style.borderRight = "5px solid #e01b45";
        moonLine.style.height = "70px";
        let moonWidth = Math.floor(data[0].moon_phase_lunation * 100);
        moonLine.style.width = `${moonWidth}%`;   
      }
      
      document.querySelector("#more-info").addEventListener("click", getMoreWeather);

    })

    .catch((err) => console.log(err));
};

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayOfTheWeek = (date) => {
  let d = new Date(date);
  return weekday[d.getDay()];
};

moreInfo.style.display = "none";
document.querySelector("#get-weather").addEventListener("click", getWeather);
