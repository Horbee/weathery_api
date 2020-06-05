import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";

import { AppConfig } from "../config/appconfig";
import { UserModel } from "../models/User";

export interface TokenPayload {
  user: {
    id: string;
    name: string;
    city?: string;
  };
}

export const sign = async (user: UserModel) => {
  const payload: TokenPayload = {
    user: {
      id: user.id,
      name: user.name
    }
  };

  if (user.city) {
    payload.user.city = user.city;
  }

  const signOptions: SignOptions = {
    issuer: AppConfig.appName,
    subject: user.email,
    audience: AppConfig.appID,
    expiresIn: "12h",
    algorithm: "RS256"
  };

  return jwt.sign(payload, AppConfig.jwtPrivateKey, signOptions);
};

export const verify = async (token: string, user: UserModel) => {
  const verifyOptions: VerifyOptions = {
    issuer: AppConfig.appName,
    audience: AppConfig.appID,
    subject: user.email,
    ignoreExpiration: false,
    algorithms: ["RS256"]
  };

  return jwt.verify(token, AppConfig.jwtPublicKey, verifyOptions);
};

export const decode = (token: string) => {
  return jwt.decode(token, { complete: false });
};
