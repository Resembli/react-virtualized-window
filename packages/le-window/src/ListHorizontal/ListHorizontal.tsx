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

export interface ListHorizontalDataItem<T> {
  props: T
  key?: string | number
}

export interface ListHorizontalProps<T> {
  defaultColumnWidth: number
  data: ListHorizontalDataItem<T>[]
  ItemComponent: (props: T) => JSX.Element | null
  tabIndex?: number
  columnWidths?: number[]
  apiRef?: MutableRefObject<WindowApi | undefined>
  className?: string
  style?: CSSProperties
  wrapperElement?: keyof JSX.IntrinsicElements
  wrapperClassName?: string
  wrapperStyle?: CSSProperties
  onScroll?: UIEventHandler<HTMLElement>
}

export const ListHorizontal = <T extends Record<string, unknown>>({
  defaultColumnWidth,
  data,
  ItemComponent,
  tabIndex,
  columnWidths,
  apiRef,
  className,
  style,
  wrapperElement = "div",
  wrapperClassName,
  wrapperStyle,
}: ListHorizontalProps<T>) => {
  const windowRef = useRef<HTMLDivElement>(null)

  useWindowApi(windowRef, apiRef)

  const [, offset, onScroll] = useWindowScroll()
  const [width] = useWindowDimensions(windowRef)

  const dataWidths = useDataDimension({
    count: data.length,
    defaultDimension: defaultColumnWidth,
    dimensions: columnWidths,
  })

  const innerWidth = useInnerDimension(dataWidths)

  const [start, end, runningWidth] = useIndicesForDimensions({
    windowDimension: width,
    offset,
    itemDimensions: dataWidths,
  })

  // Prevents an issue where we scroll to the bottom, then scrolling a little up applies a translation
  // moving the div a little higher than it should be.
  const translationOffset =
    innerWidth - offset - width < defaultColumnWidth ? 0 : -(offset - runningWidth)

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
              const itemWidth = dataWidths[i]
              const key = d.key ?? i

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
