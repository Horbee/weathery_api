import jwt from "jsonwebtoken";

import { UserModel } from "../models/User";

export const createWeatheryToken = (user: UserModel) => {
  const payload = {
    appId: process.env.APP_ID,
    user: {
      id: user.id
    }
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: 3600
  });
};
