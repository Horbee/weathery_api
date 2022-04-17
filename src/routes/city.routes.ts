import express from "express";


import {
    addCityToUser, deleteCityFromUser, getCityByName, getCityByUser
} from "../controllers/city.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.use(authenticate);

router.route("/user").get(getCityByUser).post(addCityToUser);
router.route("/user/:cityId").delete(deleteCityFromUser);
router.route("/search").get(getCityByName);

export const cityRoutes = router;
