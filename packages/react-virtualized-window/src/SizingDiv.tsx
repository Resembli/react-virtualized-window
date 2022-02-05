import type { CSSProperties, PropsWithChildren } from "react"

export function SizingDiv({
  children,
  width,
  height,
  testId,
}: PropsWithChildren<{
  height: CSSProperties["height"]
  width: CSSProperties["width"]
  testId?: string
}>) {
  return (
    <div data-testid={testId} style={{ width: width ?? "100%", height: height ?? "100%" }}>
      {children}
    </div>
  )
}
