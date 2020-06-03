import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";

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
    issuer: process.env.APP_NAME,
    subject: user.email,
    audience: process.env.APP_ID,
    expiresIn: "12h",
    algorithm: "RS256"
  };

  return jwt.sign(payload, process.env.JWT_PRIVATE_KEY!, signOptions);
};

export const verify = async (token: string, user: UserModel) => {
  const verifyOptions: VerifyOptions = {
    issuer: process.env.APP_NAME,
    audience: process.env.APP_ID,
    subject: user.email,
    ignoreExpiration: false,
    algorithms: ["RS256"]
  };

  return jwt.verify(token, process.env.JWT_PUBLIC_KEY!, verifyOptions);
};

export const decode = (token: string) => {
  return jwt.decode(token, { complete: false });
};
