import { test, expect } from "@playwright/test";
import { mockPostsData } from "./mockData";

test.beforeEach(async ({ page }) => {
  await page.route("http://localhost:3000/api/**", async (route) => {
    const URL = route.request().url();
    if (URL.includes("post?page=0")) {
      await route.fulfill({ status: 200, json: mockPostsData });
    }
  });
  await page.goto("http://localhost:3000/login");
});

test.describe("Basic Authentication", () => {
  const EMAIL = process.env.TEST_EMAIL;
  const PASSWORD = process.env.TEST_PASS;

  test("Invalid credentials", async ({ page }) => {
    const INCORRECTPASSWORD = "incorrect";

    // Fill in Email field
    await page
      .locator("input#email")
      .waitFor({ state: "attached", timeout: 5000 });
    await page
      .locator("input#email")
      .waitFor({ state: "visible", timeout: 5000 });
    await page.fill("input#email", EMAIL!);
    expect(await page.locator("input#email").inputValue()).toBe(EMAIL);

    // Fill in Password field
    await page
      .locator("input#password")
      .waitFor({ state: "attached", timeout: 5000 });
    await page
      .locator("input#password")
      .waitFor({ state: "visible", timeout: 5000 });
    await page.fill("input#password", INCORRECTPASSWORD);
    expect(await page.locator("input#password").inputValue()).toBe(
      INCORRECTPASSWORD,
    );

    await page.getByText("Login").click();

    // If the login is unsuccessful, the user will stay on the login page
    await expect(page).not.toHaveURL("http://localhost:3000");
    await expect(page).toHaveURL("http://localhost:3000/login");

    const toast = page.getByText("Invalid login credentials", { exact: true });
    await toast.waitFor();

    await expect(toast).toBeAttached();
  });

  test("Successful login", async ({ page }) => {
    // Fill in Email field
    await page
      .locator("input#email")
      .waitFor({ state: "attached", timeout: 5000 });
    await page
      .locator("input#email")
      .waitFor({ state: "visible", timeout: 5000 });
    await page.fill("input#email", EMAIL!);
    expect(await page.locator("input#email").inputValue()).toBe(EMAIL);

    // Fill in Password field
    await page
      .locator("input#password")
      .waitFor({ state: "attached", timeout: 5000 });
    await page
      .locator("input#password")
      .waitFor({ state: "visible", timeout: 5000 });
    await page.fill("input#password", PASSWORD!);
    expect(await page.locator("input#password").inputValue()).toBe(PASSWORD);

    await page.getByText("Login").click();

    // Successful login will redirect to home
    await expect(page).toHaveURL("http://localhost:3000");
  });

  test("Navigate to Sign up", async ({ page }) => {
    // Click the button that redirects to /signup
    await page.getByText("Sign up").click();
    await expect(page).toHaveURL("http://localhost:3000/signup");

    await expect(page.locator("input#firstName")).toBeVisible();
    await expect(page.locator("input#lastName")).toBeVisible();
    await expect(page.locator("input#email")).toBeVisible();
    await expect(page.locator("input#password")).toBeVisible();
    await expect(page.locator("input#confirmPassword")).toBeVisible();

    // Navigate back to /login
    await page.getByText("Back to Login").click();
    await expect(page).toHaveURL("http://localhost:3000/login");
  });
});
