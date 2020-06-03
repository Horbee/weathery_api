import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { errorResponse } from "./errorResponse";

export const validationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((val) => val.msg);
    return res.status(400).json(errorResponse(messages));
  } else {
    next();
  }
};
