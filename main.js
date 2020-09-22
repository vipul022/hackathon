import { WEATHERBIT_KEY } from "./keys.js";
const inputValue = document.querySelector(".inputValue");
const countryCode = document.querySelector(".countryCode");
const outputData = document.querySelector(".output-data");
const city = document.getElementById("city");
const currentImage = document.getElementById("current-image");
const temp = document.getElementById("temp");
const maxMin = document.getElementById("max-min");
const currentDate = document.querySelector("#current-date");
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
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const moonrise = document.getElementById("moonrise")
const moonset = document.getElementById("moonset")
const humidity = document.getElementById("humidity")
const moreInfoContainer = document.getElementById("more-info-container")


let getWeather = () => {
  axios
    .get(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=${inputValue.value}&country=${countryCode.value}&key=${WEATHERBIT_KEY}`
    )

    .then((response) => {
      console.log(response);
      if (!response.data.city_name) {
        throw new Error("Enter valid city");
      }
      let data = response.data.data
      city.innerHTML = response.data.city_name;
      currentDate.innerHTML = getDate(data[0].datetime);
      temp.innerHTML = `${Math.floor(data[0].temp)}°c`;
      let maxTemp = Math.floor(data[0].max_temp);
      let minTemp = Math.floor(data[0].min_temp);
      maxMin.innerHTML = `Max/Min: ${maxTemp}°c/${minTemp}°c`;
      let icon = data[0].weather.icon;
      currentImage.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
      description.innerHTML = data[0].weather.description;
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
        dayMax.innerHTML = `Max: ${Math.floor(data[i].max_temp)}°c`;
        dayMin.innerHTML = `Min: ${Math.floor(data[i].min_temp)}°c`;
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

        const getTime = (ts) => {     //function takes UNIX timestamp and returns am/pm time
          let date = new Date(ts * 1000);
          let ampm = "pm";
          let hours = date.getHours();
          let minutes = date.getMinutes()
            hours < 12? (ampm = "am") : (hours += -12); //change from 24hr to am/pm
          minutes = (minutes < 10? '0' : '') + minutes; //add 0 infront of minutes if 1 digit
          return `${hours}:${minutes}${ampm}`
        }

        sunrise.innerHTML = `Sunrise: ${getTime(data[0].sunrise_ts)}`
        sunset.innerHTML = `Sunset: ${getTime(data[0].sunset_ts)}`
        moonrise.innerHTML = `Moonrise: ${getTime(data[0].moonrise_ts)}`
        moonset.innerHTML = `Moonset: ${getTime(data[0].moonset_ts)}`
        moonPhase.src = "/moonphases/moons2.png";
        moonLine.style.borderRight = "5px solid #e01b45";
        moonLine.style.height = "70px";
        let moonWidth = Math.floor(data[0].moon_phase_lunation * 100);
        moonLine.style.width = `${moonWidth}%`;   
      }
      
      document.querySelector("#more-info").addEventListener("click", getMoreWeather);

    })
    .catch((err) => alert(err.message));
};

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const dayOfTheWeek = (date) => {
  let d = new Date(date);
  return weekday[d.getDay()];
};

const months = [
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
const getDate = (date) => {
  let d = new Date(date);

  let dateToday = `${weekday[d.getDay()]} ${d.getDate()} ${
    months[d.getMonth()]
  } ${d.getFullYear()}
  `;
  return dateToday;
};

moreInfo.style.display = "none";
document.querySelector("#get-weather").addEventListener("click", getWeather);
