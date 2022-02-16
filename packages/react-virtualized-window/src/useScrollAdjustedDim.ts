import * as React from "react"

import { getScrollbarWidth } from "./getScrollbarWidth"
import type { NumberOrPercent } from "./types"
import { dimToNumber } from "./utils"

interface UseScrollAdjustedWindowDimsArgs {
  height: number
  width: number
  verticalGap: number
  horizontalGap: number
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
  verticalGap,
  horizontalGap,
  rowCount,
  columnCount,
  rowHeight,
  columnWidth,
  rowHeights,
  columnWidths,
}: UseScrollAdjustedWindowDimsArgs) => {
  const [adjustedWidth, adjustedHeight] = React.useMemo(() => {
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

    return [adjustedWidth - horizontalGap * 2, adjustedHeight - verticalGap * 2]
  }, [
    columnCount,
    columnWidth,
    columnWidths,
    horizontalGap,
    rowCount,
    rowHeight,
    rowHeights,
    verticalGap,
    height,
    width,
  ])

  return [adjustedWidth, adjustedHeight]
}
