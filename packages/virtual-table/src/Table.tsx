import * as React from "react"
import type { PropsWithChildren } from "react"

export const Table = React.forwardRef<
  HTMLTableElement,
  PropsWithChildren<JSX.IntrinsicElements["table"]>
>(({ style, ...props }, ref) => {
  return <table ref={ref} {...props} style={{ ...style, display: "block", overflow: "auto" }} />
})

Table.displayName = "Table"
