import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import { ErrorMessages } from "../constants/errorMessages";
import { errorResponse } from "../responses/errorResponse";
import { TokenPayload, verify } from "../utils/tokenUtils";

export const authenticate = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.header("Authorization");

  if (!token) {
    return res.status(401).send(errorResponse(ErrorMessages.NO_TOKEN));
  }

  try {
    const decoded = (await verify(token.split("Bearer ")[1])) as TokenPayload;
    req.user = decoded.user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send(errorResponse(ErrorMessages.INVALID_TOKEN));
  }
};
