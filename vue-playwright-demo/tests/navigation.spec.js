import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8080");
    await page.locator("[data-testid=loginLogoutButton]").click();
    await page.locator("[data-testid=loginUsernameField]").fill("user");
    await page.locator("[data-testid=loginPasswordField]").fill("test123");
    await page.locator("[data-testid=loginSubmitButton]").click();
  });

  test("Tests the navigation", async ({ page }) => {
    await expect(page).toHaveTitle(/Home/);

    await expect(page.locator('[data-testid=navigation] a').nth(0)).toHaveText("Home");
    await expect(page.locator('[data-testid=navigation] a').nth(1)).toHaveText("Forms");
    await expect(page.locator('[data-testid=navigation] a').nth(3)).toHaveText("Broken Link");
    await page.locator('[data-testid=navigation] a').nth(0).click();
    await expect(page).toHaveURL("http://localhost:8080/#/");

    await expect(page.locator('[data-testid=navigation] a').nth(0)).toHaveText("Home");
    await expect(page.locator('[data-testid=navigation] a').nth(1)).toHaveText("Forms");
    await expect(page.locator('[data-testid=navigation] a').nth(3)).toHaveText("Broken Link");
    await page.locator('[data-testid=navigation] a').nth(1).click();
    await expect(page).toHaveURL("http://localhost:8080/#/forms");

    await expect(page.locator('[data-testid=navigation] a').nth(0)).toHaveText("Home");
    await expect(page.locator('[data-testid=navigation] a').nth(1)).toHaveText("Forms");
    await expect(page.locator('[data-testid=navigation] a').nth(3)).toHaveText("Broken Link");
    await page.locator('[data-testid=navigation] a').nth(3).click();
    await expect(page).toHaveURL("http://localhost:8080/#/non-existent-path");

  });
});
