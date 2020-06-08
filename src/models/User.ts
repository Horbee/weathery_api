import bcrypt from "bcryptjs";
import { check } from "express-validator";
import mongoose, { Schema } from "mongoose";

import { sendForgotPasswordMail } from "../mailer/mailer";
import { signForgotPasswordToken } from "../utils/tokenUtils";

export interface UserModel extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  city: string;
  created_at: Date;
  updated_at: Date;
  comparePasswords: (plainPassword: string) => Promise<boolean>;
  forgotPassword: () => Promise<void>;
}

const UserSchema = new Schema<UserModel>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  city: String,
  created_at: { type: Date, default: Date.now },
  updated_at: Date
});

UserSchema.pre<UserModel>("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.pre<UserModel>("updateOne", function () {
  this.set({ updated_at: new Date() });
});

UserSchema.methods.comparePasswords = async function (plainPassword: string) {
  return bcrypt.compare(plainPassword, this.password);
};

UserSchema.methods.forgotPassword = async function () {
  const token = await signForgotPasswordToken(this);
  await sendForgotPasswordMail(this.email, this.name, token);
};

export const userCreateValidation = [
  check("name", "Name can't be empty").not().isEmpty().trim().escape(),
  check("email", "Email is invalid").isEmail(),
  check("password", "Password is invalid").not().isEmpty()
];

export const userLoginValidation = [
  check("email", "Email is invalid").isEmail(),
  check("password", "Password is invalid").not().isEmpty()
];

export const userForgotPasswordValidation = [
  check("email", "Email is invalid").isEmail()
];

export const userResetPasswordValidation = [
  check("password", "Password is invalid").not().isEmpty()
];

export const User = mongoose.model<UserModel>("user", UserSchema);
