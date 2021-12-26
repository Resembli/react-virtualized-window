import type { CSSProperties, MutableRefObject, UIEventHandler } from "react"
import { createElement } from "react"
import { useRef } from "react"

import { useDataDimension } from "./useDataDimension"
import { useIndicesForDimensions } from "./useDimensionIndices"
import { useInnerDimension } from "./useInnerDimensions"
import type { WindowApi } from "./useWindowApi"
import { useWindowApi } from "./useWindowApi"
import { useWindowDimensions } from "./useWindowDimensions"
import { useWindowScroll } from "./useWindowScroll"

export interface ListDataItem<T> {
  props: T
  key?: string | number
}

export interface WindowProps<T> {
  data: ListDataItem<T>[]
  ItemComponent: (props: T) => JSX.Element | null
  defaultRowHeight: number
  rowHeights?: number[]

  tabIndex?: number
  apiRef?: MutableRefObject<WindowApi | undefined>

  className?: string
  style?: CSSProperties

  wrapperElement?: keyof JSX.IntrinsicElements
  wrapperClassName?: string
  wrapperStyle?: CSSProperties

  onScroll?: UIEventHandler<HTMLElement>
}

export const List = <T extends Record<string, unknown>>({
  data,
  ItemComponent,
  defaultRowHeight,
  rowHeights,

  tabIndex,
  apiRef,

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
      }}
    >
      <div style={{ height: innerHeight }}>
        <div style={{ position: "sticky", top: 0 }}>
          <div style={{ position: "absolute", top: 0, width: "100%" }}>
            <div
              style={{
                transform: `translate3d(0, ${-offset}px, 0)`,
                willChange: "transform",
              }}
            >
              <div style={{ height: runningHeight }}></div>
              {data.slice(start, end + 1).map((d, i) => {
                const itemHeight = dataHeights[start + i]
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
    </div>
  )
}
