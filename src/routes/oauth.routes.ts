import express from "express";

import { loginOAuthUser } from "../controllers/oauth.controller";
import { facebookAuthentication } from "../middleware/facebookAuth.middleware";
import { googleAuthentication } from "../middleware/googleAuth.middleware";

const router = express.Router();

router
  .route("/facebook")
  .post(facebookAuthentication, loginOAuthUser("facebook"));

router.route("/google").post(googleAuthentication, loginOAuthUser("google"));

export const oauthRoutes = router;
