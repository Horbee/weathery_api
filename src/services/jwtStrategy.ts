import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";


import { AppConfig } from "../config/appconfig";
import { User } from "../models/User";
import { AccessTokenPayload } from "../utils/tokenUtils";

const jwtLogin = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: AppConfig.jwtPrivateKey,
    issuer: AppConfig.appName,
    audience: AppConfig.appID,
    ignoreExpiration: false,
    algorithms: ["RS256"],
  },
  async (jwt_payload, done) => {
    const {
      user: { id },
    } = jwt_payload as AccessTokenPayload;

    try {
      const user = await User.findById(id);
      if (user) return done(null, user);

      return done(null, false);
    } catch (error: any) {
      return done(error, false);
    }
  }
);

passport.use(jwtLogin);
