import type { CSSProperties } from "react"
import { useMemo } from "react"
import { memo } from "react"
import { useRef } from "react"

import { SizingDiv } from "./SizingDiv"
import {
  getHorizontalGap,
  getHorizontalMarginStyling,
  getVerticalGap,
  getVerticalMarginStyling,
} from "./itemGapUtilities"
import type { VirtualWindowBaseProps } from "./types"
import { useDataDimension } from "./useDataDimension"
import { useIndicesForDimensions } from "./useDimensionIndices"
import { useInnerDimension } from "./useInnerDimensions"
import { useWindowApi } from "./useWindowApi"
import { useWindowDimensions } from "./useWindowDimensions"
import { useWindowScroll } from "./useWindowScroll"

export interface GridDataRow<T> {
  cells: T[]
  key?: string | number
}

export interface GridProps<T> extends VirtualWindowBaseProps {
  data: GridDataRow<T>[]
  children: <B extends T>(itemProps: B, style: CSSProperties) => JSX.Element
  defaultRowHeight: number
  rowHeights?: number[]
  defaultColumnWidth: number
  columnWidths?: number[]
}

export function Grid<T>({
  data,
  children,
  defaultRowHeight,
  rowHeights,
  defaultColumnWidth,
  columnWidths,

  tabIndex,
  overscan,
  apiRef,

  className,
  style,
  gap,

  rtl,

  width: sizingWidth,
  height: sizingHeight,

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

  const verticalGap = getVerticalGap(gap)
  const innerHeight = useInnerDimension({
    dataDimensions: dataHeights,
    gapBetweenItems: verticalGap,
  })

  const horizontalGap = getHorizontalGap(gap)

  const innerWidth = useInnerDimension({
    dataDimensions: dataWidths,
    gapBetweenItems: horizontalGap,
  })

  const [vertStart, vertEnd, runningHeight] = useIndicesForDimensions({
    itemDimensions: dataHeights,
    offset: topOffset,
    gapBetweenItems: verticalGap,
    windowDimension: height,
    overscan: overscan ?? false,
  })

  const [horiStart, horiEnd, runningWidth] = useIndicesForDimensions({
    windowDimension: width,
    offset: leftOffset,
    gapBetweenItems: horizontalGap,
    itemDimensions: dataWidths,
    overscan: overscan ?? false,
  })

  const stickyWidth =
    dataWidths.slice(horiStart, horiEnd + 1).reduce((a, b) => a + b + horizontalGap) +
    runningWidth +
    horizontalGap * 2

  const verticalMarginStyles = getVerticalMarginStyling(gap)

  return (
    <SizingDiv width={sizingWidth} height={sizingHeight}>
      <div
        ref={windowRef}
        className={className}
        tabIndex={tabIndex}
        onScroll={onScroll}
        style={{
          ...style,
          height,
          width,
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
                          isLastItem={horiStart + j === row.cells.length - 1}
                          itemGap={gap}
                          itemProps={cell}
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
                          ...verticalMarginStyles,
                        }}
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
    </SizingDiv>
  )
}

type RenderItemsProps<T> = {
  component: GridProps<T>["children"]
  itemGap: GridProps<T>["gap"]
  isLastItem: boolean
  itemProps: T
  itemWidth: number
}

const RenderItem = memo(function <T>({
  component,
  itemGap,
  isLastItem,
  itemProps,
  itemWidth,
}: RenderItemsProps<T>) {
  const itemStyles = useMemo(() => {
    const marginStyling = getHorizontalMarginStyling(itemGap, isLastItem)
    return {
      width: itemWidth,
      minWidth: itemWidth,
      maxWidth: itemWidth,
      height: "100%",
      ...marginStyling,
    }
  }, [isLastItem, itemGap, itemWidth])

  return component(itemProps, itemStyles)
})

RenderItem.displayName = "GridCellItem"
