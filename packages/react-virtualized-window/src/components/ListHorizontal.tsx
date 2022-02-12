import * as React from "react"

import type { NumberOrPercent, VirtualWindowBaseProps } from "../types"
import type { CellMeta } from "./Grid"
import { Grid } from "./Grid"

export interface ListHorizontalProps<T> extends VirtualWindowBaseProps {
  data: T[]
  children: <B extends T>(
    itemProps: B,
    style: React.CSSProperties,
    columnMeta: CellMeta,
  ) => JSX.Element
  defaultColumnWidth: NumberOrPercent
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
