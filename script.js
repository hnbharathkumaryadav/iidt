 const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc';

$(document).ready(function () {
    weatherFn('Pune');

    $('#city-input-btn').on('click', function () {
        const cityName = $('#city-input').val();
        if (cityName) {
            weatherFn(cityName);
        }
    });

    $('#city-input').on('keypress', function (e) {
        if (e.which == 13) { 
            const cityName = $('#city-input').val();
            if (cityName) {
                weatherFn(cityName);
            }
        }
    });
});

async function weatherFn(cName) {
    const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        alert('Error fetching weather data. Please try again later.');
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    $('#weather-icon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    $('#weather-info').fadeIn();
}









