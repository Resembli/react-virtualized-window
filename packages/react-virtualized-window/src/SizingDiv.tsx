import type { CSSProperties, PropsWithChildren } from "react"
import { useMemo } from "react"

export function SizingDiv({
  children,
  width,
  height,
  className,
  userStyle,
  testId,
}: PropsWithChildren<{
  height: CSSProperties["height"]
  width: CSSProperties["width"]
  userStyle?: CSSProperties
  className?: string
  testId?: string
}>) {
  const style = useMemo(() => {
    return { ...userStyle, width: width ?? "100%", height: height ?? "100%" }
  }, [height, userStyle, width])

  return (
    <div data-testid={testId} style={style} className={className}>
      {children}
    </div>
  )
}
