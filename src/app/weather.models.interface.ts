import { Coordinate } from './navigation.models.interface';

export interface LocationWeather {
    locationName: string,
    latitude: number,
    longitude: number,
    tempeture: TemperatureData,
    weather: Weather,
    wind: Wind,
    forcast: Forecast[]
}

export interface TemperatureData {
    tempeture: number,
    feelsLike: number,
    minTempeture: number,
    maxTempeture: number
}

export interface Weather {
    mainLabel: string,
    detailedLabel: string,
    icon: string
}

export interface Wind {
    speed: number,
    angle: number
}

export interface Forecast {
    dateTime: Date,
    tempeture: TemperatureData,
    weather: Weather,
    wind: Wind
}

export interface OWMForcastBaseResponse {
    list: OWMForcast[]
}

export interface OWMForcast {
    dt: number,
    main: OWMTemperature,
    weather: OWMWeather[],
    wind: OWMWind
}

export interface OWMBaseResponse {
    name: string // location name
    coord: OWMCoordinate,
    main: OWMTemperature,
    weather: OWMWeather[],
    wind: OWMWind
}

export interface OWMCoordinate {
    lon: number,
    lat: number
}

export interface OWMTemperature {
    temp: number,
    temp_max: number,
    temp_min: number
}

export interface OWMWind {
    speed: number,
    deg: number
}

export interface OWMWeather {
    id: number,
    main: string,
    description: string,
    icon: string
}