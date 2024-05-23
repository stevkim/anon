import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test.describe("Navigation and Routing", () => {
  test("Page load", async ({ page }) => {
    await expect(page).toHaveTitle(/anon./);

    await expect(page.getByTestId("title-logo")).toHaveText("anon");
    await expect(page.getByTestId("nav-menu-button")).toBeVisible();
    await expect(page.getByTestId("theme-button")).toBeVisible();
    await expect(page.getByTestId("content-display-posts")).toBeVisible();
  });

  test("Nav Button Functionality", async ({ page }) => {
    // Should not be in the dom before clicking NavButton
    await expect(page.getByTestId("nav-menu")).not.toBeVisible();

    // Nav button click should show the menu
    await page.getByTestId("nav-menu-button").click();
    await expect(page.getByTestId("nav-menu")).toBeVisible({ timeout: 10000 });
  });

  test("Redirects to Login if not logged in", async ({ page }) => {
    // Ensure nav button is available
    const NavButton = page.getByTestId("nav-menu-button");
    await NavButton.waitFor();

    await NavButton.click();

    // Redirects when clicking publish
    await page.waitForSelector("[href='/publish']");
    await page.locator("[href='/publish']").click();
    await expect(page.getByTestId("editor")).not.toBeVisible();
    await expect(page).toHaveURL(/.*login/);

    // Navigate back to home
    await page.getByTestId("title-logo").click();
    await expect(page).toHaveURL("http://localhost:3000");

    await NavButton.click();

    // Redirects when clicking profile
    await page.waitForSelector("[href='/profile']");
    await page.locator("[href='/profile']").click();
    await expect(page).toHaveURL(/.*login/);
  });

  test("Navigate paths if logged in", async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    const email = process.env.TEST_EMAIL || "";
    const password = process.env.TEST_PASS || "";

    // Log in first
    await page.locator("input#email").waitFor();
    await page.fill("input#email", email);
    expect(await page.locator("input#email").inputValue()).toBe(email);

    await page.locator("input#password").waitFor();
    await page.fill("input#password", password);
    expect(await page.locator("input#password").inputValue()).toBe(password);

    await page.getByText("Login").click();

    // Ensure nav button is available
    const NavButton = page.getByTestId("nav-menu-button");
    await NavButton.waitFor();

    // Navigate to publish
    await NavButton.click();
    await page.waitForSelector("[href='/publish']");
    await page.locator("[href='/publish']").click();
    await expect(page).toHaveURL("http://localhost:3000/publish");
    await expect(page.getByTestId("editor")).toBeVisible();

    // Navigate to profile
    await NavButton.click();
    await page.waitForSelector("[href='/profile']");
    await page.locator("[href='/profile']").click();
    await expect(page).toHaveURL("http://localhost:3000/profile");
    await expect(page.getByTestId("content-display-userPosts")).toBeVisible();
  });
});
