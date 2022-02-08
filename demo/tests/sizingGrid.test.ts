import type { Page } from "@playwright/test"
import { expect, test } from "@playwright/test"

import { DEFAULT_SIZE, DEFAULT_SIZE_LARGE, TITLE_REGEX } from "../src/constants"
import { GridPO } from "./GridPO"

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5000/")
  await expect(page).toHaveTitle(TITLE_REGEX)
  await page.locator("text=Sizing").click()
})

async function sizingAssertions(page: Page) {
  const po = new GridPO(page, "grid")
  await po.isVisible()

  // See useWindowDimensions for the reason we subtract 1
  await expect(po.list).toHaveCSS("width", `${DEFAULT_SIZE - 1}px`)
  await expect(po.list).toHaveCSS("height", `${DEFAULT_SIZE - 1}px`)

  await page.locator("text=Toggle Size").click()

  await expect(po.list).toHaveCSS("width", `${DEFAULT_SIZE_LARGE - 1}px`)
  await expect(po.list).toHaveCSS("height", `${DEFAULT_SIZE_LARGE - 1}px`)
}

test("Sizing Grid", async ({ page }) => {
  await page.locator('[href="/sizing/grid-sizing"]').click()

  await sizingAssertions(page)
})

test("Sizing Grid Gap", async ({ page }) => {
  await page.locator('[href="/sizing/grid-sizing-gap"]').click()

  await sizingAssertions(page)
})

test("Sizing Grid Transitions", async ({ page }) => {
  await page.locator('[href="/sizing/grid-sizing-trans"]').click()

  await sizingAssertions(page)
})

test("Sizing Grid RTL", async ({ page }) => {
  await page.locator('[href="/sizing/grid-sizing-rtl"]').click()

  await sizingAssertions(page)
})
