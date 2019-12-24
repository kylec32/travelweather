import { Component, OnInit } from '@angular/core';
import { NavigationService } from './navigation.service';
import { LocationWeather } from './weather.models.interface';
import { Coordinate } from './navigation.models.interface';
import { WeatherService } from './weather.service';

export interface Location {
  coordinate: Coordinate,
  name: string
}

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
  locations: Location[];

  constructor(private navigationService: NavigationService,
              private weatherService: WeatherService) {
    this.locations = [];
  }

  loadWeather(location: Location) {
    console.log(location);
    // this.weatherService.getWeatherForLocation(location.latitude, location.longitude)
    //               .subscribe(value => {
    //                 this.testWeather = value;
    //               });
    this.weatherService.getWeatherForecastForLocation(location.coordinate.latitude, location.coordinate.longitude)
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
                  let firstLocation = {'coordinate': points[0], name:''};

                  // this.navigationService.getLocation(points[0].latitude, points[0].longitude)
                  //                         .subscribe(locationName => firstLocation.name = locationName);

                  let locations: Location[] = [firstLocation];
                  for(let i=step, index=0; index < (this.locationCounts -2); i += step, index++) {
                    locations.push({'coordinate':points[i], name:''});
                  }
                  locations.push({'coordinate': points[points.length-1], name:''});
                  this.locations = locations;

                  this.locations.forEach(locationItem => {
                    this.navigationService.getLocation(locationItem.coordinate.latitude, locationItem.coordinate.longitude)
                                            .subscribe(locationName => locationItem.name = locationName.city + ", " + locationName.state);
                  })
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
