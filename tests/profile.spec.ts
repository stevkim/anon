import { test, expect, type Page } from "@playwright/test";
import { LoginScript } from "./scripts/loginScript";
import { RouteScript } from "./scripts/routeScript";

test.describe.configure({ mode: "serial" });

let page: Page;

test.beforeAll("Set up routes and log in", async ({ browser }) => {
  page = await browser.newPage();

  // Sets up mock route endpoints
  await RouteScript(page);

  // Log in and navigate to profile page
  await LoginScript(page);
  await page.goto("http://localhost:3000/profile");
});

test.describe("Profile Page", () => {
  test("Correct URL", async () => {
    await expect(page).toHaveURL("http://localhost:3000/profile");
  });

  test("Displays a random quote", async () => {
    // TODO: a bit more testing here
    await expect(page.getByTestId("quote")).toBeVisible();
  });

  test("Correctly displays content", async () => {
    // Tabs - User Posts and Saved Posts
    await expect(page.getByText("User Posts", { exact: true })).toBeVisible();
    await expect(page.getByText("Saved Posts", { exact: true })).toBeVisible();

    /*
      ** Default tab is User Posts
      Testing both tabs to make sure correct endpoints are being hit/displayed
    */
    const UserPost = page.getByText("User Mock Data", { exact: true });
    const SavedPost = page.getByText("Saved Mock Data", { exact: true });

    await expect(UserPost).toBeVisible();
    await expect(SavedPost).not.toBeVisible();

    // Click Saved tab
    await page.getByText("Saved Posts", { exact: true }).click();

    await expect(UserPost).not.toBeVisible();
    await expect(SavedPost).toBeVisible();
  });
});
