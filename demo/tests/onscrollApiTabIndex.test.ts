import { expect, test } from "@playwright/test"

import { TITLE_REGEX } from "../src/constants"
import { GridPO } from "./GridPO"

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5000/")
  await expect(page).toHaveTitle(TITLE_REGEX)
  await page.locator("text=Onscroll, Api, Tab Index").click()
})

test("Onscroll", async ({ page }) => {
  await page.locator('[href="/onscroll-api-tab-index/grid-on-scroll"]').click()

  const po = new GridPO(page, "grid")
  await po.isVisible()

  await po.scroll(2200, 300)

  await expect(page.locator("text=Offset Top: 2200")).toBeVisible()
  await expect(page.locator("text=Offset Left: 300")).toBeVisible()
})

test("Api", async ({ page }) => {
  await page.locator('[href="/onscroll-api-tab-index/grid-api"]').click()

  const po = new GridPO(page, "grid")
  await po.isVisible()

  await page.locator("text=Scroll By Top 1,000").click()
  expect(await po.getScrollTop()).toEqual(1000)

  await page.locator("text=Scroll By Left 1,000").click()
  expect(await po.getScrollLeft()).toEqual(1000)

  await page.locator("text=Scroll To Top").click()
  expect(await po.getScrollTop()).toEqual(0)

  await page.locator("text=Scroll To Left").click()
  expect(await po.getScrollLeft()).toEqual(0)
})

test.only("Tab Index", async ({ page }) => {
  await page.locator('[href="/onscroll-api-tab-index/grid-index"]').click()

  const po = new GridPO(page, "grid")
  await po.isVisible()

  expect(await po.list.evaluate((node) => node === document.activeElement)).toBeFalsy()

  page.keyboard.down("Tab")

  expect(await po.list.evaluate((node) => node === document.activeElement)).toBeTruthy()
})
