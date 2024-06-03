import { type Page } from "@playwright/test";

export const LoginScript = async (page: Page) => {
  await page.goto("http://localhost:3000/login");

  const EMAIL = process.env.TEST_EMAIL;
  const PASSWORD = process.env.TEST_PASS;
  // Fill in Email field
  const emailInput = page.getByPlaceholder("example@email.com");
  await emailInput.waitFor({ state: "visible", timeout: 5000 });
  await emailInput.focus();
  await page.keyboard.type(EMAIL!);

  // Fill in Password field
  const passwordInput = page.locator("input#password");
  await passwordInput.waitFor({ state: "visible", timeout: 5000 });
  await passwordInput.focus();
  await page.keyboard.type(PASSWORD!);

  await page.getByText("Login").click();
  await page.waitForURL("http://localhost:3000/");
};
