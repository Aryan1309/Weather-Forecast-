import { weatherApiKey as apiKey } from './config.js'  // Replace with your OpenWeather API key
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', () => {
  const city = document.getElementById('city').value;
  if (city) {
    getWeather(city);
  }
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeather(data) {
  const location = document.getElementById('location');
  const temperature = document.getElementById('temperature');
  const description = document.getElementById('description');
  const icon = document.getElementById('icon');

  location.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  description.textContent = `Weather: ${data.weather[0].description}`;
  icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}
