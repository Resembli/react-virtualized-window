import { useRef } from "react"

import type { ListHorizontalDataItem } from "../List/types"
import { useWindowDimensions } from "../useWindowDimensions"
import { useWindowScroll } from "../useWindowScroll"
import { useInnerWidth } from "./useInnerWidth"
import { useOffsetIndices } from "./useOffsetIndices"

export interface ListHorizontalProps<T> {
  columnWidth: number
  data: ListHorizontalDataItem<T>[]
  ItemComponent: (props: T) => JSX.Element | null
  variableWidths?: boolean
}

export const ListHorizontal = <T extends Record<string, unknown>>({
  columnWidth,
  data,
  ItemComponent,
  variableWidths = false,
}: ListHorizontalProps<T>) => {
  const windowRef = useRef<HTMLDivElement>(null)

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

  // Prevents an issue where we scroll to the bottom, then scrolling a little up applies a translation
  // moving the div a little higher than it should be.
  const translationOffset = innerWidth - offset - width < columnWidth ? 0 : -(offset - runningWidth)

  return (
    <div
      ref={windowRef}
      onScroll={onScroll}
      style={{
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
              const key = d.key ?? i
              const itemWidth = variableWidths ? d.width ?? columnWidth : columnWidth

              return (
                <div
                  key={key}
                  style={{ display: "inline-block", width: itemWidth, height: "100%" }}
                >
                  <ItemComponent {...d.props} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
