import { Component, OnInit } from '@angular/core';
import { NavigationService } from './navigation.service';
import { LocationWeather } from './weather.models.interface';
import { Coordinate } from './navigation.models.interface';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  locationCounts = 5;
  startLocation:string = "West Jordan, UT";
  endLocation:string = "St. George, UT";
  testWeather: LocationWeather;
  locations: Coordinate[];

  constructor(private navigationService: NavigationService,
              private weatherService: WeatherService) {
    this.locations = [];
  }

  loadWeather(location: Coordinate) {
    console.log(location);
    this.weatherService.getWeatherForLocation(location.latitude, location.longitude)
                  .subscribe(value => {
                    this.testWeather = value;
                  });
  }

  getWeather() {
    this.locations = [];
    this.navigationService.getRouteInformation(this.startLocation, this.endLocation)
        .subscribe((data) => {
          console.log(data);
          this.navigationService.getWayPoints(data.route.sessionId)
                .subscribe((points) => {
                  console.log(points);
                  let step = Math.floor(points.length / (this.locationCounts));
                  let locations = [points[0]];
                  for(let i=step, index=0; index < (this.locationCounts -2); i += step, index++) {
                    locations.push(points[i]);
                  }
                  locations.push(points[points.length-1]);
                  console.log("Final points");
                  console.log(locations);
                  this.locations = locations;
                })
        });
  }

  ngOnInit() {
    // this.navigationService.getRouteInformation("St George, UT", "Wes Jordan UT")
    //     .subscribe((data) => {
    //       console.log(data);
    //       this.navigationService.getWayPoints(data.route.sessionId)
    //             .subscribe((points) => {
    //               console.log(points);
    //             })
    //     });

    this.testWeather = null;
  }
}
