import express from "express";
import passport from "passport";

import { loginUserOAuth } from "../../controllers/oauth.controller";
import {
  createUser,
  forgotPassword,
  getUser,
  loginUser,
  resetPassword,
} from "../../controllers/user.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { validateData } from "../../middleware/validation.middleware";
import {
  userCreateSchema,
  userForgotPasswordSchema,
  userLoginSchema,
  userResetPasswordSchema,
} from "../../schemas/userSchemas";

const router = express.Router();

// User routes
router.route("/me").get(authenticate, getUser);
router.route("/local/create").post(validateData(userCreateSchema), createUser);
router.route("/local").post(validateData(userLoginSchema), loginUser);
router
  .route("/forgotpassword")
  .post(validateData(userForgotPasswordSchema), forgotPassword);
router
  .route("/resetpassword")
  .post(validateData(userResetPasswordSchema), resetPassword);

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
