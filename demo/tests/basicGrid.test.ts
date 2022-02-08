import { expect, test } from "@playwright/test"

import {
  DEFAULT_CELL_COUNT,
  DEFAULT_GRID_CELL_DIM,
  DEFAULT_HEIGHT_ARRAY,
  DEFAULT_ROW_COUNT,
  DEFAULT_WIDTH_ARRAY,
  TITLE_REGEX,
} from "../src/constants"
import { GridPO } from "./GridPO"

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5000/")
  await expect(page).toHaveTitle(TITLE_REGEX)
  await page.locator("text=Basic").click()
})

test("Basic Grid", async ({ page }) => {
  await page.locator('[href="/basic/grid"]').click()

  const po = new GridPO(page, "grid")
  await po.isVisible()

  expect(await po.getScrollHeight()).toEqual(DEFAULT_ROW_COUNT * DEFAULT_GRID_CELL_DIM)
  expect(await po.getScrollWidth()).toEqual(DEFAULT_CELL_COUNT * DEFAULT_GRID_CELL_DIM)

  await expect(po.offsetDiv).toHaveCSS("height", "0px")

  const windowHeight = await po.getWindowHeight()
  const expectedNumRows = Math.ceil(windowHeight / DEFAULT_GRID_CELL_DIM)
  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)

  const windowWidth = await po.getWindowWidth()
  const expectedNumCells = Math.ceil(windowWidth / DEFAULT_GRID_CELL_DIM)
  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumCells)

  // Window should be sized correctly and not be the size of the content.
  expect(await po.getWindowHeight()).not.toEqual(await po.getScrollHeight())
  expect(await po.getWindowWidth()).not.toEqual(await po.getScrollWidth())

  await expect(po.getCellLocator(0, 0)).toHaveText("0,0")

  await po.scroll(8, 8)

  // We expect there to be some translation
  await expect(po.absoluteDiv).toHaveAttribute(
    "style",
    "position: absolute; height: 100%; transform: translate3d(-8px, -8px, 0px); will-change: transform;",
  )

  // The offset div shouldn't have any height yet, we haven't scrolled elements out of view.
  await expect(po.offsetDiv).toHaveCSS("height", "0px")
  await expect(po.getOffsetDivForRow(0)).toHaveCSS("width", "0px")

  await po.scroll(0, DEFAULT_GRID_CELL_DIM)

  await expect(po.getOffsetDivForRow(0)).toHaveCSS("width", `${DEFAULT_GRID_CELL_DIM}px`)
  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumCells)

  await po.scroll(0, await po.getScrollWidth())
  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumCells)

  await expect(po.getCellLocator(0, (await po.getRenderedCellCountForRow(0)) - 1)).toHaveText(
    "0,199",
  )

  await po.scroll(0, -(await po.getScrollWidth()))
  await expect(po.getCellLocator(0, 0)).toHaveText("0,0")

  await po.scroll(DEFAULT_GRID_CELL_DIM, 0)
  await expect(po.offsetDiv).toHaveCSS("height", `${DEFAULT_GRID_CELL_DIM}px`)
  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)
  await expect(po.getCellLocator(0, 0)).toHaveText("1,0")

  await po.scroll(await po.getScrollHeight(), 0)
  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)
  await expect(po.getCellLocator((await po.getRenderedRowCount()) - 1, 0)).toHaveText("999,0")

  await po.scroll(0, await po.getScrollWidth())

  const lastRow = await po.getRenderedRowCount()
  const lastCell = await po.getRenderedCellCountForRow(lastRow - 1)

  await expect(po.getCellLocator(lastRow - 1, lastCell - 1)).toHaveText("999,199")
})

