export const modelDefinitions = {
  WeatherResponse: {
    type: "object",
    properties: {
      success: {
        type: "boolean",
      },
      data: {
        type: "object",
      },
    },
  },
  UserCreate: {
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
    },
  },
  UserLogin: {
    type: "object",
    properties: {
      email: { type: "string" },
      password: { type: "string" },
    },
  },
  UserResponse: {
    type: "object",
    properties: {
      success: { type: "boolean" },
      data: { type: "string", description: "Token" },
    },
  },
  ForgotPassword: {
    type: "object",
    properties: {
      email: { type: "string" },
    },
  },
  ForgotPasswordResponse: {
    type: "object",
    properties: {
      success: { type: "boolean" },
      data: { type: "string", description: "Reset Link" },
    },
  },
  ResetPassword: {
    type: "object",
    properties: {
      token: { type: "string" },
      password: { type: "string" },
    },
  },
  GenericSuccessResponse: {
    type: "object",
    properties: {
      success: { type: "boolean" },
      data: { type: "string" },
    },
  },
  ErrorResponse: {
    type: "object",
    properties: {
      success: { type: "boolean" },
      error: { type: "string" },
    },
  },
  HealthResponse: {
    type: "object",
    properties: {
      status: { type: "string" },
    },
  },
};
