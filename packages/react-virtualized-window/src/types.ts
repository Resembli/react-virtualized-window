import type { VirtualWindowApi } from "./useWindowApi.js"

export type NumberOrPercent = number | `${number}%`

export interface VirtualWindowBaseProps<T> {
  tabIndex?: number
  overscan?: number
  apiRef?: React.MutableRefObject<VirtualWindowApi | undefined>
  getKey?: (data: T) => string

  className?: string
  style?: React.CSSProperties
  disableSticky?: boolean

  onScroll?: React.UIEventHandler<HTMLElement>

  width?: React.CSSProperties["width"]
  height?: React.CSSProperties["height"]

  pinnedTopCount?: number
  pinnedBottomCount?: number
  "data-testid"?: string
}

export interface CellMeta {
  column: number
  row: number
  pinnedColumn?: "left" | "right"
  pinnedRow?: "top" | "bottom"
}

export interface GridProps<T> extends VirtualWindowBaseProps<T> {
  data: T[][]
  children: <B extends T>(props: {
    data: B
    style: React.CSSProperties
    cellMeta: CellMeta
  }) => JSX.Element
  defaultRowHeight: NumberOrPercent
  rowHeights?: NumberOrPercent[]
  defaultColumnWidth: NumberOrPercent
  columnWidths?: NumberOrPercent[]

  pinnedLeftCount?: number
  pinnedRightCount?: number
}

export type RenderItem<T> = GridProps<T>["children"]
