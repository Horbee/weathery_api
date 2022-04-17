import { Request, Response } from "express";


import { ErrorMessages } from "../constants/errorMessages";
import { City } from "../models/City";
import { UserModel } from "../models/User";
import { errorResponse } from "../responses/errorResponse";
import { normalizeCity } from "../utils/normalize";

export const getCityByName = async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;
    if (!name) res.status(400).json(errorResponse(ErrorMessages.INVALID_CITY));

    const nameReg = new RegExp("^" + name!.toLowerCase(), "i");

    try {
      const cities = await City.find({ name: { $regex: nameReg } });
      res.status(200).json({ success: true, data: cities.map(normalizeCity) });
    } catch (weatherErr: any) {
      res.status(400).json(errorResponse(weatherErr.message));
    }
  } catch (err) {
    res.status(500).json(errorResponse(ErrorMessages.SERVER_ERROR));
  }
};

export const getCityByUser = async (req: Request, res: Response) => {
  try {
    try {
      const user = req.user as UserModel;
      const cities = await City.find({ _id: { $in: user.cities } });
      res.status(200).json({ success: true, data: cities.map(normalizeCity) });
    } catch (err: any) {
      res.status(400).json(errorResponse(err.message));
    }
  } catch (err) {
    res.status(500).json(errorResponse(ErrorMessages.SERVER_ERROR));
  }
};

export const addCityToUser = async (req: Request, res: Response) => {
  try {
    try {
      const user = req.user as UserModel;
      const { city } = req.body;

      if (!city)
        return res
          .status(400)
          .json(errorResponse(ErrorMessages.INVALID_CITY_ID));

      // Check if city is exists
      const cityExists = await City.findById(city.id);
      if (!cityExists)
        return res
          .status(400)
          .json(errorResponse(ErrorMessages.INVALID_CITY_ID));

      // Check if city is already added
      if (!user.cities.includes(cityExists._id)) {
        if (user.cities.length >= 10) {
          user.cities.shift();
        }
        user.cities.push(cityExists._id);
        await user.save();
      }
      res.status(200).json({ success: true, data: "City added." });
    } catch (err: any) {
      res.status(400).json(errorResponse(err.message));
    }
  } catch (err) {
    res.status(500).json(errorResponse(ErrorMessages.SERVER_ERROR));
  }
};

export const deleteCityFromUser = async (req: Request, res: Response) => {
  try {
    try {
      const user = req.user as UserModel;
      const { cityId } = req.params;

      console.log(cityId, user.cities);

      // remove city from user
      user.cities = user.cities.filter((city) => city.toString() !== cityId);
      await user.save();
      res.status(200).json({ success: true, data: "City removed." });
    } catch (err: any) {
      res.status(400).json(errorResponse(err.message));
    }
  } catch (err) {
    res.status(500).json(errorResponse(ErrorMessages.SERVER_ERROR));
  }
};
