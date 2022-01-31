import type { CSSProperties, PropsWithChildren } from "react"

interface StickyDivProps {
  display?: CSSProperties["display"]
  width?: CSSProperties["width"]
  height?: CSSProperties["height"]
  disabled: boolean
}

export function StickyDiv({
  children,
  disabled,
  display,
  width,
  height,
}: PropsWithChildren<StickyDivProps>) {
  if (disabled) return <>{children}</>
  return (
    <div style={{ position: "sticky", top: 0, left: 0, display, height }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, width }}>{children}</div>
    </div>
  )
}
