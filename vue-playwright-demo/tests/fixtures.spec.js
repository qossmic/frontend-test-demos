import { expect, test } from "@playwright/test";
import path from "path";
import {
  people_alternative,
  people_alternative_2,
  people_default,
} from "./fixtures/people_generated";
import { species_default, species_edited_values_updated } from "./fixtures/species_generated";

test.describe("Fixtures", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8080/");
    await page.locator("[data-testid=loginLogoutButton]").click();
    await page.locator("[data-testid=loginUsernameField]").fill("user");
    await page.locator("[data-testid=loginPasswordField]").fill("test123");
    await page.locator("[data-testid=loginSubmitButton]").click();
  });

  test("Tests static fixtures", async ({ page }) => {
    await page.route("https://swapi.dev/api/species", async (route) => {
      await route.fulfill({
        status: 200,
        path: path.join(__dirname, "fixtures/species_static.json")
      });
    });

    await page.locator("[data-testid=navigation] a").nth(2).click();
    await page.waitForTimeout(1000);

    await expect(page.locator("[data-testid=species]")).toBeVisible();
    await expect(
      page.locator(
        "[data-testid=species] >> tr:nth-child(2) >> td:nth-child(1)"
      )
    ).toHaveText("Static Human");
    await expect(
      page.locator(
        "[data-testid=species] >> tr:nth-child(2) >> td:nth-child(1)"
      )
    ).not.toHaveText("Default Human");
    await expect(
      page.locator(
        "[data-testid=species] >> tr:nth-child(2) >> td:nth-child(1)"
      )
    ).not.toHaveText("Alt Human");
  });

  test("Tests diff. generated fixtures for diff. urls", async ({ page }) => {
    await page.route("https://swapi.dev/api/species", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(species_default),
      });
    });

    await page.route("https://swapi.dev/api/people/**", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(people_default),
      });
    });

    await page.route("https://swapi.dev/api/people/66/", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(people_alternative),
      });
    });

    await page.route("https://swapi.dev/api/people/67/", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(people_alternative_2),
      });
    });

    await page.locator("[data-testid=navigation] a").nth(2).click();
    await page.waitForTimeout(1000);

    await expect(page.locator("[data-testid=species]")).toBeVisible();
    await expect(
      page.locator(
        "[data-testid=species] >> tr:nth-child(2) >> td:nth-child(1)"
      )
    ).toHaveText("Default Human");

    await expect(
      page.locator(
        "[data-testid=species] >> tr:nth-child(2) >> td:nth-child(8) >> div:nth-child(1) >> a"
      )
    ).toHaveText("NotDormé");
    await expect(
      page.locator(
        "[data-testid=species] >> tr:nth-child(2) >> td:nth-child(8) >> div:nth-child(2) >> a"
      )
    ).toHaveText("TotallyNotDormé");
    await expect(
      page.locator(
        "[data-testid=species] >> tr:nth-child(2) >> td:nth-child(8) >> div:nth-child(3) >> a"
      )
    ).toHaveText("Dormé");
    await expect(
      page.locator(
        "[data-testid=species] >> tr:nth-child(2) >> td:nth-child(8) >> div:nth-child(3) >> a"
      )
    ).toHaveText("Dormé");
  });

  test("Tests generated fixture with updated dates", async ({ page }) => {
    await page.route("https://swapi.dev/api/people", async (route) => {
      await route.fulfill({
        status: 200,
        path: path.join(__dirname, "./people_static.json"),
      });
    });

    await page.route("https://swapi.dev/api/films", async (route) => {
      await route.fulfill({
        status: 200,
        path: path.join(__dirname, "./films_static.json"),
      });
    });

    await page.route("https://swapi.dev/api/planets", async (route) => {
      await route.fulfill({
        status: 200,
        path: path.join(__dirname, "./planets_static.json"),
      });
    });

    await page.route("https://swapi.dev/api/species", async (route) => {
      await route.fulfill({
        status: 200,
        path: path.join(__dirname, "./fixtures/species_static.json"),
      });
    });

    await page.route("https://swapi.dev/api/people/66/", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(species_edited_values_updated),
      });
    });

    await page.locator("[data-testid=navigation] a").nth(2).click();
    await page.waitForTimeout(1000);
  });
});
