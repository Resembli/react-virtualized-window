import * as React from "react"
import type { PropsWithChildren } from "react"

interface ScrollDivProps {
  disableSticky?: boolean
  leftOffset: number
  topOffset: number
  pinnedLeftWidth: number
}

export function ScrollDiv({
  disableSticky,
  leftOffset,
  topOffset,
  pinnedLeftWidth,
  children,
}: PropsWithChildren<ScrollDivProps>) {
  return (
    <div
      style={{
        position: "absolute",
        transform: `translate3d(${disableSticky ? 0 : -leftOffset}px, ${
          disableSticky ? 0 : -topOffset
        }px, 0px)`,
        top: 0,
        left: pinnedLeftWidth,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  )
}
