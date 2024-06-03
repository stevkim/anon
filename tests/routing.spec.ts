import { test, expect, type Page } from "@playwright/test";
import { LoginScript } from "./scripts/loginScript";
import { RouteScript } from "./scripts/routeScript";

test.describe.configure({ mode: "serial" });

let page: Page;

test.beforeAll("Get up Mocks for API routes", async ({ browser }) => {
  page = await browser.newPage();

  // Sets up mock route endpoints
  await RouteScript(page);
  await page.goto("http://localhost:3000");
});

test.describe("Navigation and Routing", () => {
  test("Page load", async () => {
    await expect(page).toHaveTitle(/anon./);
    await expect(page).toHaveURL("http://localhost:3000/");

    await expect(page.getByTestId("title-logo")).toHaveText("anon");
    await expect(page.getByTestId("nav-menu-button")).toBeVisible();
    await expect(page.getByTestId("theme-button")).toBeVisible();
    await expect(page.getByTestId("content-display-posts")).toBeVisible();
  });

  test("Nav Button Functionality", async () => {
    // Should not be in the dom before clicking NavButton
    await expect(page.getByTestId("nav-menu")).not.toBeVisible();

    // Nav button click should show the menu
    await page.getByTestId("nav-menu-button").click();
    await expect(page.getByTestId("nav-menu")).toBeVisible();
  });

  test("Redirects to Login if not logged in", async () => {
    const NavButton = page.getByTestId("nav-menu-button");

    // Expect nav menu to be open from last test
    await expect(page.getByTestId("nav-menu")).toBeVisible();

    // Redirects when clicking publish
    const PublishNav = page.locator("[href='/publish']");
    await PublishNav.click();
    await expect(page.getByTestId("editor")).not.toBeVisible();
    await expect(page).toHaveURL(/.*login/);

    // Navigate back to home
    await page.getByTestId("title-logo").click();
    await expect(page).toHaveURL("http://localhost:3000");

    await NavButton.click();

    // Redirects when clicking profile
    const ProfileNav = page.locator("[href='/profile']");
    await ProfileNav.click();
    await expect(page).toHaveURL(/.*login/);
  });

  test("Navigate paths if logged in", async () => {
    // Log in
    await LoginScript(page);

    // Navigatio button
    const NavButton = page.getByTestId("nav-menu-button");

    // Navigate to publish
    await NavButton.click();
    const PublishNav = page.locator("[href='/publish']");
    await PublishNav.click();
    await expect(page).toHaveURL("http://localhost:3000/publish");
    await expect(page.getByTestId("editor")).toBeVisible();

    // Navigate to profile
    await NavButton.click();
    const ProfileNav = page.locator("[href='/profile']");
    await ProfileNav.click();
    await expect(page).toHaveURL("http://localhost:3000/profile");
    await expect(page.getByTestId("content-display-userPosts")).toBeVisible();
  });
});
