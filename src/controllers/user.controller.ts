import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import url from "url";

import { AppConfig } from "../config/appconfig";
import { ErrorMessages } from "../constants/errorMessages";
import { User } from "../models/User";
import { errorResponse } from "../responses/errorResponse";
import {
  decode,
  ForgotPasswordTokenPayload,
  signAccessToken,
  verifyForgotPasswordToken
} from "../utils/tokenUtils";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
      return res
        .status(400)
        .json(errorResponse(ErrorMessages.USER_ALREADY_REGISTERED));
    }
    const user = await User.create({
      name,
      email,
      password
    });

    const token = await signAccessToken(user);

    return res.status(201).json({
      success: true,
      data: token
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json(errorResponse(ErrorMessages.SERVER_ERROR));
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      if (await user.comparePasswords(password)) {
        const token = await signAccessToken(user);

        return res.status(200).json({
          success: true,
          data: token
        });
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

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user && AppConfig.mailSystem) {
    await user.forgotPassword();
  }

  return res.status(200).json({
    success: true,
    data: "Password reset link sent."
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = url.parse(req.url, true).query;
    const { password } = req.body;

    const decodedToken = decode(token as string) as ForgotPasswordTokenPayload;

    const user = await User.findById(decodedToken.sub);

    if (user) {
      try {
        await verifyForgotPasswordToken(token as string, user);
      } catch (error) {
        console.log(error);
        return res.status(401).send(errorResponse(ErrorMessages.INVALID_TOKEN));
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await user.updateOne({ password: hashedPassword });

      return res.status(200).json({
        success: true,
        data: "Password reset successfully."
      });
    }

    return res.status(400).json(errorResponse(ErrorMessages.USER_NOT_FOUND));
  } catch (err) {
    console.error(err);
    return res.status(500).json(errorResponse(ErrorMessages.SERVER_ERROR));
  }
};
