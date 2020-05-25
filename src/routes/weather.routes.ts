import express from "express";

import { getWeatherInfoByCity } from "../controllers/weather.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.use(authenticate);

router.route("/:city").get(getWeatherInfoByCity);

export const weatherRoutes = router;
