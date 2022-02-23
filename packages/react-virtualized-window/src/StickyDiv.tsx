import * as React from "react"

interface StickyDivProps {
  width?: React.CSSProperties["width"]
  height?: React.CSSProperties["height"]
  disabled: boolean
}

export function StickyDiv({
  children,
  width,
  height,
  disabled,
}: React.PropsWithChildren<StickyDivProps>) {
  if (disabled) return <>{children}</>
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        willChange: "top, left",
        height,
        width,
      }}
    >
      {children}
    </div>
  )
}
