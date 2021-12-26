import type { CSSProperties, MutableRefObject, UIEventHandler } from "react"
import { useRef } from "react"

import { useDataDimension } from "./useDataDimension"
import { useIndicesForDimensions } from "./useDimensionIndices"
import { useInnerDimension } from "./useInnerDimensions"
import type { WindowApi } from "./useWindowApi"
import { useWindowApi } from "./useWindowApi"
import { useWindowDimensions } from "./useWindowDimensions"
import { useWindowScroll } from "./useWindowScroll"

export interface ListHorizontalDataItem<T> {
  props: T
  key?: string | number
}

export interface ListHorizontalProps<T> {
  data: ListHorizontalDataItem<T>[]
  ItemComponent: (props: T) => JSX.Element | null
  defaultColumnWidth: number
  columnWidths?: number[]

  tabIndex?: number
  apiRef?: MutableRefObject<WindowApi | undefined>

  className?: string
  style?: CSSProperties

  onScroll?: UIEventHandler<HTMLElement>
}

export const ListHorizontal = <T extends Record<string, unknown>>({
  data,
  ItemComponent,
  defaultColumnWidth,
  columnWidths,

  tabIndex,
  apiRef,

  className,
  style,

  onScroll: userOnScroll,
}: ListHorizontalProps<T>) => {
  const windowRef = useRef<HTMLDivElement>(null)

  useWindowApi(windowRef, apiRef)

  const [, offset, onScroll] = useWindowScroll(userOnScroll)
  const [width, height] = useWindowDimensions(windowRef)

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

  const stickyWidth = dataWidths.slice(start, end + 1).reduce((a, b) => a + b) + runningWidth

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
        <div
          style={{
            position: "sticky",
            left: 0,
            height: "100%",
            display: "inline-block",
          }}
        >
          <div style={{ position: "absolute", left: 0, width: stickyWidth }}>
            <div
              style={{
                height,
                transform: `translate3d(${-offset}px, 0, 0)`,
                willChange: "transform",
              }}
            >
              <div style={{ display: "inline-block", width: runningWidth }} />
              {data.slice(start, end + 1).map((d, i) => {
                const itemWidth = dataWidths[start + i]
                const key = d.key ?? i

                return (
                  <div
                    key={key}
                    style={{
                      display: "inline-block",
                      width: itemWidth,
                      maxWidth: itemWidth,
                      minWidth: itemWidth,
                      height: "100%",
                    }}
                  >
                    <ItemComponent {...d.props} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
