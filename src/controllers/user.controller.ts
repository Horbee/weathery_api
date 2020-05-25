import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import { ErrorMessages } from "../constants/errorMessages";
import { User } from "../models/User";
import { errorResponse } from "../responses/errorResponse";
import { createWeatheryToken } from "../utils/tokenUtils";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
      return res
        .status(400)
        .json(errorResponse(ErrorMessages.USER_ALREADY_REGISTERED));
    }
    const user = new User({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = await createWeatheryToken(user);

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

    if (!user) {
      return res
        .status(400)
        .json(errorResponse(ErrorMessages.INVALID_CREDENTIALS));
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      return res
        .status(400)
        .json(errorResponse(ErrorMessages.INVALID_CREDENTIALS));
    }

    const token = await createWeatheryToken(user);

    return res.status(200).json({
      success: true,
      data: token
    });
  } catch (err) {
    return res.status(500).json(errorResponse(ErrorMessages.SERVER_ERROR));
  }
};
