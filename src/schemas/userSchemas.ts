import { z } from "zod";

export const userCreateSchema = z.object({
  name: z
    .string({ message: "Name is invalid" })
    .min(1, "Name is invalid")
    .trim(),
  email: z.string({ message: "Email is invalid" }).email("Email is invalid"),
  password: z
    .string({ message: "Password is invalid" })
    .min(1, "Password is invalid"),
});

export const userLoginSchema = z.object({
  email: z.string({ message: "Email is invalid" }).email("Email is invalid"),
  password: z
    .string({ message: "Password is invalid" })
    .min(1, "Password is invalid"),
});

export const userForgotPasswordSchema = z.object({
  email: z.string({ message: "Email is invalid" }).email("Email is invalid"),
});

export const userResetPasswordSchema = z.object({
  token: z
    .string({ message: "Invalid password reset token" })
    .min(1, "Invalid password reset token"),
  password: z
    .string({ message: "Password is invalid" })
    .min(1, "Password is invalid"),
});
