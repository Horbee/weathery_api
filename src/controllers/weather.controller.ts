import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { ErrorMessages } from "../constants/errorMessages";
import { apiResponse } from "../responses/apiResponse";
import {
  getWeatherForecast,
  getWeatherInfo,
} from "../services/weather.service";

export const getWeatherInfoByCity = asyncHandler(
  async (req: Request, res: Response) => {
    const name = req.query.name as string;
    const weather = await getWeatherInfo(name);
    res.status(200).json(apiResponse(weather));
  }
);

export const getWeatherForecastByCoords = asyncHandler(
  async (req: Request, res: Response) => {
    const { city } = req.body;

    const forecast = await getWeatherForecast(city);
    res.status(200).json(apiResponse({ cityName: city.name, forecast }));
  }
);
