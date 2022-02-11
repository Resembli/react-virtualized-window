import type * as React from "react"

import type { VirtualWindowApi } from "./useWindowApi.js"

export type ItemGap = number | { horizontal?: number; vertical?: number }

export type NumberOrPercent = number | `${number}%`

export interface VirtualWindowBaseProps {
  tabIndex?: number
  overscan?: number
  apiRef?: React.MutableRefObject<VirtualWindowApi | undefined>

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
