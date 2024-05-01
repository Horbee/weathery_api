import axios from "axios";
import removeAccents from "remove-accents";

import cityService from "./city.service";
import { AppConfig } from "../config/appconfig";
import { Forecast } from "../models/Forecast";
import { CityWeather } from "../models/Weather";

const getWeatherInfo = async (cityName: string): Promise<CityWeather> => {
  const name = removeAccents(cityName);
  const weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${AppConfig.openweatherAPI}&units=metric`;
  const { data } = await axios.get<CityWeather>(weatherApiURL);
  return data;
};

const getWeatherForecast = async (cityName: string): Promise<Forecast> => {
  const name = removeAccents(cityName);
  const city = await cityService.findCityByName(name);

  if (!city) throw new Error(`City: ${cityName} not found`);

  const weatherApiURL = "https://api.openweathermap.org/data/2.5/onecall";
  const { data } = await axios.get<Forecast>(weatherApiURL, {
    params: {
      lat: city.lat,
      lon: city.lng,
      appid: AppConfig.openweatherAPI,
      units: "metric",
    },
  });
  return data;
};

export default {
  getWeatherInfo,
  getWeatherForecast,
};
