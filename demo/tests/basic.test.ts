import { expect, test } from "@playwright/test"

import { DEFAULT_ITEM_COUNT, DEFAULT_ROW_HEIGHT, TITLE_REGEX } from "../src/constants"
import { ListPO } from "./ListPO"

test("List Basic", async ({ page }) => {
  await page.goto("http://localhost:5000/")

  await expect(page).toHaveTitle(TITLE_REGEX)

  await page.locator("text=Basic").click()

  await page.locator('[href="/basic/list"]').click()

  const po = new ListPO(page, "basic-list")
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
  await page.goto("http://localhost:5000/")

  await expect(page).toHaveTitle(TITLE_REGEX)

  await page.locator("text=Basic").click()

  await page.locator('[href="/basic/list-rtl"]').click()

  const po = new ListPO(page, "basic-list-rtl")
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
