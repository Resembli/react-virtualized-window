import type { CSSProperties } from "react"

export interface ListDataItem<T extends { styles?: CSSProperties }> {
  props: T
  height?: number
  key?: string | number
}
