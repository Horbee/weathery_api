import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";


import { AppConfig } from "../config/appconfig";
import { User } from "../models/User";

const googleLogin = new GoogleStrategy(
  {
    clientID: AppConfig.googleClientID,
    clientSecret: AppConfig.googleClientSecret,
    callbackURL: `${AppConfig.clientUrl}/auth/google/callback`,
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const user = await User.findOne({ googleId: profile.id });
      if (user) return cb(null, user);

      const createUser = await User.create({
        name: profile.displayName,
        email: profile.emails?.[0].value,
        googleId: profile.id,
        loginMethod: "google",
      });
      return cb(null, createUser);
    } catch (error: any) {
      return cb(error, undefined);
    }
  }
);

passport.use(googleLogin);
