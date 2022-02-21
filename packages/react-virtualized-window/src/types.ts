import type { VirtualWindowApi } from "./useWindowApi"

export type ItemGap = number | { horizontal?: number; vertical?: number }

export type NumberOrPercent = number | `${number}%`

export interface VirtualWindowBaseProps<T> {
  tabIndex?: number
  overscan?: number
  apiRef?: React.MutableRefObject<VirtualWindowApi | undefined>
  getKey?: (data: T) => string

  className?: string
  style?: React.CSSProperties
  gap?: ItemGap
  disableSticky?: boolean

  rtl?: boolean

  onScroll?: React.UIEventHandler<HTMLElement>

  width?: React.CSSProperties["width"]
  height?: React.CSSProperties["height"]

  "data-testid"?: string
}

export interface CellMeta {
  column: number
  row: number
  pinned?: "left" | "right"
}

export interface GridProps<T, L = unknown, R = unknown> extends VirtualWindowBaseProps<T> {
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

  pinnedLeft?: L[][]
  leftWidths?: NumberOrPercent[]

  pinnedRight?: R[][]
  rightWidths?: NumberOrPercent[]
}

export type RenderItem<T> = GridProps<T>["children"]
