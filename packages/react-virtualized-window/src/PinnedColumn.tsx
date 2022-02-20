import * as React from "react"

import { RenderItem } from "./RenderItem"
import type { GridProps } from "./types"

interface PinnedColumnsProps<T> {
  totalWidth: number
  topOffset: number
  left?: number
  right?: number
  rtl?: boolean
  columns: T[][]
  widths: number[]
  heights: number[]
  runningHeight: number
  vertStart: number
  vertEnd: number
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
  rtl,
  runningHeight,
  Component,
  vertStart,
  vertEnd,
  verticalGap,
  horizontalGap,
}: PinnedColumnsProps<T>) {
  return (
    <div
      style={{
        width: totalWidth,
        position: "sticky",
        left,
        right,
        transform: `translate3d(0px, ${topOffset}px, 0px)`,
        height: innerHeight,
        display: "flex",
      }}
    >
      {columns.map((pinnedColumn, colIndex) => {
        const columnWidth = widths[colIndex]

        const marginLeft = !rtl && colIndex !== 0 ? horizontalGap : 0
        const marginRight = rtl && colIndex !== 0 ? horizontalGap : 0

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
