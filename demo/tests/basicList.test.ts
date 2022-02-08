import { expect, test } from "@playwright/test"

import {
  DEFAULT_HEIGHT_ARRAY,
  DEFAULT_ROW_COUNT,
  DEFAULT_ROW_HEIGHT,
  TITLE_REGEX,
} from "../src/constants"
import { GridPO } from "./GridPO"

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5000/")
  await expect(page).toHaveTitle(TITLE_REGEX)
  await page.locator("text=Basic").click()
})

test("List Basic", async ({ page }) => {
  await page.locator('[href="/basic/list"]').click()

  const po = new GridPO(page, "list")
  await po.isVisible()

  expect(await po.getScrollHeight()).toEqual(DEFAULT_ROW_COUNT * DEFAULT_ROW_HEIGHT)
  await expect(po.offsetDiv).toHaveCSS("height", "0px")

  const windowHeight = await po.getWindowHeight()

  const expectedNumRows = Math.ceil(windowHeight / DEFAULT_ROW_HEIGHT)
  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)

  // There shouldn't be a bottom scrollbar.
  expect(await po.getScrollWidth()).toEqual(await po.getWindowWidth())

  // We expect the first row to be "1". This is because we have setup so that each
  // row renders its index.
  await expect(po.getCellLocator(0, 0)).toHaveText("1")

  await po.scroll(8, 0)

  // We expect there to be some translation
  await expect(po.absoluteDiv).toHaveAttribute(
    "style",
    "position: absolute; height: 100%; transform: translate3d(0px, -8px, 0px); will-change: transform;",
  )

  // The offset div shouldn't have any height yet, we haven't scrolled elements out of view.
  await expect(po.offsetDiv).toHaveCSS("height", "0px")

  // We scroll a single element out of view.
  await po.scroll(DEFAULT_ROW_HEIGHT, 0)
  await expect(po.offsetDiv).toHaveCSS("height", `${DEFAULT_ROW_HEIGHT}px`)

  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)
  await expect(po.getCellLocator(0, 0)).toHaveText("2")

  await po.scroll(await po.getScrollHeight(), 0)

  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)
  await expect(po.getCellLocator((await po.getRenderedRowCount()) - 1, 0)).toHaveText("1000")
})

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5000/")
  await expect(page).toHaveTitle(TITLE_REGEX)
  await page.locator("text=Basic").click()
})

test("List Basic RTL", async ({ page }) => {
  await page.locator('[href="/basic/list-rtl"]').click()

  const po = new GridPO(page, "list")
  await po.isVisible()

  expect(await po.getScrollHeight()).toEqual(DEFAULT_ROW_COUNT * DEFAULT_ROW_HEIGHT)

  await expect(po.offsetDiv).toHaveCSS("height", "0px")
  await expect(po.list).toHaveCSS("direction", "rtl")

  const windowHeight = await po.getWindowHeight()
  const expectedNumRows = Math.ceil(windowHeight / DEFAULT_ROW_HEIGHT)
  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)

  // There shouldn't be a bottom scrollbar.
  expect(await po.getScrollWidth()).toEqual(await po.getWindowWidth())

  // We expect the first row to be "1". This is because we have setup so that each
  // row renders its index.
  await expect(po.getCellLocator(0, 0)).toHaveText("1")

  await po.scroll(8, 0)

  // We expect there to be some translation
  await expect(po.absoluteDiv).toHaveAttribute(
    "style",
    "position: absolute; height: 100%; transform: translate3d(0px, -8px, 0px); will-change: transform;",
  )

  // The offset div shouldn't have any height yet, we haven't scrolled elements out of view.
  await expect(po.offsetDiv).toHaveCSS("height", "0px")

  // We scroll a single element out of view.
  await po.scroll(DEFAULT_ROW_HEIGHT, 0)
  await expect(po.offsetDiv).toHaveCSS("height", `${DEFAULT_ROW_HEIGHT}px`)

  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)
  await expect(po.getCellLocator(0, 0)).toHaveText("2")

  await po.scroll(await po.getScrollHeight(), 0)

  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)
  await expect(po.getCellLocator((await po.getRenderedRowCount()) - 1, 0)).toHaveText("1000")
})

