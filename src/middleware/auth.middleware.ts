import { NextFunction, Response } from "express";

import { ErrorMessages } from "../constants/errorMessages";
import { User } from "../models/User";
import { errorResponse } from "../responses/errorResponse";
import { decode, TokenPayload, verify } from "../utils/tokenUtils";

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
    const decoded = (await decode(token)) as TokenPayload;

    const userDoc = await User.findById(decoded.user.id);

    if (!userDoc) {
      throw new Error();
    }

    (await verify(token, userDoc)) as TokenPayload;

    req.user = userDoc;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send(errorResponse(ErrorMessages.INVALID_TOKEN));
  }
};
