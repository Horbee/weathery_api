export const createUser = {
  tags: ["User"],
  summary: "Create User",
  produces: "application/json",
  operationId: "createUser",
  requestBody: {
    description: "The required user object",
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/definitions/UserCreate",
        },
      },
    },
  },
  responses: {
    "200": {
      description: "User created.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/UserResponse",
          },
        },
      },
    },
    "400": {
      description: "Validation Error",
    },
  },
};

export const loginUser = {
  tags: ["User"],
  summary: "Login User",
  produces: "application/json",
  operationId: "loginUser",
  requestBody: {
    description: "The required user object",
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/definitions/UserLogin",
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Successful authentication.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/UserResponse",
          },
        },
      },
    },
    "400": {
      description: "Validation Error",
    },
  },
};

export const me = {
  tags: ["User"],
  summary: "Current User",
  produces: "application/json",
  operationId: "me",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    "200": {
      description: "Successful authentication.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/UserResponse",
          },
        },
      },
    },
    "400": {
      description: "Invalid jwtToken supplied",
    },
  },
};

export const forgotPassword = {
  tags: ["User"],
  summary: "Requests password reset link for a given user.",
  produces: "application/json",
  operationId: "forgotPassword",
  requestBody: {
    description: "The required email address",
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/definitions/ForgotPassword",
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Password reset link sent.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/ForgotPasswordResponse",
          },
        },
      },
    },
    "400": {
      description: "Validation Error",
    },
  },
};

export const resetPassword = {
  tags: ["User"],
  summary: "Resets the password for a user.",
  produces: "application/json",
  operationId: "resetPassword",
  parameters: [
    {
      name: "token",
      in: "query",
      description: "The generated password reset token",
      required: true,
      type: "string",
    },
  ],
  requestBody: {
    description: "The required new password",
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/definitions/ResetPassword",
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Successful authentication.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/GenericSuccessResponse",
          },
        },
      },
    },
    "400": {
      description: "Validation Error",
    },
  },
};
