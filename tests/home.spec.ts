import { expect, test } from "@playwright/test";
import { mockPostsData } from "./mockData";

test.beforeEach(async ({ page }) => {
  await page.route("http://localhost:3000/api/post?page=0", async (route) => {
    await route.fulfill({ json: mockPostsData });
  });
  await page.goto("http://localhost:3000");
});

test.describe("Home Page", () => {
  test("Correctly renders content", async ({ page }) => {
    // Make sure display is visible in the DOM
    await expect(page.getByTestId("content-display-posts")).toBeVisible();

    await expect(page.getByText("Mock Data", { exact: true })).toBeVisible();
    await expect(page.getByText("Mock Data 2", { exact: true })).toBeVisible();
  });
});
