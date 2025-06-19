const cityInput = document.querySelector('.city-input')
const searchButton = document.querySelector('.search-button')
const weatherinformation = document.querySelector('.informationofweather')

const cityname = document.querySelector('city-name')
const dateinfo = document.querySelector('date')
const weathersummary = document.querySelector('weather-summary')
const currentTemp = document.querySelector('current-temp')
const condition = document.querySelector('condition')
const humidityPercent = document.querySelector('percent')
const windSpeed = document.querySelector('speed')
const apikey = '342f96fd844531571a3e817f1c163c7d'

searchButton.addEventListener('click', () => {
    if (cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value)
        cityInput.value = '';
        cityInput.blur();
    }
})

cityInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' && cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value)
        cityInput.value = '';
        cityInput.blur();
    }
})
async function getFetchData(endPoint, city) {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apikey}&units=metric'

    const responce = await fetch(apiUrl)
    return responce.json() 
}
async  function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather')
    console.log(weatherData);
    
}