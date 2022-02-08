import type { Locator, Page } from "@playwright/test"
import { expect } from "@playwright/test"

export class GridPO {
  readonly page: Page
  readonly listWrapper: Locator
  readonly list: Locator
  readonly innerWindow: Locator
  readonly stickyDiv: Locator
  readonly absoluteDiv: Locator
  readonly offsetDiv: Locator

  constructor(page: Page, dataTestId: string) {
    this.page = page
    this.listWrapper = page.locator(`data-testid=${dataTestId}`)
    this.list = this.listWrapper.locator("div >> nth=0")
    this.innerWindow = this.list.locator("div >> nth=0")
    this.stickyDiv = this.innerWindow.locator("div >> nth=0")
    this.absoluteDiv = this.stickyDiv.locator("div >> nth=0")
    this.offsetDiv = this.absoluteDiv.locator("div >> nth=0")
  }

  async getScrollHeight() {
    return await this.innerWindow.evaluate((node) => node.scrollHeight)
  }

  async getScrollWidth() {
    return await this.innerWindow.evaluate((node) => node.scrollWidth)
  }

  async isVisible() {
    expect(await this.listWrapper.isVisible()).toBeTruthy()
  }

  async getRenderedRowCount() {
    // Minus 1 because of the offset div.
    return await this.absoluteDiv.evaluate((node) => node.children.length - 1)
  }

  async getRenderedCellCountForRow(n: number) {
    const row = this.absoluteDiv.locator("> div").nth(n + 1)

    return await row.evaluate((node) => node.children.length - 1)
  }

  getOffsetDivForRow(n: number) {
    const row = this.absoluteDiv.locator("> div").nth(n + 1)

    return row.locator("div").nth(0)
  }

  getRowLocator(n: number) {
    const rows = this.absoluteDiv.locator("> div")
    const row = rows.nth(n + 1)

    return row
  }

  getCellLocator(n: number, m: number) {
    const row = this.getRowLocator(n)
    const cells = row.locator("> div")
    const cell = cells.nth(m + 1)

    return cell
  }

  async scroll(top: number, left: number) {
    await this.list.evaluate((node, { left, top }) => node.scrollBy({ top, left }), { top, left })
  }

  async getWindowHeight() {
    const boundingBox = await this.list.boundingBox()
    return boundingBox.height
  }

  async getWindowWidth() {
    const boundingBox = await this.list.boundingBox()

    return boundingBox.width
  }
}
