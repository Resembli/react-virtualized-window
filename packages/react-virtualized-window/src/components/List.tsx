import * as React from "react"

import type { NumberOrPercent, VirtualWindowBaseProps } from "../types"
import type { CellMeta } from "./Grid"
import { Grid } from "./Grid"

export interface ListProps<T> extends VirtualWindowBaseProps<T> {
  data: T[]
  defaultRowHeight: NumberOrPercent
  children: <B extends T>(props: {
    data: B
    style: React.CSSProperties
    cellMeta: CellMeta
  }) => JSX.Element
  rowHeights?: NumberOrPercent[]
}

export function List<T>({
  data,
  children,
  defaultRowHeight,
  rowHeights,
  ...otherProps
}: ListProps<T>) {
  const gridData = React.useMemo(() => data.map((d) => [d]), [data])

  return (
    <Grid
      data={gridData}
      rowHeights={rowHeights}
      defaultRowHeight={defaultRowHeight}
      defaultColumnWidth="100%"
      {...otherProps}
    >
      {children}
    </Grid>
  )
}
