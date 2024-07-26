function getWeather() {
    const city = document.getElementById('city').value;
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        .then(response => response.json())
        .then(data => {
            const latitude = data.results[0].latitude;
            const longitude = data.results[0].longitude;
            document.getElementById('city-name').innerText = data.results[0].name;
            return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=Europe/London`);
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('temperature').innerText = data.current_weather.temperature + '°C';
            document.getElementById('weather').innerText = data.current_weather.weathercode;
            document.getElementById('wind-speed').innerText = data.current_weather.windspeed + ' km/h';
        })
        .catch(error => console.error('Error:', error));
}