import { useRef } from "react"

import { useDataHeights } from "../useDataHeights"
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
  key?: string | number
}

export interface GridProps<T> {
  data: GridDataRow<T>[]
  ItemComponent: (props: T) => JSX.Element | null
  defaultRowHeight: number
  rowHeights?: number[]
  columnWidth: number
  variableWidths?: boolean
}

export const Grid = <T extends Record<string, unknown>>({
  data,
  defaultRowHeight,
  columnWidth,
  ItemComponent,
  rowHeights,
  variableWidths = false,
}: GridProps<T>) => {
  const windowRef = useRef<HTMLDivElement>(null)

  const [topOffset, leftOffset, onScroll] = useWindowScroll()
  const [width, height] = useWindowDimensions(windowRef)

  const dataHeights = useDataHeights({
    count: data.length,
    defaultHeight: defaultRowHeight,
    heights: rowHeights,
  })

  const innerHeight = useInnerHeight(dataHeights)
  const innerWidth = useInnerWidthGrid({ data, columnWidth, variableWidths })

  const [vertStart, vertEnd, runningHeight] = useVerticalIndices({
    dataHeights,
    offset: topOffset,
    height,
  })

  const [horiStart, horiEnd, runningWidth] = useHorizontalIndicesGrid({
    data,
    columnWidth,
    offset: leftOffset,
    width,
    variableWidths,
  })

  const verticalTranslationOffset =
    innerHeight - topOffset - height < dataHeights[dataHeights.length - 1]
      ? 0
      : -(topOffset - runningHeight)

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
              const itemHeight = dataHeights[i]

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
