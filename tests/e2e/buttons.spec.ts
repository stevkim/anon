import { test, expect, type Page } from "@playwright/test";
import { LoginScript } from "../scripts/loginScript";
import { RouteScript } from "../scripts/routeScript";
import { mockPostsData } from "../mockE2EData";

test.describe.configure({ mode: "serial" });

let page: Page;
let type: string;

test.beforeAll("Set up API routes and log in", async ({ browser }) => {
  type = browser.browserType().name();
  page = await browser.newPage();

  // Sets up mock route endpoints
  await RouteScript(page);

  // Log in and navigate to home page
  await LoginScript(page);
});

test.describe("Button Functionality", () => {
  test("Correct URL", async () => {
    await expect(page).toHaveURL("http://localhost:3000/");
  });

  test("Like button", async () => {
    expect(page.getByTestId("like-button").first()).toBeVisible();
    await page.getByTestId("like-button").first().click();
  });

  test("Share button - copy the link", async () => {
    const ButtonMenu = page.getByTestId("button-menu").first();
    await ButtonMenu.click();

    const ShareButton = page.getByTestId("share-button");
    await expect(ShareButton).toBeVisible();
    await ShareButton.click();

    await expect(page.getByText("Share Link")).toBeVisible();

    // Webkit clipboard is not supported by playwright yet
    if (type !== "webkit") {
      // Click the copy button
      await page.getByTestId("copy").click();

      const clipboardText = await page.evaluate(
        "navigator.clipboard.readText()",
      );

      expect(clipboardText).toStrictEqual(
        `http://localhost:3000/post?id=${mockPostsData.data[0].id}`,
      );

      expect(page.getByText("Link Copied").first()).toBeVisible();
    }

    // Close the dialog
    await page.locator("span.sr-only").filter({ hasText: "Close" }).click();
    await expect(page.getByText("Share Link")).not.toBeVisible();
  });

  test("Save to list button", async () => {
    await expect(page.getByTestId("save-button")).toBeVisible();
    await page.getByTestId("save-button").click();
  });

  test("Report button", async () => {
    await expect(page.getByTestId("report-button")).toBeVisible();
    await page.getByTestId("report-button").click();

    const ReportPost = page.locator("h2").filter({ hasText: "Report Post" });
    await expect(ReportPost).toBeVisible();

    await expect(
      page.getByText("Please provide the reason for your report"),
    ).toBeVisible();
    await expect(page.getByText("Submit", { exact: true })).toBeVisible();

    // Report input validation
    const reasonInput = page.locator("input#reason");
    await expect(reasonInput).toBeVisible();

    await reasonInput.focus();
    await page.keyboard.type("Test"); // should not be valid < 5 characters
    await page.getByText("Submit", { exact: true }).click();
    await expect(
      page.getByText("Reports must be longer than 5 characters", {
        exact: true,
      }),
    ).toBeVisible();

    await reasonInput.focus();
    await page.keyboard.type("testing ".repeat(10)); // should not be valid > 50 characters
    await page.getByText("Submit", { exact: true }).click();
    await expect(
      page.getByText(
        "Report is too long! Please keep it within 50 characters",
        {
          exact: true,
        },
      ),
    ).toBeVisible();

    // Clear the input
    await reasonInput.click({ clickCount: 3 });
    await page.keyboard.press("Backspace");
    await page.keyboard.type("This is a valid test report"); // valid

    await page.getByText("Submit", { exact: true }).click();

    await expect(
      page.getByText("Thank you for your report.", { exact: true }),
    ).toBeVisible({ timeout: 5000 });

    // Dialog should be closed
    await expect(ReportPost).not.toBeVisible();
  });

  test("Delete button", async () => {
    // Only visible to author of the post
    const ButtonMenu = page.getByTestId("button-menu").last();
    const AuthorButtonMenu = page.getByTestId("button-menu").first();

    await ButtonMenu.click();
    await expect(
      page.getByText("Delete Post", { exact: true }),
    ).not.toBeVisible();

    await AuthorButtonMenu.click();
    await expect(page.getByText("Delete Post", { exact: true })).toBeVisible();

    await page.getByText("Delete Post", { exact: true }).click();
    await expect(
      page.getByText("Are you sure?", { exact: true }),
    ).toBeVisible();
    await expect(page.getByText("Continue", { exact: true })).toBeVisible();

    await page.getByText("Continue", { exact: true }).click();
  });
});