test("Basic Grid RTL", async ({ page }) => {
  await page.locator('[href="/basic/grid-rtl"]').click()

  const po = new GridPO(page, "grid")
  await po.isVisible()

  expect(await po.getScrollHeight()).toEqual(DEFAULT_ROW_COUNT * DEFAULT_GRID_CELL_DIM)
  expect(await po.getScrollWidth()).toEqual(DEFAULT_CELL_COUNT * DEFAULT_GRID_CELL_DIM)

  await expect(po.list).toHaveCSS("direction", "rtl")
  await expect(po.offsetDiv).toHaveCSS("height", "0px")

  const windowHeight = await po.getWindowHeight()
  const expectedNumRows = Math.ceil(windowHeight / DEFAULT_GRID_CELL_DIM)
  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)

  const windowWidth = await po.getWindowWidth()
  const expectedNumCells = Math.ceil(windowWidth / DEFAULT_GRID_CELL_DIM)
  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumCells)

  // Window should be sized correctly and not be the size of the content.
  expect(await po.getWindowHeight()).not.toEqual(await po.getScrollHeight())
  expect(await po.getWindowWidth()).not.toEqual(await po.getScrollWidth())

  await expect(po.getCellLocator(0, 0)).toHaveText("0,0")

  await po.scroll(8, -8)

  // We expect there to be some translation
  await expect(po.absoluteDiv).toHaveAttribute(
    "style",
    "position: absolute; height: 100%; transform: translate3d(0px, -8px, 0px); will-change: transform;",
  )

  // The offset div shouldn't have any height yet, we haven't scrolled elements out of view.
  await expect(po.offsetDiv).toHaveCSS("height", "0px")
  await expect(po.getOffsetDivForRow(0)).toHaveCSS("width", "0px")

  await po.scroll(0, -DEFAULT_GRID_CELL_DIM)

  await expect(po.getOffsetDivForRow(0)).toHaveCSS("width", `${DEFAULT_GRID_CELL_DIM}px`)
  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumCells)

  await po.scroll(0, -(await po.getScrollWidth()))
  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumCells)

  await expect(po.getCellLocator(0, (await po.getRenderedCellCountForRow(0)) - 1)).toHaveText(
    "0,199",
  )

  await po.scroll(0, await po.getScrollWidth())
  await expect(po.getCellLocator(0, 0)).toHaveText("0,0")

  await po.scroll(DEFAULT_GRID_CELL_DIM, 0)
  await expect(po.offsetDiv).toHaveCSS("height", `${DEFAULT_GRID_CELL_DIM}px`)
  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)
  await expect(po.getCellLocator(0, 0)).toHaveText("1,0")

  await po.scroll(await po.getScrollHeight(), 0)
  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)
  await expect(po.getCellLocator((await po.getRenderedRowCount()) - 1, 0)).toHaveText("999,0")

  await po.scroll(0, -(await po.getScrollWidth()))

  const lastRow = await po.getRenderedRowCount()
  const lastCell = await po.getRenderedCellCountForRow(lastRow - 1)

  await expect(po.getCellLocator(lastRow - 1, lastCell - 1)).toHaveText("999,199")
})

test("Basic Grid Variable Heights", async ({ page }) => {
  await page.locator('[href="/basic/vgrid"]').click()

  const po = new GridPO(page, "grid")
  await po.isVisible()

  const heightPerSet = DEFAULT_HEIGHT_ARRAY.reduce((a, b) => a + b)
  const rowsPerSet = DEFAULT_HEIGHT_ARRAY.length
  const numberOfRowSets = DEFAULT_ROW_COUNT / rowsPerSet

  const widthPerSet = DEFAULT_WIDTH_ARRAY.reduce((a, b) => a + b)
  const cellsPerSet = DEFAULT_WIDTH_ARRAY.length
  const numberOfColumnSets = DEFAULT_CELL_COUNT / cellsPerSet

  expect(await po.getScrollHeight()).toEqual(heightPerSet * numberOfRowSets)
  expect(await po.getScrollWidth()).toEqual(widthPerSet * numberOfColumnSets)

  await expect(po.offsetDiv).toHaveCSS("height", "0px")

  const windowHeight = await po.getWindowHeight()
  const expectedNumRows = Math.ceil((windowHeight / heightPerSet) * rowsPerSet + 1)
  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)

  const windowWidth = await po.getWindowWidth()
  const expectedNumCells = Math.ceil((windowWidth / widthPerSet) * cellsPerSet)
  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumCells)

  // Window should be sized correctly and not be the size of the content.
  expect(await po.getWindowHeight()).not.toEqual(await po.getScrollHeight())
  expect(await po.getWindowWidth()).not.toEqual(await po.getScrollWidth())

  await expect(po.getCellLocator(0, 0)).toHaveText("0,0")

  await po.scroll(8, 8)

  // We expect there to be some translation
  await expect(po.absoluteDiv).toHaveAttribute(
    "style",
    "position: absolute; height: 100%; transform: translate3d(-8px, -8px, 0px); will-change: transform;",
  )

  // The offset div shouldn't have any height yet, we haven't scrolled elements out of view.
  await expect(po.offsetDiv).toHaveCSS("height", "0px")
  await expect(po.getOffsetDivForRow(0)).toHaveCSS("width", "0px")

  const maxCellItem = Math.max(...DEFAULT_WIDTH_ARRAY)
  await po.scroll(0, maxCellItem)

  await expect(po.getOffsetDivForRow(0)).toHaveCSS("width", `${DEFAULT_WIDTH_ARRAY[0]}px`)
  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumCells)

  await po.scroll(0, await po.getScrollWidth())
  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumCells)

  await expect(po.getCellLocator(0, (await po.getRenderedCellCountForRow(0)) - 1)).toHaveText(
    "0,199",
  )

  await po.scroll(0, -(await po.getScrollWidth()))
  await expect(po.getCellLocator(0, 0)).toHaveText("0,0")

  const maxRowItem = Math.max(...DEFAULT_HEIGHT_ARRAY)

  await po.scroll(maxRowItem, 0)
  await expect(po.offsetDiv).toHaveCSS("height", `${DEFAULT_HEIGHT_ARRAY[0]}px`)
  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)
  await expect(po.getCellLocator(0, 0)).toHaveText("1,0")

  await po.scroll(await po.getScrollHeight(), 0)
  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)
  await expect(po.getCellLocator((await po.getRenderedRowCount()) - 1, 0)).toHaveText("999,0")

  await po.scroll(0, await po.getScrollWidth())

  const lastRow = await po.getRenderedRowCount()
  const lastCell = await po.getRenderedCellCountForRow(lastRow - 1)

  await expect(po.getCellLocator(lastRow - 1, lastCell - 1)).toHaveText("999,199")
})

