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
