const fetch = require('node-fetch'); 

const KEY = process.env.HERE_KEY;

exports.handler = async function(event, context, callback) {
    let forecast_url = `https://weather.ls.hereapi.com/weather/1.0/report.json?product=forecast_hourly&latitude=${event.queryStringParameters.latitude}&longitude=${event.queryStringParameters.longitude}&oneobservation=true&apiKey=${KEY}&metric=false`
    let current_weather_url = `https://weather.ls.hereapi.com/weather/1.0/report.json?product=observation&latitude=${event.queryStringParameters.latitude}&longitude=${event.queryStringParameters.longitude}&oneobservation=true&apiKey=${KEY}&metric=false`

    let forecastResponse = await fetch(forecast_url);
    let currentWeatherResponse = await fetch(current_weather_url);
    let forecastJsonResponse = await forecastResponse.json();
    let currentWeatherJsonResponse = await currentWeatherResponse.json();
    let forecastEntries = forecastJsonResponse.hourlyForecasts.forecastLocation.forecast;
    let currentWeather = currentWeatherJsonResponse.observations.location[0];

    let locationWeather = {
        locationName: currentWeather.city,
        latitude: event.queryStringParameters.latitude,
        longitude: event.queryStringParameters.longitude,
        tempeture: {
            tempeture: currentWeather.observation[0].temperature,
            feelsLike: currentWeather.observation[0].temperature,
            minTempeture: currentWeather.observation[0].lowTemperature,
            maxTempeture: currentWeather.observation[0].highTemperature
        },
        weather: {
            mainLabel: currentWeather.observation[0].description,
            detailedLabel: currentWeather.observation[0].description,
            icon: `${currentWeather.observation[0].iconLink}?apiKey=${KEY}`
        },
        wind: {
            speed: currentWeather.observation[0].windSpeed,
            angle: currentWeather.observation[0].windDirection
        },
        forcast: forecastEntries.map(entry => {
            return {
                dateTime: entry.utcTime,
                tempeture: {
                    tempeture: entry.temperature,
                    feelsLike: entry.temperature,
                    minTempeture: entry.temperature,
                    maxTempeture: entry.temperature
                },
                weather: {
                    mainLabel: entry.description,
                    detailedLabel: entry.description,
                    rainProbability: entry.rainFall != '*' ? entry.precipitationProbability : 0,
                    snowProbability: entry.snowFall != '*' ? entry.precipitationProbability : 0,
                    icon: `${entry.iconLink}?apiKey=${KEY}`
                },
                wind: {
                    speed: entry.windSpeed,
                    angle: entry.windDirection
                }
            }
        })
    }

    callback(null, {
        statusCode: 200,
        body: JSON.stringify(locationWeather)
    });
}