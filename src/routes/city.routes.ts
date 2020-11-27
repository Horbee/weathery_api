import express from "express";

import { getCity } from "../controllers/city.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.use(authenticate);

router.route("/:name").get(getCity);

export const cityRoutes = router;
