import { z } from "zod";

export const reportSchema = z
  .string()
  .trim()
  .min(5, { message: "Reports must be longer than 5 characters" })
  .max(50, {
    message: "Report is too long! Please keep it within 50 characters",
  });

export const validateReport = (input: string) => {
  return reportSchema.safeParse(input);
};
