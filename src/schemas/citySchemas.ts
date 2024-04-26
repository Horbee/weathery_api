import { z } from "zod";
import { ErrorMessages } from "../constants/errorMessages";

export const citySchema = z.object({
  id: z
    .string({ message: ErrorMessages.INVALID_CITY_ID })
    .min(1, ErrorMessages.INVALID_CITY_ID),
});

export const citySearchSchema = z.object({
  name: z
    .string({ message: ErrorMessages.INVALID_CITY })
    .min(1, ErrorMessages.INVALID_CITY),
});
