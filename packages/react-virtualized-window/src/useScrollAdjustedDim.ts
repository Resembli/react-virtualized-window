import * as React from "react"

import { getScrollbarWidth } from "./getScrollbarWidth.js"
import type { NumberOrPercent } from "./types.js"
import { dimToNumber } from "./utils.js"

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
  const [adjustedWidth, adjustedHeight, hasVerticalScroll] = React.useMemo(() => {
    const scrollWidth = getScrollbarWidth()

    let hasVerticalScroll = false
    let runningTotal = 0
    for (let i = 0; i < rowCount; i++) {
      const dimAsNum = dimToNumber(rowHeights?.[i] || rowHeight, height)

      runningTotal += dimAsNum
      if (runningTotal > height - scrollWidth) {
        hasVerticalScroll = true
        break
      }
    }

    let hasHorizontalScroll = false
    runningTotal = 0
    for (let i = 0; i < columnCount; i++) {
      const dimAsNum = dimToNumber(columnWidths?.[i] || columnWidth, width)
      runningTotal += dimAsNum
      if (runningTotal > width - scrollWidth) {
        hasHorizontalScroll = true
        break
      }
    }

    const adjustedWidth = hasVerticalScroll ? width - scrollWidth : width
    const adjustedHeight = hasHorizontalScroll ? height - scrollWidth : height

    return [adjustedWidth, adjustedHeight, hasVerticalScroll]
  }, [columnCount, columnWidth, columnWidths, rowCount, rowHeight, rowHeights, height, width])

  return [adjustedWidth, adjustedHeight, hasVerticalScroll] as const
}
