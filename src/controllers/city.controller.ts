import { Request, Response } from "express";
import asyncHandler from "express-async-handler";


import { ErrorMessages } from "../constants/errorMessages";
import { UserModel } from "../models/User";
import { apiResponse } from "../responses/apiResponse";
import cityService from "../services/city.service";
import { normalizeCity } from "../utils/normalize";

export const getCityByName = asyncHandler(
  async (req: Request, res: Response) => {
    const name = req.query.name as string;
    const cities = await cityService.findAllCitiesByName(name);
    res.status(200).json(apiResponse(cities.map(normalizeCity)));
  }
);

export const getCityByUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user as UserModel;
    const cities = await cityService.findAllCitiesOfUser(user);
    res.status(200).json(apiResponse(cities.map(normalizeCity)));
  }
);

export const addCityToUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user as UserModel;
    const { city } = req.body;

    const cityExists = await cityService.findCityById(city.id);
    if (!cityExists) {
      res.status(404);
      throw new Error(ErrorMessages.INVALID_CITY_ID);
    }

    const modifiedUser = await cityService.attachCityToUser(cityExists, user);
    res
      .status(200)
      .json(apiResponse(await cityService.findAllCitiesOfUser(modifiedUser)));
  }
);

export const deleteCityFromUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user as UserModel;
    const { cityId } = req.params;

    const modifiedUser = await cityService.removeCityFromUser(cityId, user);
    res
      .status(200)
      .json(apiResponse(await cityService.findAllCitiesOfUser(modifiedUser)));
  }
);
