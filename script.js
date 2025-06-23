const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  if (!city) {
    alert("Enter City name");
    return;
  }

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const condition = data.weather[0].main;

    if (condition == "Clouds") {
      weatherIcon.src = "imgicons/clouds.png";
    } else if (condition == "Clear") {
      weatherIcon.src = "imgicons/clear.png";
    } else if (condition == "Rain") {
      weatherIcon.src = "imgicons/rain.png";
    } else if (condition == "Drizzle") {
      weatherIcon.src = "imgicons/drizzle.png";
    } else if (condition == "Mist") {
      weatherIcon.src = "imgicons/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  checkWeather(city);
});

// OPTIONAL: Load default city on start
checkWeather("Delhi");
