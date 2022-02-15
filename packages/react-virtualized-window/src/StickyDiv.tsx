import * as React from "react"

interface StickyDivProps {
  display?: React.CSSProperties["display"]
  absDisplay?: React.CSSProperties["display"]
  width?: React.CSSProperties["width"]
  height?: React.CSSProperties["height"]
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
}: React.PropsWithChildren<StickyDivProps>) {
  const transform = disabled
    ? undefined
    : `translate3d(${rtl ? 0 : -leftOffset}px, ${-topOffset}px, 0)`

  return (
    <DivWithSticky width={width} height={height} disabled={disabled} display={display}>
      <div
        style={{
          position: "absolute",
          display: absDisplay,
          height: "100%",
          transform,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </DivWithSticky>
  )
}

function DivWithSticky({
  children,
  disabled,
  height,
  width,
  display,
}: React.PropsWithChildren<StickyDivProps>) {
  if (disabled) return <>{children}</>

  return (
    <div style={{ position: "sticky", top: 0, left: 0, display, height, width }}>{children}</div>
  )
}
