import bcrypt from "bcryptjs";

import { AppConfig } from "../config/appconfig";
import { ErrorMessages } from "../constants/errorMessages";
import { User, UserModel } from "../models/User";
import { Nullable } from "../utils/nullable";
import { verifyForgotPasswordToken } from "../utils/tokenUtils";

const addUser = async (
  name: string,
  email: string,
  password: string,
  loginMethod: string
): Promise<UserModel> => {
  const user = await User.create({
    name,
    email,
    password,
    loginMethod,
  });

  return user;
};

const getUserByEmail = async (email: string): Promise<Nullable<UserModel>> => {
  return await User.findOne({ email });
};

const recoverPassword = async (user: UserModel): Promise<void> => {
  if (user.loginMethod === "regular") {
    await user.forgotPassword();
  }
};

const verifyAndResetPassword = async (
  user: UserModel,
  token: string,
  newPassword: string
): Promise<{ error: Nullable<string> }> => {
  try {
    await verifyForgotPasswordToken(token, user);
  } catch (error) {
    console.log(error);
    return { error: ErrorMessages.INVALID_TOKEN };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  await user.updateOne({ password: hashedPassword });
  return { error: null };
};

export default {
  addUser,
  getUserByEmail,
  recoverPassword,
  verifyAndResetPassword,
};
