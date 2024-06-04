import { loginSchema, signupSchema } from "../../src/lib/validateAuth";
import { test, describe, expect } from "@jest/globals";
import {
  mockBadEmail,
  mockBadPassword,
  mockLoginData,
  mockBadSignup,
  mockValidSignup,
} from "../mockUnitData";

describe("Log in Schema", () => {
  test("Should fail if email field is not an email", () => {
    for (let data of mockBadEmail) {
      const validation = loginSchema.safeParse(data);

      expect(validation.success).toBeFalsy();
      expect(validation.error!.issues[0].message).toBe(
        "Please provide a valid email",
      );
    }
  });

  test("Should fail if password field is less than 6 characters", () => {
    for (let data of mockBadPassword) {
      const validation = loginSchema.safeParse(data);

      expect(validation.success).toBeFalsy();
      expect(validation.error!.issues[0].message).toBe("Incorrect password");
    }
  });

  test("Should pass if both fields meet conditions", () => {
    for (let data of mockLoginData) {
      const validation = loginSchema.safeParse(data);

      expect(validation.success).toBeTruthy();
      expect(validation.error).toBeUndefined();
      expect(validation.data).toStrictEqual(data);
    }
  });
});

describe("Signup Schema", () => {
  test("Should fail if field conditions are not met", () => {
    const validation = signupSchema.safeParse(mockBadSignup);

    expect(validation.success).toBeFalsy();

    // List of fields that have errors
    const Errors = validation.error!.issues.map((err) => err.path[0]);

    expect(Errors).toContain("firstName");
    expect(Errors).toContain("lastName");
    expect(Errors).toContain("email");
    expect(Errors).toContain("password");
    expect(Errors).toContain("confirmPassword");
  });

  test("Should pass if field conditions are met", () => {
    const validation = signupSchema.safeParse(mockValidSignup);

    expect(validation.success).toBeTruthy();
    expect(validation.error).toBeUndefined();
    expect(validation.data).toStrictEqual(mockValidSignup);
  });
});
