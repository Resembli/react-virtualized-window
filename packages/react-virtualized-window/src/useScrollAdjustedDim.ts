import { getScrollbarWidth } from "./getScrollbarWidth"
import type { NumberOrPercent } from "./types"

function percentToNumber(percent: string) {
  return parseFloat(percent) / 100.0
}

function dimToNumber(dim: NumberOrPercent, windowDim: number) {
  return typeof dim === "string" ? percentToNumber(dim) * windowDim : dim
}

interface UseScrollAdjustedWindowDimsArgs {
  height: number
  width: number
  columnCount: number
  rowCount: number
  rowHeight: NumberOrPercent
  columnWidth: NumberOrPercent
  rowHeights?: NumberOrPercent[]
  columnWidths?: NumberOrPercent[]
}

export const useScrollAdjustWindowDims = ({
  height,
  width,
  rowCount,
  columnCount,
  rowHeight,
  columnWidth,
  rowHeights,
  columnWidths,
}: UseScrollAdjustedWindowDimsArgs) => {
  const scrollWidth = getScrollbarWidth()

  let hasVerticalScroll = false
  let runningTotal = 0
  for (let i = 0; i < rowCount; i++) {
    const dimAsNum = dimToNumber((rowHeights && rowHeights[i]) || rowHeight, height)

    runningTotal += dimAsNum
    if (runningTotal > height - scrollWidth) {
      hasVerticalScroll = true
      break
    }
  }

  let hasHorizontalScroll = false
  runningTotal = 0
  for (let i = 0; i < columnCount; i++) {
    const dimAsNum = dimToNumber((columnWidths && columnWidths[i]) || columnWidth, width)
    runningTotal += dimAsNum
    if (runningTotal > width - scrollWidth) {
      hasHorizontalScroll = true
      break
    }
  }

  const adjustedWidth = hasVerticalScroll ? width - scrollWidth : width
  const adjustedHeight = hasHorizontalScroll ? height - scrollWidth : height

  return [adjustedWidth, adjustedHeight]
}
