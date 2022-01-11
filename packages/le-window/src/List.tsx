import type { CSSProperties, MutableRefObject, UIEventHandler } from "react"
import { memo, useMemo } from "react"
import { useRef } from "react"

import { useDataDimension } from "./useDataDimension"
import { useIndicesForDimensions } from "./useDimensionIndices"
import { useInnerDimension } from "./useInnerDimensions"
import type { LeWindowApi } from "./useWindowApi"
import { useWindowApi } from "./useWindowApi"
import { useWindowDimensions } from "./useWindowDimensions"
import { useWindowScroll } from "./useWindowScroll"

export interface ListProps<T extends { key?: string | number }> {
  data: T[]
  ItemComponent: <B extends T>(props: B) => JSX.Element | null
  defaultRowHeight: number
  rowHeights?: number[]

  tabIndex?: number
  apiRef?: MutableRefObject<LeWindowApi | undefined>

  className?: string
  style?: CSSProperties

  onScroll?: UIEventHandler<HTMLElement>
}

export function List<T extends { key?: string | number }>({
  data,
  ItemComponent,
  defaultRowHeight,
  rowHeights,

  tabIndex,
  apiRef,

  className,
  style,

  onScroll: userOnScroll,
}: ListProps<T>) {
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

  const items = useMemo(() => {
    return data.slice(start, end + 1)
  }, [data, end, start])

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
              {items.map((d, i) => {
                const itemHeight = dataHeights[start + i]

                const { key: userProvidedKey, ...props } = d
                const key = userProvidedKey ?? start + i

                return (
                  <RenderItem
                    key={key}
                    itemHeight={itemHeight}
                    itemProps={props}
                    ItemComponent={ItemComponent}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type RenderItemsProps<T> = {
  ItemComponent: ListProps<T>["ItemComponent"]
  itemProps: T
  itemHeight: number
}

const RenderItem = memo(function <T>({
  itemProps,
  ItemComponent,
  itemHeight,
}: RenderItemsProps<T>) {
  return (
    <div
      style={{
        height: itemHeight,
        maxHeight: itemHeight,
        minHeight: itemHeight,
        display: "block",
      }}
    >
      <ItemComponent {...itemProps} />
    </div>
  )
})

RenderItem.displayName = "ListItem"
