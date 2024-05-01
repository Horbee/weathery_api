export const getWeatherInfoByCity = {
  tags: ["Weather"],
  summary: "Find weather information of a city",
  description: "Returns weather information about the provided city",
  produces: "application/json",
  operationId: "getWeatherInfoByCity",
  parameters: [
    {
      name: "name",
      in: "query",
      description: "Name of the City",
      required: true,
      type: "string",
    },
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    "200": {
      description: "Weather Info.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/WeatherResponse",
          },
        },
      },
    },
    "400": {
      description: "Invalid city or jwtToken supplied",
    },
  },
};

export const getWeatherForecastByCity = {
  tags: ["Weather"],
  summary: "Find weather information of a city",
  description: "Returns weather information about the provided city",
  produces: "application/json",
  operationId: "getWeatherForecastByCity",
  parameters: [
    {
      name: "name",
      in: "query",
      description: "Name of the City",
      required: true,
      type: "string",
    },
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    "200": {
      description: "Weather Forecast Info.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/WeatherResponse",
          },
        },
      },
    },
    "400": {
      description: "Invalid city or jwtToken supplied",
    },
  },
};
