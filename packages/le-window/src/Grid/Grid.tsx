import { useRef } from "react"

import type { GridDataRow } from "../types"
import { useInnerGridDimensions, useInnerHeight } from "../useInnerDimensions"
import { useVerticalIndices } from "../useVerticalIndices"
import { useWindowDimensions } from "../useWindowDimensions"
import { useWindowScroll } from "../useWindowScroll"

interface GridProps<T> {
  data: GridDataRow<T>[]
  ItemComponent: (props: T) => JSX.Element | null
  rowHeight: number
  columnWidth: number
  variableHeights?: boolean
}

export const Grid = <T extends Record<string, unknown>>({
  data,
  rowHeight,
  columnWidth,
  ItemComponent,
  variableHeights = false,
}: GridProps<T>) => {
  const windowRef = useRef<HTMLDivElement>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [topOffset, leftOffset, onScroll] = useWindowScroll()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [width, height] = useWindowDimensions(windowRef)

  const [innerWidth] = useInnerGridDimensions({ data, rowHeight, columnWidth })
  const innerHeight = useInnerHeight({ data, rowHeight, variableHeights })

  const [start, end, runningHeight] = useVerticalIndices({
    data,
    rowHeight,
    offset: topOffset,
    height,
    variableHeights,
  })

  // Prevents an issue where we scroll to the bottom, then scrolling a little up applies a translation
  // moving the div a little higher than it should be.
  const translationOffset =
    innerHeight - topOffset - height < rowHeight ? 0 : -(topOffset - runningHeight)

  return (
    <div
      ref={windowRef}
      onScroll={onScroll}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        overflow: "auto",
      }}
    >
      <div style={{ width: innerWidth, height: innerHeight }}>
        <div style={{ position: "sticky", top: 0 }}>
          <div
            style={{
              transform: `translate3d(0, ${translationOffset}px, 0)`,
              willChange: "transform",
            }}
          >
            {data.slice(start, end).map((row, i) => {
              const rowKey = row.key ?? i
              const itemHeight = variableHeights ? row.height ?? rowHeight : rowHeight

              return (
                <div
                  key={rowKey}
                  style={{ height: itemHeight, minHeight: itemHeight, maxHeight: itemHeight }}
                >
                  {row.cells.map((cell, j) => {
                    const cellKey = cell.key ?? j

                    return (
                      <div
                        key={cellKey}
                        style={{ width: columnWidth, display: "inline-block", height: "100%" }}
                      >
                        <ItemComponent {...cell.props} />{" "}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
