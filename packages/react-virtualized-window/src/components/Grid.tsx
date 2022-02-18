import * as React from "react"

import { PinnedColumns } from "../PinnedColumns"
import { RenderItem } from "../RenderItem"
import { SizingDiv } from "../SizingDiv"
import { StickyDiv } from "../StickyDiv"
import {
  getHorizontalGap,
  getHorizontalMarginStyling,
  getVerticalGap,
  getVerticalMarginStyling,
} from "../itemGapUtilities"
import type { GridProps } from "../types"
import { useDataDimension } from "../useDataDimension"
import { useIndicesForDimensions } from "../useDimensionIndices"
import { useScrollAdjustWindowDims } from "../useScrollAdjustedDim"
import { useSmartSticky } from "../useSmartSticky"
import { useWindowApi } from "../useWindowApi"
import { useWindowDimensions } from "../useWindowDimensions"
import { useWindowScroll } from "../useWindowScroll"

export function Grid<T>({
  data,
  children,
  defaultRowHeight,
  rowHeights,
  defaultColumnWidth,
  columnWidths,

  tabIndex,
  overscan: userOverscan,
  apiRef,
  disableSticky: userDisableSticky,
  "data-testid": testId,

  getKey,
  className,
  style,
  gap,

  rtl,

  width: sizingWidth,
  height: sizingHeight,

  onScroll: userOnScroll,

  pinnedRenderer,
  leftColumns,
  leftWidths,
}: GridProps<T>) {
  const windowRef = React.useRef<HTMLDivElement>(null)
  const transRef = React.useRef<HTMLDivElement>(null)
  useWindowApi(windowRef, apiRef)

  const verticalGap = getVerticalGap(gap)
  const horizontalGap = getHorizontalGap(gap)

  const [width, height, browserWidth] = useWindowDimensions(windowRef)
  const [overscan, disableSticky] = useSmartSticky(browserWidth, userOverscan, userDisableSticky)

  const [topOffset, leftOffset, onScroll] = useWindowScroll({
    userOnScroll,
    transRef,
    disableSticky: disableSticky ?? false,
    rtl: rtl ?? false,
  })

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

  const [lWidths, leftTotalWidth] = useDataDimension({
    count: leftColumns?.length ?? 0,
    defaultDimension: defaultColumnWidth,
    windowDim: adjustedWidth,
    gap: 0,
    dimensions: leftWidths,
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

  const scrollableItems = React.useMemo(
    function Items() {
      const verticalMarginStyles = getVerticalMarginStyling(gap)
      const marginStyling = getHorizontalMarginStyling(gap, rtl)
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
                  marginStyling={marginStyling}
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
        </>
      )
    },
    [
      children,
      data,
      dataHeights,
      dataWidths,
      gap,
      getKey,
      horiEnd,
      horiStart,
      rtl,
      runningHeight,
      runningWidth,
      vertEnd,
      vertStart,
    ],
  )

  return (
    <SizingDiv
      width={sizingWidth}
      height={sizingHeight}
      testId={testId}
      className={className}
      userStyle={style}
    >
      <div
        ref={windowRef}
        tabIndex={tabIndex}
        onScroll={onScroll}
        style={{
          contain: "strict",
          height,
          width,
          position: "relative",
          overflow: "auto",
          direction: rtl ? "rtl" : "ltr",
        }}
      >
        <div style={{ width: innerWidth + leftTotalWidth, height: innerHeight, contain: "strict" }}>
          <StickyDiv
            disabled={disableSticky ?? false}
            rtl={rtl ?? false}
            height={adjustedHeight}
            width={adjustedWidth}
          >
            <div
              ref={transRef}
              style={{
                position: "absolute",
                transform: `translate3d(${
                  disableSticky ? 0 : rtl ? leftOffset : -leftOffset + leftTotalWidth
                }px, ${disableSticky ? 0 : -topOffset}px, 0px)`,
                top: 0,
                left: rtl ? undefined : disableSticky ? leftTotalWidth : 0,
                right: rtl ? 0 : undefined,
                willChange: "transform",
              }}
            >
              {scrollableItems}
            </div>
            {leftColumns && (
              <PinnedColumns
                width={leftTotalWidth}
                height={innerHeight}
                position={disableSticky ? "sticky" : "absolute"}
                left={rtl ? undefined : 0}
                right={rtl ? adjustedWidth - leftTotalWidth : undefined}
                offset={disableSticky ? 0 : -topOffset}
                columns={leftColumns}
                widths={lWidths}
                heights={dataHeights}
                runningHeight={runningHeight}
                start={vertStart}
                end={vertEnd}
                gap={gap}
                Component={pinnedRenderer ?? children}
              />
            )}
          </StickyDiv>
        </div>
      </div>
    </SizingDiv>
  )
}
