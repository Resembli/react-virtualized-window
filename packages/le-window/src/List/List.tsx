import type { CSSProperties, MutableRefObject } from "react"
import { useRef } from "react"

import type { ListDataItem } from "./types"
import { useInnerHeight } from "./useInnerHeight"
import { useOffsetIndices } from "./useOffsetIndices"
import type { WindowApi } from "./useWindowApi"
import { useWindowApi } from "./useWindowApi"
import { useWindowDimensions } from "./useWindowDimensions"
import { useWindowScroll } from "./useWindowScroll"

export interface WindowProps<T> {
  rowHeight: number
  data: ListDataItem<T>[]
  ItemComponent: (props: T) => JSX.Element
  tabIndex?: number
  variableHeights?: boolean
  apiRef?: MutableRefObject<WindowApi | undefined>
  rtl?: boolean
  className?: string
  styles?: CSSProperties
  asItem?: boolean
}

export const List = <T extends Record<string, unknown>>({
  rowHeight,
  data,
  ItemComponent,
  tabIndex,
  variableHeights = false,
  apiRef,
  rtl,
  className,
  styles,
  asItem,
}: WindowProps<T>) => {
  const windowRef = useRef<HTMLDivElement>(null)

  useWindowApi(windowRef, apiRef)

  const [offset, , onScroll] = useWindowScroll()
  const [, height] = useWindowDimensions(windowRef)
  const innerHeight = useInnerHeight({ rowHeight, data, variableHeights })
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
      className={className}
      style={{
        ...styles,
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
              const itemHeight = variableHeights ? d.height ?? rowHeight : rowHeight

              const { styles = {} } = d.props

              if (asItem)
                return (
                  <ItemComponent
                    {...d.props}
                    styles={{
                      ...(styles as CSSProperties),
                      height: itemHeight,
                      maxHeight: itemHeight,
                      minHeight: itemHeight,
                    }}
                  />
                )

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
