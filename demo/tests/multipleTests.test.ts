import { expect, test } from "@playwright/test"

import { DEFAULT_GRID_CELL_DIM, TITLE_REGEX } from "../src/constants"
import { GridPO } from "./GridPO"

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5000/")
  await expect(page).toHaveTitle(TITLE_REGEX)
  await page.locator("text=Multiple").click()
})

test("Multiple Grids", async ({ page }) => {
  await page.locator('[href="/multiple/grid-multiple"]').click()

  const grid1Po = new GridPO(page, "grid-1")
  const grid2Po = new GridPO(page, "grid-2")

  await grid1Po.isVisible()
  await grid2Po.isVisible()

  await grid1Po.scroll(DEFAULT_GRID_CELL_DIM + 8, 0)

  await expect(grid1Po.getCellLocator(0, 0)).toHaveText("1,0")
  await expect(grid2Po.getCellLocator(0, 0)).toHaveText("0,0")
})
