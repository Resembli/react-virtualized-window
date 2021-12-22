import { useRef } from "react"

import type { WindowDataItem } from "./types"
import { useInnerDimensions } from "./useInnerDimensions"
import { useOffsetIndices } from "./useOffsetIndices"
import { useWindowDimensions } from "./useWindowDimensions"
import { useWindowScroll } from "./useWindowScroll"

export interface WindowProps<T> {
  rowHeight: number
  data: WindowDataItem<T>[]
  ItemComponent: (props: T) => JSX.Element
  tabIndex?: number
  variableHeights?: boolean
}

export const Window = <T extends Record<string, unknown>>({
  rowHeight,
  data,
  ItemComponent,
  tabIndex,
  variableHeights = false,
}: WindowProps<T>) => {
  const windowRef = useRef<HTMLDivElement>(null)

  const [offset, onScroll] = useWindowScroll()
  const [, height] = useWindowDimensions(windowRef)
  const [, innerHeight] = useInnerDimensions({ rowHeight, data, variableHeights })
  const [start, end, runningHeight] = useOffsetIndices({
    rowHeight,
    height,
    offset,
    variableHeights,
    data,
  })

  // Prevents an issue where we scroll to the bottom, then scrolling a little up applies a translation
  // moving the div a little higher than it should be.
  const translationOffset =
    innerHeight - offset - height < rowHeight ? 0 : -(offset - runningHeight)

  return (
    <div
      tabIndex={tabIndex}
      ref={windowRef}
      onScroll={onScroll}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        overflow: "auto",
      }}
    >
      <div style={{ height: innerHeight }}>
        <div style={{ position: "sticky", top: 0 }}>
          <div style={{ transform: `translate3d(0, ${translationOffset}px, 0)` }}>
            {data.slice(start, end + 1).map((d, i) => {
              const itemHeight = variableHeights ? d.height ?? rowHeight : rowHeight
              return (
                <div
                  key={i}
                  style={{ height: itemHeight, maxHeight: itemHeight, minHeight: itemHeight }}
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
