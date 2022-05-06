import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";


import { AppConfig } from "../config/appconfig";
import { User } from "../models/User";

const facebookLogin = new FacebookStrategy(
  {
    clientID: AppConfig.facebookClientID,
    clientSecret: AppConfig.facebookClientSecret,
    callbackURL: `${AppConfig.clientUrl}/auth/facebook/callback`,
    profileFields: ["id", "displayName", "photos", "email"],
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const user = await User.findOne({ facebookId: profile.id });
      if (user) return cb(null, user);

      const createdUser = await User.create({
        name: profile.displayName,
        loginMethod: "facebook",
        email: profile.emails?.[0].value,
        facebookId: profile.id,
      });
      return cb(null, createdUser);
    } catch (error: any) {
      return cb(error, null);
    }
  }
);

passport.use(facebookLogin);
