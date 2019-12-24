import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ChartsModule } from 'ng2-charts';

import { NavigationService } from './navigation.service';

import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';
import { WeatherChartComponent } from './weather-chart/weather-chart.component';
import { ForcastDetailsComponent } from './forcast-details/forcast-details.component';
import { WideForecastComponent } from './wide-forecast/wide-forecast.component';

const OPEN_WEATHER_MAP_API_KEY: string = "a175758ffbb12254c31d95c1a97feaa4";

@NgModule({
  declarations: [
    AppComponent,
    WeatherWidgetComponent,
    WeatherChartComponent,
    ForcastDetailsComponent,
    WideForecastComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    ChartsModule
  ],
  providers: [NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
