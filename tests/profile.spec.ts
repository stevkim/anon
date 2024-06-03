import { test, expect, type Page } from "@playwright/test";
import { LoginScript } from "./scripts/loginScript";
import { RouteScript } from "./scripts/routeScript";

test.describe.configure({ mode: "serial" });

let page: Page;

test.beforeAll("Set up routes and log in", async ({ browser }) => {
  page = await browser.newPage();

  await RouteScript(page);

  // Log in and navigate to profile page
  await LoginScript(page);

  await page.goto("http://localhost:3000/profile");
});

test.describe("Profile Page", () => {
  test("Correctly displays the quote", async () => {
    await page.screenshot({ path: "testing.png" });
    await page
      .getByTestId("quote")
      .waitFor({ state: "attached", timeout: 5000 });
    await page
      .getByTestId("quote")
      .waitFor({ state: "visible", timeout: 5000 });

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
    await expect(
      page.getByText("User Mock Data", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("Saved Mock Data", { exact: true }),
    ).not.toBeVisible();

    await page.getByText("Saved Posts", { exact: true }).click();
    await expect(
      page.getByText("User Mock Data", { exact: true }),
    ).not.toBeVisible();
    await expect(
      page.getByText("Saved Mock Data", { exact: true }),
    ).toBeVisible();
  });
});
