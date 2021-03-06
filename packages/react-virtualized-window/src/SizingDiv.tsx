import * as React from "react"

export function SizingDiv({
  children,
  width,
  height,
  className,
  userStyle,
  testId,
}: React.PropsWithChildren<{
  height: React.CSSProperties["height"]
  width: React.CSSProperties["width"]
  userStyle?: React.CSSProperties
  className?: string
  testId?: string
}>) {
  const style = React.useMemo(() => {
    return { ...userStyle, width: width ?? "100%", height: height ?? "100%" }
  }, [height, userStyle, width])

  return (
    <div data-testid={testId} style={style} className={className}>
      {children}
    </div>
  )
}
