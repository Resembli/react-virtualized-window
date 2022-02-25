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
}: GridProps<T>) {
  const windowRef = React.useRef<HTMLDivElement>(null)
  useWindowApi(windowRef, apiRef)

  const [width, height, browserWidth] = useWindowDimensions(windowRef)
  const [overscan, disableSticky] = useSmartSticky(browserWidth, userOverscan, userDisableSticky)

  const [topOffset, leftOffset, onScroll] = useWindowScroll({
    userOnScroll,
  })

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
    count: data.length,
    defaultDimension: defaultRowHeight,
    windowDim: adjustedHeight,
    dimensions: rowHeights,
  })

  const [dataWidths, innerWidth] = useDataDimension({
    count: data[0]?.length ?? 0,
    defaultDimension: defaultColumnWidth,
    windowDim: adjustedWidth,
    dimensions: columnWidths,
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
    data,
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
            height: innerHeight,
          }}
        >
          <StickyDiv
            disabled={disableSticky ?? false}
            height={adjustedHeight}
            width={adjustedWidth}
          >
            <ScrollDiv disableSticky={disableSticky} topOffset={topOffset} leftOffset={leftOffset}>
              {scrollableItems}
            </ScrollDiv>
          </StickyDiv>
        </div>
      </div>
    </SizingDiv>
  )
}
