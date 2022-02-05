import { expect, test } from "@playwright/test"

import { TITLE_REGEX } from "./constants"

test("Basic Test", async ({ page }) => {
  await page.goto("http://localhost:5000/")

  await expect(page).toHaveTitle(TITLE_REGEX)

  await page.locator("text=Basic").click()

  await page.locator('[href="/basic/list"]').click()

  const visible = await page.isVisible("data-testid=basic-list")
  expect(visible).toBeTruthy()
})
