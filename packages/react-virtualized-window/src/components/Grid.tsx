import * as React from "react"

import { PinnedColumn } from "../PinnedColumn"
import { RenderItem } from "../RenderItem"
import { SizingDiv } from "../SizingDiv"
import { StickyDiv } from "../StickyDiv"
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

  pinnedLeft,
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

  const [lWidths, leftTotalWidth] = useDataDimension({
    count: pinnedLeft?.length ?? 0,
    defaultDimension: defaultColumnWidth,
    windowDim: adjustedWidth,
    gap: 0,
    dimensions: leftWidths,
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
    rtl,
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
          direction: rtl ? "rtl" : "ltr",
        }}
      >
        <div style={{ width: innerWidth, height: innerHeight }}>
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
                transform: `translate3d(${disableSticky ? 0 : rtl ? leftOffset : -leftOffset}px, ${
                  disableSticky ? 0 : -topOffset
                }px, 0px)`,
                top: 0,
                left: rtl ? undefined : 0,
                right: rtl ? 0 : undefined,
                willChange: "transform",
              }}
            >
              {scrollableItems}
            </div>
            {pinnedLeft && (
              <PinnedColumn
                Component={children}
                totalWidth={leftTotalWidth}
                left={rtl ? undefined : 0}
                right={rtl ? adjustedWidth - leftTotalWidth : 0}
                topOffset={disableSticky ? 0 : -topOffset}
                columns={pinnedLeft}
                widths={lWidths}
                heights={dataHeights}
                vertStart={vertStart}
                vertEnd={vertEnd}
                runningHeight={runningHeight}
              />
            )}
          </StickyDiv>
        </div>
      </div>
    </SizingDiv>
  )
}
