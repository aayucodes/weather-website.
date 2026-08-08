const apiKey = "0c012dba5e7785fe1286ea1b821682e0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const locationBtn = document.querySelector(".location-btn");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    const data = await response.json();

    updateWeather(data);
}

function updateWeather(data) {

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;

    document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";

    document.querySelector(".feels-like").innerHTML =
        "Feels Like: " + Math.round(data.main.feels_like) + "°C";

    document.querySelector(".description").innerHTML =
        data.weather[0].description;

    // Date & Time
    const today = new Date();

    document.querySelector(".date").innerHTML =
        today.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    document.querySelector(".time").innerHTML =
        today.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit"
        });

    // Temperature Details
    document.querySelector(".min-temp").innerHTML =
        Math.round(data.main.temp_min) + "°C";

    document.querySelector(".max-temp").innerHTML =
        Math.round(data.main.temp_max) + "°C";

    // Pressure
    document.querySelector(".pressure").innerHTML =
        data.main.pressure + " hPa";

    // Humidity
    document.querySelector(".humidity").innerHTML =
        data.main.humidity + "%";

    // Wind
    document.querySelector(".wind").innerHTML =
        data.wind.speed + " km/h";

    // Visibility
    document.querySelector(".visibility").innerHTML =
        (data.visibility / 1000) + " km";

    // Sunrise & Sunset
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

    // Weather Icon
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


// Search Button
searchBtn.addEventListener("click", () => {

    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value.trim());
    }

});


// Enter Key
searchBox.addEventListener("keydown", (event) => {

    if (event.key === "Enter" && searchBox.value.trim() !== "") {
        checkWeather(searchBox.value.trim());
    }

});


// Current Location Button
locationBtn.addEventListener("click", () => {

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    locationBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

    navigator.geolocation.getCurrentPosition(

        async (position) => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {

                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
                );

                if (!response.ok) {
                    throw new Error("Weather data not found");
                }

                const data = await response.json();

                updateWeather(data);

            } 
            catch (error) {

                console.log(error);
                alert("Unable to get weather data.");

            }

            locationBtn.innerHTML =
                '<i class="fa-solid fa-location-crosshairs"></i>';

        },

        () => {

            alert("Please allow location access.");

            locationBtn.innerHTML =
                '<i class="fa-solid fa-location-crosshairs"></i>';

        }

    );

});


// Default City
checkWeather("Vadodara");
