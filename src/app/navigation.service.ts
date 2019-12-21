import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DirectionsResponse, RouteShapeResponse, Coordinate } from './navigation.models.interface';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly KEY: string = "UIyBXWhvrdRUNfGmAGD4U4sR5FGtykWq0000";
  private readonly BASE_NAVIGATION: string = `https://open.mapquestapi.com/directions/v2/route?key=${this.KEY.substring(0,32)}`;
  private readonly BASE_WAYPOINTS: string = `https://open.mapquestapi.com/directions/v2/routeshape?key=${this.KEY.substring(0,32)}&fullShape=true`

  constructor(private client:HttpClient) { }

  getRouteInformation(from:string, to:string): Observable<DirectionsResponse> {
    return this.client.get<DirectionsResponse>(`${this.BASE_NAVIGATION}&from=${from}&to=${to}`);
  }

  getWayPoints(sessionId:string): Observable<Coordinate[]> {
    
    return this.client.get<RouteShapeResponse>(`${this.BASE_WAYPOINTS}&sessionId=${sessionId}`)
                .pipe(
                  map(response => {
                      var rawPoints = response.route.shape.shapePoints;

                      let processedPoints: Coordinate[] = [];
                      while(rawPoints.length > 0) {
                        let nextTuple = rawPoints.splice(0,2);
                        processedPoints.push(<Coordinate>{"latitude":nextTuple[0], "longitude":nextTuple[1]});
                        }
                      return processedPoints;
                  })
                );        
  }

  // getFilteredNumberOfWaypoints(sessionId: string, numberOfPoints:number): Observable<Coordinate[]> {
  //   this.getWayPoints(sessionId)
  //         .subscribe(value => {
  //           let size = value.length;
  //           let step = Math.floor(size / numberOfPoints);

  //         })
  // }
}
