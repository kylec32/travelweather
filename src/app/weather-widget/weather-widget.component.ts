import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { LocationWeather } from '../weather.models.interface';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
export class WeatherWidgetComponent implements OnInit, OnChanges {

  @Input() weatherData: LocationWeather;
  temperature: number;

  constructor() { }

  ngOnChanges() {
    this.temperature = Math.round(this.weatherData.tempeture.tempeture);
  }

  ngOnInit() {
  }

}
