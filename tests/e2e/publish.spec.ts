import { test, expect, type Page } from "@playwright/test";
import { LoginScript } from "../scripts/loginScript";
import { RouteScript } from "../scripts/routeScript";

test.describe.configure({ mode: "serial" });

let page: Page;

test.beforeAll("Set up and log in", async ({ browser }) => {
  page = await browser.newPage();

  // Sets up mock route endpoints
  await RouteScript(page);

  // Log in and navigate to publish page
  await LoginScript(page);
  await page.goto("http://localhost:3000/publish");
});

test.describe("Publish Page", () => {
  test("Correct URL", async () => {
    await expect(page).toHaveURL("http://localhost:3000/publish");
  });

  test("Loads the content of the page", async () => {
    // Editor
    await expect(page.getByTestId("editor")).toBeVisible();
    // Default display
    await expect(page.getByText("Writing on anon...")).toBeVisible();
    // Submit button
    await expect(page.getByText("Submit", { exact: true })).toBeVisible();
  });

  test("Allows user to edit the editor", async () => {
    // The editor element
    const Editor = page.locator("div.ProseMirror");

    // Clear the editor and type an input
    await Editor.fill("");
    await Editor.focus();
    await page.keyboard.type("Testing");

    // Remove default text
    await expect(page.getByText("Writing on anon...")).not.toBeVisible();
    await expect(page.getByText("Testing")).toBeVisible();

    await Editor.focus();
    await page.keyboard.press("Enter");
    await page.keyboard.type(
      "Should save content to localStorage if >= 2 lines",
    );

    // Refresh page and test local storage
    await page.reload();

    await expect(page.getByText("Writing on anon...")).not.toBeVisible();
    await expect(page.getByText("Testing")).toBeVisible();
  });

  test("Editor validates length of content on Submit", async () => {
    // The editor element
    const Editor = page.locator("div.ProseMirror");

    await Editor.fill("Testing a single line");
    await page.getByText("Submit", { exact: true }).click();

    // Error posting
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
