import type { CSSProperties, MutableRefObject, UIEventHandler } from "react"
import { createElement } from "react"
import { useRef } from "react"

import { useDataDimension } from "./useDataDimension"
import { useIndicesForDimensions } from "./useDimensionIndices"
import { useInnerDimension } from "./useInnerDimensions"
import type { WindowApi } from "./useWindowApi"
import { useWindowApi } from "./useWindowApi"
import { useWindowDimensions } from "./useWindowDimensions"
import { useWindowScroll } from "./useWindowScroll"

export interface GridDataItem<T> {
  props: T
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
  defaultColumnWidth: number
  columnWidths?: number[]

  tabIndex?: number
  apiRef?: MutableRefObject<WindowApi | undefined>

  className?: string
  style?: CSSProperties

  rowWrapperElement?: keyof JSX.IntrinsicElements
  rowWrapperClassName?: string
  rowWrapperStyle?: CSSProperties

  cellWrapperElement?: keyof JSX.IntrinsicElements
  cellWrapperClassName?: string
  cellWrapperStyle?: CSSProperties

  onScroll?: UIEventHandler<HTMLElement>
}

export const Grid = <T extends Record<string, unknown>>({
  data,
  ItemComponent,
  defaultRowHeight,
  rowHeights,
  defaultColumnWidth,
  columnWidths,

  tabIndex,
  apiRef,

  className,
  style,

  rowWrapperElement = "div",
  rowWrapperClassName,
  rowWrapperStyle,

  cellWrapperElement = "div",
  cellWrapperClassName,
  cellWrapperStyle,

  onScroll: userOnScroll,
}: GridProps<T>) => {
  const windowRef = useRef<HTMLDivElement>(null)

  const [topOffset, leftOffset, onScroll] = useWindowScroll(userOnScroll)
  const [width, height] = useWindowDimensions(windowRef)

  useWindowApi(windowRef, apiRef)

  const dataHeights = useDataDimension({
    count: data.length,
    defaultDimension: defaultRowHeight,
    dimensions: rowHeights,
  })

  const dataWidths = useDataDimension({
    count: data[0].cells.length ?? 0,
    defaultDimension: defaultColumnWidth,
    dimensions: columnWidths,
  })

  const innerHeight = useInnerDimension(dataHeights)
  const innerWidth = useInnerDimension(dataWidths)

  const [vertStart, vertEnd, runningHeight] = useIndicesForDimensions({
    itemDimensions: dataHeights,
    offset: topOffset,
    windowDimension: height,
  })

  const [horiStart, horiEnd, runningWidth] = useIndicesForDimensions({
    windowDimension: width,
    offset: leftOffset,
    itemDimensions: dataWidths,
  })

  const verticalTranslationOffset =
    innerHeight - topOffset - height < dataHeights[dataHeights.length - 1]
      ? 0
      : -(topOffset - runningHeight)

  const horizontalTranslationOffset =
    innerWidth - leftOffset - width < defaultColumnWidth ? 0 : -(leftOffset - runningWidth)

  return (
    <div
      ref={windowRef}
      className={className}
      tabIndex={tabIndex}
      onScroll={onScroll}
      style={{
        ...style,
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
              const itemHeight = dataHeights[vertStart + i]

              const rowChildren = row.cells.slice(horiStart, horiEnd).map((cell, j) => {
                const cellKey = cell.key ?? j
                const itemWidth = dataWidths[horiStart + j]

                return createElement(
                  cellWrapperElement,
                  {
                    key: cellKey,
                    className: cellWrapperClassName,
                    style: {
                      ...cellWrapperStyle,
                      width: itemWidth,
                      minWidth: itemWidth,
                      maxWidth: itemWidth,
                      display: "inline-block",
                      height: "100%",
                    },
                  },
                  <ItemComponent {...cell.props} />,
                )
              })

              return createElement(
                rowWrapperElement,
                {
                  key: rowKey,
                  className: rowWrapperClassName,
                  style: {
                    ...rowWrapperStyle,
                    height: itemHeight,
                    minHeight: itemHeight,
                    maxHeight: itemHeight,
                  },
                },
                rowChildren,
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
