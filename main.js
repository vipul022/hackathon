import { WEATHERBIT_KEY } from "./keys.js";
const inputValue = document.querySelector(".inputValue");
const outputData = document.querySelector(".output-data");
// console.log(inputValue);

let getWeather = () => {
    axios.get(`https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=${WEATHERBIT_KEY}`)
    .then(response => {
    console.log(response)
    console.log(response.data.data[0].temp)
    let p = document.createElement("p")
    let temp = document.createTextNode(`Current temperature is: ${response.data.data[0].temp}`)
    outputData.appendChild(p)
    p.appendChild(temp)
    })
    .catch(err => console.log(err));
    console.log("test")
}

document.querySelector(".button").addEventListener("click", getWeather)

