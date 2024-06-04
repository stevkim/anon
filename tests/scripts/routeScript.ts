import { type Page, expect } from "@playwright/test";
import { mockPostsData, mockSavedData, mockUserData } from "../mockE2EData";

export const RouteScript = async (page: Page) => {
  // Handle GET Requests
  await page.route("http://localhost:3000/api/**", async (route) => {
    if (route.request().method() !== "GET") {
      await route.fallback();
      return;
    }
    const request = route.request();
    const URL = request.url();

    if (URL.includes("post?page=0")) {
      await route.fulfill({ status: 200, json: mockPostsData });
    }

    if (URL.includes("user?page=0")) {
      await route.fulfill({ status: 200, json: mockUserData });
    }

    if (URL.includes("user/saved?page=0")) {
      await route.fulfill({ status: 200, json: mockSavedData });
    }
  });

  // Handle POST Requests
  await page.route("http://localhost:3000/api/**", async (route) => {
    if (route.request().method() !== "POST") {
      await route.fallback();
      return;
    }
    const request = route.request();
    const URL = request.url();

    if (URL === "http://localhost:3000/api/post") {
      const PostData = JSON.stringify(await request.postDataJSON());
      expect(PostData).toContain("Testing a single line");
      expect(PostData).toContain("Line two");
      expect(PostData).toContain("Line three");
      await route.fulfill({ status: 201 });
      return;
    } else {
      // URL must include the postId
      expect(URL.includes(mockPostsData.data[0].id)).toBeTruthy();
      await route.fulfill({ status: 200 });
      return;
    }
    // else if (URL.includes("report")) {
    //   await route.fulfill({ status: 200 });
    // }
  });

  // Handle DELETE Requests
  await page.route("http://localhost:3000/api/**", async (route) => {
    if (route.request().method() !== "DELETE") {
      await route.fallback();
      return;
    }
    const request = route.request();
    const URL = request.url();

    // URL must include the postId
    expect(URL.includes(mockPostsData.data[0].id)).toBeTruthy();
    await route.fulfill({ status: 204 });
  });
};
