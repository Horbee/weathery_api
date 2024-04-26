// src/middleware/validationMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { errorResponse } from "../responses/errorResponse";

export type Errors = { [key: string]: string };

export function validateData(
  schema: z.ZodObject<any, any>,
  location: "body" | "params" = "body"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[location]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.reduce((messages, issue: any) => {
          const key = issue.path.join(".");
          messages[key] = issue.message;

          return messages;
        }, {} as Errors);

        res.status(400).json(errorResponse(errorMessages));
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}
