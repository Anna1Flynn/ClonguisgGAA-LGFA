document.querySelectorAll('.social-media-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.innerText = link.getAttribute('title');
        link.appendChild(tooltip);
    });
    
    link.addEventListener('mouseleave', () => {
        const tooltip = link.querySelector('.tooltip');
        if (tooltip) tooltip.remove();
    });
});
const API_KEY = 'ddab73a4319f0f5dc1c4cf8b030db1bf'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

async function getWeatherForecast() {
    const location = document.getElementById('location').value;
    const weatherDiv = document.getElementById('weather');

    if (!location) {
        weatherDiv.innerHTML = '<p>Please enter a location.</p>';
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}?q=${location},IE&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        if (data.cod !== "200") {
            weatherDiv.innerHTML = `<p>${data.message}</p>`;
            return;
        }

        // Extract the forecast for the next 5 days (every 3 hours)
        const forecasts = data.list.slice(0, 5).map(forecast => {
            const time = new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const date = new Date(forecast.dt * 1000).toLocaleDateString();
            const temp = forecast.main.temp;
            const description = forecast.weather[0].description;
            const icon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

            return `
                <div>
                    <h3>${date} ${time}</h3>
                    <img src="${icon}" alt="${description}">
                    <p>${description}, ${temp}°C</p>
                </div>
            `;
        });

        weatherDiv.innerHTML = `
            <h2>5-Day Weather Forecast for ${location}</h2>
            ${forecasts.join('')}
        `;
    } catch (error) {
        weatherDiv.innerHTML = `<p>Failed to fetch weather data. Please try again.</p>`;
    }
}