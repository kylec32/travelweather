export interface DirectionsResponse {
    route: Route
}

export interface Route {
    sessionId: string
}

export interface RouteShapeResponse {
    route: RouteShape
}

export interface RouteShape {
    shape: Shape
}

export interface Shape {
    shapePoints: number[]
}

export interface Coordinate {
    latitude: number,
    longitude: number
}

export interface LocationDetails {
    city: string,
    state: string
}