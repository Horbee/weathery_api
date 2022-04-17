import axios from "axios";
import { Request, Response } from "express";
import removeAccents from "remove-accents";


import { AppConfig } from "../config/appconfig";
import { ErrorMessages } from "../constants/errorMessages";
import { errorResponse } from "../responses/errorResponse";

export const getWeatherInfoByCity = async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;

    // check if name is provided
    if (!name)
      return res.status(400).json(errorResponse(ErrorMessages.INVALID_CITY));

    // remove accents
    const weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${removeAccents(
      name
    )}&appid=${AppConfig.openweatherAPI}&units=metric`;

    try {
      const response = await axios.get(weatherApiURL);
      res.status(200).json({ success: true, data: response.data });
    } catch (weatherErr: any) {
      res.status(400).json(errorResponse(weatherErr.message));
    }
  } catch (err) {
    res.status(500).json(errorResponse(ErrorMessages.SERVER_ERROR));
  }
};

export const getWeatherForecastByCoords = async (
  req: Request,
  res: Response
) => {
  try {
    const { city } = req.body;
    const {
      coord: { lat, lon },
    } = city;

    const weatherApiURL = "https://api.openweathermap.org/data/2.5/onecall";

    try {
      const response = await axios.get(weatherApiURL, {
        params: { lat, lon, appid: AppConfig.openweatherAPI, units: "metric" },
      });

      res.status(200).json({
        success: true,
        data: { cityName: city.name, forecast: response.data },
      });
    } catch (weatherErr: any) {
      res.status(400).json(errorResponse(weatherErr.message));
    }
  } catch (err) {
    res.status(500).json(errorResponse(ErrorMessages.SERVER_ERROR));
  }
};
