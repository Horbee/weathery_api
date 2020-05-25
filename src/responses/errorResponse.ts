export const errorResponse = (message: string) => {
  return {
    success: false,
    error: message
  };
};
