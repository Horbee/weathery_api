import express from "express";

import {
  getWeatherForecastByCity,
  getWeatherInfoByCity,
} from "../../controllers/weather.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { validateData } from "../../middleware/validation.middleware";
import { citySearchSchema } from "../../schemas/citySchemas";

const router = express.Router();

router.use(authenticate);

router
  .route("/forecast")
  .get(validateData(citySearchSchema, "query"), getWeatherForecastByCity);

router
  .route("/city")
  .get(validateData(citySearchSchema, "query"), getWeatherInfoByCity);

export const v1WeatherRoutes = router;
