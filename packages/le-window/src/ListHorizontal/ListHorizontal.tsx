import { useRef } from "react"

import type { ListHorizontalDataItem } from "../List/types"
import { useWindowScroll } from "../useWindowScroll"
import { useInnerWidth } from "./useInnerWidth"

export interface ListHorizontalProps<T> {
  columnWidth: number
  data: ListHorizontalDataItem<T>[]
  ItemComponent: (props: T) => JSX.Element | null
}

export const ListHorizontal = <T extends Record<string, unknown>>({
  columnWidth,
  data,
  ItemComponent,
}: ListHorizontalProps<T>) => {
  const windowRef = useRef<HTMLDivElement>(null)

  const [, offset, onScroll] = useWindowScroll()
  const innerWidth = useInnerWidth({ data, columnWidth })

  console.log(offset)
  return (
    <div
      ref={windowRef}
      onScroll={onScroll}
      style={{ height: "100%", width: "100%", position: "relative", overflow: "auto" }}
    >
      <div style={{ width: innerWidth, height: "100%" }}>
        <div style={{ position: "sticky", left: 0, height: "100%" }}>
          {data.map((d, i) => {
            const key = d.key ?? i

            return (
              <div
                style={{ width: columnWidth, display: "inline-block", height: "100%" }}
                key={key}
              >
                <ItemComponent {...d.props} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