test("Basic Grid Variable Heights RTL", async ({ page }) => {
  await page.locator('[href="/basic/vgrid-rtl"]').click()

  const po = new GridPO(page, "grid")
  await po.isVisible()

  const heightPerSet = DEFAULT_HEIGHT_ARRAY.reduce((a, b) => a + b)
  const rowsPerSet = DEFAULT_HEIGHT_ARRAY.length
  const numberOfRowSets = DEFAULT_ROW_COUNT / rowsPerSet

  const widthPerSet = DEFAULT_WIDTH_ARRAY.reduce((a, b) => a + b)
  const cellsPerSet = DEFAULT_WIDTH_ARRAY.length
  const numberOfColumnSets = DEFAULT_CELL_COUNT / cellsPerSet

  expect(await po.getScrollHeight()).toEqual(heightPerSet * numberOfRowSets)
  expect(await po.getScrollWidth()).toEqual(widthPerSet * numberOfColumnSets)

  await expect(po.list).toHaveCSS("direction", "rtl")
  await expect(po.offsetDiv).toHaveCSS("height", "0px")

  const windowHeight = await po.getWindowHeight()
  const expectedNumRows = Math.ceil((windowHeight / heightPerSet) * rowsPerSet + 1)
  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)

  const windowWidth = await po.getWindowWidth()
  const expectedNumCells = Math.ceil((windowWidth / widthPerSet) * cellsPerSet)
  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumCells)

  // Window should be sized correctly and not be the size of the content.
  expect(await po.getWindowHeight()).not.toEqual(await po.getScrollHeight())
  expect(await po.getWindowWidth()).not.toEqual(await po.getScrollWidth())

  await expect(po.getCellLocator(0, 0)).toHaveText("0,0")

  await po.scroll(8, -8)

  // We expect there to be some translation
  await expect(po.absoluteDiv).toHaveAttribute(
    "style",
    "position: absolute; height: 100%; transform: translate3d(0px, -8px, 0px); will-change: transform;",
  )

  // The offset div shouldn't have any height yet, we haven't scrolled elements out of view.
  await expect(po.offsetDiv).toHaveCSS("height", "0px")
  await expect(po.getOffsetDivForRow(0)).toHaveCSS("width", "0px")

  const maxCellItem = Math.max(...DEFAULT_WIDTH_ARRAY)
  await po.scroll(0, -maxCellItem)

  await expect(po.getOffsetDivForRow(0)).toHaveCSS("width", `${DEFAULT_WIDTH_ARRAY[0]}px`)
  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumCells)

  await po.scroll(0, -(await po.getScrollWidth()))
  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumCells)

  await expect(po.getCellLocator(0, (await po.getRenderedCellCountForRow(0)) - 1)).toHaveText(
    "0,199",
  )

  await po.scroll(0, await po.getScrollWidth())
  await expect(po.getCellLocator(0, 0)).toHaveText("0,0")

  const maxRowItem = Math.max(...DEFAULT_HEIGHT_ARRAY)

  await po.scroll(maxRowItem, 0)
  await expect(po.offsetDiv).toHaveCSS("height", `${DEFAULT_HEIGHT_ARRAY[0]}px`)
  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)
  await expect(po.getCellLocator(0, 0)).toHaveText("1,0")

  await po.scroll(await po.getScrollHeight(), 0)
  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)
  await expect(po.getCellLocator((await po.getRenderedRowCount()) - 1, 0)).toHaveText("999,0")

  await po.scroll(0, -(await po.getScrollWidth()))

  const lastRow = await po.getRenderedRowCount()
  const lastCell = await po.getRenderedCellCountForRow(lastRow - 1)

  await expect(po.getCellLocator(lastRow - 1, lastCell - 1)).toHaveText("999,199")
})
