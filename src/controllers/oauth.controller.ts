import { Request, Response } from "express";
import asyncHandler from "express-async-handler";


import { UserModel } from "../models/User";
import { apiResponse } from "../responses/apiResponse";
import { normalizeUser } from "../utils/normalize";
import { signAccessToken } from "../utils/tokenUtils";

export const loginUserOAuth = asyncHandler(
  async (req: Request, res: Response) => {
    const { user } = req;
    const token = await signAccessToken(user as UserModel);

    res.status(200).json(
      apiResponse({
        token,
        user: normalizeUser(req.user as UserModel),
      })
    );
  }
);
