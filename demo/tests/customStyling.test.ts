import { expect, test } from "@playwright/test"

import { TITLE_REGEX } from "../src/constants"
import { GridPO } from "./GridPO"

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5000/")
  await expect(page).toHaveTitle(TITLE_REGEX)
  await page.locator("text=Custom Styling").click()
})

test("Custom Styling ClassName", async ({ page }) => {
  await page.locator('[href="/custom-styling/grid-classname"]').click()

  const gridPo = new GridPO(page, "grid")

  await expect(gridPo.listWrapper).toHaveCSS("borderBottomWidth", "20px")
  await expect(gridPo.listWrapper).toHaveCSS("borderTopWidth", "20px")
  await expect(gridPo.listWrapper).toHaveCSS("borderLeftWidth", "20px")
  await expect(gridPo.listWrapper).toHaveCSS("borderRightWidth", "20px")

  await expect(gridPo.listWrapper).toHaveCSS("borderBottomStyle", "solid")
  await expect(gridPo.listWrapper).toHaveCSS("borderTopStyle", "solid")
  await expect(gridPo.listWrapper).toHaveCSS("borderLeftStyle", "solid")
  await expect(gridPo.listWrapper).toHaveCSS("borderRightStyle", "solid")

  await expect(gridPo.listWrapper).toHaveCSS("borderBottomColor", "rgb(0, 0, 255)")
  await expect(gridPo.listWrapper).toHaveCSS("borderTopColor", "rgb(0, 0, 255)")
  await expect(gridPo.listWrapper).toHaveCSS("borderLeftColor", "rgb(0, 0, 255)")
  await expect(gridPo.listWrapper).toHaveCSS("borderRightColor", "rgb(0, 0, 255)")

  const listBB = gridPo.list.boundingBox()
  const wrapperBB = gridPo.listWrapper.boundingBox()

  // We expect the border to push in the bounding box by 20
  expect((await listBB).x - 20).toEqual((await wrapperBB).x)
  expect((await listBB).x + (await listBB).width).toEqual(
    (await wrapperBB).x + (await wrapperBB).width - 20 - 1,
  )
  expect((await listBB).y - 20).toEqual((await wrapperBB).y)
})

test("Custom Styling Style", async ({ page }) => {
  await page.locator('[href="/custom-styling/grid-style"]').click()

  const gridPo = new GridPO(page, "grid")

  await expect(gridPo.listWrapper).toHaveCSS("borderBottomWidth", "20px")
  await expect(gridPo.listWrapper).toHaveCSS("borderTopWidth", "20px")
  await expect(gridPo.listWrapper).toHaveCSS("borderLeftWidth", "20px")
  await expect(gridPo.listWrapper).toHaveCSS("borderRightWidth", "20px")

  await expect(gridPo.listWrapper).toHaveCSS("borderBottomStyle", "solid")
  await expect(gridPo.listWrapper).toHaveCSS("borderTopStyle", "solid")
  await expect(gridPo.listWrapper).toHaveCSS("borderLeftStyle", "solid")
  await expect(gridPo.listWrapper).toHaveCSS("borderRightStyle", "solid")

  await expect(gridPo.listWrapper).toHaveCSS("borderBottomColor", "rgb(255, 0, 0)")
  await expect(gridPo.listWrapper).toHaveCSS("borderTopColor", "rgb(255, 0, 0)")
  await expect(gridPo.listWrapper).toHaveCSS("borderLeftColor", "rgb(255, 0, 0)")
  await expect(gridPo.listWrapper).toHaveCSS("borderRightColor", "rgb(255, 0, 0)")

  const listBB = gridPo.list.boundingBox()
  const wrapperBB = gridPo.listWrapper.boundingBox()

  // We expect the border to push in the bounding box by 20
  expect((await listBB).x - 20).toEqual((await wrapperBB).x)
  expect((await listBB).x + (await listBB).width).toEqual(
    (await wrapperBB).x + (await wrapperBB).width - 20 - 1,
  )
  expect((await listBB).y - 20).toEqual((await wrapperBB).y)
})
