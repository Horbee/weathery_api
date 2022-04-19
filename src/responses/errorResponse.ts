import { Errors } from "./validationError";

export const errorResponse = (message: string | string[] | Errors) => {
  return {
    success: false,
    error: message,
  };
};
