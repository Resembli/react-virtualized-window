import * as React from "react"

import { PinnedColumn } from "../PinnedColumn"
import { ScrollDiv } from "../ScrollDiv"
import { SizingDiv } from "../SizingDiv"
import { StickyDiv } from "../StickyDiv"
import { getScrollbarWidth } from "../getScrollbarWidth"
import { getHorizontalGap, getVerticalGap } from "../itemGapUtilities"
import type { GridProps } from "../types"
import { useDataDimension } from "../useDataDimension"
import { useIndicesForDimensions } from "../useDimensionIndices"
import { useScrollAdjustWindowDims } from "../useScrollAdjustedDim"
import { useScrollItems } from "../useScrollItems"
import { useSmartSticky } from "../useSmartSticky"
import { useWindowApi } from "../useWindowApi"
import { useWindowDimensions } from "../useWindowDimensions"
import { useWindowScroll } from "../useWindowScroll"

export function Grid<T, L = unknown, R = unknown>({
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

  width: sizingWidth,
  height: sizingHeight,

  onScroll: userOnScroll,

  pinnedLeft,
  pinnedRight,
  leftWidths,
  rightWidths,
}: GridProps<T, L, R>) {
  const windowRef = React.useRef<HTMLDivElement>(null)
  useWindowApi(windowRef, apiRef)

  const verticalGap = getVerticalGap(gap)
  const horizontalGap = getHorizontalGap(gap)

  const [width, height, browserWidth] = useWindowDimensions(windowRef)
  const [overscan, disableSticky] = useSmartSticky(browserWidth, userOverscan, userDisableSticky)

  const [topOffset, leftOffset, onScroll] = useWindowScroll({
    userOnScroll,
  })

  const [adjustedWidth, adjustedHeight, hasVerticalScroll] = useScrollAdjustWindowDims({
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
    overscan: overscan ?? 1,
  })

  const [horiStart, horiEnd, runningWidth] = useIndicesForDimensions({
    windowDimension: width,
    offset: leftOffset,
    gapBetweenItems: horizontalGap,
    itemDimensions: dataWidths,
    overscan: overscan ?? 1,
  })

  const [lWidths, leftTotalWidth] = useDataDimension({
    count: pinnedLeft?.length ?? 0,
    defaultDimension: defaultColumnWidth,
    windowDim: adjustedWidth,
    gap: horizontalGap,
    dimensions: leftWidths,
  })

  const [rWidths, rightTotalWidth] = useDataDimension({
    count: pinnedRight?.length ?? 0,
    defaultDimension: defaultColumnWidth,
    windowDim: adjustedWidth,
    gap: horizontalGap,
    dimensions: rightWidths,
  })

  const scrollableItems = useScrollItems({
    children,
    data,
    dataHeights,
    dataWidths,
    getKey,
    horiEnd,
    horiStart,
    horizontalGap,
    runningHeight,
    runningWidth,
    vertEnd,
    vertStart,
    verticalGap,
  })

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
        }}
      >
        <div
          style={{
            width: innerWidth + leftTotalWidth - horizontalGap + rightTotalWidth,
            height: innerHeight,
          }}
        >
          <StickyDiv
            disabled={disableSticky ?? false}
            height={adjustedHeight}
            width={adjustedWidth}
          >
            <ScrollDiv
              disableSticky={disableSticky}
              topOffset={topOffset}
              leftOffset={leftOffset}
              pinnedLeftWidth={leftTotalWidth}
            >
              {scrollableItems}
            </ScrollDiv>
            <div
              style={{
                display: "flex",
                position: "sticky",
                width: width - (hasVerticalScroll ? getScrollbarWidth() : 0),
                left: 0,
              }}
            >
              {pinnedLeft && (
                <PinnedColumn
                  Component={children}
                  totalWidth={leftTotalWidth}
                  left={0}
                  topOffset={disableSticky ? 0 : -topOffset}
                  columns={pinnedLeft}
                  widths={lWidths}
                  heights={dataHeights}
                  vertStart={vertStart}
                  vertEnd={vertEnd}
                  verticalGap={verticalGap}
                  horizontalGap={horizontalGap}
                  runningHeight={runningHeight}
                />
              )}
              {pinnedRight && (
                <PinnedColumn
                  Component={children}
                  totalWidth={rightTotalWidth}
                  right={0}
                  topOffset={disableSticky ? 0 : -topOffset}
                  columns={pinnedRight}
                  widths={rWidths}
                  heights={dataHeights}
                  vertStart={vertStart}
                  vertEnd={vertEnd}
                  verticalGap={verticalGap}
                  horizontalGap={horizontalGap}
                  pinnedRight
                  runningHeight={runningHeight}
                />
              )}
            </div>
          </StickyDiv>
        </div>
      </div>
    </SizingDiv>
  )
}
