import bcrypt from "bcryptjs";
import { check } from "express-validator";
import mongoose, { Schema } from "mongoose";


import { sendForgotPasswordMail } from "../mailer/mailer";
import { LoginMethods } from "../types/loginMethods";
import { signForgotPasswordToken } from "../utils/tokenUtils";
import { CityModel } from "./City";

export interface UserModel extends mongoose.Document {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  facebookId?: string;
  cities: CityModel[];
  loginMethod: LoginMethods;
  comparePasswords: (plainPassword: string) => Promise<boolean>;
  forgotPassword: () => Promise<void>;
}

const UserSchema = new Schema<UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    googleId: String,
    facebookId: String,
    loginMethod: {
      type: String,
      required: true,
    },
    cities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "city",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre<UserModel>("save", async function () {
  if (this.loginMethod === "regular") {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password!, salt);
  }
});

UserSchema.methods.comparePasswords = async function (plainPassword: string) {
  return bcrypt.compare(plainPassword, this.password);
};

UserSchema.methods.forgotPassword = async function () {
  const token = await signForgotPasswordToken(this as UserModel);
  await sendForgotPasswordMail(this.email, this.name, token);
};

export const userCreateValidation = [
  check("name", "Name can't be empty").not().isEmpty().trim().escape(),
  check("email", "Email is invalid").isEmail(),
  check("password", "Password is invalid").not().isEmpty(),
];

export const userLoginValidation = [
  check("email", "Email is invalid").isEmail(),
  check("password", "Password is invalid").not().isEmpty(),
];

export const userForgotPasswordValidation = [
  check("email", "Email is invalid").isEmail(),
];

export const userResetPasswordValidation = [
  check("password", "Password is invalid").not().isEmpty(),
];

export const User = mongoose.model<UserModel>("user", UserSchema);
