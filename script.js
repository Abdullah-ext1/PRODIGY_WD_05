const cityInput = document.querySelector('.city-input')
const searchButton = document.querySelector('.search-button')
const weatherinformation = document.querySelector('.informationofweather')

const cityname = document.querySelector('.city-name')
const dateinfo = document.querySelector('.date')
const weathersummary = document.querySelector('.weather-summary')
const currentTemp = document.querySelector('.current-temp')
const condition = document.querySelector('.condition')
const humidityPercent = document.querySelector('.percent')
const windSpeed = document.querySelector('.speed')
const searchcitySection = document.querySelector('.search-city')
const notFound = document.querySelector('.not-found')
const weathersummaryImg = document.querySelector('.weather-summary-Img')
const forecastitem = document.querySelector('.forcast-items')

const forecastitemscontainer = document.querySelector('.forcast-items-container')
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
function getWeatherIcon(id) {
    if (id <= 232) return 'thunderstorm.svg'
    if (id <= 321) return 'drizzle.svg'
    if (id <= 531) return 'rain.svg'
    if (id <= 622) return 'snow.svg'
    if (id <= 781) return 'atmosphere.svg'
    if (id <= 800) return 'clear.svg'
    else return 'clouds.svg'


}
function getCurrentDate() {
    const currentDate = new Date()
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
    }
    return currentDate.toLocaleDateString('en-GB', options)


}
async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apikey}&units=metric`

    const responce = await fetch(apiUrl)
    return responce.json()
}
async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city)

    if (weatherData.cod != 200) {
        showDisplaySection(notFound)
        return

    }
    console.log(weatherData);

    const {
        name: country,
        main: { temp, humidity },
        weather: [{ id, main }],
        wind: { speed },

    } = weatherData

    cityname.textContent = country
    currentTemp.textContent = Math.round(temp) + '°C'
    humidityPercent.textContent = humidity + '%'
    windSpeed.textContent = speed + 'm/s'
    condition.textContent = main
    dateinfo.textContent = getCurrentDate()

    weathersummaryImg.src = `assets/weather/${getWeatherIcon(id)}`
    await updateForecastInfo(city)
    showDisplaySection(weatherinformation)

}
async function updateForecastInfo(city) {
    const forecastData = await getFetchData('forecast', city)
    const timeTaken = '12:00:00'
    const todayDate = new Date().toISOString().split('T')[0]

    forecastitemscontainer.innerHTML = '';
    forecastData.list.forEach(forecastWeather => {
        if (forecastWeather.dt_txt.includes(timeTaken)
            && !forecastWeather.dt_txt.includes(todayDate)) {
            updateforecastWeather(forecastWeather)
        }
    });


}
function updateforecastWeather(weatherData) {
    const {
        dt_txt: date,
        weather: [{ id }],
        main: { temp },

    } = weatherData
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
    const forcastitem = `
    <div class="forcast-items">
      <h5><div class="forcast-date">${formattedDate}</div></h5>
      <img src="assets/weather/${getWeatherIcon(id)}" class="thunder-img">
       <h4 class="forcast-temp">${Math.round(temp) + '°C'}</h4>
    </div>`
    forecastitemscontainer.insertAdjacentHTML('beforeend', forcastitem)
}
function showDisplaySection(section) {
    [weatherinformation, searchcitySection, notFound]
        .forEach(section => section.style.display = 'none')
    section.style.display = ''
}