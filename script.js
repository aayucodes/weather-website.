const apiKey = "0c012dba5e7785fe1286ea1b821682e0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    const data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;

    document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";

    document.querySelector(".feels-like").innerHTML =
        "Feels Like: " + Math.round(data.main.feels_like) + "°C";

    document.querySelector(".description").innerHTML =
        data.weather[0].description;

    document.querySelector(".min-temp").innerHTML =
        Math.round(data.main.temp_min) + "°C";

    document.querySelector(".max-temp").innerHTML =
        Math.round(data.main.temp_max) + "°C";

    document.querySelector(".pressure").innerHTML =
        data.main.pressure + " hPa";

    document.querySelector(".humidity").innerHTML =
        data.main.humidity + "%";

    document.querySelector(".wind").innerHTML =
        data.wind.speed + " km/h";

    document.querySelector(".visibility").innerHTML =
        (data.visibility / 1000) + " km";

    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);

    document.querySelector(".sunrise").innerHTML =
        sunrise.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

    document.querySelector(".sunset").innerHTML =
        sunset.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

    switch (data.weather[0].main) {

        case "Clouds":
            weatherIcon.src = "images/cloud.png";
            break;

        case "Clear":
            weatherIcon.src = "images/clear.png";
            break;

        case "Rain":
            weatherIcon.src = "images/rain.png";
            break;

        case "Drizzle":
            weatherIcon.src = "images/drizzle.png";
            break;

        case "Mist":
            weatherIcon.src = "images/mist.png";
            break;

        default:
            weatherIcon.src = "images/cloud.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

checkWeather("Vadodara");
