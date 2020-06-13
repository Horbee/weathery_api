import { Request, Response } from "express";

import { ErrorMessages } from "../constants/errorMessages";
import { User } from "../models/User";
import { errorResponse } from "../responses/errorResponse";
import { LoginMethods } from "../types/loginMethods";
import { signAccessToken } from "../utils/tokenUtils";

export const loginOAuthUser = (loginMethod: LoginMethods) => async (
  req: Request,
  res: Response
) => {
  const { email, name } = req.body;

  // Create or Login user
  let user = await User.findOne({ email });

  if (user) {
    if (user.loginMethod !== loginMethod) {
      // User is registered with other loginmethod
      return res.status(400).json(errorResponse(ErrorMessages.USER_DIFF_LOGIN));
    }
    // Sign and return token
    const token = await signAccessToken(user);
    return res.status(201).json({
      success: true,
      data: token
    });
  } else {
    // Create new User
    user = await User.create({
      name,
      email,
      loginMethod
    });
    const token = await signAccessToken(user);
    return res.status(201).json({
      success: true,
      data: token
    });
  }
};
