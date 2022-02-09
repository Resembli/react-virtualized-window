import { expect, test } from "@playwright/test"

import { DEFAULT_GRID_CELL_DIM, TITLE_REGEX } from "../src/constants"
import { GridPO } from "./GridPO"

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5000/")
  await expect(page).toHaveTitle(TITLE_REGEX)
  await page.locator("text=Sticky Disabled").click()
})

test("Sticky Disabled", async ({ page }) => {
  await page.locator('[href="/sticky-disabled/grid-sticky-disabled"]').click()

  const gridPO = new GridPO(page, "grid")
  await gridPO.isVisible()

  // If there is no sticky div, then the next elements after the innerWindow will be
  // our offset div and row items.
  await expect(gridPO.innerWindow.locator("div").nth(0)).toHaveCSS("height", "0px")
  await expect(gridPO.innerWindow.locator("div").nth(1)).toHaveCSS("display", "flex")

  await gridPO.scroll(DEFAULT_GRID_CELL_DIM + 20, 0)

  await expect(gridPO.innerWindow.locator("div").nth(1).locator("div").nth(1)).toHaveText("1,0")
})
