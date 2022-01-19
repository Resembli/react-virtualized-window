import type { CSSProperties, MutableRefObject, UIEventHandler } from "react"
import { useMemo } from "react"
import { memo } from "react"
import { useRef } from "react"

import { useDataDimension } from "./useDataDimension"
import { useIndicesForDimensions } from "./useDimensionIndices"
import { useInnerDimension } from "./useInnerDimensions"
import type { LeWindowApi } from "./useWindowApi"
import { useWindowApi } from "./useWindowApi"
import { useWindowDimensions } from "./useWindowDimensions"
import { useWindowScroll } from "./useWindowScroll"

export interface GridDataRow<T> {
  cells: T[]
  key?: string | number
}

export interface GridProps<T> {
  data: GridDataRow<T>[]
  children: <B extends T>(itemProps: B, style: CSSProperties) => JSX.Element
  defaultRowHeight: number
  rowHeights?: number[]
  defaultColumnWidth: number
  columnWidths?: number[]

  tabIndex?: number
  apiRef?: MutableRefObject<LeWindowApi | undefined>

  className?: string
  style?: CSSProperties

  rtl?: boolean

  onScroll?: UIEventHandler<HTMLElement>
}

export function Grid<T>({
  data,
  children,
  defaultRowHeight,
  rowHeights,
  defaultColumnWidth,
  columnWidths,

  tabIndex,
  apiRef,

  className,
  style,

  rtl,

  onScroll: userOnScroll,
}: GridProps<T>) {
  const windowRef = useRef<HTMLDivElement>(null)
  const translationRef = useRef<HTMLDivElement>(null)

  const [topOffset, leftOffset, onScroll, isScrolling] = useWindowScroll({
    userOnScroll,
    translationRef,
    rtl: rtl ?? false,
    x: true,
    y: true,
  })
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

  const stickyWidth =
    dataWidths.slice(horiStart, horiEnd + 1).reduce((a, b) => a + b) + runningWidth

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
        pointerEvents: isScrolling ? "none" : "all",
        direction: rtl ? "rtl" : "ltr",
      }}
    >
      <div style={{ width: innerWidth, height: innerHeight }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            left: 0,
            // Somehow table works best without as any unexpected scrolling issues.
            display: "table",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              width: stickyWidth,
            }}
          >
            <div
              ref={translationRef}
              style={{
                display: "grid",
                gridTemplateColumns: `${runningWidth}px auto`,
                gridTemplateRows: `${runningHeight}px auto`,
              }}
            >
              {/* The first two divs are positioning divs. They ensure the scroll translations work */}
              <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }} />
              <div />
              <div>
                {data.slice(vertStart, vertEnd).map((row, i) => {
                  const rowKey = row.key ?? i + vertStart
                  const itemHeight = dataHeights[vertStart + i]

                  const rowChildren = row.cells.slice(horiStart, horiEnd).map((cell, j) => {
                    const cellKey = horiStart + j
                    const itemWidth = dataWidths[horiStart + j]

                    return (
                      <RenderItem
                        key={cellKey}
                        itemWidth={itemWidth}
                        component={children}
                        itemProps={cell}
                      />
                    )
                  })

                  return (
                    <div
                      key={rowKey}
                      style={{ height: itemHeight, minHeight: itemHeight, maxHeight: itemHeight }}
                    >
                      {rowChildren}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type RenderItemsProps<T> = {
  component: GridProps<T>["children"]
  itemProps: T
  itemWidth: number
}

const RenderItem = memo(function <T>({ component, itemProps, itemWidth }: RenderItemsProps<T>) {
  const itemStyles = useMemo(() => {
    return {
      width: itemWidth,
      minWidth: itemWidth,
      maxWidth: itemWidth,
      display: "inline-block",
      height: "100%",
    }
  }, [itemWidth])

  return component(itemProps, itemStyles)
})

RenderItem.displayName = "GridCellItem"
