document.addEventListener('DOMContentLoaded', () => {
    // const inputContainer = document.querySelector('.input-container');
    const cityInput = document.getElementById('city-input');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityNameDisplay = document.getElementById('city-name');
    const temperatureDisplay = document.getElementById('temperature');
    const descriptionDisplay = document.getElementById('description');
    // const weatherIcon = document.getElementById('weather-icon');
    const humidityDisplay = document.getElementById('humidity');
    const windSpeedDisplay = document.getElementById('wind-speed');
    const errorMessage = document.getElementById('error-message');
    const API_KEY = '43425a8a3d38b31511f9a7078602f7b2'; // Replace with your OpenWeatherMap API key, it's freely available on there website after signing up


    getWeatherBtn.addEventListener('click', async() => {
        const city = cityInput.value.trim();
        if (!city) return;
        
        try{
            const weatherDAta = await fetchWeatherData(city);
            displayWeatherData(weatherDAta);

        } catch (error){
            showError();
        }

    })

    async function fetchWeatherData(city) {
        //to get data from openweathermap api 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const apiResponse = await fetch(url);
        console.log("API response status:", apiResponse.status);

        if (!apiResponse.ok){
            throw new Error(`Error: ${apiResponse.status} ${apiResponse.statusText}`);
        }

        const data = await apiResponse.json();
        console.log("Parsed weather data:", data);
        return data;

    }

    function displayWeatherData(weatherDataContent){
        //to display data on webpage after data has been retrieved
        console.log(weatherDataContent);

        const  {name, main, weather, wind} = weatherDataContent;
        cityNameDisplay.textContent = name;

        temperatureDisplay.innerHTML = `<span>Temperature: ${main.temp}</span>`;
        descriptionDisplay.innerHTML = `<span>Description: ${weather[0].description}</span>`;
        humidityDisplay.innerHTML = `<span>Humidity: ${main.humidity}</span>`;
        windSpeedDisplay.innerHTML = `<span>Wind Speed: ${wind.speed}</span>`;

        //unlock the display to show info
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function showError() {
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');

    }


})