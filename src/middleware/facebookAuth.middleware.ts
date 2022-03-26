import axios from "axios";
import { NextFunction, Request, Response } from "express";


import { errorResponse } from "../responses/errorResponse";

interface FacebookAuthResponse {
  name: string;
  id: string;
  email: string;
}

export const facebookAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, accessToken } = req.body;

  // Token Verification
  const facebookGraphUrl = `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`;

  try {
    const response = await axios.get<FacebookAuthResponse>(facebookGraphUrl);
    if (email !== response.data.email) {
      throw new Error();
    }
    next();
  } catch (err: any) {
    console.log(err);
    return res.status(400).json(errorResponse(err.message));
  }
};
