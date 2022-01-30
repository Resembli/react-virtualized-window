import type { CSSProperties, PropsWithChildren } from "react"

export function SizingDiv({
  children,
  width,
  height,
}: PropsWithChildren<{
  height: CSSProperties["height"]
  width: CSSProperties["width"]
}>) {
  return <div style={{ width: width ?? "100%", height: height ?? "100%" }}>{children}</div>
}
