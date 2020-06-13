import express from "express";

import {
    createUser, forgotPassword, loginUser, resetPassword
} from "../controllers/user.controller";
import {
    userCreateValidation, userForgotPasswordValidation, userLoginValidation,
    userResetPasswordValidation
} from "../models/User";
import { validationErrors } from "../responses/validationError";

const router = express.Router();

router.route("/").post(userCreateValidation, validationErrors, createUser);
router.route("/login").post(userLoginValidation, validationErrors, loginUser);
router
  .route("/forgotpassword")
  .post(userForgotPasswordValidation, validationErrors, forgotPassword);
router
  .route("/resetpassword")
  .post(userResetPasswordValidation, validationErrors, resetPassword);

export const userRoutes = router;
