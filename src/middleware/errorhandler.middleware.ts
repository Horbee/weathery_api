import { NextFunction, Request, Response } from "express";


import { errorResponse } from "../responses/errorResponse";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status =
    res.statusCode < 400 ? 400 : !res.statusCode ? 500 : res.statusCode;

  console.error(err.stack);
  res.status(status).json(errorResponse(err.message));
};
