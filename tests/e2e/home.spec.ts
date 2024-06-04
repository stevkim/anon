import { expect, test, type Page } from "@playwright/test";
import { LoginScript } from "../scripts/loginScript";
import { RouteScript } from "../scripts/routeScript";

test.describe.configure({ mode: "serial" });

let page: Page;

test.beforeAll("Set up API routes and log in", async ({ browser }) => {
  page = await browser.newPage();

  // Sets up mock route endpoints
  await RouteScript(page);

  // Log in and navigate to home page
  await LoginScript(page);
});

test.describe("Home Page", () => {
  test("Correct URL", async () => {
    await expect(page).toHaveURL("http://localhost:3000/");
  });

  test("Correctly renders content", async () => {
    // Make sure display is visible in the DOM
    await expect(page.getByTestId("content-display-posts")).toBeVisible();

    await expect(page.getByText("Mock Data", { exact: true })).toBeVisible();
    await expect(page.getByText("Mock Data 2", { exact: true })).toBeVisible();
  });

  test("All buttons for posts visible", async () => {
    // Make sure display is visible in the DOM
    await expect(page.getByTestId("content-display-posts")).toBeVisible();
    await expect(page.getByText("Mock Data", { exact: true })).toBeVisible();

    // Like button
    await expect(page.getByTestId("like-button").first()).toBeVisible();

    // Confirm other buttons aren't visible before clicking menu
    const ShareButton = page.getByTestId("share-button");
    const SaveButton = page.getByTestId("save-button");
    const ReportButton = page.getByTestId("report-button");

    await expect(ShareButton).not.toBeVisible();
    await expect(SaveButton).not.toBeVisible();
    await expect(ReportButton).not.toBeVisible();

    // Button menu
    const ButtonMenu = page.getByTestId("button-menu").first();
    await ButtonMenu.click();

    await expect(ShareButton).toBeVisible();
    await expect(SaveButton).toBeVisible();
    await expect(ReportButton).toBeVisible();

    // Close button menu
    await ButtonMenu.click();
    await expect(ShareButton).not.toBeVisible();
    await expect(SaveButton).not.toBeVisible();
    await expect(ReportButton).not.toBeVisible();
  });
});
