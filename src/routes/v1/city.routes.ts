import express from "express";

import {
  addCityToUser,
  deleteCityFromUser,
  getCityByName,
  getCityByUser,
} from "../../controllers/city.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { validateData } from "../../middleware/validation.middleware";
import { citySchema, citySearchSchema } from "../../schemas/citySchemas";

const router = express.Router();

router.use(authenticate);

router
  .route("/user")
  .get(getCityByUser)
  .post(validateData(citySchema), addCityToUser);

router.route("/user/:cityId").delete(deleteCityFromUser);

router
  .route("/search")
  .get(validateData(citySearchSchema, "params"), getCityByName);

export const v1CityRoutes = router;
