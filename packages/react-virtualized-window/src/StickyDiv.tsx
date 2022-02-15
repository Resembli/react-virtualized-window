import * as React from "react"

interface StickyDivProps {
  absDisplay?: React.CSSProperties["display"]
  width?: React.CSSProperties["width"]
  height?: React.CSSProperties["height"]
  topOffset?: number
  leftOffset?: number
  rtl?: boolean
  disabled: boolean
}

export function StickyDiv({
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
    <DivWithSticky width={width} height={height} disabled={disabled}>
      <div
        style={{
          position: "absolute",
          display: absDisplay,
          height: "100%",
          left: 100,
          top: 100,
          transform,
          willChange: "transform",
        }}
      >
        {children}
      </div>
      <div
        style={{
          height: 100,
          width: "100%",
          background: "red",
          position: "absolute",
        }}
      ></div>
      <div
        style={{
          height: 100,
          width: "100%",
          background: "red",
          bottom: 0,
          position: "absolute",
        }}
      ></div>
      <div style={{ height: "100%", width: 100, position: "absolute", background: "red" }}></div>
      <div
        style={{ height: "100%", width: 100, right: 0, position: "absolute", background: "red" }}
      ></div>
    </DivWithSticky>
  )
}

function DivWithSticky({
  children,
  disabled,
  height,
  width,
}: React.PropsWithChildren<StickyDivProps>) {
  if (disabled) return <>{children}</>

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        height,
        width,
      }}
    >
      {children}
    </div>
  )
}
