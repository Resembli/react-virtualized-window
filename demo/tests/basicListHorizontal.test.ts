import { expect, test } from "@playwright/test"

import {
  DEFAULT_COLUMN_WIDTH,
  DEFAULT_ITEM_COUNT,
  DEFAULT_WIDTH_ARRAY,
  TITLE_REGEX,
} from "../src/constants"
import { GridPO } from "./GridPO"

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5000/")
  await expect(page).toHaveTitle(TITLE_REGEX)
  await page.locator("text=Basic").click()
})

test("List Horizontal Basic", async ({ page }) => {
  await page.locator('[href="/basic/h-list"]').click()

  const po = new GridPO(page, "list")
  await po.isVisible()

  expect(await po.getScrollWidth()).toEqual(DEFAULT_ITEM_COUNT * DEFAULT_COLUMN_WIDTH)

  const windowWidth = await po.getWindowWidth()

  await expect(po.offsetDiv).toHaveCSS("height", "0px")

  // We should have a single row
  expect(await po.getRenderedRowCount()).toEqual(1)

  const expectedNumberOfChildren = Math.ceil(windowWidth / DEFAULT_COLUMN_WIDTH)
  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumberOfChildren)

  // We expect the first row to be "1". This is because we have setup so that each
  // row renders its index.
  expect(po.getCellLocator(0, 0)).toHaveText("1")

  await po.scroll(0, 8)

  // We expect there to be some translation
  await expect(po.absoluteDiv).toHaveAttribute(
    "style",
    "position: absolute; height: 100%; transform: translate3d(-8px, 0px, 0px); will-change: transform;",
  )

  // The offset div shouldn't have any height yet, we haven't scrolled elements out of view.
  await expect(po.getOffsetDivForRow(0)).toHaveCSS("width", "0px")

  // We scroll a single element out of view.
  await po.scroll(0, DEFAULT_COLUMN_WIDTH)
  await expect(po.getOffsetDivForRow(0)).toHaveCSS("width", `${DEFAULT_COLUMN_WIDTH}px`)

  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumberOfChildren)
  await expect(po.getCellLocator(0, 0)).toHaveText("2")

  await po.scroll(0, await po.getScrollWidth())

  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumberOfChildren)
  await expect(po.getCellLocator(0, (await po.getRenderedCellCountForRow(0)) - 1)).toHaveText(
    "1000",
  )
})

test("List Horizontal Basic RTL", async ({ page }) => {
  await page.locator('[href="/basic/h-list-rtl"]').click()

  const po = new GridPO(page, "list")
  await po.isVisible()

  expect(await po.getScrollWidth()).toEqual(DEFAULT_ITEM_COUNT * DEFAULT_COLUMN_WIDTH)

  const windowWidth = await po.getWindowWidth()

  await expect(po.offsetDiv).toHaveCSS("height", "0px")
  await expect(po.list).toHaveCSS("direction", "rtl")

  // We should have a single row
  expect(await po.getRenderedRowCount()).toEqual(1)

  const expectedNumberOfChildren = Math.ceil(windowWidth / DEFAULT_COLUMN_WIDTH)
  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumberOfChildren)

  // We expect the first row to be "1". This is because we have setup so that each
  // row renders its index.
  expect(po.getCellLocator(0, 0)).toHaveText("1")

  await po.scroll(0, -8)

  // When RTL is enabled there shouldn't be any horizontal translation.
  await expect(po.absoluteDiv).toHaveAttribute(
    "style",
    "position: absolute; height: 100%; transform: translate3d(0px, 0px, 0px); will-change: transform;",
  )

  // The offset div shouldn't have any height yet, we haven't scrolled elements out of view.
  await expect(po.getOffsetDivForRow(0)).toHaveCSS("width", "0px")

  // We scroll a single element out of view.
  await po.scroll(0, -DEFAULT_COLUMN_WIDTH)
  await expect(po.getOffsetDivForRow(0)).toHaveCSS("width", `${DEFAULT_COLUMN_WIDTH}px`)

  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumberOfChildren)
  await expect(po.getCellLocator(0, 0)).toHaveText("2")

  await po.scroll(0, -(await po.getScrollWidth()))

  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumberOfChildren)
  await expect(po.getCellLocator(0, (await po.getRenderedCellCountForRow(0)) - 1)).toHaveText(
    "1000",
  )
})

