import * as React from "react"
import type { PropsWithChildren } from "react"

interface ScrollDivProps {
  rtl?: boolean
  disableSticky?: boolean
  leftOffset: number
  topOffset: number
  pinnedLeftWidth: number
  pinnedRightWidth: number
}

export function ScrollDiv({
  rtl,
  disableSticky,
  leftOffset,
  topOffset,
  pinnedLeftWidth,
  children,
}: PropsWithChildren<ScrollDivProps>) {
  if (rtl) {
    return (
      <div
        style={{
          position: "absolute",
          transform: `translate3d(${disableSticky ? 0 : leftOffset}px, ${
            disableSticky ? 0 : -topOffset
          }px, 0px)`,
          top: 0,
          right: pinnedLeftWidth,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    )
  }

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
