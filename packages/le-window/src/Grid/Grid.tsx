import { useRef } from "react"

import type { GridDataRow } from "../types"
import { useInnerGridDimensions } from "../useInnerDimensions"
import { useWindowDimensions } from "../useWindowDimensions"
import { useWindowScroll } from "../useWindowScroll"

interface GridProps<T> {
  data: GridDataRow<T>[]
  rowHeight: number
  columnWidth: number
}

export const Grid = <T extends Record<string, unknown>>({
  data,
  rowHeight,
  columnWidth,
}: GridProps<T>) => {
  const windowRef = useRef<HTMLDivElement>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [topOffset, leftOffset, onScroll] = useWindowScroll()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [width, height] = useWindowDimensions(windowRef)

  const [innerWidth, innerHeight] = useInnerGridDimensions({ data, rowHeight, columnWidth })

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
      <div style={{ width: innerWidth, height: innerHeight }}></div>
    </div>
  )
}
