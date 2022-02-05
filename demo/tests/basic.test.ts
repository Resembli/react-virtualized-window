import { expect, test } from "@playwright/test"

import {
  DEFAULT_HEIGHT_ARRAY,
  DEFAULT_ITEM_COUNT,
  DEFAULT_ROW_HEIGHT,
  TITLE_REGEX,
} from "../src/constants"
import { ListPO } from "./ListPO"

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5000/")
  await expect(page).toHaveTitle(TITLE_REGEX)
  await page.locator("text=Basic").click()
})

test("List Basic", async ({ page }) => {
  await page.locator('[href="/basic/list"]').click()

  const po = new ListPO(page, "list")
  po.isVisible()

  await expect(po.innerWindow).toHaveCSS("height", "50000px")
  await expect(po.translationDiv).toHaveCSS("will-change", "transform")

  const windowHeight = await po.getWindowHeight()

  await expect(po.offsetDiv).toHaveCSS("height", "0px")

  const rows = await po.getRenderedRows()

  // We add 2 to the result because we expect there to be 1 extra child rendered out of view
  // and one child for the offset div that grows as we scroll.
  const expectedNumberOfChildren = Math.ceil(windowHeight / DEFAULT_ROW_HEIGHT) + 2
  expect(rows.length).toEqual(expectedNumberOfChildren)

  await po.scroll(8)

  // We expect there to be some translation
  await expect(po.translationDiv).toHaveAttribute(
    "style",
    "transform: translate3d(0px, -8px, 0px); will-change: transform;",
  )

  // The offset div shouldn't have any height yet, we haven't scrolled elements out of view.
  await expect(po.offsetDiv).toHaveCSS("height", "0px")

  // We scroll a single element out of view.
  await po.scroll(DEFAULT_ROW_HEIGHT)

  await expect(po.offsetDiv).toHaveCSS("height", `${DEFAULT_ROW_HEIGHT}px`)

  // This is specific to our tests, but each string should be a number representing the
  // row index. Before we did any scrolling the last child would've been `n`. We have now
  // scrolling one item out of view, so our last child should now be `n + 1`.
  const lastChild = Number.parseInt(rows.pop())
  const newRows = await po.getRenderedRows()
  const newLastChild = Number.parseInt(newRows.pop())

  expect(newLastChild).toEqual(lastChild + 1)

  // We try to scroll to the bottom.
  const maxScroll = DEFAULT_ITEM_COUNT * DEFAULT_ROW_HEIGHT
  await po.scroll(maxScroll)

  await expect(po.translationDiv).toContainText(`${DEFAULT_ITEM_COUNT}`)
})

test("List Basic RTL", async ({ page }) => {
  await page.locator('[href="/basic/list-rtl"]').click()

  const po = new ListPO(page, "list")
  po.isVisible()

  await expect(po.list).toHaveCSS("direction", "rtl")
  await expect(po.innerWindow).toHaveCSS("height", "50000px")
  await expect(po.translationDiv).toHaveCSS("will-change", "transform")

  const windowHeight = await po.getWindowHeight()

  await expect(po.offsetDiv).toHaveCSS("height", "0px")

  const rows = await po.getRenderedRows()

  // We add 2 to the result because we expect there to be 1 extra child rendered out of view
  // and one child for the offset div that grows as we scroll.
  const expectedNumberOfChildren = Math.ceil(windowHeight / DEFAULT_ROW_HEIGHT) + 2
  expect(rows.length).toEqual(expectedNumberOfChildren)

  await po.scroll(8)

  // We expect there to be some translation
  await expect(po.translationDiv).toHaveAttribute(
    "style",
    "transform: translate3d(0px, -8px, 0px); will-change: transform;",
  )

  // The offset div shouldn't have any height yet, we haven't scrolled elements out of view.
  await expect(po.offsetDiv).toHaveCSS("height", "0px")

  // We scroll a single element out of view.
  await po.scroll(DEFAULT_ROW_HEIGHT)

  await expect(po.offsetDiv).toHaveCSS("height", `${DEFAULT_ROW_HEIGHT}px`)

  // This is specific to our tests, but each string should be a number representing the
  // row index. Before we did any scrolling the last child would've been `n`. We have now
  // scrolling one item out of view, so our last child should now be `n + 1`.
  const lastChild = Number.parseInt(rows.pop())
  const newRows = await po.getRenderedRows()
  const newLastChild = Number.parseInt(newRows.pop())

  expect(newLastChild).toEqual(lastChild + 1)

  // We try to scroll to the bottom.
  const maxScroll = DEFAULT_ITEM_COUNT * DEFAULT_ROW_HEIGHT
  await po.scroll(maxScroll)

  await expect(po.translationDiv).toContainText(`${DEFAULT_ITEM_COUNT}`)
})

