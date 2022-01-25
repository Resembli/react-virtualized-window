import type { CSSProperties } from "react"
import { memo, useMemo } from "react"
import { useRef } from "react"

import { getMarginStyling, getVerticalGap } from "./itemGapUtilities"
import type { VirtualWindowBaseProps } from "./types"
import { useDataDimension } from "./useDataDimension"
import { useIndicesForDimensions } from "./useDimensionIndices"
import { useInnerDimension } from "./useInnerDimensions"
import { useWindowApi } from "./useWindowApi"
import { useWindowDimensions } from "./useWindowDimensions"
import { useWindowScroll } from "./useWindowScroll"

export interface ListProps<T> extends VirtualWindowBaseProps {
  data: T[]
  children: <B extends T>(itemProps: B, style: CSSProperties) => JSX.Element
  defaultRowHeight: number
  rowHeights?: number[]
}

export function List<T>({
  data,
  children,
  defaultRowHeight,
  rowHeights,

  tabIndex,
  overscan,
  apiRef,

  className,
  style,
  gap,

  rtl,

  onScroll: userOnScroll,
}: ListProps<T>) {
  const windowRef = useRef<HTMLDivElement>(null)
  const translationRef = useRef<HTMLDivElement>(null)

  useWindowApi(windowRef, apiRef)

  const [offset, , onScroll, isScrolling] = useWindowScroll({
    userOnScroll,
    rtl: rtl ?? false,
    translationRef,
    x: false,
    y: true,
  })
  const [, height] = useWindowDimensions(windowRef)

  const dataHeights = useDataDimension({
    count: data.length,
    defaultDimension: defaultRowHeight,
    dimensions: rowHeights,
  })

  const { top, bottom } = getVerticalGap(gap)

  const innerHeight = useInnerDimension({
    dataDimensions: dataHeights,
    gapBetweenItems: Math.max(top, bottom),
    gapTop: top,
  })

  const [start, end, runningHeight] = useIndicesForDimensions({
    itemDimensions: dataHeights,
    windowDimension: height,
    gapBetweenItems: Math.max(top, bottom),
    offset,
    overscan: overscan ?? false,
  })

  const items = useMemo(() => {
    return data.slice(start, end + 1)
  }, [data, end, start])

  return (
    <div
      tabIndex={tabIndex}
      ref={windowRef}
      onScroll={onScroll}
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
      <div style={{ height: innerHeight }}>
        <div style={{ position: "sticky", top: 0 }}>
          <div style={{ position: "absolute", top: 0, width: "100%" }}>
            <div
              ref={translationRef}
              style={{
                transform: `translate3d(0, ${-offset}px, 0)`,
                willChange: "transform",
              }}
            >
              <div style={{ height: runningHeight }}></div>
              {items.map((d, i) => {
                const itemHeight = dataHeights[start + i]

                const key = start + i

                return (
                  <RenderItem
                    key={key}
                    itemHeight={itemHeight}
                    itemProps={d}
                    itemGap={gap}
                    component={children}
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
  component: ListProps<T>["children"]
  itemGap: ListProps<T>["gap"]
  itemProps: T
  itemHeight: number
}

const RenderItem = memo(function <T>({
  itemProps,
  itemGap,
  component,
  itemHeight,
}: RenderItemsProps<T>) {
  const itemStyle = useMemo(() => {
    const marginStyle = getMarginStyling(itemGap)

    return {
      height: itemHeight,
      maxHeight: itemHeight,
      minHeight: itemHeight,
      ...marginStyle,
    }
  }, [itemGap, itemHeight])

  return component(itemProps, itemStyle)
})

RenderItem.displayName = "ListItem"
