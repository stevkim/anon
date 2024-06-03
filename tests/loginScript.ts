import { type Page, type Expect } from "@playwright/test";

export const LoginScript = async (page: Page, expect: Expect) => {
  await page.goto("http://localhost:3000/login");

  const EMAIL = process.env.TEST_EMAIL;
  const PASSWORD = process.env.TEST_PASS;
  // Fill in Email field
  const emailInput = page.getByPlaceholder("example@email.com");
  await emailInput.waitFor({ state: "attached", timeout: 5000 });
  await emailInput.waitFor({ state: "visible", timeout: 5000 });
  await emailInput.focus();
  await page.keyboard.type(EMAIL!);
  const emailInputValue = await emailInput.inputValue();
  expect(emailInputValue).toBe(EMAIL);

  // Fill in Password field
  const passwordInput = page.locator("input#password");
  await passwordInput.waitFor({ state: "attached", timeout: 5000 });
  await passwordInput.waitFor({ state: "visible", timeout: 5000 });
  await passwordInput.fill(PASSWORD!);
  const passwordInputValue = await passwordInput.inputValue();
  expect(passwordInputValue).toBe(PASSWORD);

  await page.getByText("Login").click();
};
