import { Request, Response } from "express";

import { ErrorMessages } from "../constants/errorMessages";
import { User } from "../models/User";
import { errorResponse } from "../responses/errorResponse";
import { sign } from "../utils/tokenUtils";

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

    const token = await sign(user);

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
        const token = await sign(user);

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
