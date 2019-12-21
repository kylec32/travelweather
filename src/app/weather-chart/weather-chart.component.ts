import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { Chart, ChartDataSets, ChartOptions } from 'chart.js';
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
    let dataPoints = this.forecast.map(entry => entry.tempeture.tempeture);

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            data: dataPoints,
            borderColor: '#7B7B7B',
            fill: true
          },
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
            }
          }]
        }
      }
    });
  }

  ngOnInit() {
    
  }

}
