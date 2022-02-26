import * as React from "react"
import type { PropsWithChildren } from "react"

interface ScrollDivProps {
  disableSticky?: boolean
  style?: React.CSSProperties
  leftOffset: number
  topOffset: number
  top: number
  left: number
}

export function ScrollDiv({
  disableSticky,
  style,
  leftOffset,
  topOffset,
  top,
  left,
  children,
}: PropsWithChildren<ScrollDivProps>) {
  return (
    <div
      style={{
        position: "absolute",
        transform: `translate3d(${disableSticky ? 0 : -leftOffset}px, ${
          disableSticky ? 0 : -topOffset
        }px, 0px)`,
        top,
        left,
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  )
}
