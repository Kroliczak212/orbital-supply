import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("z listy da się wejść na stronę produktu bez naruszeń a11y", async ({ page }) => {
  await page.goto("/");
  await page.locator("#sklep a[href^='/products/']").first().click();
  await expect(page).toHaveURL(/\/products\//);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
