import { useRef } from "react"

import { useInnerHeight, useInnerWidthGrid } from "../useInnerDimensions"
import { useVerticalIndices } from "../useVerticalIndices"
import { useWindowDimensions } from "../useWindowDimensions"
import { useWindowScroll } from "../useWindowScroll"
import { useHorizontalIndicesGrid } from "./useHorizontalIndicesGrid"

export interface GridDataItem<T> {
  props: T
  width?: number
  key?: string | number
}

export interface GridDataRow<T> {
  cells: GridDataItem<T>[]
  height?: number
  key?: string | number
}

export interface GridProps<T> {
  data: GridDataRow<T>[]
  ItemComponent: (props: T) => JSX.Element | null
  rowHeight: number
  columnWidth: number
  variableHeights?: boolean
  variableWidths?: boolean
}

export const Grid = <T extends Record<string, unknown>>({
  data,
  rowHeight,
  columnWidth,
  ItemComponent,
  variableHeights = false,
  variableWidths = false,
}: GridProps<T>) => {
  const windowRef = useRef<HTMLDivElement>(null)

  const [topOffset, leftOffset, onScroll] = useWindowScroll()
  const [width, height] = useWindowDimensions(windowRef)

  const innerHeight = useInnerHeight({ data, rowHeight, variableHeights })
  const innerWidth = useInnerWidthGrid({ data, columnWidth, variableWidths })

  const [vertStart, vertEnd, runningHeight] = useVerticalIndices({
    data,
    rowHeight,
    offset: topOffset,
    height,
    variableHeights,
  })

  const [horiStart, horiEnd, runningWidth] = useHorizontalIndicesGrid({
    data,
    columnWidth,
    offset: leftOffset,
    width,
    variableWidths,
  })

  const verticalTranslationOffset =
    innerHeight - topOffset - height < rowHeight ? 0 : -(topOffset - runningHeight)

  const horizontalTranslationOffset =
    innerWidth - leftOffset - width < columnWidth ? 0 : -(leftOffset - runningWidth)

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
        <div style={{ position: "sticky", top: 0, left: 0, right: 0, display: "inline-block" }}>
          <div
            style={{
              transform: `translate3d(${horizontalTranslationOffset}px, ${verticalTranslationOffset}px, 0)`,
              willChange: "transform",
            }}
          >
            {data.slice(vertStart, vertEnd).map((row, i) => {
              const rowKey = row.key ?? i
              const itemHeight = variableHeights ? row.height ?? rowHeight : rowHeight

              return (
                <div
                  key={rowKey}
                  style={{ height: itemHeight, minHeight: itemHeight, maxHeight: itemHeight }}
                >
                  {row.cells.slice(horiStart, horiEnd).map((cell, j) => {
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
