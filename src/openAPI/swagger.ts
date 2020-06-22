import { modelDefinitions } from "./definitions.swagger";
import { getHealth } from "./health.swagger";
import { createUser, forgotPassword, loginUser, resetPassword } from "./user.swagger";
import { getWeather } from "./weather.swagger";

export const swaggerDocument = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "Wheatery APIs Document",
    description: "a weather application using node and react",
    termsOfService: "",
    contact: {
      name: "Horbee"
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html"
    }
  },
  servers: [
    {
      url: process.env.API_URL || "http://localhost:5000",
      description: "Current Environment"
    }
  ],
  components: {
    schemas: {},
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  tags: [{ name: "Weather" }, { name: "User" }, { name: "Health" }],
  paths: {
    "/api/weather/{city}": {
      get: getWeather
    },
    "/api/auth": {
      post: createUser
    },
    "/api/auth/login": {
      post: loginUser
    },
    "/api/auth/forgotpassword": {
      post: forgotPassword
    },
    "/api/auth/resetpassword": {
      post: resetPassword
    },
    "/health": {
      get: getHealth
    }
  },
  definitions: modelDefinitions
};
