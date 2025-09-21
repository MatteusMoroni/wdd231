// weather.js

const apiKey = "edab1df28d0844e2a3cb0b611c82336b";
const lat = "-20.302089085084724";
const lon = "-40.31730516420892";
const units = "imperial"; // Use "imperial" for Fahrenheit, "metric" for Celsius

// Updated URL to get Fahrenheit and exclude unnecessary data
const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely,hourly,alerts&appid=${apiKey}`;

// Get references to the HTML containers
const currentWeatherContainer = document.querySelector('#current-weather-content');
const forecastContainer = document.querySelector('#forecast-content');

/**
 * Capitalizes the first letter of each word in a string.
 * @param {string} str The string to format.
 * @returns {string} The formatted string.
 */
function capitalizeWords(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

/**
 * Displays the current weather data in the DOM.
 * @param {object} data The weather data object from the API.
 */
function displayCurrentWeather(data) {
    if (!currentWeatherContainer) return;

    const temp = data.current.temp.toFixed(0);
    const description = capitalizeWords(data.current.weather[0].description);
    const icon = data.current.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const humidity = data.current.humidity;
    const min = data.daily[0].temp.min.toFixed(0);
    const max = data.daily[0].temp.max.toFixed(0);
    const sunrise = data.daily[0].sunrise.toFixed(0)
    const Sunset = data.daily[0].sunset.toFixed(0)

    const weatherHTML = `
        <div class="weather-info">
            <img src="${iconUrl}" alt="${description}">
            <p class="current-temp">${temp}°F</p>
            <p class="weather-desc">${description}</p>
            <p class="weather-minmax">Min: ${min}°F | Max: ${max}°F</p>
            <p class="weather-humidity">Humidity: ${humidity}%</p>
            <p class="weather-sunrise">Sunrise: ${new Date(sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p class="weather-sunset">Sunset: ${new Date(Sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            
        </div>
    `;
    currentWeatherContainer.innerHTML = weatherHTML;
}

/**
 * Displays the 3-day weather forecast in the DOM.
 * @param {object} data The weather data object from the API.
 */
function displayForecast(data) {
    if (!forecastContainer) return;

    let forecastHTML = '';
    // Loop through the first 3 days (index 0 is today)
    for (let i = 0; i < 3; i++) {
        const dayData = data.daily[i];
        const dayTemp = dayData.temp.day.toFixed(0);

        const date = new Date(dayData.dt * 1000);
        const dayName = (i === 0) 
            ? 'Today' 
            : date.toLocaleDateString('en-US', { weekday: 'long' });

        forecastHTML += `
            <div class="forecast-day">
                <p>${dayName}: <strong>${dayTemp}°F</strong></p>
            </div>
        `;
    }
    forecastContainer.innerHTML = forecastHTML;
}

/**
 * Fetches weather data from the API and calls display functions.
 */
async function fetchWeather() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Weather fetch failed:", error);
        if (currentWeatherContainer) {
            currentWeatherContainer.innerHTML = "<p>Weather data unavailable.</p>";
        }
        if (forecastContainer) {
            forecastContainer.innerHTML = "<p>Forecast unavailable.</p>";
        }
    }
}

// Initial fetch
fetchWeather();