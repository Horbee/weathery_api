import { Errors } from "../middleware/validation.middleware";

export const errorResponse = (message: string | string[] | Errors) => {
  return {
    success: false,
    error: message,
  };
};
