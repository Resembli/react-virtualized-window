import * as React from "react"

interface StickyDivProps {
  width?: React.CSSProperties["width"]
  height?: React.CSSProperties["height"]
  rtl: boolean
  disabled: boolean
}

export function StickyDiv({
  children,
  width,
  height,
  rtl,
  disabled,
}: React.PropsWithChildren<StickyDivProps>) {
  if (disabled) return <>{children}</>
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        left: rtl ? undefined : 0,
        right: rtl ? 0 : undefined,
        willChange: "top, left",
        height,
        width,
      }}
    >
      {children}
    </div>
  )
}
