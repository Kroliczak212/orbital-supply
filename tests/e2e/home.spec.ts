import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("strona główna ładuje się i nie ma naruszeń a11y", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
