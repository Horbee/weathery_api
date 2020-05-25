import express from "express";

import { createUser, loginUser } from "../controllers/user.controller";
import { userCreateValidation, userLoginValidation } from "../models/User";
import { validationErrors } from "../responses/validationError";

const router = express.Router();

router.route("/").post(userCreateValidation, validationErrors, createUser);
router.route("/login").post(userLoginValidation, validationErrors, loginUser);

export const userRoutes = router;
