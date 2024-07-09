const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const errorText = document.getElementById('errorText');
const weatherData = document.getElementById('weatherData');

weatherForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city !== '') {
        getWeather(city);
        cityInput.value = '';
    } else {
        showError('Please enter a city name');
    }
});

async function getWeather(city) {
    const apiKey = 'f47667a6aac6467596b214543240907';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const weather = await response.json();
        displayWeather(weather);
    } catch (error) {
        showError(error.message);
    }
}

function displayWeather(weather) {
    const { location, current } = weather;

    const weatherHTML = `
    <h2>${location.name}, ${location.country}</h2>
    <p>Local Time: ${location.localtime}</p>
    <p>Temperature: ${current.temp_c}°C</p>
    <p>Weather: ${current.condition.text}</p>
  `;
    weatherData.innerHTML = weatherHTML;
    errorText.textContent = '';
}

function showError(message) {
    weatherData.innerHTML = '';
    errorText.textContent = message;
}
