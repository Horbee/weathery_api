import { z } from "zod";
import { ErrorMessages } from "../constants/errorMessages";

export const weatherForecastSchema = z.object({
  city: z.object({
    coord: z.object({
      lat: z.number({ message: ErrorMessages.LAT_MISSING }),
      lon: z.number({ message: ErrorMessages.LON_MISSING }),
    }),
  }),
});
