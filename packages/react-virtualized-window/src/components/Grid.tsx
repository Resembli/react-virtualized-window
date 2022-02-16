import * as React from "react"

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
import { useScrollAdjustWindowDims } from "../useScrollAdjustedDim"
import { useWindowApi } from "../useWindowApi"
import { useWindowDimensions } from "../useWindowDimensions"
import { useWindowScroll } from "../useWindowScroll"

export interface CellMeta {
  column: number
  row: number
}

export interface GridProps<T> extends VirtualWindowBaseProps<T> {
  data: T[][]
  children: <B extends T>(props: {
    data: B
    style: React.CSSProperties
    cellMeta: CellMeta
  }) => JSX.Element
  defaultRowHeight: NumberOrPercent
  rowHeights?: NumberOrPercent[]
  defaultColumnWidth: NumberOrPercent
  columnWidths?: NumberOrPercent[]
}

export type RenderItem<T> = GridProps<T>["children"]

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

  getKey,
  className,
  style,
  gap,

  rtl,

  width: sizingWidth,
  height: sizingHeight,

  onScroll: userOnScroll,
}: GridProps<T>) {
  const windowRef = React.useRef<HTMLDivElement>(null)
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
    columnCount: data[0]?.length ?? 0,
  })

  const [dataHeights, innerHeight] = useDataDimension({
    count: data.length,
    defaultDimension: defaultRowHeight,
    windowDim: adjustedHeight,
    gap: verticalGap,
    dimensions: rowHeights,
  })

  const [dataWidths, innerWidth] = useDataDimension({
    count: data[0]?.length ?? 0,
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

  const verticalMarginStyles = React.useMemo(() => getVerticalMarginStyling(gap), [gap])

  const windowStyle = React.useMemo(() => {
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
            height={adjustedHeight}
            width={adjustedWidth}
          >
            <div
              style={{
                position: "absolute",
                top: -topOffset,
                left: -leftOffset,
                willChange: "left, top",
              }}
            >
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
            </div>
          </StickyDiv>
        </div>
      </div>
    </SizingDiv>
  )
}

type RenderItemsProps<T> = {
  Component: GridProps<T>["children"]
  itemGap: GridProps<T>["gap"]
  itemProps: T
  itemWidth: number
  column: number
  row: number
  rtl?: boolean
}

const RenderItem = React.memo(function <T>({
  Component,
  itemGap,
  rtl,
  itemProps,
  itemWidth,
  column,
  row,
}: RenderItemsProps<T>) {
  const itemStyles = React.useMemo(() => {
    const marginStyling = getHorizontalMarginStyling(itemGap, rtl)
    return {
      width: itemWidth,
      minWidth: itemWidth,
      maxWidth: itemWidth,
      height: "100%",
      ...marginStyling,
    }
  }, [rtl, itemGap, itemWidth])

  const cellMeta = React.useMemo<CellMeta>(() => ({ row, column }), [column, row])

  return <Component data={itemProps} style={itemStyles} cellMeta={cellMeta} />
})

RenderItem.displayName = "GridCellItem"
