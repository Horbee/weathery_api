import { modelDefinitions } from "./definitions.swagger";
import { getHealth } from "./health.swagger";
import {
  createUser,
  forgotPassword,
  loginUser,
  me,
  resetPassword,
} from "./user.swagger";
import { getWeather } from "./weather.swagger";

export const swaggerDocument = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "Wheatery APIs Document",
    description: "a weather application using node and react",
    termsOfService: "",
    contact: {
      name: "Horbee",
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  servers: [
    {
      url: process.env.API_URL || "http://localhost:5000",
      description: "Current Environment",
    },
  ],
  components: {
    schemas: {},
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  tags: [{ name: "Weather" }, { name: "User" }, { name: "Health" }],
  paths: {
    "/api/v1/weather/{city}": {
      get: getWeather,
    },
    "/api/v1/auth/me": {
      get: me,
    },
    "/api/v1/auth/local/create": {
      post: createUser,
    },
    "/api/v1/auth/local": {
      post: loginUser,
    },
    "/api/v1/auth/forgotpassword": {
      post: forgotPassword,
    },
    "/api/v1/auth/resetpassword": {
      post: resetPassword,
    },
    "/api/v1/health": {
      get: getHealth,
    },
  },
  definitions: modelDefinitions,
};
