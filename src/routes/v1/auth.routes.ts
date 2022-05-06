import express from "express";
import passport from "passport";


import { loginUserOAuth } from "../../controllers/oauth.controller";
import {
    createUser, forgotPassword, getUser, loginUser, resetPassword
} from "../../controllers/user.controller";
import { authenticate } from "../../middleware/auth.middleware";
import {
    userCreateValidation, userForgotPasswordValidation, userLoginValidation, UserModel,
    userResetPasswordValidation
} from "../../models/User";
import { validationErrors } from "../../responses/validationError";

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
  passport.authenticate("google", {
    failureMessage: true,
    failWithError: true,
    session: false,
  }),
  loginUserOAuth
);

router.get("/facebook", passport.authenticate("facebook", { session: false }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureMessage: true,
    failWithError: true,
    session: false,
  }),
  loginUserOAuth
);

export const v1AuthRoutes = router;
