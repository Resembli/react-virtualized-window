import { useMemo, useRef } from "react"

import { useWindowDimensions } from "./useWindowDimensions"
import { useWindowScroll } from "./useWindowScroll"

export interface WindowProps<T> {
  rowHeight: number
  data: T[]
  ItemComponent: (props: T) => JSX.Element
  tableIndex?: number
}

export const Window = <T extends Record<string, unknown>>({
  rowHeight,
  data,
  ItemComponent,
  tableIndex,
}: WindowProps<T>) => {
  const windowRef = useRef<HTMLDivElement>(null)

  const innerHeight = useMemo(() => rowHeight * data.length, [data.length, rowHeight])

  const [, height] = useWindowDimensions(windowRef)
  const [offset, onScroll] = useWindowScroll()

  // TODO: These calculations are for fixed size row heights. It will need to adjusted for variable size row heights.
  const itemsPerWindow = Math.ceil(height / rowHeight)

  const start = Math.max(0, Math.floor(offset / rowHeight))
  const end = itemsPerWindow + start

  // Prevents an issue where we scroll to the bottom, then scrolling a little up applies a translation
  // moving the div a little higher than it should be.
  const translationOffset = innerHeight - offset - height < rowHeight ? 0 : -offset % rowHeight

  return (
    <div
      tabIndex={tableIndex ?? -1}
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
              return (
                <div
                  key={i}
                  style={{ height: rowHeight, maxHeight: rowHeight, minHeight: rowHeight }}
                >
                  <ItemComponent {...d} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
