import { Request, Response } from "express";


import { ErrorMessages } from "../constants/errorMessages";
import { City } from "../models/City";
import { UserModel } from "../models/User";
import { apiResponse } from "../responses/apiResponse";
import { errorResponse } from "../responses/errorResponse";
import {
    attachCityToUser, findAllCitiesByName, findAllCitiesOfUser, findCityById, removeCityFromUser
} from "../services/city.service";
import { normalizeCity } from "../utils/normalize";

export const getCityByName = async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;
    if (!name) res.status(400).json(errorResponse(ErrorMessages.INVALID_CITY));

    const cities = await findAllCitiesByName(name);
    res.status(200).json(apiResponse(cities.map(normalizeCity)));
  } catch (err) {
    res.status(500).json(errorResponse(ErrorMessages.SERVER_ERROR));
  }
};

export const getCityByUser = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserModel;
    const cities = await findAllCitiesOfUser(user);
    res.status(200).json(apiResponse(cities.map(normalizeCity)));
  } catch (err) {
    res.status(500).json(errorResponse(ErrorMessages.SERVER_ERROR));
  }
};

export const addCityToUser = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserModel;
    const { city } = req.body;

    if (!city)
      return res.status(400).json(errorResponse(ErrorMessages.INVALID_CITY_ID));

    const cityExists = await findCityById(city.id);
    if (!cityExists)
      return res.status(400).json(errorResponse(ErrorMessages.INVALID_CITY_ID));

    const modifiedUser = await attachCityToUser(cityExists, user);
    res.status(200).json(apiResponse(await findAllCitiesOfUser(modifiedUser)));
  } catch (err) {
    res.status(500).json(errorResponse(ErrorMessages.SERVER_ERROR));
  }
};

export const deleteCityFromUser = async (req: Request, res: Response) => {
  try {
    try {
      const user = req.user as UserModel;
      const { cityId } = req.params;

      const modifiedUser = await removeCityFromUser(cityId, user);
      res
        .status(200)
        .json(apiResponse(await findAllCitiesOfUser(modifiedUser)));
    } catch (err: any) {
      res.status(400).json(errorResponse(err.message));
    }
  } catch (err) {
    res.status(500).json(errorResponse(ErrorMessages.SERVER_ERROR));
  }
};
