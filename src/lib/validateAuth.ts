import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z.string().min(6, { message: "Incorrect password" }),
});

export const signupSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});
