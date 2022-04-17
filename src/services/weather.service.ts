import axios from "axios";
import removeAccents from "remove-accents";


import { AppConfig } from "../config/appconfig";
import { CityModel } from "../models/City";
import { Forecast } from "../models/Forecast";
import { CityWeather } from "../models/Weather";

export const getWeatherInfo = async (
  cityName: string
): Promise<CityWeather> => {
  const name = removeAccents(cityName);
  const weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${AppConfig.openweatherAPI}&units=metric`;
  const { data } = await axios.get<CityWeather>(weatherApiURL);
  return data;
};

export const getWeatherForecast = async (
  city: CityModel
): Promise<Forecast> => {
  const { lat, lon } = city.coord;

  const weatherApiURL = "https://api.openweathermap.org/data/2.5/onecall";
  const { data } = await axios.get<Forecast>(weatherApiURL, {
    params: { lat, lon, appid: AppConfig.openweatherAPI, units: "metric" },
  });
  return data;
};
