import type { CSSProperties } from "react"
import { memo, useMemo } from "react"
import { useRef } from "react"

import { getHorizontalGap, getMarginStyling } from "./itemGapUtilities"
import type { VirtualWindowBaseProps } from "./types"
import { useDataDimension } from "./useDataDimension"
import { useIndicesForDimensions } from "./useDimensionIndices"
import { useInnerDimension } from "./useInnerDimensions"
import { useWindowApi } from "./useWindowApi"
import { useWindowDimensions } from "./useWindowDimensions"
import { useWindowScroll } from "./useWindowScroll"

export interface ListHorizontalProps<T> extends VirtualWindowBaseProps {
  data: T[]
  children: <B extends T>(itemProps: B, style: CSSProperties) => JSX.Element
  defaultColumnWidth: number
  columnWidths?: number[]
}

export function ListHorizontal<T>({
  data,
  children,
  defaultColumnWidth,
  columnWidths,

  tabIndex,
  overscan,
  apiRef,

  className,
  style,
  gap,

  rtl,

  onScroll: userOnScroll,
}: ListHorizontalProps<T>) {
  const windowRef = useRef<HTMLDivElement>(null)
  const translationRef = useRef<HTMLDivElement>(null)

  useWindowApi(windowRef, apiRef)

  const [, offset, onScroll, isScrolling] = useWindowScroll({
    userOnScroll,
    rtl: rtl ?? false,
    translationRef,
    x: true,
    y: false,
  })
  const [width, height] = useWindowDimensions(windowRef)

  const dataWidths = useDataDimension({
    count: data.length,
    defaultDimension: defaultColumnWidth,
    dimensions: columnWidths,
  })

  const { left, right } = getHorizontalGap(gap)
  const gapBetweenItems = left + right
  const innerWidth = useInnerDimension({
    dataDimensions: dataWidths,
    gapBetweenItems,
    gapTop: 0,
  })

  const [start, end, runningWidth] = useIndicesForDimensions({
    windowDimension: width,
    offset,
    gapBetweenItems,
    itemDimensions: dataWidths,
    overscan: overscan ?? false,
  })

  const stickyWidth =
    dataWidths.slice(start, end + 1).reduce((a, b) => a + b + gapBetweenItems) +
    runningWidth +
    gapBetweenItems

  const items = useMemo(() => {
    return data.slice(start, end + 1)
  }, [data, end, start])

  return (
    <div
      ref={windowRef}
      onScroll={onScroll}
      tabIndex={tabIndex}
      className={className}
      style={{
        ...style,
        height: "100%",
        width: "100%",
        position: "relative",
        overflow: "auto",
        pointerEvents: isScrolling ? "none" : "all",
        direction: rtl ? "rtl" : "ltr",
      }}
    >
      <div style={{ width: innerWidth, height: "100%" }}>
        <div
          style={{
            position: "sticky",
            left: 0,
            height: "100%",
            display: "inline-block",
          }}
        >
          <div style={{ position: "absolute", left: 0, right: 0, width: stickyWidth }}>
            <div
              ref={translationRef}
              style={{
                height,
                transform: `translate3d(${rtl ? 0 : -offset}px, 0, 0)`,
                willChange: "transform",
              }}
            >
              <div style={{ display: "inline-block", width: runningWidth }} />
              {items.map((d, i) => {
                const itemWidth = dataWidths[start + i]

                const key = start + i

                return (
                  <RenderItem
                    key={key}
                    itemWidth={itemWidth}
                    component={children}
                    itemProps={d}
                    itemGap={gap}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type RenderItemsProps<T> = {
  component: ListHorizontalProps<T>["children"]
  itemGap: ListHorizontalProps<T>["gap"]
  itemProps: T
  itemWidth: number
}

const RenderItem = memo(function <T>({
  component,
  itemProps,
  itemGap,
  itemWidth,
}: RenderItemsProps<T>) {
  const itemStyle: CSSProperties = useMemo(() => {
    const marginStyling = getMarginStyling(itemGap)

    return {
      width: itemWidth,
      maxWidth: itemWidth,
      minWidth: itemWidth,
      display: "inline-block",
      height: `calc(100% - ${marginStyling.marginBottom + marginStyling.marginTop}px)`,
      ...marginStyling,
    }
  }, [itemGap, itemWidth])
  return component(itemProps, itemStyle)
})

RenderItem.displayName = "ListHorizontalItem"
