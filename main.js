import { WEATHERBIT_KEY } from "./keys.js";
const inputValue = document.querySelector(".inputValue");
const countryCode = document.querySelector(".countryCode");
const outputData = document.querySelector(".output-data");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const max = document.getElementById("max");
const min = document.getElementById("min");
const description = document.getElementById("description");
const days = document.getElementById("days");
// console.log(inputValue);

let getWeather = () => {
  axios
    .get(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=${inputValue.value}&country=${countryCode.value}&key=${WEATHERBIT_KEY}`
    )
    .then((response) => {
      console.log(response);
      // console.log(response.data.data[0].temp)
      city.innerHTML = `Details for: ${response.data.city_name}`;
      temp.innerHTML = `Current temperature: ${response.data.data[0].temp}`;
      max.innerHTML = `Max: ${response.data.data[0].max_temp}`;
      min.innerHTML = `Min: ${response.data.data[0].min_temp}`;
      description.innerHTML = `Description: ${response.data.data[0].weather.description}`;
      for (let i = 1; i < 8; i++) {
        let li = document.createElement("li");
        li.innerHTML = `${dayOfTheWeek(response.data.data[i].datetime)} max: ${
          response.data.data[i].max_temp
        }`;
        days.appendChild(li);
      }
    })
    .catch((err) => console.log(err));
  console.log("test");
};
document.querySelector(".button").addEventListener("click", getWeather);

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

const dayOfTheWeek = (date) => {
  let d = new Date(date);
  var n = weekday[d.getDay()];
  return n;
};
console.log(dayOfTheWeek("2020-09-21"));
// datetime: "2020-09-20";
