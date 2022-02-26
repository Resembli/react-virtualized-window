import * as React from "react"

import { ScrollDiv } from "../ScrollDiv.js"
import { SizingDiv } from "../SizingDiv.js"
import { StickyDiv } from "../StickyDiv.js"
import type { GridProps } from "../types.js"
import { useDataDimension } from "../useDataDimension.js"
import { useIndicesForDimensions } from "../useDimensionIndices.js"
import { useScrollAdjustWindowDims } from "../useScrollAdjustedDim.js"
import { useScrollItems } from "../useScrollItems.js"
import { useSmartSticky } from "../useSmartSticky.js"
import { useWindowApi } from "../useWindowApi.js"
import { useWindowDimensions } from "../useWindowDimensions.js"
import { useWindowScroll } from "../useWindowScroll.js"

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

  width: sizingWidth,
  height: sizingHeight,

  onScroll: userOnScroll,

  pinnedTopCount = 0,
  pinnedBottomCount = 0,
}: GridProps<T>) {
  const windowRef = React.useRef<HTMLDivElement>(null)
  useWindowApi(windowRef, apiRef)

  const [width, height, browserWidth] = useWindowDimensions(windowRef)
  const [overscan, disableSticky] = useSmartSticky(browserWidth, userOverscan, userDisableSticky)

  const [topOffset, leftOffset, onScroll] = useWindowScroll({
    userOnScroll,
  })

  const [topData, botData, scrollData] = React.useMemo(() => {
    return [
      data.slice(0, pinnedTopCount),
      data.slice(pinnedTopCount, pinnedTopCount + pinnedBottomCount),
      data.slice(pinnedTopCount + pinnedBottomCount),
    ]
  }, [data, pinnedBottomCount, pinnedTopCount])

  const [adjustedWidth, adjustedHeight] = useScrollAdjustWindowDims({
    height,
    width,
    rowHeight: defaultRowHeight,
    columnWidth: defaultColumnWidth,
    columnWidths,
    rowHeights,
    rowCount: data.length,
    columnCount: data[0]?.length ?? 0,
  })

  const [dataHeights, innerHeight] = useDataDimension({
    count: scrollData.length,
    defaultDimension: defaultRowHeight,
    windowDim: adjustedHeight,
    dimensions: rowHeights,
  })

  const [dataWidths, innerWidth] = useDataDimension({
    count: scrollData[0]?.length ?? 0,
    defaultDimension: defaultColumnWidth,
    windowDim: adjustedWidth,
    dimensions: columnWidths,
  })

  const [topHeights, totalTopHeight] = useDataDimension({
    count: topData.length,
    defaultDimension: defaultRowHeight,
    windowDim: adjustedHeight,
    dimensions: rowHeights,
  })

  const [botHeights, totalBotHeight] = useDataDimension({
    count: botData.length,
    defaultDimension: defaultRowHeight,
    windowDim: adjustedHeight,
    dimensions: rowHeights,
  })

  const [vertStart, vertEnd, runningHeight] = useIndicesForDimensions({
    itemDimensions: dataHeights,
    offset: topOffset,
    windowDimension: height,
    overscan: overscan ?? 1,
  })

  const [horiStart, horiEnd, runningWidth] = useIndicesForDimensions({
    windowDimension: width,
    offset: leftOffset,
    itemDimensions: dataWidths,
    overscan: overscan ?? 1,
  })

  const scrollableItems = useScrollItems({
    children,
    data: scrollData,
    dataHeights,
    dataWidths,
    getKey,
    horiEnd,
    horiStart,
    runningHeight,
    runningWidth,
    vertEnd,
    vertStart,
  })

  const topItems = useScrollItems({
    children,
    data: topData,
    dataHeights: topHeights,
    dataWidths,
    getKey,
    horiStart,
    horiEnd,
    runningHeight: 0,
    runningWidth,
    vertStart: 0,
    vertEnd: topData.length,
  })

  const botItems = useScrollItems({
    children,
    data: botData,
    dataHeights: botHeights,
    dataWidths,
    getKey,
    horiStart,
    horiEnd,
    runningHeight: 0,
    runningWidth,
    vertStart: 0,
    vertEnd: topData.length,
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
            width: innerWidth,
            height: innerHeight + totalTopHeight + totalBotHeight,
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
              top={totalTopHeight}
            >
              {scrollableItems}
            </ScrollDiv>
            <div
              style={{
                position: "sticky",
                top: 0,
                left: 0,
              }}
            >
              <ScrollDiv
                top={0}
                topOffset={0}
                leftOffset={leftOffset}
                disableSticky={disableSticky}
              >
                {topItems}
              </ScrollDiv>
            </div>
            <div style={{ position: "sticky", top: adjustedHeight - totalBotHeight, left: 0 }}>
              <ScrollDiv
                top={0}
                leftOffset={leftOffset}
                topOffset={0}
                disableSticky={disableSticky}
              >
                {botItems}
              </ScrollDiv>
            </div>
          </StickyDiv>
        </div>
      </div>
    </SizingDiv>
  )
}
