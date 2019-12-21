import { Component, OnInit,Input, OnChanges } from '@angular/core';
import { Forecast } from '../weather.models.interface';

@Component({
  selector: 'app-forcast-details',
  templateUrl: './forcast-details.component.html',
  styleUrls: ['./forcast-details.component.css']
})
export class ForcastDetailsComponent implements OnInit, OnChanges {

  @Input() forecast: Forecast[];
  groupedForcasts: Array<Array<Forecast>>;

  constructor() { }

  ngOnChanges() {
    let gatherGroups: Array<Array<Forecast>> = [];

    this.forecast.forEach(item => {
      if(gatherGroups.length == 0) {
        gatherGroups.push([item]);
      } else {
        if(gatherGroups[gatherGroups.length - 1][0].dateTime.getDay() == item.dateTime.getDay()) {
          gatherGroups[gatherGroups.length - 1].push(item);
        } else {
          gatherGroups.push([item])
        }
      }
    });

    this.groupedForcasts = gatherGroups;
  }

  ngOnInit() {
    
  }

}
