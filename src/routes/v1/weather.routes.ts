import express from "express";

import {
  getWeatherForecastByCoords,
  getWeatherInfoByCity,
} from "../../controllers/weather.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { validateData } from "../../middleware/validation.middleware";
import { weatherForecastSchema } from "../../schemas/weatherSchemas";
import { citySearchSchema } from "../../schemas/citySchemas";

const router = express.Router();

router.use(authenticate);

router
  .route("/forecast")
  .post(validateData(weatherForecastSchema), getWeatherForecastByCoords);

router
  .route("/city")
  .get(validateData(citySearchSchema, "params"), getWeatherInfoByCity);

export const v1WeatherRoutes = router;
