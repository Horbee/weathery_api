import { NextFunction, Request, Response } from "express";

import { errorResponse } from "../responses/errorResponse";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(res.statusCode ?? 500).json(errorResponse(err.message));
};
