import { check } from "express-validator";
import mongoose, { Schema } from "mongoose";

export interface UserModel extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  city: string;
  created_at: Date;
  updated_at: Date;
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

export const userCreateValidation = [
  check("name", "Name can't be empty").not().isEmpty().trim().escape(),
  check("email", "Email is invalid").isEmail(),
  check("password", "Password is invalid").not().isEmpty()
];

export const userLoginValidation = [
  check("email", "Email is invalid").isEmail(),
  check("password", "Password is invalid").not().isEmpty()
];

export const User = mongoose.model<UserModel>("user", UserSchema);
