import { expect, test } from "@playwright/test"

import { TITLE_REGEX } from "../src/constants"
import { GridPO } from "./GridPO"

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5000/")
  await expect(page).toHaveTitle(TITLE_REGEX)
  await page.locator("text=Percentages").click()
})

test("Percentage", async ({ page }) => {
  await page.locator('[href="/percentage/grid-percentage"]').click()

  const po = new GridPO(page, "grid")
  await po.isVisible()

  const rowStyle = await po.getRowLocator(0).getAttribute("style")
  const cellStyle = await po.getCellLocator(0, 0).getAttribute("style")

  // Styles were grabbed as a snap shot. The are correct for the current dimensions of the grid.
  expect(rowStyle).toEqual(
    "display: flex; height: 63px; min-height: 63px; max-height: 63px; margin-top: 0px; margin-bottom: 0px;",
  )
  expect(cellStyle).toEqual(
    "width: 93.9px; min-width: 93.9px; max-width: 93.9px; height: 100%; margin-left: 0px; margin-right: 0px;",
  )
})

test("Percentage Gap", async ({ page }) => {
  await page.locator('[href="/percentage/grid-percentage-gap"]').click()

  const po = new GridPO(page, "grid")
  await po.isVisible()

  const cellStyle = await po.getCellLocator(0, 0).getAttribute("style")
  const rowStyle = await po.getRowLocator(0).getAttribute("style")

  // The dimensions differ from the grid without a gap because the gap is removed from the window width and height
  // before calculating the percentage values.
  // Styles were grabbed as a snap shot. The are correct for the current dimensions of the grid.
  expect(rowStyle).toEqual(
    "display: flex; height: 59px; min-height: 59px; max-height: 59px; margin-top: 20px; margin-bottom: 20px;",
  )
  expect(cellStyle).toEqual(
    "width: 89.9px; min-width: 89.9px; max-width: 89.9px; height: 100%; margin-left: 20px; margin-right: 0px;",
  )
})

test("Percentage Variable", async ({ page }) => {
  await page.locator('[href="/percentage/grid-percentage-variable"]').click()

  const po = new GridPO(page, "grid")
  await po.isVisible()

  const cellStyle0 = await po.getCellLocator(0, 0).getAttribute("style")
  const cellStyle1 = await po.getCellLocator(0, 1).getAttribute("style")
  const cellStyle2 = await po.getCellLocator(0, 2).getAttribute("style")
  const cellStyle3 = await po.getCellLocator(0, 3).getAttribute("style")

  expect(cellStyle0).toEqual(
    "width: 187.8px; min-width: 187.8px; max-width: 187.8px; height: 100%; margin-left: 0px; margin-right: 0px;",
  )
  expect(cellStyle1).toEqual(
    "width: 93.9px; min-width: 93.9px; max-width: 93.9px; height: 100%; margin-left: 0px; margin-right: 0px;",
  )
  expect(cellStyle2).toEqual(
    "width: 46.95px; min-width: 46.95px; max-width: 46.95px; height: 100%; margin-left: 0px; margin-right: 0px;",
  )
  expect(cellStyle3).toEqual(
    "width: 18.78px; min-width: 18.78px; max-width: 18.78px; height: 100%; margin-left: 0px; margin-right: 0px;",
  )

  const rowStyle0 = await po.getRowLocator(0).getAttribute("style")
  const rowStyle1 = await po.getRowLocator(1).getAttribute("style")
  const rowStyle2 = await po.getRowLocator(2).getAttribute("style")
  const rowStyle3 = await po.getRowLocator(3).getAttribute("style")

  expect(rowStyle0).toEqual(
    "display: flex; height: 63px; min-height: 63px; max-height: 63px; margin-top: 0px; margin-bottom: 0px;",
  )
  expect(rowStyle1).toEqual(
    "display: flex; height: 126px; min-height: 126px; max-height: 126px; margin-top: 0px; margin-bottom: 0px;",
  )
  expect(rowStyle2).toEqual(
    "display: flex; height: 63px; min-height: 63px; max-height: 63px; margin-top: 0px; margin-bottom: 0px;",
  )
  expect(rowStyle3).toEqual(
    "display: flex; height: 31.5px; min-height: 31.5px; max-height: 31.5px; margin-top: 0px; margin-bottom: 0px;",
  )
})

test("Percentage Variable Gap", async ({ page }) => {
  await page.locator('[href="/percentage/grid-percentage-variable-gap"]').click()

  const po = new GridPO(page, "grid")
  await po.isVisible()

  const cellStyle0 = await po.getCellLocator(0, 0).getAttribute("style")
  const cellStyle1 = await po.getCellLocator(0, 1).getAttribute("style")
  const cellStyle2 = await po.getCellLocator(0, 2).getAttribute("style")
  const cellStyle3 = await po.getCellLocator(0, 3).getAttribute("style")

  expect(cellStyle0).toEqual(
    "width: 179.8px; min-width: 179.8px; max-width: 179.8px; height: 100%; margin-left: 20px; margin-right: 0px;",
  )
  expect(cellStyle1).toEqual(
    "width: 89.9px; min-width: 89.9px; max-width: 89.9px; height: 100%; margin-left: 20px; margin-right: 0px;",
  )
  expect(cellStyle2).toEqual(
    "width: 44.95px; min-width: 44.95px; max-width: 44.95px; height: 100%; margin-left: 20px; margin-right: 0px;",
  )
  expect(cellStyle3).toEqual(
    "width: 17.98px; min-width: 17.98px; max-width: 17.98px; height: 100%; margin-left: 20px; margin-right: 0px;",
  )

  const rowStyle0 = await po.getRowLocator(0).getAttribute("style")
  const rowStyle1 = await po.getRowLocator(1).getAttribute("style")
  const rowStyle2 = await po.getRowLocator(2).getAttribute("style")
  const rowStyle3 = await po.getRowLocator(3).getAttribute("style")

  expect(rowStyle0).toEqual(
    "display: flex; height: 59px; min-height: 59px; max-height: 59px; margin-top: 20px; margin-bottom: 20px;",
  )
  expect(rowStyle1).toEqual(
    "display: flex; height: 118px; min-height: 118px; max-height: 118px; margin-top: 20px; margin-bottom: 20px;",
  )
  expect(rowStyle2).toEqual(
    "display: flex; height: 59px; min-height: 59px; max-height: 59px; margin-top: 20px; margin-bottom: 20px;",
  )
  expect(rowStyle3).toEqual(
    "display: flex; height: 29.5px; min-height: 29.5px; max-height: 29.5px; margin-top: 20px; margin-bottom: 20px;",
  )
})
