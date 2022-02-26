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
  pinnedLeftCount = 0,
  pinnedRightCount = 0,
}: GridProps<T>) {
  const windowRef = React.useRef<HTMLDivElement>(null)
  useWindowApi(windowRef, apiRef)

  const [width, height, browserWidth] = useWindowDimensions(windowRef)
  const [overscan, disableSticky] = useSmartSticky(browserWidth, userOverscan, userDisableSticky)

  const [topOffset, leftOffset, onScroll] = useWindowScroll({
    userOnScroll,
  })

  const [topLeft, topMid, topRight, midLeft, midMid, midRight, botLeft, botMid, botRight] =
    React.useMemo(() => {
      const topSection = data.slice(0, pinnedTopCount)
      const botSection = data.slice(pinnedTopCount, pinnedTopCount + pinnedBottomCount)
      const midSection = data.slice(pinnedTopCount + pinnedBottomCount)

      const topLeft = topSection.map((row) => row.slice(0, pinnedLeftCount))
      const topMid = topSection.map((row) => row.slice(pinnedLeftCount))
      const topRight = topSection.map((row) =>
        row.slice(pinnedLeftCount, pinnedLeftCount + pinnedRightCount),
      )

      const midLeft = midSection.map((row) => row.slice(0, pinnedLeftCount))
      const midMid = midSection.map((row) => row.slice(pinnedLeftCount))
      const midRight = midSection.map((row) =>
        row.slice(pinnedLeftCount, pinnedLeftCount + pinnedRightCount),
      )

      const botLeft = botSection.map((row) => row.slice(0, pinnedLeftCount))
      const botMid = botSection.map((row) => row.slice(pinnedLeftCount))
      const botRight = botSection.map((row) =>
        row.slice(pinnedLeftCount, pinnedLeftCount + pinnedRightCount),
      )

      return [topLeft, topMid, topRight, midLeft, midMid, midRight, botLeft, botMid, botRight]
    }, [data, pinnedBottomCount, pinnedLeftCount, pinnedRightCount, pinnedTopCount])

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
    count: midMid.length,
    defaultDimension: defaultRowHeight,
    windowDim: adjustedHeight,
    dimensions: rowHeights,
  })

  const [dataWidths, innerWidth] = useDataDimension({
    count: midMid[0]?.length ?? 0,
    defaultDimension: defaultColumnWidth,
    windowDim: adjustedWidth,
    dimensions: columnWidths,
  })

  const [topHeights, totalTopHeight] = useDataDimension({
    count: topMid.length,
    defaultDimension: defaultRowHeight,
    windowDim: adjustedHeight,
    dimensions: rowHeights,
  })

  const [botHeights, totalBotHeight] = useDataDimension({
    count: botMid.length,
    defaultDimension: defaultRowHeight,
    windowDim: adjustedHeight,
    dimensions: rowHeights,
  })

  const totalLeftWidth = React.useMemo(
    () => (pinnedLeftCount ? dataWidths.slice(0, pinnedLeftCount).reduce((a, b) => a + b) : 0),
    [dataWidths, pinnedLeftCount],
  )

  const totalRightWidth = React.useMemo(
    () =>
      pinnedRightCount
        ? dataWidths
            .slice(pinnedLeftCount, pinnedLeftCount + pinnedRightCount)
            .reduce((a, b) => a + b)
        : 0,
    [dataWidths, pinnedLeftCount, pinnedRightCount],
  )

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
    data: midMid,
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

  const midLeftItems = useScrollItems({
    children,
    data: midLeft,
    dataHeights,
    dataWidths,
    getKey,
    horiStart: 0,
    horiEnd: pinnedLeftCount,
    runningHeight,
    runningWidth: 0,
    vertStart,
    vertEnd,
  })

  const midRightItems = useScrollItems({
    children,
    data: midRight,
    dataHeights,
    dataWidths,
    getKey,
    horiStart: 0,
    horiEnd: pinnedLeftCount,
    runningHeight,
    runningWidth: 0,
    vertStart,
    vertEnd,
  })

  const topLeftItems = useScrollItems({
    children,
    data: topLeft,
    dataHeights: topHeights,
    dataWidths,
    getKey,
    horiStart: 0,
    horiEnd: pinnedLeftCount,
    runningHeight: 0,
    runningWidth: 0,
    vertStart: 0,
    vertEnd: pinnedTopCount,
  })

  const topMidItems = useScrollItems({
    children,
    data: topMid,
    dataHeights: topHeights,
    dataWidths,
    getKey,
    horiStart,
    horiEnd,
    runningHeight: 0,
    runningWidth,
    vertStart: 0,
    vertEnd: topMid.length,
  })

  const topRightItems = useScrollItems({
    children,
    data: topRight,
    dataHeights: topHeights,
    dataWidths,
    getKey,
    horiStart: 0,
    horiEnd: pinnedLeftCount,
    runningHeight: 0,
    runningWidth: 0,
    vertStart: 0,
    vertEnd: pinnedTopCount,
  })

  const botMidItems = useScrollItems({
    children,
    data: botMid,
    dataHeights: botHeights,
    dataWidths,
    getKey,
    horiStart,
    horiEnd,
    runningHeight: 0,
    runningWidth,
    vertStart: 0,
    vertEnd: topMid.length,
  })

  const botLeftItems = useScrollItems({
    children,
    data: botLeft,
    dataHeights: botHeights,
    dataWidths,
    getKey,
    horiStart: 0,
    horiEnd: pinnedLeftCount,
    runningHeight: 0,
    runningWidth: 0,
    vertStart: 0,
    vertEnd: pinnedBottomCount,
  })

  const botRightItems = useScrollItems({
    children,
    data: botRight,
    dataHeights: botHeights,
    dataWidths,
    getKey,
    horiStart: 0,
    horiEnd: pinnedLeftCount,
    runningHeight: 0,
    runningWidth: 0,
    vertStart: 0,
    vertEnd: pinnedBottomCount,
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
            width: innerWidth + totalLeftWidth + totalRightWidth,
            height: innerHeight + totalTopHeight + totalBotHeight,
          }}
        >
          <StickyDiv
            disabled={disableSticky ?? false}
            height={adjustedHeight}
            width={adjustedWidth}
          >
            {/* Scrollable Window */}
            <ScrollDiv
              disableSticky={disableSticky}
              topOffset={topOffset}
              leftOffset={leftOffset}
              top={totalTopHeight}
              left={totalLeftWidth}
            >
              {scrollableItems}
            </ScrollDiv>
            {/* Mid Left */}
            <div style={{ position: "sticky", left: 0, width: adjustedWidth }}>
              <ScrollDiv
                disableSticky={disableSticky}
                topOffset={topOffset}
                leftOffset={0}
                top={totalTopHeight}
                left={0}
              >
                {midLeftItems}
              </ScrollDiv>
            </div>

            {/* Mid Right */}
            <div style={{ position: "sticky", left: 0, width: adjustedWidth }}>
              <ScrollDiv
                disableSticky={disableSticky}
                topOffset={topOffset}
                leftOffset={0}
                top={totalTopHeight}
                left={adjustedWidth - totalRightWidth}
              >
                {midRightItems}
              </ScrollDiv>
            </div>

            {/* Top Mid */}
            <div
              style={{
                position: "sticky",
                top: 0,
                left: 0,
              }}
            >
              <ScrollDiv
                disableSticky={disableSticky}
                topOffset={0}
                leftOffset={leftOffset}
                top={0}
                left={totalLeftWidth}
              >
                {topMidItems}
              </ScrollDiv>
            </div>
            {/* Top Left */}
            <div style={{ position: "sticky", top: 0, left: 0, width: adjustedWidth }}>
              <ScrollDiv disableSticky={false} top={0} left={0} topOffset={0} leftOffset={0}>
                {topLeftItems}
              </ScrollDiv>
            </div>
            {/* Top Right */}
            <div style={{ position: "sticky", top: 0, left: 0, width: adjustedWidth }}>
              <ScrollDiv
                disableSticky={false}
                top={0}
                left={adjustedWidth - totalRightWidth}
                topOffset={0}
                leftOffset={0}
              >
                {topRightItems}
              </ScrollDiv>
            </div>

            {/* Bot Mid */}
            <div style={{ position: "sticky", top: adjustedHeight - totalBotHeight, left: 0 }}>
              <ScrollDiv
                disableSticky={disableSticky}
                leftOffset={leftOffset}
                topOffset={0}
                top={0}
                left={totalLeftWidth}
              >
                {botMidItems}
              </ScrollDiv>
            </div>
            {/* Bot Left */}
            <div
              style={{
                position: "sticky",
                top: adjustedHeight - totalBotHeight,
                left: 0,
                width: adjustedWidth,
              }}
            >
              <ScrollDiv
                disableSticky={disableSticky}
                leftOffset={0}
                topOffset={0}
                top={0}
                left={0}
              >
                {botLeftItems}
              </ScrollDiv>
            </div>
            <div
              style={{
                position: "sticky",
                top: adjustedHeight - totalBotHeight,
                left: 0,
                width: adjustedWidth,
              }}
            >
              <ScrollDiv
                disableSticky={disableSticky}
                leftOffset={0}
                topOffset={0}
                top={0}
                left={adjustedWidth - totalRightWidth}
              >
                {botRightItems}
              </ScrollDiv>
            </div>
          </StickyDiv>
        </div>
      </div>
    </SizingDiv>
  )
}
