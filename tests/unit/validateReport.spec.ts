import { validateReport } from "../../src/lib/validateReport";
import { expect, test, describe } from "@jest/globals";
import { shortReports, longReports, validReports } from "../mockUnitData";

describe("Validate Reports", () => {
  test("Should fail if input is less than 5 characters - whitespace is trimmed", () => {
    for (let report of shortReports) {
      const validation = validateReport(report);

      expect(validation.success).toBeFalsy();
      expect(validation.error!.issues[0].message).toStrictEqual(
        "Reports must be longer than 5 characters",
      );
    }
  });

  test("Should fail if input is more than 50 characters - whitespace is trimmed", () => {
    for (let report of longReports) {
      const validation = validateReport(report);

      expect(validation.success).toBeFalsy();
      expect(validation.error!.issues[0].message).toStrictEqual(
        "Report is too long! Please keep it within 50 characters",
      );
    }
  });

  test("Should pass if input is within limits", () => {
    for (let report of validReports) {
      const validation = validateReport(report);

      expect(validation.success).toBeTruthy();
      expect(validation.error).toBeUndefined();
      expect(validation.data).toBe(report);
    }
  });
});
