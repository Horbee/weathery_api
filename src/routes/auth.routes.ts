import express from "express";
import passport from "passport";

import {
  createUser,
  forgotPassword,
  getUser,
  loginUser,
  resetPassword,
} from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";
import {
  userCreateValidation,
  userForgotPasswordValidation,
  userLoginValidation,
  UserModel,
  userResetPasswordValidation,
} from "../models/User";
import { validationErrors } from "../responses/validationError";
import { signAccessToken } from "../utils/tokenUtils";

const router = express.Router();

// User routes
router.route("/me").get(authenticate, getUser);
router
  .route("/local/create")
  .post(userCreateValidation, validationErrors, createUser);
router.route("/local").post(userLoginValidation, validationErrors, loginUser);
router
  .route("/forgotpassword")
  .post(userForgotPasswordValidation, validationErrors, forgotPassword);
router
  .route("/resetpassword")
  .post(userResetPasswordValidation, validationErrors, resetPassword);

// Social Authentication routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  async (req, res, next) => {
    const { user } = req;
    const token = await signAccessToken(user as UserModel);
    res.status(200).json({
      success: true,
      data: {
        token,
        user,
      },
    });
  }
);

router.get("/facebook", passport.authenticate("facebook", { session: false }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/", session: false }),
  async (req, res, next) => {
    const { user } = req;
    const token = await signAccessToken(user as UserModel);
    res.status(200).json({
      success: true,
      data: {
        token,
        user,
      },
    });
  }
);

export const authRoutes = router;
