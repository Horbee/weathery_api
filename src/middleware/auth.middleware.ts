import { NextFunction, Response } from "express";

import { ErrorMessages } from "../constants/errorMessages";
import { User } from "../models/User";
import { errorResponse } from "../responses/errorResponse";
import {
  AccessTokenPayload,
  decode,
  verifyAccessToken
} from "../utils/tokenUtils";

export const authenticate = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const bearerToken: string = req.header("Authorization");

  if (!bearerToken) {
    return res.status(401).send(errorResponse(ErrorMessages.NO_TOKEN));
  }

  try {
    const token = bearerToken.split("Bearer ")[1];
    const decoded = (await decode(token)) as AccessTokenPayload;

    const userDoc = await User.findById(decoded.user.id);

    if (!userDoc) {
      throw new Error();
    }

    await verifyAccessToken(token, userDoc);

    req.user = userDoc;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send(errorResponse(ErrorMessages.INVALID_TOKEN));
  }
};
