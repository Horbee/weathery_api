import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import url from "url";

import { ErrorMessages } from "../constants/errorMessages";
import { User, UserModel } from "../models/User";
import { apiResponse } from "../responses/apiResponse";
import {
  addUser,
  getUserByEmail,
  recoverPassword,
  verifyAndResetPassword,
} from "../services/user.service";
import { normalizeUser } from "../utils/normalize";
import {
  decode,
  ForgotPasswordTokenPayload,
  signAccessToken,
} from "../utils/tokenUtils";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Check if user is already registered
  if (await getUserByEmail(email)) {
    res.status(400);
    throw new Error(ErrorMessages.USER_ALREADY_REGISTERED);
  }

  // Create user with regular login method
  const user = await addUser(name, email, password, "regular");

  // Send access token
  const token = await signAccessToken(user);
  res.status(201).json(apiResponse({ token, user: normalizeUser(user) }));
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    res.status(400);
    throw new Error(ErrorMessages.INVALID_CREDENTIALS);
  }

  if (user.loginMethod !== "regular") {
    res.status(400);
    throw new Error(ErrorMessages.USER_DIFF_LOGIN);
  }

  if (await user.comparePasswords(password)) {
    const token = await signAccessToken(user);

    res.status(200).json(apiResponse({ token, user: normalizeUser(user) }));
  } else {
    res.status(400);
    throw new Error(ErrorMessages.INVALID_CREDENTIALS);
  }
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(
    apiResponse({
      token: req.headers.authorization?.replace("Bearer ", ""),
      user: normalizeUser(req.user as UserModel),
    })
  );
});

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await getUserByEmail(email);
    if (user) await recoverPassword(user);

    res.status(200).json(apiResponse("Password reset link sent."));
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { password } = req.body;
    const token = url.parse(req.url, true).query.token as string;

    const decodedToken = decode(token) as ForgotPasswordTokenPayload;

    const user = await User.findById(decodedToken.sub);

    if (!user) {
      res.status(400);
      throw new Error(ErrorMessages.USER_NOT_FOUND);
    }

    const { error } = await verifyAndResetPassword(user, token, password);
    if (error) {
      res.status(401);
      throw new Error(ErrorMessages.INVALID_TOKEN);
    }

    res.status(200).json(apiResponse("Password reset successful."));
  }
);
