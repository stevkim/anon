import { expect, test, type Page } from "@playwright/test";
import { mockPostsData } from "./mockData";
import { LoginScript } from "./loginScript";

test.describe.configure({ mode: "serial" });

let page: Page;
let type: string;

test.beforeAll("Set up API routes and log in", async ({ browser }) => {
  type = browser.browserType().name();
  page = await browser.newPage();

  await page.route("http://localhost:3000/api/**", async (route) => {
    const request = route.request();
    const URL = request.url();

    if (URL.includes("post?page=0")) {
      await route.fulfill({ status: 200, json: mockPostsData });
    }
  });

  // Log in and navigate to profile page
  await LoginScript(page, expect);

  await page.waitForURL("http://localhost:3000/", {
    timeout: 10000,
  });
  await expect(page).toHaveURL("http://localhost:3000/");
});

test.describe("Home Page", () => {
  test("Correctly renders content", async () => {
    // Make sure display is visible in the DOM
    await expect(page.getByTestId("content-display-posts")).toBeVisible();

    await expect(page.getByText("Mock Data", { exact: true })).toBeVisible();
    await expect(page.getByText("Mock Data 2", { exact: true })).toBeVisible();
  });

  test("All buttons for posts visible", async () => {
    // Make sure display is visible in the DOM
    await expect(page.getByTestId("content-display-posts")).toBeVisible();

    const POST = page.getByText("Mock Data", { exact: true });
    await expect(POST).toBeVisible();

    // Like button
    expect(page.getByTestId("like-button").first()).toBeVisible();

    // Confirm other buttons aren't visible before clicking menu
    const ShareButton = page.getByTestId("share-button");
    const SaveButton = page.getByTestId("save-button");
    const ReportButton = page.getByTestId("report-button");

    expect(ShareButton).not.toBeVisible();
    expect(SaveButton).not.toBeVisible();
    expect(ReportButton).not.toBeVisible();

    // Button menu
    const ButtonMenu = page.getByTestId("button-menu").first();
    await ButtonMenu.click();

    ShareButton.waitFor({ state: "visible", timeout: 5000 });
    await expect(ShareButton).toBeVisible();

    SaveButton.waitFor({ state: "visible", timeout: 5000 });
    await expect(SaveButton).toBeVisible();

    ReportButton.waitFor({ state: "visible", timeout: 5000 });
    await expect(ReportButton).toBeVisible();

    // Close button menu
    await ButtonMenu.click();
  });

  test("Like button", async () => {
    await page.route("http://localhost:3000/api/**", async (route) => {
      const request = route.request();
      const URL = request.url();
      const method = request.method();

      if (method === "POST" && URL.includes("like")) {
        // URL has to have the post id
        expect(URL.includes(mockPostsData.data[0].id)).toBeTruthy();
        await route.fulfill({ status: 200 });
      } else {
        await route.fallback();
      }
    });

    expect(page.getByTestId("like-button").first()).toBeVisible();
    await page.getByTestId("like-button").first().click();
  });

  test("Share button - copy the link", async () => {
    const ShareButton = page.getByTestId("share-button");
    const ButtonMenu = page.getByTestId("button-menu").first();
    await ButtonMenu.click();

    ShareButton.waitFor({ state: "visible", timeout: 5000 });
    await expect(ShareButton).toBeVisible();
    await ShareButton.click();

    page.getByText("Share Link").waitFor({ state: "attached", timeout: 5000 });
    page.getByText("Share Link").waitFor({ state: "visible", timeout: 5000 });
    expect(page.getByText("Share Link")).toBeVisible();

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
    await page.route("http://localhost:3000/api/**", async (route) => {
      const request = route.request();
      const URL = request.url();
      const method = request.method();

      if (method === "POST" && URL.includes("saved")) {
        expect(URL.includes(mockPostsData.data[0].id)).toBeTruthy();
        await route.fulfill({ status: 200 });
      } else {
        await route.fallback();
      }
    });

    await expect(page.getByTestId("save-button")).toBeVisible();
    await page.getByTestId("save-button").click();
  });

  test("Report button", async () => {
    await page.route("http://localhost:3000/api/**", async (route) => {
      const request = route.request();
      const URL = request.url();
      const method = request.method();

      if (method === "POST" && URL.includes("saved")) {
        expect(URL.includes(mockPostsData.data[0].id)).toBeTruthy();
        await route.fulfill({ status: 200 });
      } else {
        await route.fallback();
      }
    });

    await expect(page.getByTestId("report-button")).toBeVisible();
    await page.getByTestId("report-button").click();

    const ReportPost = page.locator("h2").filter({ hasText: "Report Post" });
    ReportPost.waitFor({ state: "attached", timeout: 5000 });
    ReportPost.waitFor({ state: "visible", timeout: 5000 });
    await expect(ReportPost).toBeVisible();

    await expect(
      page.getByText("Please provide the reason for your report", {
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.getByText("Submit", { exact: true })).toBeVisible();

    // TODO: Test validation for report button

    // Close the dialog
    await page.locator("span.sr-only").filter({ hasText: "Close" }).click();
    await expect(ReportPost).not.toBeVisible();
  });

  test("Delete button", async () => {
    await page.route("http://localhost:3000/api/**", async (route) => {
      const request = route.request();
      const URL = request.url();
      const method = request.method();

      if (method === "DELETE" && URL.includes("post")) {
        expect(URL.includes(mockPostsData.data[0].id)).toBeTruthy();
        await route.fulfill({ status: 204 });
      } else {
        await route.fallback();
      }
    });

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
