import { test, expect } from "@playwright/test";

test.describe("General tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8080");
    await page.locator("[data-testid=loginLogoutButton]").click();
    await page.locator("[data-testid=loginUsernameField]").fill("user");
    await page.locator("[data-testid=loginPasswordField]").fill("test123");
    await page.locator("[data-testid=loginSubmitButton]").click();
  });

  test("should illustrate common test cases", async ({ page }) => {

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Home/);

    // check for existence BY TEXT, anywhere on the page
    await expect(page.locator("text=Second Headline")).toBeVisible();
    await expect(page.locator("text=First Headline")).toBeVisible();

    // check for existence BY TAG, anywhere on the page
    await expect(page.locator('h1:has-text("Second Headline")')).toBeVisible();
    await expect(page.locator('h1:has-text("First Headline")')).toBeVisible();

    // check for correct order
    await expect(page.locator("h1").nth(0)).toHaveText("First Headline");
    await expect(page.locator("h1").nth(1)).toHaveText("Second Headline");

    // check for number of tags
    await expect(page.locator("h1")).toHaveCount(2);

    // use test-id
    await expect(page.locator("a")).toHaveCount(5); // all links
    await expect(page.locator("[data-testid=navigation] a")).toHaveCount(4); // only links within an data-testid="navigation" element
  });

  // test.only('Focused test', async ({ page }) => {
  //     // *only* this test is run
  //     // since this is not appropriate for production,
  //     // many linters have a no-only rule for tests
  //     // the actual tests are irrelevant :)
  //     await page.goto('/');
  //     await expect(page).toHaveTitle(/Home/);
  // });

  test.skip("Skipped test", async ({ page }) => {
    // this test will be skipped
    // the actual tests are irrelevant :)
    await page.goto("/");
    await expect(page).toHaveTitle(/Home/);

    // grouped tests can be skipped with test.describe.skip()
  });

  test("This one is expected to fail", async ({ page }) => {
    test.fail(); // it is possible to let test fail under certain conditions. Refer to docs
    await page.goto("http://localhost:8080");
    await expect(page).toHaveTitle(/jksjfhksb ksjfksdf/);
  });
});

// Grouping tests:
test.describe.skip("Grouped tests", () => {
  // in grouped tests beforeEach() can be used to do the same set-up tasks for each test
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8080");
  });

  test("should have correct page title", async ({ page }) => {
    // note: navigating to "/" has already happened in beforeEach()
    await expect(page).toHaveTitle(/Home/);
  });
});
