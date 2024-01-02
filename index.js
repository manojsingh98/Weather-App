//my api key
//16cdce4b255b6afb4c8aedb8689fa1b1
//API ____ https://api.openweathermap.org/data/2.5/weather?q=London&appid=16cdce4b255b6afb4c8aedb8689fa1b1&units=metric
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const apiKey = "16cdce4b255b6afb4c8aedb8689fa1b1";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=bangalore`;

async function checkWeather() {
  const response = await fetch(apiURL + `&appid=${apiKey}`);
  var data = await response.json();
  console.log(data);
}
checkWeather();
