import express from "express";
import { check } from "express-validator";

import { ErrorMessages } from "../constants/errorMessages";
import {
  getWeatherForecastByCoords,
  getWeatherInfoByCity,
} from "../controllers/weather.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validationErrors } from "../responses/validationError";

const router = express.Router();

router.use(authenticate);

router
  .route("/forecast")
  .post(
    [
      check("city.coord.lat", ErrorMessages.LAT_MISSING).isNumeric(),
      check("city.coord.lon", ErrorMessages.LON_MISSING).isNumeric(),
    ],
    validationErrors,
    getWeatherForecastByCoords
  );

router
  .route("/city")
  .get(
    check("name", ErrorMessages.INVALID_CITY).not().isEmpty().trim().escape(),
    validationErrors,
    getWeatherInfoByCity
  );

export const weatherRoutes = router;
