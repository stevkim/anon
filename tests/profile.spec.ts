import { test, expect } from "@playwright/test";
import { mockPostsData } from "./mockData";

test.beforeEach(async ({ page }) => {
  await page.route("http://localhost:3000/api/**", async (route) => {
    const URL = route.request().url();
    if (URL.includes("post?page=0")) {
      await route.fulfill({ status: 200, json: mockPostsData });
    }

    if (URL.includes("user?page=0")) {
      await route.fulfill({ status: 200, json: mockPostsData });
    }

    if (URL.includes("user/saved?page=0")) {
      await route.fulfill({ status: 200, json: mockPostsData });
    }
  });

  await page.goto("http://localhost:3000");
});
