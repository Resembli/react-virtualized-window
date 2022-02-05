import type { Locator, Page } from "@playwright/test"
import { expect } from "@playwright/test"

export class ListPO {
  readonly page: Page
  readonly listWrapper: Locator
  readonly list: Locator
  readonly innerWindow: Locator
  readonly stickyDiv: Locator
  readonly absoluteDiv: Locator
  readonly translationDiv: Locator
  readonly offsetDiv: Locator

  constructor(page: Page, dataTestId: string) {
    this.page = page
    this.listWrapper = page.locator(`data-testid=${dataTestId}`)
    this.list = this.listWrapper.locator("div >> nth=0")
    this.innerWindow = this.list.locator("div >> nth=0")
    this.stickyDiv = this.innerWindow.locator("div >> nth=0")
    this.absoluteDiv = this.stickyDiv.locator("div >> nth=0")
    this.translationDiv = this.absoluteDiv.locator("div >> nth=0")
    this.offsetDiv = this.translationDiv.locator("div >> nth=0")
  }

  async isVisible() {
    expect(await this.listWrapper.isVisible()).toBeTruthy()
  }

  async getRenderedRows() {
    const rowsLocator = this.translationDiv.locator("div")

    return await rowsLocator.allTextContents()
  }

  async scroll(delta: number) {
    const { x, y, width, height } = await this.list.boundingBox()

    // Move the mouse to the middle of the list.
    await this.page.mouse.move(x + width / 2, y + height / 2)
    await this.page.mouse.wheel(0, delta)
  }

  async getWindowHeight() {
    const boundingBox = await this.list.boundingBox()
    return boundingBox.height
  }
}
