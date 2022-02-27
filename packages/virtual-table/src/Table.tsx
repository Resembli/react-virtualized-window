import * as React from "react"

export const Table = React.forwardRef<
  HTMLTableElement,
  React.PropsWithChildren<JSX.IntrinsicElements["table"]>
>(({ style, ...props }, ref) => {
  return <table ref={ref} {...props} style={{ ...style, display: "block", overflow: "auto" }} />
})

Table.displayName = "Table"
