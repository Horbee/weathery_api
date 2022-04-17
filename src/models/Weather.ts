export interface CityWeather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: {
    all: number;
  };
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
