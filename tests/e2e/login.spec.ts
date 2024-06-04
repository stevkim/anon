import { test, expect } from "@playwright/test";
import { RouteScript } from "../scripts/routeScript";

test.beforeEach(async ({ page }) => {
  // Sets up mock route endpoints
  await RouteScript(page);

  // Before each test, navgiate to login page
  await page.goto("http://localhost:3000/login");
});

test.describe("Basic Authentication", () => {
  const EMAIL = process.env.TEST_EMAIL;
  const PASSWORD = process.env.TEST_PASS;

  test("Correct URL", async ({ page }) => {
    await expect(page).toHaveURL("http://localhost:3000/login");
  });

  test("Invalid credentials", async ({ page }) => {
    const INCORRECTPASSWORD = "incorrect";

    // Fill in Email field
    const emailInput = page.getByPlaceholder("example@email.com");
    await emailInput.waitFor({ state: "visible", timeout: 5000 });
    await emailInput.focus();
    await page.keyboard.type(EMAIL!);

    // Fill in Password field
    const passwordInput = page.locator("input#password");
    await passwordInput.waitFor({ state: "visible", timeout: 5000 });
    await passwordInput.focus();
    await page.keyboard.type(INCORRECTPASSWORD!);

    await page.getByText("Login").click();

    // If the login is unsuccessful, the user will stay on the login page
    await expect(page).not.toHaveURL("http://localhost:3000");
    await expect(page).toHaveURL("http://localhost:3000/login");

    await expect(
      page.getByText("Invalid login credentials", { exact: true }),
    ).toBeVisible();
  });

  test("Successful login", async ({ page }) => {
    // Fill in email field
    const emailInput = page.getByPlaceholder("example@email.com");
    await emailInput.waitFor({ state: "visible", timeout: 5000 });
    await emailInput.focus();
    await page.keyboard.type(EMAIL!);

    // Fill in password field
    const passwordInput = page.locator("input#password");
    await passwordInput.waitFor({ state: "visible", timeout: 5000 });
    await passwordInput.focus();
    await page.keyboard.type(PASSWORD!);

    await page.getByText("Login").click();

    // Successful login will redirect to home
    await expect(page).toHaveURL("http://localhost:3000");

    // Login button is now logout
    await page.getByTestId("nav-menu-button").click();
    await expect(page.getByText("Log out", { exact: true })).toBeVisible();
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
