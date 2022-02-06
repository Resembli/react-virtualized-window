import type { CSSProperties, PropsWithChildren } from "react"

interface StickyDivProps {
  display?: CSSProperties["display"]
  absDisplay?: CSSProperties["display"]
  width?: CSSProperties["width"]
  height?: CSSProperties["height"]
  topOffset?: number
  leftOffset?: number
  disabled: boolean
}

export function StickyDiv({
  display,
  absDisplay,
  topOffset = 0,
  leftOffset = 0,
  children,
  disabled,
  width,
  height,
}: PropsWithChildren<StickyDivProps>) {
  if (disabled) return <>{children}</>
  return (
    <div style={{ position: "sticky", top: 0, left: 0, display, height, width, background: "red" }}>
      <div
        style={{
          position: "absolute",
          display: absDisplay,
          height: "100%",
          transform: `translate3d(${-leftOffset}px, ${-topOffset}px, 0)`,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  )
}
