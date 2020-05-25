export const getHealth = {
  tags: ["Health"],
  summary: "Provides health check.",
  produces: "application/json",
  operationId: "getHealth",
  responses: {
    "200": {
      description: "Health Info.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/HealthResponse"
          }
        }
      }
    }
  }
};
