import type { Page } from "@playwright/test"
import { expect, test } from "@playwright/test"

import { DEFAULT_GAP, DEFAULT_VARIABLE_GAP, TITLE_REGEX } from "../src/constants"
import { GridPO } from "./GridPO"

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5000/")
  await expect(page).toHaveTitle(TITLE_REGEX)
  await page.locator("text=Gap").click()
})

async function gapAssertions(page: Page, horizontalGap: number, verticalGap: number) {
  const po = new GridPO(page, "grid")
  await po.isVisible()

  await expect(po.getRowLocator(0)).toHaveCSS("marginBottom", `${verticalGap}px`)
  await expect(po.getRowLocator(0)).toHaveCSS("marginTop", `${verticalGap}px`)
  await expect(po.getRowLocator(1)).toHaveCSS("marginBottom", `${verticalGap}px`)
  await expect(po.getRowLocator(1)).toHaveCSS("marginTop", `${verticalGap}px`)
  await expect(po.getRowLocator(2)).toHaveCSS("marginBottom", `${verticalGap}px`)
  await expect(po.getRowLocator(2)).toHaveCSS("marginTop", `${verticalGap}px`)

  await expect(po.getCellLocator(0, 0)).toHaveCSS("marginLeft", `${horizontalGap}px`)
  await expect(po.getCellLocator(0, 0)).toHaveCSS("marginRight", `0px`)
  await expect(po.getCellLocator(0, 1)).toHaveCSS("marginLeft", `${horizontalGap}px`)
  await expect(po.getCellLocator(0, 1)).toHaveCSS("marginRight", `0px`)
  await expect(po.getCellLocator(0, 2)).toHaveCSS("marginLeft", `${horizontalGap}px`)
  await expect(po.getCellLocator(0, 2)).toHaveCSS("marginRight", `0px`)

  await po.scroll(await po.getScrollHeight(), await po.getScrollWidth())

  const lastRow = (await po.getRenderedRowCount()) - 1
  const lastCell = (await po.getRenderedCellCountForRow(lastRow)) - 1

  // Make sure we are checking the last row and cell.
  await expect(po.getCellLocator(lastRow, lastCell)).toHaveText("999,199")

  await expect(po.getRowLocator(lastRow)).toHaveCSS("marginTop", `${verticalGap}px`)
  await expect(po.getRowLocator(lastRow)).toHaveCSS("marginBottom", `${verticalGap}px`)
  await expect(po.getCellLocator(lastRow, lastCell)).toHaveCSS("marginLeft", `${horizontalGap}px`)
  await expect(po.getCellLocator(lastRow, lastCell)).toHaveCSS("marginRight", `0px`)

  // When we scroll to the end we should have a space at the end equivalent to the gap. This is
  // because we apply the last gap via positioning.
  await expect(po.getRowLocator(lastRow)).toHaveCSS(
    "width",
    `${(await po.getScrollWidth()) - horizontalGap}px`,
  )
}

async function gapRtlAssertions(page: Page, horizontalGap: number, verticalGap: number) {
  const po = new GridPO(page, "grid")
  await po.isVisible()

  await expect(po.getRowLocator(0)).toHaveCSS("marginBottom", `${verticalGap}px`)
  await expect(po.getRowLocator(0)).toHaveCSS("marginTop", `${verticalGap}px`)
  await expect(po.getRowLocator(1)).toHaveCSS("marginBottom", `${verticalGap}px`)
  await expect(po.getRowLocator(1)).toHaveCSS("marginTop", `${verticalGap}px`)
  await expect(po.getRowLocator(2)).toHaveCSS("marginBottom", `${verticalGap}px`)
  await expect(po.getRowLocator(2)).toHaveCSS("marginTop", `${verticalGap}px`)

  await expect(po.getCellLocator(0, 0)).toHaveCSS("marginRight", `${horizontalGap}px`)
  await expect(po.getCellLocator(0, 0)).toHaveCSS("marginLeft", `0px`)
  await expect(po.getCellLocator(0, 1)).toHaveCSS("marginRight", `${horizontalGap}px`)
  await expect(po.getCellLocator(0, 1)).toHaveCSS("marginLeft", `0px`)
  await expect(po.getCellLocator(0, 2)).toHaveCSS("marginRight", `${horizontalGap}px`)
  await expect(po.getCellLocator(0, 2)).toHaveCSS("marginLeft", `0px`)

  await po.scroll(await po.getScrollHeight(), -(await po.getScrollWidth()))

  const lastRow = (await po.getRenderedRowCount()) - 1
  const lastCell = (await po.getRenderedCellCountForRow(lastRow)) - 1

  // Make sure we are checking the last row and cell.
  await expect(po.getCellLocator(lastRow, lastCell)).toHaveText("999,199")

  await expect(po.getRowLocator(lastRow)).toHaveCSS("marginTop", `${verticalGap}px`)
  await expect(po.getRowLocator(lastRow)).toHaveCSS("marginBottom", `${verticalGap}px`)
  await expect(po.getCellLocator(lastRow, lastCell)).toHaveCSS("marginRight", `${horizontalGap}px`)
  await expect(po.getCellLocator(lastRow, lastCell)).toHaveCSS("marginLeft", `0px`)

  // When we scroll to the end we should have a space at the end equivalent to the gap. This is
  // because we apply the last gap via positioning.
  await expect(po.getRowLocator(lastRow)).toHaveCSS(
    "width",
    `${(await po.getScrollWidth()) - horizontalGap}px`,
  )
}

test("Grid Gap", async ({ page }) => {
  await page.locator('[href="/gap/grid-gap"]').click()

  await gapAssertions(page, DEFAULT_GAP, DEFAULT_GAP)
})

test("Grid Gap RTL", async ({ page }) => {
  await page.locator('[href="/gap/grid-gap-rtl"]').click()

  await gapRtlAssertions(page, DEFAULT_GAP, DEFAULT_GAP)
})

test("Grid Gap Variable Width and Height", async ({ page }) => {
  await page.locator('[href="/gap/vgrid-gap"]').click()

  await gapAssertions(page, DEFAULT_GAP, DEFAULT_GAP)
})

test("Grid Gap Variable Width and Height RTL", async ({ page }) => {
  await page.locator('[href="/gap/vgrid-gap-rtl"]').click()

  await gapRtlAssertions(page, DEFAULT_GAP, DEFAULT_GAP)
})

test("Grid Gap Variable Gap", async ({ page }) => {
  await page.locator('[href="/gap/grid-v-gap"]').click()

  await gapAssertions(page, DEFAULT_VARIABLE_GAP.horizontal, DEFAULT_VARIABLE_GAP.vertical)
})

test("Grid Gap Variable Gap RTL", async ({ page }) => {
  await page.locator('[href="/gap/grid-v-gap-rtl"]').click()

  await gapRtlAssertions(page, DEFAULT_VARIABLE_GAP.horizontal, DEFAULT_VARIABLE_GAP.vertical)
})

test("Grid Gap Variable Height and Width with Variable Gap", async ({ page }) => {
  await page.locator('[href="/gap/v-grid-v-gap"]').click()

  await gapAssertions(page, DEFAULT_VARIABLE_GAP.horizontal, DEFAULT_VARIABLE_GAP.vertical)
})

test("Grid Gap Variable Height and Width with Variable Gap RTL", async ({ page }) => {
  await page.locator('[href="/gap/v-grid-v-gap-rtl"]').click()

  await gapRtlAssertions(page, DEFAULT_VARIABLE_GAP.horizontal, DEFAULT_VARIABLE_GAP.vertical)
})