test("List Horizontal Variable Basic", async ({ page }) => {
  await page.locator('[href="/basic/h-list-var-basic"]').click()

  const po = new GridPO(page, "list")
  await po.isVisible()

  const widthPerSet = DEFAULT_WIDTH_ARRAY.reduce((a, b) => a + b)
  const itemsPerSet = DEFAULT_WIDTH_ARRAY.length
  const numberOfSets = DEFAULT_ITEM_COUNT / itemsPerSet

  expect(await po.getScrollWidth()).toEqual(widthPerSet * numberOfSets)

  const windowWidth = await po.getWindowWidth()

  await expect(po.offsetDiv).toHaveCSS("height", "0px")

  // We should have a single row
  expect(await po.getRenderedRowCount()).toEqual(1)

  const expectedNumberOfChildren = Math.ceil((windowWidth / widthPerSet) * itemsPerSet)
  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumberOfChildren)

  // We expect the first row to be "1". This is because we have setup so that each
  // row renders its index.
  expect(po.getCellLocator(0, 0)).toHaveText("1")

  await po.scroll(0, 8)

  await expect(po.absoluteDiv).toHaveAttribute(
    "style",
    "position: absolute; height: 100%; transform: translate3d(-8px, 0px, 0px); will-change: transform;",
  )

  // The offset div shouldn't have any height yet, we haven't scrolled elements out of view.
  await expect(po.getOffsetDivForRow(0)).toHaveCSS("width", "0px")

  const maxItem = Math.max(...DEFAULT_WIDTH_ARRAY)
  // We scroll a single element out of view.
  await po.scroll(0, maxItem)
  await expect(po.getOffsetDivForRow(0)).toHaveCSS("width", `${DEFAULT_WIDTH_ARRAY[0]}px`)

  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumberOfChildren)
  await expect(po.getCellLocator(0, 0)).toHaveText("2")

  await po.scroll(0, await po.getScrollWidth())

  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumberOfChildren)
  await expect(po.getCellLocator(0, (await po.getRenderedCellCountForRow(0)) - 1)).toHaveText(
    "1000",
  )
})

test("List Horizontal Variable Basic RTL", async ({ page }) => {
  await page.locator('[href="/basic/h-list-var-rtl"]').click()

  const po = new GridPO(page, "list")
  await po.isVisible()

  const widthPerSet = DEFAULT_WIDTH_ARRAY.reduce((a, b) => a + b)
  const itemsPerSet = DEFAULT_WIDTH_ARRAY.length
  const numberOfSets = DEFAULT_ITEM_COUNT / itemsPerSet

  expect(await po.getScrollWidth()).toEqual(widthPerSet * numberOfSets)

  const windowWidth = await po.getWindowWidth()

  await expect(po.offsetDiv).toHaveCSS("height", "0px")
  await expect(po.list).toHaveCSS("direction", "rtl")

  // We should have a single row
  expect(await po.getRenderedRowCount()).toEqual(1)

  const expectedNumberOfChildren = Math.ceil((windowWidth / widthPerSet) * itemsPerSet)
  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumberOfChildren)

  // We expect the first row to be "1". This is because we have setup so that each
  // row renders its index.
  expect(po.getCellLocator(0, 0)).toHaveText("1")

  await po.scroll(0, -8)

  // Shouldn't be any translation when RTL
  await expect(po.absoluteDiv).toHaveAttribute(
    "style",
    "position: absolute; height: 100%; transform: translate3d(0px, 0px, 0px); will-change: transform;",
  )

  // The offset div shouldn't have any height yet, we haven't scrolled elements out of view.
  await expect(po.getOffsetDivForRow(0)).toHaveCSS("width", "0px")

  const maxItem = Math.max(...DEFAULT_WIDTH_ARRAY)
  // We scroll a single element out of view.
  await po.scroll(0, -maxItem)
  await expect(po.getOffsetDivForRow(0)).toHaveCSS("width", `${DEFAULT_WIDTH_ARRAY[0]}px`)

  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumberOfChildren)
  await expect(po.getCellLocator(0, 0)).toHaveText("2")

  await po.scroll(0, -(await po.getScrollWidth()))

  expect(await po.getRenderedCellCountForRow(0)).toEqual(expectedNumberOfChildren)
  await expect(po.getCellLocator(0, (await po.getRenderedCellCountForRow(0)) - 1)).toHaveText(
    "1000",
  )
})
