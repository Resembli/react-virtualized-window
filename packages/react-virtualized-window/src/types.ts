import type { CSSProperties, MutableRefObject, UIEventHandler } from "react"

import type { VirtualWindowApi } from "./useWindowApi"

export type ItemGap = number | { horizontal?: number; vertical?: number }

export interface VirtualWindowBaseProps {
  tabIndex?: number
  overscan?: boolean | number
  apiRef?: MutableRefObject<VirtualWindowApi | undefined>

  className?: string
  style?: CSSProperties
  gap?: ItemGap

  rtl?: boolean

  onScroll?: UIEventHandler<HTMLElement>

  width?: CSSProperties["width"]
  height?: CSSProperties["height"]
}
