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
        return (
          <div key={colIndex}>
            <div style={{ height: runningHeight }} />
            {pinnedColumn.slice(vertStart, vertEnd).map((row, rowIndex) => {
              const height = heights[rowIndex + vertStart]
              return (
                <div key={rowIndex + vertStart} style={{ height }}>
                  <RenderItem
                    Component={Component}
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
