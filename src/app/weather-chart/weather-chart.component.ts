import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { Chart, ChartDataSets, ChartOptions, ScaleTitleOptions } from 'chart.js';
import { Forecast } from '../weather.models.interface';

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.css']
})
export class WeatherChartComponent implements OnInit, OnChanges {

  @Input() forecast: Forecast[];
  @ViewChild('lineChart', {static: true}) private chartRef;
  chart: Chart;
  dayOfTheWeek: string;
  icon: string;
  private days: string[] = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];

  constructor() { }

  ngOnChanges() {
    this.dayOfTheWeek = this.days[this.forecast[0].dateTime.getDay()];
    this.icon = this.forecast[0].weather.icon;
    let labels = this.forecast.map(entry => (entry.dateTime.getHours() % 12 == 0 ? 12 : entry.dateTime.getHours() % 12 ) + " " + (entry.dateTime.getHours() > 12 ? "PM" : "AM"));
    let tempetureDataPoints = this.forecast.map(entry => entry.tempeture.tempeture);
    let snowProbabilityDataPoints = this.forecast.map(entry => entry.weather.snowProbability);

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            data: tempetureDataPoints,
            borderColor: '#FF3300',
            backgroundColor: "rgba(255, 230, 230, 0.8)",
            fill: true,
            yAxisID: "temp"
          },
          {
            data: snowProbabilityDataPoints,
            borderColor: '#0000FF',
            backgroundColor: "rgba(230, 230, 255, 0.8)",
            fill: true,
            yAxisID: "prob"
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true,
            ticks: {
                callback: function (value) { return Number(value.toFixed(0)); }
            },
            id: "temp"
          },
          {
            display: true,
            position: 'right',
            scaleLabel: <ScaleTitleOptions> {
              labelString: "Snow Probablity %",
              display: true
            },
            ticks: {
                callback: function (value) { return Number(value.toFixed(0)); },
                beginAtZero: true,
                max: 100
            },
            id: "prob"
          }
          ]
        }
      }
    });
  }

  ngOnInit() {
    
  }

}
