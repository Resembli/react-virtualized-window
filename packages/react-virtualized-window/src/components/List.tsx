import * as React from "react"

import type { NumberOrPercent, VirtualWindowBaseProps } from "../types.js"
import type { CellMeta } from "./Grid.js"
import { Grid } from "./Grid.js"

export interface ListProps<T> extends VirtualWindowBaseProps {
  data: T[]
  defaultRowHeight: NumberOrPercent
  children: <B extends T>(
    itemProps: B,
    style: React.CSSProperties,
    cellMeta: CellMeta,
  ) => JSX.Element
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
