import { expect, test } from "@playwright/test";
import { mockPostsData } from "./mockData";

test.beforeEach(async ({ page }) => {
  await page.route("http://localhost:3000/api/**", async (route) => {
    const URL = route.request().url();

    if (URL.includes("post?page=0")) {
      await route.fulfill({ status: 200, json: mockPostsData });
    }
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

  test("All buttons for posts visible", async ({ page }) => {
    // Make sure display is visible in the DOM
    await expect(page.getByTestId("content-display-posts")).toBeVisible();

    const POST = page.getByText("Mock Data", { exact: true });
    await expect(POST).toBeVisible();

    // Like button
    expect(page.getByTestId("like-button").first()).toBeVisible();

    // Confirm other buttons aren't visible before clicking menu
    const ShareButton = page.getByTestId("share-button");
    const SaveButton = page.getByTestId("save-button");
    const ReportButton = page.getByTestId("report-button");

    expect(ShareButton).not.toBeVisible();
    expect(SaveButton).not.toBeVisible();
    expect(ReportButton).not.toBeVisible();

    // Button menu
    const ButtonMenu = page.getByTestId("button-menu").first();
    await ButtonMenu.click();

    ShareButton.waitFor({ state: "visible", timeout: 5000 });
    await expect(ShareButton).toBeVisible();

    SaveButton.waitFor({ state: "visible", timeout: 5000 });
    await expect(SaveButton).toBeVisible();

    ReportButton.waitFor({ state: "visible", timeout: 5000 });
    await expect(ReportButton).toBeVisible();
  });
});
