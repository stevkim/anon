import { test, expect, type Page } from "@playwright/test";
import { mockPostsData } from "./mockData";

test.describe.configure({ mode: "serial" });

let page: Page;

test.beforeAll("Set up and log in", async ({ browser }) => {
  page = await browser.newPage();

  await page.route("http://localhost:3000/api/**", async (route) => {
    const request = route.request();
    const URL = request.url();
    const method = request.method();

    if (URL.includes("post?page=0")) {
      await route.fulfill({ status: 200, json: mockPostsData });
    }

    if (method === "POST" && URL.includes("post")) {
      const PostData = JSON.stringify(await request.postDataJSON());
      expect(PostData).toContain("Testing a single line");
      expect(PostData).toContain("Line two");
      expect(PostData).toContain("Line three");

      await route.fulfill({ status: 201 });
    }
  });

  // Log in and navigate to publish page
  await page.goto("http://localhost:3000/publish");

  const EMAIL = process.env.TEST_EMAIL;
  const PASSWORD = process.env.TEST_PASS;

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
  await page.waitForURL("http://localhost:3000/", {
    timeout: 10000,
  });

  await page.getByTestId("nav-menu-button").waitFor();
  await page.getByTestId("nav-menu-button").click();
  const PublishNav = page.locator("[href='/publish']");

  await PublishNav.waitFor({ timeout: 5000 });
  await PublishNav.click();

  await page.waitForURL("http://localhost:3000/publish", { waitUntil: "load" });
  await expect(page).toHaveURL("http://localhost:3000/publish");
});

test.describe("Publish Page", () => {
  test("Loads the content of the page", async () => {
    // Editor
    await page.getByTestId("editor").waitFor();
    await expect(page.getByTestId("editor")).toBeVisible();
    // Default display
    await expect(page.getByText("Writing on anon...")).toBeVisible();

    // Submit button
    await expect(page.getByText("Submit", { exact: true })).toBeVisible();
  });

  test("Allows user to edit the editor", async () => {
    // The editor element
    const Editor = page.locator("div.ProseMirror");

    await Editor.fill("Testing");

    // Remove default text
    await expect(page.getByText("Writing on anon...")).not.toBeVisible();
    await expect(page.getByText("Testing")).toBeVisible();
  });

  test("Editor validates length of content on Submit", async () => {
    // The editor element
    const Editor = page.locator("div.ProseMirror");

    await Editor.fill("Testing a single line");
    await page.getByText("Submit", { exact: true }).click();

    // Error posting
    await expect(page.getByText("Error Posting").first()).toBeAttached();
    await expect(page.getByText("Error Posting").first()).toBeVisible();

    // Add two more lines
    await Editor.focus();
    await page.keyboard.press("Enter");
    await page.keyboard.type("Line two");
    await page.keyboard.press("Enter");
    await page.keyboard.type("Line three");

    await page.getByText("Submit", { exact: true }).click();

    // Redirects to home page
    await expect(page).toHaveURL("http://localhost:3000");

    // Confirmation of post being published
    await expect(page.getByText("Post Created", { exact: true })).toBeVisible();
  });
});
