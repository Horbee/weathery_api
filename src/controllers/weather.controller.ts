import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { apiResponse } from "../responses/apiResponse";
import weatherService from "../services/weather.service";

export const getWeatherInfoByCity = asyncHandler(
  async (req: Request, res: Response) => {
    const name = req.query.name as string;
    const weather = await weatherService.getWeatherInfo(name);
    res.status(200).json(apiResponse(weather));
  }
);

export const getWeatherForecastByCity = asyncHandler(
  async (req: Request, res: Response) => {
    const cityName = req.query.name as string;

    const forecast = await weatherService.getWeatherForecast(cityName);
    res.status(200).json(apiResponse({ cityName, forecast }));
  }
);
