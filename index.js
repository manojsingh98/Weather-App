//my api key
//16cdce4b255b6afb4c8aedb8689fa1b1
//API ____ https://api.openweathermap.org/data/2.5/weather?q=London&appid=16cdce4b255b6afb4c8aedb8689fa1b1&units=metric
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const apiKey = "16cdce4b255b6afb4c8aedb8689fa1b1";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const weatherIcon = document.querySelector(".weather-icon");
const weatherBox = document.querySelector(".weather");

async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);
  var data = await response.json();

  if ((response.status = 404)) {
    document.querySelector(".error-msg").style.display = "block";
    weatherBox.style.opacity = 0;
  }

  // console.log(data);

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp);
  document.querySelector(".humidity").innerHTML = data.main.humidity;
  document.querySelector(".wind").innerHTML = data.wind.speed;

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png";
  }
  weatherBox.style.opacity = 1;
  document.querySelector(".error-msg").style.display = "none";
}

document.getElementById("cityVal").addEventListener("click", function () {
  const cityName = document.getElementById("cityName").value;
  checkWeather(cityName);
});

async function getCityList() {
  const response = await fetch(
    "https://countriesnow.space/api/v0.1/countries/population/cities"
  );
  const data = await response.json();

  const cities = data.data;
  const cityInput = document.getElementById("cityName");
  const showCityDiv = document.querySelector(".show-city");

  cityInput.addEventListener("input", function () {
    const inputValue = cityInput.value.toLowerCase();

    // Clear previous suggestions
    showCityDiv.innerHTML = '';

    if (inputValue.trim() !== "") {
      const matchingCities = cities.filter((city) => {
        return city.city.toLowerCase().includes(inputValue);
      });

      matchingCities.forEach((matchedCity) => {
        let cityNames = document.createElement("p");
        cityNames.innerText = matchedCity.city;

        // When a suggestion is clicked, fill the input with the selected city and hide suggestions
        cityNames.addEventListener("click", function () {
          cityInput.value = matchedCity.city;
          // showCityDiv.innerHTML = '';
          showCityDiv.style.visibility = "hidden"
        });

        showCityDiv.appendChild(cityNames);
      });

      // Show suggestions if there are matching cities
      showCityDiv.style.visibility = matchingCities.length > 0 ? "visible" : "hidden";
    } else {
      // Hide suggestions if input is empty
      showCityDiv.style.visibility = "hidden";
    }
  });

  // Hide suggestions when backspace key is pressed and input is empty
  cityInput.addEventListener("keydown", function (event) {
    if (event.key === "Backspace" && cityInput.value.trim() === "") {
      showCityDiv.style.visibility = "hidden";
    }
  });

  // Clear suggestions and hide when input field is empty
  cityInput.addEventListener("blur", function () {
    if (cityInput.value.trim() === "") {
      showCityDiv.innerHTML = '';
      showCityDiv.style.visibility = "hidden";
    }
  });
}

getCityList();


