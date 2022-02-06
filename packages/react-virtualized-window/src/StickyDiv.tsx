import type { CSSProperties, PropsWithChildren } from "react"

interface StickyDivProps {
  display?: CSSProperties["display"]
  absDisplay?: CSSProperties["display"]
  width?: CSSProperties["width"]
  height?: CSSProperties["height"]
  topOffset?: number
  leftOffset?: number
  rtl?: boolean
  disabled: boolean
}

export function StickyDiv({
  display,
  absDisplay,
  topOffset = 0,
  leftOffset = 0,
  children,
  width,
  height,
  rtl,
  disabled,
}: PropsWithChildren<StickyDivProps>) {
  if (disabled) return <>{children}</>
  return (
    <div style={{ position: "sticky", top: 0, left: 0, display, height, width }}>
      <div
        style={{
          position: "absolute",
          display: absDisplay,
          height: "100%",
          transform: `translate3d(${rtl ? 0 : -leftOffset}px, ${-topOffset}px, 0)`,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  )
}
