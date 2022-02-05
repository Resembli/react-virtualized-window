import type { CSSProperties } from "react"
import { useMemo } from "react"
import { memo } from "react"
import { useRef } from "react"

import { SizingDiv } from "../SizingDiv"
import { StickyDiv } from "../StickyDiv"
import {
  getHorizontalGap,
  getHorizontalMarginStyling,
  getVerticalGap,
  getVerticalMarginStyling,
} from "../itemGapUtilities"
import type { NumberOrPercent, VirtualWindowBaseProps } from "../types"
import { useDataDimension } from "../useDataDimension"
import { useIndicesForDimensions } from "../useDimensionIndices"
import { useInnerDimension } from "../useInnerDimensions"
import { useWindowApi } from "../useWindowApi"
import { useWindowDimensions } from "../useWindowDimensions"
import { useWindowScroll } from "../useWindowScroll"

interface CellMeta {
  column: number
  row: number
}

export interface GridProps<T> extends VirtualWindowBaseProps {
  data: T[][]
  children: <B extends T>(itemProps: B, style: CSSProperties, cellMeta: CellMeta) => JSX.Element
  defaultRowHeight: NumberOrPercent
  rowHeights?: NumberOrPercent[]
  defaultColumnWidth: NumberOrPercent
  columnWidths?: NumberOrPercent[]
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
  disableSticky,

  className,
  style,
  gap,

  rtl,

  width: sizingWidth,
  height: sizingHeight,

  onScroll: userOnScroll,
}: GridProps<T>) {
  const windowRef = useRef<HTMLDivElement>(null)

  const [topOffset, leftOffset, onScroll, isScrolling] = useWindowScroll({
    userOnScroll,
    rtl: rtl ?? false,
  })
  const [width, height] = useWindowDimensions(windowRef)

  useWindowApi(windowRef, apiRef)

  const dataHeights = useDataDimension({
    count: data.length,
    defaultDimension: defaultRowHeight,
    windowDim: height,
    dimensions: rowHeights,
  })

  const dataWidths = useDataDimension({
    count: data[0].length ?? 0,
    defaultDimension: defaultColumnWidth,
    windowDim: width,
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
    overscan: overscan ?? 0,
  })

  const [horiStart, horiEnd, runningWidth] = useIndicesForDimensions({
    windowDimension: width,
    offset: leftOffset,
    gapBetweenItems: horizontalGap,
    itemDimensions: dataWidths,
    overscan: overscan ?? 0,
  })

  const stickyWidth =
    dataWidths.slice(horiStart, horiEnd + 1).reduce((a, b) => a + b + horizontalGap) +
    runningWidth +
    horizontalGap * (rtl ? 1 : 2)

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
        <div style={{ width: innerWidth, height: innerHeight + verticalGap }}>
          <StickyDiv disabled={disableSticky ?? false} display="table" width={stickyWidth}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `${runningWidth}px auto`,
                gridTemplateRows: `${runningHeight}px auto`,
                transform: disableSticky
                  ? undefined
                  : `translate3d(${!rtl ? -leftOffset : 0}px, ${-topOffset}px, 0)`,
                willChange: "transform",
              }}
            >
              {/* The first two divs are positioning divs. They ensure the scroll translations work */}
              <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }} />
              <div />
              <div>
                {data.slice(vertStart, vertEnd).map((row, i) => {
                  const rowKey = i + vertStart
                  const itemHeight = dataHeights[vertStart + i]

                  const rowChildren = row.slice(horiStart, horiEnd).map((cell, j) => {
                    const cellKey = horiStart + j
                    const itemWidth = dataWidths[horiStart + j]

                    const isLastItem = rtl ? horiStart + j === 0 : horiStart + j === row.length - 1

                    return (
                      <RenderItem
                        key={cellKey}
                        itemWidth={itemWidth}
                        component={children}
                        isLastItem={isLastItem}
                        itemGap={gap}
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
                        ...verticalMarginStyles,
                      }}
                    >
                      {rowChildren}
                    </div>
                  )
                })}
              </div>
            </div>
          </StickyDiv>
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
  column: number
  row: number
}

const RenderItem = memo(function <T>({
  component,
  itemGap,
  isLastItem,
  itemProps,
  itemWidth,
  column,
  row,
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

  const cellMeta = useMemo<CellMeta>(() => ({ row, column }), [column, row])

  return component(itemProps, itemStyles, cellMeta)
})

RenderItem.displayName = "GridCellItem"
