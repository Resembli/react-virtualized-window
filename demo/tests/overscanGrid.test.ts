import { expect, test } from "@playwright/test"

import {
  DEFAULT_GRID_CELL_DIM,
  DEFAULT_HEIGHT_ARRAY,
  DEFAULT_OVERSCAN,
  DEFAULT_WIDTH_ARRAY,
  TITLE_REGEX,
} from "../src/constants"
import { GridPO } from "./GridPO"

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5000/")
  await expect(page).toHaveTitle(TITLE_REGEX)
  await page.locator("text=Overscan").click()
})

async function overscanAssertions(
  po: GridPO,
  expectedRows: number,
  expectedColumns: number,
  rtl: boolean,
) {
  let rowCount = await po.getRenderedRowCount()
  expect(expectedRows - rowCount).toBeLessThanOrEqual(2)

  let columnCount = await po.getRenderedCellCountForRow(0)
  expect(expectedColumns - columnCount).toBeLessThanOrEqual(2)

  const scrollLeft = (await po.getScrollWidth()) / 2
  const scrollTop = (await po.getScrollHeight()) / 2

  po.scroll(scrollTop, scrollLeft * (rtl ? -1 : 1))

  rowCount = await po.getRenderedRowCount()
  columnCount = await po.getRenderedCellCountForRow(0)

  expect(expectedRows + DEFAULT_OVERSCAN - rowCount).toBeLessThanOrEqual(2)
  expect(expectedColumns + DEFAULT_OVERSCAN - columnCount).toBeLessThanOrEqual(2)
}

test("Grid Overscan", async ({ page }) => {
  await page.locator('[href="/overscan/grid-overscan"]').click()

  const po = new GridPO(page, "grid")
  await po.isVisible()

  const windowHeight = await po.getWindowHeight()
  const expectedRows = Math.ceil(windowHeight / DEFAULT_GRID_CELL_DIM) + DEFAULT_OVERSCAN

  const windowWidth = await po.getWindowWidth()
  const expectedColumns = Math.ceil(windowWidth / DEFAULT_GRID_CELL_DIM) + DEFAULT_OVERSCAN

  await overscanAssertions(po, expectedRows, expectedColumns, false)
})

test("Grid Overscan RTL", async ({ page }) => {
  await page.locator('[href="/overscan/grid-overscan-rtl"]').click()

  const po = new GridPO(page, "grid")
  await po.isVisible()

  const windowHeight = await po.getWindowHeight()
  const expectedRows = Math.ceil(windowHeight / DEFAULT_GRID_CELL_DIM) + DEFAULT_OVERSCAN

  const windowWidth = await po.getWindowWidth()
  const expectedColumns = Math.ceil(windowWidth / DEFAULT_GRID_CELL_DIM) + DEFAULT_OVERSCAN

  await overscanAssertions(po, expectedRows, expectedColumns, true)
})

test("Grid Overscan Gap", async ({ page }) => {
  await page.locator('[href="/overscan/grid-overscan-gap"]').click()

  const po = new GridPO(page, "grid")
  await po.isVisible()

  const windowHeight = await po.getWindowHeight()
  const expectedRows = Math.ceil(windowHeight / DEFAULT_GRID_CELL_DIM) + DEFAULT_OVERSCAN

  const windowWidth = await po.getWindowWidth()
  const expectedColumns = Math.ceil(windowWidth / DEFAULT_GRID_CELL_DIM) + DEFAULT_OVERSCAN

  await overscanAssertions(po, expectedRows, expectedColumns, false)
})

test("Grid Overscan Variable", async ({ page }) => {
  await page.locator('[href="/overscan/grid-overscan-variable"]').click()

  const po = new GridPO(page, "grid")
  await po.isVisible()

  const heightPerSet = DEFAULT_HEIGHT_ARRAY.reduce((a, b) => a + b)
  const rowsPerSet = DEFAULT_HEIGHT_ARRAY.length

  const windowHeight = await po.getWindowHeight()
  const expectedRows = Math.ceil((windowHeight / heightPerSet) * rowsPerSet + 1)

  const widthPerSet = DEFAULT_WIDTH_ARRAY.reduce((a, b) => a + b)
  const cellsPerSet = DEFAULT_WIDTH_ARRAY.length

  const windowWidth = await po.getWindowWidth()
  const expectedColumns = Math.ceil((windowWidth / widthPerSet) * cellsPerSet)

  await overscanAssertions(po, expectedRows, expectedColumns, false)
})

test("Grid Overscan Variable Gap", async ({ page }) => {
  await page.locator('[href="/overscan/grid-overscan-variable-gap"]').click()

  const po = new GridPO(page, "grid")
  await po.isVisible()

  const heightPerSet = DEFAULT_HEIGHT_ARRAY.reduce((a, b) => a + b)
  const rowsPerSet = DEFAULT_HEIGHT_ARRAY.length

  const windowHeight = await po.getWindowHeight()
  const expectedRows = Math.ceil((windowHeight / heightPerSet) * rowsPerSet + 1)

  const widthPerSet = DEFAULT_WIDTH_ARRAY.reduce((a, b) => a + b)
  const cellsPerSet = DEFAULT_WIDTH_ARRAY.length

  const windowWidth = await po.getWindowWidth()
  const expectedColumns = Math.ceil((windowWidth / widthPerSet) * cellsPerSet)

  await overscanAssertions(po, expectedRows, expectedColumns, false)
})
