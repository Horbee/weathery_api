import express from "express";
import { check } from "express-validator";


import { ErrorMessages } from "../../constants/errorMessages";
import {
    addCityToUser, deleteCityFromUser, getCityByName, getCityByUser
} from "../../controllers/city.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { validationErrors } from "../../responses/validationError";

const router = express.Router();

router.use(authenticate);

router
  .route("/user")
  .get(getCityByUser)
  .post(
    check("city.id", ErrorMessages.INVALID_CITY_ID).not().isEmpty(),
    validationErrors,
    addCityToUser
  );

router
  .route("/user/:cityId")
  .delete(
    check("cityId", ErrorMessages.INVALID_CITY_ID).not().isEmpty(),
    validationErrors,
    deleteCityFromUser
  );

router
  .route("/search")
  .get(
    check("name", ErrorMessages.INVALID_CITY).not().isEmpty().trim().escape(),
    validationErrors,
    getCityByName
  );

export const v1CityRoutes = router;
