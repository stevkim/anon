import { test, expect } from "@playwright/test";
import { mockPostsData, mockSavedData, mockUserData } from "./mockData";

test.beforeEach(async ({ page }) => {
  await page.route("http://localhost:3000/api/**", async (route) => {
    const URL = route.request().url();
    if (URL.includes("post?page=0")) {
      await route.fulfill({ status: 200, json: mockPostsData });
    }

    if (URL.includes("user?page=0")) {
      await route.fulfill({ status: 200, json: mockUserData });
    }

    if (URL.includes("user/saved?page=0")) {
      await route.fulfill({ status: 200, json: mockSavedData });
    }
  });

  await page.goto("http://localhost:3000/login");

  const EMAIL = process.env.TEST_EMAIL;
  const PASSWORD = process.env.TEST_PASS;

  // Log in and navigate to profile page
  await page
    .locator("input#email")
    .waitFor({ state: "attached", timeout: 5000 });
  await page
    .locator("input#email")
    .waitFor({ state: "visible", timeout: 5000 });
  await page.fill("input#email", EMAIL!);
  expect(await page.locator("input#email").inputValue()).toBe(EMAIL);

  await page
    .locator("input#password")
    .waitFor({ state: "attached", timeout: 5000 });
  await page
    .locator("input#password")
    .waitFor({ state: "visible", timeout: 5000 });
  await page.fill("input#password", PASSWORD!);
  expect(await page.locator("input#password").inputValue()).toBe(PASSWORD);

  await page.getByText("Login").click();

  await page.getByTestId("nav-menu-button").waitFor();
  await page.getByTestId("nav-menu-button").click();
  const ProfileNav = page.locator("[href='/profile']");
  await ProfileNav.waitFor();
  await ProfileNav.click();
  await expect(page).toHaveURL("http://localhost:3000/profile");
});

test.describe("Profile Page", () => {
  test("Correctly displays the quote", async ({ page }) => {
    await page
      .getByTestId("quote")
      .waitFor({ state: "attached", timeout: 5000 });
    await page
      .getByTestId("quote")
      .waitFor({ state: "visible", timeout: 5000 });

    await expect(page.getByTestId("quote")).toBeVisible();
  });

  test("Correctly displays content", async ({ page }) => {
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
