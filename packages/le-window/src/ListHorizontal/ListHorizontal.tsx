import type { CSSProperties, MutableRefObject, UIEventHandler } from "react"
import { useEffect } from "react"
import { createElement } from "react"
import { useRef } from "react"

import type { ListHorizontalDataItem } from "../List/types"
import type { WindowApi } from "../useWindowApi"
import { useWindowApi } from "../useWindowApi"
import { useWindowDimensions } from "../useWindowDimensions"
import { useWindowScroll } from "../useWindowScroll"
import { useData } from "./useData"
import { useInnerWidth } from "./useInnerWidth"
import { useOffsetIndices } from "./useOffsetIndices"

export interface ListHorizontalProps<T> {
  columnWidth: number
  data: ListHorizontalDataItem<T>[]
  ItemComponent: (props: T) => JSX.Element | null
  tabIndex?: number
  variableWidths?: boolean
  apiRef?: MutableRefObject<WindowApi | undefined>
  rtl?: boolean
  className?: string
  style?: CSSProperties
  asItem?: boolean
  wrapperElement?: keyof JSX.IntrinsicElements
  wrapperClassName?: string
  wrapperStyle?: CSSProperties
  onScroll?: UIEventHandler<HTMLElement>
}

export const ListHorizontal = <T extends Record<string, unknown>>({
  columnWidth,
  data: userData,
  ItemComponent,
  tabIndex,
  variableWidths = false,
  apiRef,
  rtl = false,
  className,
  style,
  asItem,
  wrapperElement = "div",
  wrapperClassName,
  wrapperStyle,
}: ListHorizontalProps<T>) => {
  const windowRef = useRef<HTMLDivElement>(null)

  const data = useData(userData, rtl)

  useWindowApi(windowRef, apiRef)

  const [, offset, onScroll] = useWindowScroll()
  const innerWidth = useInnerWidth({ data, columnWidth, variableWidths })
  const [width] = useWindowDimensions(windowRef)
  const [start, end, runningWidth] = useOffsetIndices({
    columnWidth,
    width,
    offset,
    variableWidths,
    data,
  })

  // TODO: @Lee refactor this effect and fix the handling for scroll offsets
  // Sticky position and rtl does not work correctly on IOS devices. This is a workaround to simulate
  // rtl direction logic.
  useEffect(() => {
    // If there is already some scrolling done, then we do not reset the scroll logic.
    if (!windowRef.current || windowRef.current.scrollLeft !== 0) return

    if (!rtl) windowRef.current.scrollTo({ left: 0 })
    else windowRef.current.scrollTo({ left: innerWidth }) // innerWidth will be greater than actual width (by the size of the window)
  }, [innerWidth, rtl])

  // Prevents an issue where we scroll to the bottom, then scrolling a little up applies a translation
  // moving the div a little higher than it should be.
  const translationOffset = innerWidth - offset - width < columnWidth ? 0 : -(offset - runningWidth)

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
      }}
    >
      <div style={{ width: innerWidth, height: "100%" }}>
        <div style={{ position: "sticky", left: 0, height: "100%", display: "inline-block" }}>
          <div
            style={{
              height: "100%",
              transform: `translate3d(${translationOffset}px, 0, 0)`,
              willChange: "transform",
            }}
          >
            {data.slice(start, end + 1).map((d, i) => {
              const itemWidth = variableWidths ? d.width ?? columnWidth : columnWidth

              const { style = {} } = d.props
              const key = d.key ?? i

              if (asItem) {
                return (
                  <ItemComponent
                    {...d.props}
                    style={{
                      height: "100%",
                      ...(style as CSSProperties),
                      width: itemWidth,
                      maxWidth: itemWidth,
                      minWidth: itemWidth,
                      display: "inline-block",
                    }}
                  />
                )
              }

              return createElement(
                wrapperElement,
                {
                  key,
                  className: wrapperClassName,
                  style: {
                    ...wrapperStyle,
                    display: "inline-block",
                    width: itemWidth,
                    maxWidth: itemWidth,
                    minWidth: itemWidth,
                    height: "100%",
                  },
                },
                <ItemComponent {...d.props} />,
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}