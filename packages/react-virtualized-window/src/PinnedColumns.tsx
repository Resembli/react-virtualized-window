import * as React from "react"

import { RenderItem } from "./RenderItem"
import { getVerticalMarginStyling } from "./itemGapUtilities"
import type { GridProps, ItemGap } from "./types"

interface PinnedColumnsProps<T> {
  width: number
  height: number
  position: "sticky" | "absolute"
  offset: number
  columns: unknown[][]
  widths: number[]
  heights: number[]
  runningHeight: number
  start: number
  end: number
  Component: GridProps<T>["children"]
  gap?: ItemGap
  left?: number
  right?: number
}

export function PinnedColumns<T>({
  width,
  height,
  offset,
  position,
  left,
  right,
  columns,
  widths,
  heights,
  start,
  end,
  gap,
  runningHeight,
  Component,
}: PinnedColumnsProps<T>) {
  return (
    <div
      style={{
        width: width,
        height: height,
        position,
        left,
        right,
        transform: `translate3d(0px, ${offset}px, 0px)`,
        display: "flex",
      }}
    >
      {columns.map((column, i) => {
        const columnWidth = widths[i]

        return (
          <div key={i} style={{ width: columnWidth }}>
            <div style={{ height: runningHeight }} />
            {column.slice(start, end).map((row, j) => {
              return (
                <div
                  key={`${i + start}${j}`}
                  style={{
                    height: heights[i + start],
                    ...getVerticalMarginStyling(gap),
                  }}
                >
                  <RenderItem
                    marginStyling={{}}
                    key={i + start}
                    itemWidth={columnWidth}
                    Component={Component}
                    itemProps={row}
                    column={i}
                    row={start + j}
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
