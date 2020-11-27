import { Request, Response } from "express";

import { ErrorMessages } from "../constants/errorMessages";
import { City } from "../models/City";
import { errorResponse } from "../responses/errorResponse";

export const getCity = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const nameReg = new RegExp("^" + name.toLowerCase(), "i");

    try {
      const cities = await City.find({ name: { $regex: nameReg } });
      res.status(200).json({ success: true, data: cities });
    } catch (weatherErr) {
      res.status(400).json(errorResponse(weatherErr.message));
    }
  } catch (err) {
    res.status(500).json(errorResponse(ErrorMessages.SERVER_ERROR));
  }
};
