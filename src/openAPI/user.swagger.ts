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
          $ref: "#/definitions/UserCreate"
        }
      }
    }
  },
  responses: {
    "200": {
      description: "User created.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/UserResponse"
          }
        }
      }
    },
    "400": {
      description: "Validation Error"
    }
  }
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
          $ref: "#/definitions/UserLogin"
        }
      }
    }
  },
  responses: {
    "200": {
      description: "Successful authentication.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/UserResponse"
          }
        }
      }
    },
    "400": {
      description: "Validation Error"
    }
  }
};
