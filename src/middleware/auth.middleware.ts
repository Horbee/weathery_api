import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import { ErrorMessages } from "../constants/errorMessages";
import { errorResponse } from "../responses/errorResponse";

interface TokenPayload {
  appId: string;
  user: {
    id: string;
  };
}

export const authenticate = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send(errorResponse(ErrorMessages.NO_TOKEN));
  }

  try {
    const decoded = (await jwt.verify(
      token,
      process.env.JWT_SECRET!
    )) as TokenPayload;

    req.user = decoded.user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send(errorResponse(ErrorMessages.INVALID_TOKEN));
  }
};
