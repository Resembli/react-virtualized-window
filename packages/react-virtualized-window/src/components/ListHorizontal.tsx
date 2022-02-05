import type { CSSProperties } from "react"
import { memo, useMemo } from "react"
import { useRef } from "react"

import { SizingDiv } from "../SizingDiv"
import { StickyDiv } from "../StickyDiv"
import {
  getHorizontalGap,
  getHorizontalMarginStyling,
  getVerticalMarginStyling,
} from "../itemGapUtilities"
import type { NumberOrPercent, VirtualWindowBaseProps } from "../types"
import { useDataDimension } from "../useDataDimension"
import { useIndicesForDimensions } from "../useDimensionIndices"
import { useInnerDimension } from "../useInnerDimensions"
import { useMaxOffset } from "../useMaxOffset"
import { useWindowApi } from "../useWindowApi"
import { useWindowDimensions } from "../useWindowDimensions"
import { useWindowScroll } from "../useWindowScroll"

interface ColumnMeta {
  column: number
}

export interface ListHorizontalProps<T> extends VirtualWindowBaseProps {
  data: T[]
  children: <B extends T>(itemProps: B, style: CSSProperties, columnMeta: ColumnMeta) => JSX.Element
  defaultColumnWidth: NumberOrPercent
  columnWidths?: NumberOrPercent[]
}

export function ListHorizontal<T>({
  data,
  children,
  defaultColumnWidth,
  columnWidths,

  tabIndex,
  overscan,
  apiRef,
  disableSticky,

  className,
  style,
  gap,

  "data-testid": testId,

  rtl,

  width: sizingWidth,
  height: sizingHeight,

  onScroll: userOnScroll,
}: ListHorizontalProps<T>) {
  const windowRef = useRef<HTMLDivElement>(null)
  const innerWindowRef = useRef<HTMLDivElement>(null)

  useWindowApi(windowRef, apiRef)

  const [width] = useWindowDimensions(windowRef)

  const dataWidths = useDataDimension({
    count: data.length,
    defaultDimension: defaultColumnWidth,
    windowDim: width,
    dimensions: columnWidths,
  })

  const gapBetweenItems = getHorizontalGap(gap)
  const innerWidth = useInnerDimension({
    dataDimensions: dataWidths,
    gapBetweenItems,
  })

  const [, scrollOffset, onScroll, isScrolling] = useWindowScroll({
    userOnScroll,
    rtl: rtl ?? false,
  })

  const offset = useMaxOffset(scrollOffset, innerWidth - width)

  const [start, end, runningWidth] = useIndicesForDimensions({
    windowDimension: width,
    offset,
    gapBetweenItems,
    itemDimensions: dataWidths,
    overscan: overscan ?? 0,
  })

  const stickyWidth =
    dataWidths.slice(start, end + 1).reduce((a, b) => a + b + gapBetweenItems, 0) +
    runningWidth +
    gapBetweenItems

  const items = useMemo(() => {
    return data.slice(start, end + 1)
  }, [data, end, start])

  const innerWindowHeight = innerWindowRef.current?.clientHeight

  return (
    <SizingDiv width={sizingWidth} height={sizingHeight} testId={testId}>
      <div
        ref={windowRef}
        onScroll={onScroll}
        tabIndex={tabIndex}
        className={className}
        style={{
          ...style,
          height: "100%",
          width: width,
          position: "relative",
          overflow: "auto",
          pointerEvents: isScrolling ? "none" : "all",
          direction: rtl ? "rtl" : "ltr",
        }}
      >
        <div ref={innerWindowRef} style={{ width: innerWidth, height: "100%" }}>
          <StickyDiv
            disabled={disableSticky ?? false}
            display="inline-block"
            height="100%"
            width={stickyWidth}
          >
            <div
              style={{
                display: "flex",
                height: innerWindowHeight,
                transform: disableSticky ? undefined : `translate3d(${rtl ? 0 : -offset}px, 0, 0)`,
                willChange: "transform",
              }}
            >
              <div style={{ width: runningWidth }} />
              {items.map((d, i) => {
                const itemWidth = dataWidths[start + i]

                const key = start + i

                const isLastItem = rtl ? start + i === 0 : start + i === data.length - 1

                return (
                  <RenderItem
                    key={key}
                    isLastItem={isLastItem}
                    itemWidth={itemWidth}
                    component={children}
                    itemProps={d}
                    itemGap={gap}
                    column={start + i}
                  />
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
  component: ListHorizontalProps<T>["children"]
  itemGap: ListHorizontalProps<T>["gap"]
  isLastItem: boolean
  itemProps: T
  itemWidth: number
  column: number
}

const RenderItem = memo(function <T>({
  component,
  itemProps,
  isLastItem,
  itemGap,
  itemWidth,
  column,
}: RenderItemsProps<T>) {
  const itemStyle: CSSProperties = useMemo(() => {
    const verticalMarginStyling = getVerticalMarginStyling(itemGap)
    const horizontalMarginStyling = getHorizontalMarginStyling(itemGap, isLastItem)

    return {
      width: itemWidth,
      maxWidth: itemWidth,
      minWidth: itemWidth,
      height: `calc(100% - ${
        verticalMarginStyling.marginBottom + verticalMarginStyling.marginTop
      }px)`,
      ...verticalMarginStyling,
      ...horizontalMarginStyling,
    }
  }, [isLastItem, itemGap, itemWidth])

  const columnMeta = useMemo<ColumnMeta>(() => ({ column }), [column])

  return component(itemProps, itemStyle, columnMeta)
})

RenderItem.displayName = "ListHorizontalItem"
