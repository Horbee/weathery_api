import { NextFunction, Request, Response } from "express";

import { ErrorMessages } from "../constants/errorMessages";
import { errorResponse } from "../responses/errorResponse";
import { verify } from "../utils/googleOauthClient";

export const googleAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, idToken } = req.body;

  // Token Verification
  try {
    const decoded = await verify(idToken);
    if (email !== decoded.getPayload()?.email) {
      throw new Error();
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send(errorResponse(ErrorMessages.INVALID_TOKEN));
  }
};
