import validateContent, { getList } from "../../src/lib/validateContent";
import { test, describe, expect } from "@jest/globals";
import {
  mockValidContent,
  mockBadContent,
  mockBadContentLength,
} from "../mockUnitData";

describe("Validate Content Submission", () => {
  test("Should fail if the content is too close to the default value", () => {
    const validation = validateContent(mockBadContent);

    expect(validation).toBe(false);
  });

  test("Should fail if content is less than 2 lines", () => {
    const validation = validateContent(mockBadContentLength);

    expect(validation).toBe(false);
  });

  test("Should pass if content is more than 2 lines and less than 20% similar to the default value", () => {
    const validation = validateContent(mockValidContent);

    expect(validation).toBe(true);
  });
});

describe("Get string list from content", () => {
  test("Should correctly get list from the content provided in the form of an array", () => {
    const listOne = getList(mockBadContent);
    const listTwo = getList(mockBadContentLength);
    const listThree = getList(mockValidContent);

    expect(listOne).toHaveLength(4);
    expect(listOne).toStrictEqual([
      "Writing on ",
      "anon",
      "...",
      "Rules to Contribute",
    ]);

    expect(listTwo).toHaveLength(1);
    expect(listTwo).toStrictEqual(["Testing"]);

    expect(listThree).toHaveLength(2);
    expect(listThree).toStrictEqual(["Testing", "A different type"]);
  });
});
