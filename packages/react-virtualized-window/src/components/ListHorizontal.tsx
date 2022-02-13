import * as React from "react"

import type { NumberOrPercent, VirtualWindowBaseProps } from "../types"
import type { CellMeta } from "./Grid"
import { Grid } from "./Grid"

export interface ListHorizontalProps<T> extends VirtualWindowBaseProps<T> {
  data: T[]
  defaultColumnWidth: NumberOrPercent
  children: <B extends T>(props: {
    data: B
    style: React.CSSProperties
    cellMeta: CellMeta
  }) => JSX.Element
  columnWidths?: NumberOrPercent[]
}

export function ListHorizontal<T>({
  data,
  children,
  defaultColumnWidth,
  columnWidths,
  ...props
}: ListHorizontalProps<T>) {
  const gridData = React.useMemo(() => [data], [data])

  return (
    <Grid
      data={gridData}
      defaultColumnWidth={defaultColumnWidth}
      columnWidths={columnWidths}
      defaultRowHeight="100%"
      {...props}
    >
      {children}
    </Grid>
  )
}
