import type { CSSProperties, MutableRefObject, UIEventHandler } from "react"
import { createElement } from "react"
import { useRef } from "react"

import { useDataDimension } from "../useDataDimension"
import { useIndicesForDimensions } from "../useDimensionIndices"
import { useInnerDimension } from "../useInnerDimensions"
import type { WindowApi } from "../useWindowApi"
import { useWindowApi } from "../useWindowApi"
import { useWindowDimensions } from "../useWindowDimensions"
import { useWindowScroll } from "../useWindowScroll"

export interface ListDataItem<T> {
  props: T
  key?: string | number
}

export interface WindowProps<T> {
  data: ListDataItem<T>[]
  ItemComponent: (props: T) => JSX.Element | null
  tabIndex?: number
  defaultRowHeight: number
  rowHeights?: number[]
  apiRef?: MutableRefObject<WindowApi | undefined>
  rtl?: boolean
  className?: string
  style?: CSSProperties
  wrapperElement?: keyof JSX.IntrinsicElements
  wrapperClassName?: string
  wrapperStyle?: CSSProperties
  onScroll?: UIEventHandler<HTMLElement>
}

export const List = <T extends Record<string, unknown>>({
  defaultRowHeight,
  data,
  ItemComponent,
  tabIndex,
  rowHeights,
  apiRef,
  rtl,
  className,
  style,
  wrapperElement = "div",
  wrapperClassName,
  wrapperStyle,
  onScroll: userOnScroll,
}: WindowProps<T>) => {
  const windowRef = useRef<HTMLDivElement>(null)

  useWindowApi(windowRef, apiRef)

  const [offset, , onScroll] = useWindowScroll(userOnScroll)
  const [, height] = useWindowDimensions(windowRef)

  const dataHeights = useDataDimension({
    count: data.length,
    defaultDimension: defaultRowHeight,
    dimensions: rowHeights,
  })

  const innerHeight = useInnerDimension(dataHeights)
  const [start, end, runningHeight] = useIndicesForDimensions({
    itemDimensions: dataHeights,
    windowDimension: height,
    offset,
  })

  // Prevents an issue where we scroll to the bottom, then scrolling a little up applies a translation
  // moving the div a little higher than it should be.
  const translationOffset =
    innerHeight - offset - height < defaultRowHeight ? 0 : -(offset - runningHeight)

  return (
    <div
      tabIndex={tabIndex}
      ref={windowRef}
      onScroll={onScroll}
      className={className}
      style={{
        ...style,
        direction: rtl ? "rtl" : undefined,
        height: "100%",
        width: "100%",
        position: "relative",
        overflow: "auto",
      }}
    >
      <div style={{ height: innerHeight }}>
        <div style={{ position: "sticky", top: 0 }}>
          <div
            style={{
              transform: `translate3d(0, ${translationOffset}px, 0)`,
              willChange: "transform",
            }}
          >
            {data.slice(start, end + 1).map((d, i) => {
              const itemHeight = dataHeights[i]
              const key = d.key ?? i

              return createElement(
                wrapperElement,
                {
                  key,
                  className: wrapperClassName,
                  style: {
                    ...wrapperStyle,
                    height: itemHeight,
                    maxHeight: itemHeight,
                    minHeight: itemHeight,
                    display: "block",
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
