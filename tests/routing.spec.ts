import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test.describe("Navigation and Routing", () => {
  test("Page load", async ({ page }) => {
    await expect(page).toHaveTitle(/anon./);

    await expect(page.getByTestId("title-logo")).toHaveText("anon");
    expect(page.getByTestId("nav-menu-button")).toBeTruthy();
    expect(page.getByTestId("theme-button")).toBeTruthy();
    expect(page.getByTestId("content-display")).toBeTruthy();
  });

  test("Nav Button Functionality", async ({ page }) => {
    // should not be in the dom before clicking NavButton
    await expect(page.getByTestId("nav-menu")).not.toBeVisible();

    // nav button click should show the menu
    await page.getByTestId("nav-menu-button").click();
    await expect(page.getByTestId("nav-menu")).toBeVisible({ timeout: 10000 });
  });

  test("Redirects to Login if not logged in", async ({ page }) => {
    const NavButton = page.getByTestId("nav-menu-button");

    await NavButton.click();

    // redirects when clicking publish
    await page.locator("[href='/publish']").click();
    await page.waitForURL(/.*login/);
    await expect(page).toHaveURL(/.*login/);

    // navigate back to home
    await page.getByTestId("title-logo").click();
    await expect(page).toHaveURL("http://localhost:3000");

    await NavButton.click();

    // redirects when clicking profile
    await page.locator("[href='/profile']").click();
    await page.waitForURL(/.*login/);
    await expect(page).toHaveURL(/.*login/);
  });
});
