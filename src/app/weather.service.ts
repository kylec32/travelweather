import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OWMBaseResponse, LocationWeather, TemperatureData, Weather, Wind, OWMForcastBaseResponse, Forecast} from './weather.models.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly KEY: string = "";
  
  constructor(private httpClient: HttpClient) { }

  getWeatherForLocation(latitude: number, longitude: number): Observable<LocationWeather> {
    return this.httpClient.get<OWMBaseResponse>(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.KEY}&units=imperial`)
          .pipe(
            map(response => {
              let weather: LocationWeather = <LocationWeather>{};

              weather.locationName = response.name;
              weather.latitude = response.coord.lat;
              weather.longitude = response.coord.lon;
              weather.tempeture = <TemperatureData>{tempeture: response.main.temp, maxTempeture: response.main.temp_max, minTempeture: response.main.temp_min};
              weather.weather = <Weather>{mainLabel: response.weather[0].main, detailedLabel: response.weather[0].description, icon: `http://openweathermap.org/img/wn/${response.weather[0].icon}.png`};
              weather.wind = <Wind>{speed: response.wind.speed, angle: response.wind.deg};
              weather.forcast = [];

              this.getForecastForLocation(weather.latitude, weather.longitude)
                    .subscribe(forecasts => {
                      weather.forcast = forecasts;
                      console.log(weather);
                    });

              return weather;
            })
          )
  }

  getForecastForLocation(latitude: number, longitude: number): Observable<Forecast[]> {
    return this.httpClient.get<OWMForcastBaseResponse>(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${this.KEY}&units=imperial`)
          .pipe(
            map(response => {
              return response.list.map(owmforecast => {
                let forecast = <Forecast>{};
                //debugger;
                forecast.dateTime = new Date(owmforecast.dt * 1000);
                forecast.tempeture = <TemperatureData>{tempeture: owmforecast.main.temp, maxTempeture: owmforecast.main.temp_max, minTempeture: owmforecast.main.temp_min};
                forecast.weather = <Weather>{mainLabel: owmforecast.weather[0].main, detailedLabel: owmforecast.weather[0].description, icon: `http://openweathermap.org/img/wn/${owmforecast.weather[0].icon}.png`};
                forecast.wind = <Wind>{speed: owmforecast.wind.speed, angle: owmforecast.wind.deg};
                
                return forecast;
              });
            })
          );
  }
}
