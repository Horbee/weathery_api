import { Request, Response } from "express";
import url from "url";


import { ErrorMessages } from "../constants/errorMessages";
import { User, UserModel } from "../models/User";
import { apiResponse } from "../responses/apiResponse";
import { errorResponse } from "../responses/errorResponse";
import {
    addUser, getUserByEmail, recoverPassword, verifyAndResetPassword
} from "../services/user.service";
import { normalizeUser } from "../utils/normalize";
import { decode, ForgotPasswordTokenPayload, signAccessToken } from "../utils/tokenUtils";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user is already registered
    if (await getUserByEmail(email)) {
      return res
        .status(400)
        .json(errorResponse(ErrorMessages.USER_ALREADY_REGISTERED));
    }

    // Create user with regular login method
    const user = await addUser(name, email, password, "regular");

    // Send access token
    const token = await signAccessToken(user);

    return res
      .status(201)
      .json(apiResponse({ token, user: normalizeUser(user) }));
  } catch (err) {
    console.log(err);
    return res.status(500).json(errorResponse(ErrorMessages.SERVER_ERROR));
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (user) {
      if (user.loginMethod !== "regular") {
        // User is registered with other loginmethod
        return res
          .status(400)
          .json(errorResponse(ErrorMessages.USER_DIFF_LOGIN));
      }
      if (await user.comparePasswords(password)) {
        const token = await signAccessToken(user);

        return res
          .status(200)
          .json(apiResponse({ token, user: normalizeUser(user) }));
      }
    }

    return res
      .status(400)
      .json(errorResponse(ErrorMessages.INVALID_CREDENTIALS));
  } catch (err) {
    console.error(err);
    return res.status(500).json(errorResponse(ErrorMessages.SERVER_ERROR));
  }
};

export const getUser = async (req: Request, res: Response) => {
  return res.status(200).json(
    apiResponse({
      token: req.headers.authorization?.replace("Bearer ", ""),
      user: normalizeUser(req.user as UserModel),
    })
  );
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await getUserByEmail(email);
  if (user) await recoverPassword(user);

  return res.status(200).json(apiResponse("Password reset link sent."));
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const token = url.parse(req.url, true).query.token as string;

    const decodedToken = decode(token) as ForgotPasswordTokenPayload;

    const user = await User.findById(decodedToken.sub);

    if (!user)
      return res.status(400).json(errorResponse(ErrorMessages.USER_NOT_FOUND));

    const { error } = await verifyAndResetPassword(user, token, password);
    if (error)
      return res.status(401).send(errorResponse(ErrorMessages.INVALID_TOKEN));

    return res.status(200).json(apiResponse("Password reset successful."));
  } catch (err) {
    console.error(err);
    return res.status(500).json(errorResponse(ErrorMessages.SERVER_ERROR));
  }
};
