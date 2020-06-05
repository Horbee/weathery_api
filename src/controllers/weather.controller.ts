import axios from "axios";
import { Request, Response } from "express";
import { MongooseDocument } from "mongoose";

import { AppConfig } from "../config/appconfig";
import { ErrorMessages } from "../constants/errorMessages";
import { errorResponse } from "../responses/errorResponse";

interface AuthenticatedRequest extends Request {
  user: MongooseDocument;
}

export const getWeatherInfoByCity = async (req: Request, res: Response) => {
  try {
    const city = req.params.city;

    const weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${AppConfig.openweatherAPI}&units=metric`;

    try {
      const response = await axios.get(weatherApiURL);
      await (req as AuthenticatedRequest).user.updateOne({ city });
      res.status(200).json({ success: true, data: response.data });
    } catch (weatherErr) {
      res.status(400).json(errorResponse(weatherErr.message));
    }
  } catch (err) {
    res.status(500).json(errorResponse(ErrorMessages.SERVER_ERROR));
  }
};
