import type { CSSProperties } from "react"
import { useRef } from "react"
import { memo, useMemo } from "react"

import { SizingDiv } from "../SizingDiv.js"
import { StickyDiv } from "../StickyDiv.js"
import {
  getHorizontalGap,
  getHorizontalMarginStyling,
  getVerticalGap,
  getVerticalMarginStyling,
} from "../itemGapUtilities.js"
import type { NumberOrPercent, VirtualWindowBaseProps } from "../types.js"
import { useDataDimension } from "../useDataDimension.js"
import { useIndicesForDimensions } from "../useDimensionIndices.js"
import { useScrollAdjustWindowDims } from "../useScrollAdjustedDim.js"
import { useWindowApi } from "../useWindowApi.js"
import { useWindowDimensions } from "../useWindowDimensions.js"
import { useWindowScroll } from "../useWindowScroll.js"

export interface CellMeta {
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
  "data-testid": testId,

  className,
  style,
  gap,

  rtl,

  width: sizingWidth,
  height: sizingHeight,

  onScroll: userOnScroll,
}: GridProps<T>) {
  const windowRef = useRef<HTMLDivElement>(null)
  useWindowApi(windowRef, apiRef)

  const [topOffset, leftOffset, onScroll] = useWindowScroll({
    userOnScroll,
    rtl: rtl ?? false,
  })

  const verticalGap = getVerticalGap(gap)
  const horizontalGap = getHorizontalGap(gap)

  const [width, height] = useWindowDimensions(windowRef)

  const [adjustedWidth, adjustedHeight] = useScrollAdjustWindowDims({
    height,
    width,
    verticalGap,
    horizontalGap,
    rowHeight: defaultRowHeight,
    columnWidth: defaultColumnWidth,
    columnWidths,
    rowHeights,
    rowCount: data.length,
    columnCount: data[0].length ?? 0,
  })

  const [dataHeights, innerHeight] = useDataDimension({
    count: data.length,
    defaultDimension: defaultRowHeight,
    windowDim: adjustedHeight,
    gap: verticalGap,
    dimensions: rowHeights,
  })

  const [dataWidths, innerWidth] = useDataDimension({
    count: data[0].length ?? 0,
    defaultDimension: defaultColumnWidth,
    windowDim: adjustedWidth,
    gap: horizontalGap,
    dimensions: columnWidths,
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

  const verticalMarginStyles = getVerticalMarginStyling(gap)

  const windowStyle = useMemo(() => {
    return {
      height,
      width,
      position: "relative",
      overflow: "auto",
      direction: rtl ? "rtl" : "ltr",
    } as const
  }, [height, rtl, width])

  return (
    <SizingDiv
      width={sizingWidth}
      height={sizingHeight}
      testId={testId}
      className={className}
      userStyle={style}
    >
      <div ref={windowRef} tabIndex={tabIndex} onScroll={onScroll} style={windowStyle}>
        <div style={{ width: innerWidth, height: innerHeight }}>
          <StickyDiv
            disabled={disableSticky ?? false}
            topOffset={topOffset}
            leftOffset={leftOffset}
            height={adjustedHeight}
            width={adjustedWidth}
            rtl={rtl}
          >
            <div style={{ height: runningHeight }} />
            {data.slice(vertStart, vertEnd).map((row, i) => {
              const rowKey = i + vertStart
              const itemHeight = dataHeights[vertStart + i]

              const rowChildren = row.slice(horiStart, horiEnd).map((cell, j) => {
                const cellKey = horiStart + j
                const itemWidth = dataWidths[horiStart + j]

                return (
                  <RenderItem
                    key={cellKey}
                    itemWidth={itemWidth}
                    component={children}
                    rtl={rtl}
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
                  <div style={{ width: runningWidth }} />
                  {rowChildren}
                </div>
              )
            })}
          </StickyDiv>
        </div>
      </div>
    </SizingDiv>
  )
}

type RenderItemsProps<T> = {
  component: GridProps<T>["children"]
  itemGap: GridProps<T>["gap"]
  itemProps: T
  itemWidth: number
  column: number
  row: number
  rtl?: boolean
}

const RenderItem = memo(function <T>({
  component,
  itemGap,
  rtl,
  itemProps,
  itemWidth,
  column,
  row,
}: RenderItemsProps<T>) {
  const itemStyles = useMemo(() => {
    const marginStyling = getHorizontalMarginStyling(itemGap, rtl)
    return {
      width: itemWidth,
      minWidth: itemWidth,
      maxWidth: itemWidth,
      height: "100%",
      ...marginStyling,
    }
  }, [rtl, itemGap, itemWidth])

  const cellMeta = useMemo<CellMeta>(() => ({ row, column }), [column, row])

  return component(itemProps, itemStyles, cellMeta)
})

RenderItem.displayName = "GridCellItem"