test("List Basic Variable Heights", async ({ page }) => {
  await page.locator('[href="/basic/list-var-basic"]').click()

  const po = new GridPO(page, "list")
  await po.isVisible()

  const heightPerSet = DEFAULT_HEIGHT_ARRAY.reduce((a, b) => a + b)
  const itemsPerSet = DEFAULT_HEIGHT_ARRAY.length
  const numberOfSets = DEFAULT_ROW_COUNT / itemsPerSet

  expect(await po.getScrollHeight()).toEqual(heightPerSet * numberOfSets)

  await expect(po.offsetDiv).toHaveCSS("height", "0px")

  const windowHeight = await po.getWindowHeight()

  // With variable heights we render an extra child.
  const expectedNumRows = Math.ceil((windowHeight / heightPerSet) * itemsPerSet + 1)
  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)

  // There shouldn't be a bottom scrollbar.
  expect(await po.getScrollWidth()).toEqual(await po.getWindowWidth())

  // We expect the first row to be "1". This is because we have setup so that each
  // row renders its index.
  await expect(po.getCellLocator(0, 0)).toHaveText("1")

  await po.scroll(8, 0)

  // We expect there to be some translation
  await expect(po.absoluteDiv).toHaveAttribute(
    "style",
    "position: absolute; height: 100%; transform: translate3d(0px, -8px, 0px); will-change: transform;",
  )

  // The offset div shouldn't have any height yet, we haven't scrolled elements out of view.
  await expect(po.offsetDiv).toHaveCSS("height", "0px")

  const maxItem = Math.max(...DEFAULT_HEIGHT_ARRAY)
  // We scroll a single element out of view.
  await po.scroll(maxItem, 0)
  await expect(po.offsetDiv).toHaveCSS("height", `${DEFAULT_HEIGHT_ARRAY[0]}px`)

  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)
  await expect(po.getCellLocator(0, 0)).toHaveText("2")

  await po.scroll(await po.getScrollHeight(), 0)

  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)
  await expect(po.getCellLocator((await po.getRenderedRowCount()) - 1, 0)).toHaveText("1000")
})

test("List Basic Variable Heights RTL", async ({ page }) => {
  await page.locator('[href="/basic/list-var-rtl"]').click()

  const po = new GridPO(page, "list")
  await po.isVisible()

  const heightPerSet = DEFAULT_HEIGHT_ARRAY.reduce((a, b) => a + b)
  const itemsPerSet = DEFAULT_HEIGHT_ARRAY.length
  const numberOfSets = DEFAULT_ROW_COUNT / itemsPerSet

  expect(await po.getScrollHeight()).toEqual(heightPerSet * numberOfSets)

  await expect(po.offsetDiv).toHaveCSS("height", "0px")
  await expect(po.list).toHaveCSS("direction", "rtl")

  const windowHeight = await po.getWindowHeight()

  // There shouldn't be a bottom scrollbar.
  expect(await po.getScrollWidth()).toEqual(await po.getWindowWidth())

  // With variable heights we render an extra child.
  const expectedNumRows = Math.ceil((windowHeight / heightPerSet) * itemsPerSet + 1)
  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)

  // We expect the first row to be "1". This is because we have setup so that each
  // row renders its index.
  await expect(po.getCellLocator(0, 0)).toHaveText("1")

  await po.scroll(8, 0)

  // We expect there to be some translation
  await expect(po.absoluteDiv).toHaveAttribute(
    "style",
    "position: absolute; height: 100%; transform: translate3d(0px, -8px, 0px); will-change: transform;",
  )

  // The offset div shouldn't have any height yet, we haven't scrolled elements out of view.
  await expect(po.offsetDiv).toHaveCSS("height", "0px")

  const maxItem = Math.max(...DEFAULT_HEIGHT_ARRAY)
  // We scroll a single element out of view.
  await po.scroll(maxItem, 0)
  await expect(po.offsetDiv).toHaveCSS("height", `${DEFAULT_HEIGHT_ARRAY[0]}px`)

  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)
  await expect(po.getCellLocator(0, 0)).toHaveText("2")

  await po.scroll(await po.getScrollHeight(), 0)

  expect(await po.getRenderedRowCount()).toEqual(expectedNumRows)
  await expect(po.getCellLocator((await po.getRenderedRowCount()) - 1, 0)).toHaveText("1000")
})
