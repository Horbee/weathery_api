export const errorResponse = (message: string | string[]) => {
  return {
    success: false,
    error: message
  };
};
