import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";


import { AppConfig } from "../config/appconfig";
import { UserModel } from "../models/User";

//TODO: put only the userid in the token and create /me endpoint
export interface AccessTokenPayload {
  user: {
    id: string;
    name: string;
  };
  iat: number;
  exp: number;
  aud: string;
  iss: string;
  sub: string;
}

export interface ForgotPasswordTokenPayload {
  iat: number;
  exp: number;
  aud: string;
  iss: string;
  sub: string;
}

export const signAccessToken = async (user: UserModel) => {
  const payload: Partial<AccessTokenPayload> = {
    user: {
      id: user.id,
      name: user.name,
    },
  };

  const signOptions: SignOptions = {
    issuer: AppConfig.appName,
    subject: user.email,
    audience: AppConfig.appID,
    expiresIn: "12h",
    algorithm: "RS256",
  };

  return jwt.sign(payload, AppConfig.jwtPrivateKey, signOptions);
};

export const verifyAccessToken = async (token: string, user: UserModel) => {
  const verifyOptions: VerifyOptions = {
    issuer: AppConfig.appName,
    audience: AppConfig.appID,
    subject: user.email,
    ignoreExpiration: false,
    algorithms: ["RS256"],
  };

  return jwt.verify(token, AppConfig.jwtPublicKey, verifyOptions);
};

export const decode = (token: string, complete: boolean = false) => {
  return jwt.decode(token, { complete });
};

export const signForgotPasswordToken = async (user: UserModel) => {
  const signOptions: SignOptions = {
    issuer: AppConfig.appName,
    subject: user.id,
    audience: AppConfig.appID,
    expiresIn: "1h",
  };

  return jwt.sign({}, user.password!, signOptions);
};

export const verifyForgotPasswordToken = async (
  token: string,
  user: UserModel
) => {
  const verifyOptions: VerifyOptions = {
    issuer: AppConfig.appName,
    audience: AppConfig.appID,
    subject: user.id,
    ignoreExpiration: false,
  };

  return jwt.verify(token, user.password!, verifyOptions);
};
