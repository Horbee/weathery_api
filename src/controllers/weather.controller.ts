import { Request, Response } from "express";


import { ErrorMessages } from "../constants/errorMessages";
import { apiResponse } from "../responses/apiResponse";
import { errorResponse } from "../responses/errorResponse";
import { getWeatherForecast, getWeatherInfo } from "../services/weather.service";

export const getWeatherInfoByCity = async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;

    // check if name is provided
    if (!name)
      return res.status(400).json(errorResponse(ErrorMessages.INVALID_CITY));

    try {
      const weather = await getWeatherInfo(name);
      res.status(200).json(apiResponse(weather));
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

    try {
      const forecast = await getWeatherForecast(city);
      res.status(200).json(apiResponse({ cityName: city.name, forecast }));
    } catch (weatherErr: any) {
      res.status(400).json(errorResponse(weatherErr.message));
    }
  } catch (err) {
    res.status(500).json(errorResponse(ErrorMessages.SERVER_ERROR));
  }
};
