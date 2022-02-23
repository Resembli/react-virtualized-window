import * as React from "react"

import { RenderItem } from "./RenderItem"
import type { GridProps } from "./types"

interface PinnedColumnsProps<T> {
  totalWidth: number
  topOffset: number
  position?: "sticky" | "absolute"
  left?: number
  right?: number
  columns: T[][]
  widths: number[]
  heights: number[]
  runningHeight: number
  vertStart: number
  vertEnd: number
  pinnedRight?: boolean
  verticalGap: number
  horizontalGap: number
  Component: GridProps<T>["children"]
}

export function PinnedColumn<T>({
  totalWidth,
  left,
  right,
  topOffset,
  columns,
  widths,
  heights,
  runningHeight,
  Component,
  vertStart,
  vertEnd,
  pinnedRight,
  verticalGap,
  horizontalGap,
}: PinnedColumnsProps<T>) {
  return (
    <div
      style={{
        width: totalWidth,
        position: "absolute",
        left,
        right,
        transform: `translate3d(0px, ${topOffset}px, 0px)`,
        display: "inline-flex",
      }}
    >
      {columns.map((pinnedColumn, colIndex) => {
        const columnWidth = widths[colIndex]

        const marginLeft = !pinnedRight && colIndex !== 0 ? horizontalGap : 0
        const marginRight = pinnedRight && colIndex !== columns.length - 1 ? horizontalGap : 0

        return (
          <div key={colIndex}>
            <div style={{ height: runningHeight }} />
            {pinnedColumn.slice(vertStart, vertEnd).map((row, rowIndex) => {
              const height = heights[rowIndex + vertStart]
              return (
                <div
                  key={rowIndex + vertStart}
                  style={{
                    height,
                    marginTop: rowIndex + vertStart === 0 ? 0 : verticalGap,
                    marginBottom: rowIndex + vertStart === heights.length - 1 ? 0 : verticalGap,
                  }}
                >
                  <RenderItem
                    Component={Component}
                    marginLeft={marginLeft}
                    marginRight={marginRight}
                    itemProps={row}
                    pinned="left"
                    column={colIndex}
                    itemWidth={columnWidth}
                    row={rowIndex + vertStart}
                  />
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