test("List Basic Variable Heights", async ({ page }) => {
  await page.locator('[href="/basic/list-var-basic"]').click()

  const po = new ListPO(page, "list")

  await expect(po.innerWindow).toHaveCSS("height", "80000px")
  await expect(po.translationDiv).toHaveCSS("will-change", "transform")

  const windowHeight = await po.getWindowHeight()

  await expect(po.offsetDiv).toHaveCSS("height", "0px")

  // We expect the number of items to be with 2 elements rendered. This is because we can
  // have variation in the number of elements rendered based on height.
  const variableHeightGroupTotal = DEFAULT_HEIGHT_ARRAY.reduce((a, b) => a + b)
  const expectedNumberOfItems =
    Math.ceil((windowHeight / variableHeightGroupTotal) * DEFAULT_HEIGHT_ARRAY.length) + 2
  const rows = await po.getRenderedRows()
  expect(Math.abs(expectedNumberOfItems - rows.length) < 2).toBeTruthy()

  await po.scroll(8)

  // We expect there to be some translation
  await expect(po.translationDiv).toHaveAttribute(
    "style",
    "transform: translate3d(0px, -8px, 0px); will-change: transform;",
  )

  // The offset div shouldn't have any height yet, we haven't scrolled elements out of view.
  await expect(po.offsetDiv).toHaveCSS("height", "0px")

  // We scroll a single element out of view.
  const maxItem = Math.max(...DEFAULT_HEIGHT_ARRAY)
  await po.scroll(maxItem)

  await expect(po.offsetDiv).toHaveCSS("height", `${DEFAULT_HEIGHT_ARRAY[0]}px`)

  // This is specific to our tests, but each string should be a number representing the
  // row index. Before we did any scrolling the last child would've been `n`. We have now
  // scrolling one item out of view, so our last child should now be `n + 1`.
  const lastChild = Number.parseInt(rows.pop())
  const newRows = await po.getRenderedRows()
  const newLastChild = Number.parseInt(newRows.pop())

  expect(newLastChild).toEqual(lastChild + 1)

  // We try to scroll to the bottom.
  await po.scroll(variableHeightGroupTotal * (DEFAULT_ITEM_COUNT / DEFAULT_HEIGHT_ARRAY.length))

  await expect(po.translationDiv).toContainText(`${DEFAULT_ITEM_COUNT}`)
})

test("List Basic Variable Heights RTL", async ({ page }) => {
  await page.locator('[href="/basic/list-var-rtl"]').click()

  const po = new ListPO(page, "list")

  await expect(po.list).toHaveCSS("direction", "rtl")
  await expect(po.innerWindow).toHaveCSS("height", "80000px")
  await expect(po.translationDiv).toHaveCSS("will-change", "transform")

  const windowHeight = await po.getWindowHeight()

  await expect(po.offsetDiv).toHaveCSS("height", "0px")

  // We expect the number of items to be with 2 elements rendered. This is because we can
  // have variation in the number of elements rendered based on height.
  const variableHeightGroupTotal = DEFAULT_HEIGHT_ARRAY.reduce((a, b) => a + b)
  const expectedNumberOfItems =
    Math.ceil((windowHeight / variableHeightGroupTotal) * DEFAULT_HEIGHT_ARRAY.length) + 2
  const rows = await po.getRenderedRows()
  expect(Math.abs(expectedNumberOfItems - rows.length) < 2).toBeTruthy()

  await po.scroll(8)

  // We expect there to be some translation
  await expect(po.translationDiv).toHaveAttribute(
    "style",
    "transform: translate3d(0px, -8px, 0px); will-change: transform;",
  )

  // The offset div shouldn't have any height yet, we haven't scrolled elements out of view.
  await expect(po.offsetDiv).toHaveCSS("height", "0px")

  // We scroll a single element out of view.
  const maxItem = Math.max(...DEFAULT_HEIGHT_ARRAY)
  await po.scroll(maxItem)

  await expect(po.offsetDiv).toHaveCSS("height", `${DEFAULT_HEIGHT_ARRAY[0]}px`)

  // This is specific to our tests, but each string should be a number representing the
  // row index. Before we did any scrolling the last child would've been `n`. We have now
  // scrolling one item out of view, so our last child should now be `n + 1`.
  const lastChild = Number.parseInt(rows.pop())
  const newRows = await po.getRenderedRows()
  const newLastChild = Number.parseInt(newRows.pop())

  expect(newLastChild).toEqual(lastChild + 1)

  // We try to scroll to the bottom.
  await po.scroll(variableHeightGroupTotal * (DEFAULT_ITEM_COUNT / DEFAULT_HEIGHT_ARRAY.length))

  await expect(po.translationDiv).toContainText(`${DEFAULT_ITEM_COUNT}`)
})
