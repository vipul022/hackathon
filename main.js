import { WEATHERBIT_KEY } from "./keys.js";
const inputValue = document.querySelector(".inputValue");
// console.log(inputValue);

let getWeather = () => {
  axios
    .get(
      `https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=${WEATHERBIT_KEY}`
    )
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.log(err));
  console.log("test");
};

document.querySelector(".button").addEventListener("click", getWeather);
