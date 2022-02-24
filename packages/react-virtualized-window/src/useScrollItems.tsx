import * as React from "react"

import { RenderItem } from "./RenderItem"
import type { GridProps } from "./types"

interface ScrollItemArgs<T> {
  vertStart: number
  vertEnd: number
  horiStart: number
  horiEnd: number
  data: GridProps<T>["data"]
  dataHeights: number[]
  dataWidths: number[]
  runningHeight: number
  runningWidth: number
  getKey: GridProps<T>["getKey"]
  children: GridProps<T>["children"]
}

export function useScrollItems<T>({
  children,
  data,
  dataHeights,
  dataWidths,
  getKey,
  horiEnd,
  horiStart,
  runningHeight,
  runningWidth,
  vertEnd,
  vertStart,
}: ScrollItemArgs<T>) {
  const scrollableItems = React.useMemo(
    function Items() {
      return (
        <>
          <div style={{ height: runningHeight }}></div>
          {data.slice(vertStart, vertEnd).map((row, i) => {
            const rowKey = i + vertStart
            const itemHeight = dataHeights[vertStart + i]

            const rowChildren = row.slice(horiStart, horiEnd).map((cell, j) => {
              const cellKey = getKey?.(cell) ?? horiStart + j
              const itemWidth = dataWidths[horiStart + j]

              return (
                <RenderItem
                  key={cellKey}
                  itemWidth={itemWidth}
                  Component={children}
                  itemProps={cell}
                  column={horiStart + j}
                  row={vertStart + i}
                />
              )
            })

            return (
              <div
                key={rowKey}
                style={{
                  display: "flex",
                  height: itemHeight,
                  minHeight: itemHeight,
                  maxHeight: itemHeight,
                }}
              >
                <div style={{ width: runningWidth }} />
                {rowChildren}
              </div>
            )
          })}
        </>
      )
    },
    [
      children,
      data,
      dataHeights,
      dataWidths,
      getKey,
      horiEnd,
      horiStart,
      runningHeight,
      runningWidth,
      vertEnd,
      vertStart,
    ],
  )

  return scrollableItems
}
