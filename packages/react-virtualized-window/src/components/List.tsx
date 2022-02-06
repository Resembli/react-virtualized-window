import type { CSSProperties } from "react"
import { useMemo } from "react"

import type { NumberOrPercent, VirtualWindowBaseProps } from "../types"
import type { CellMeta } from "./Grid"
import { Grid } from "./Grid"

export interface ListProps<T> extends VirtualWindowBaseProps {
  data: T[]
  defaultRowHeight: NumberOrPercent
  children: <B extends T>(itemProps: B, style: CSSProperties, cellMeta: CellMeta) => JSX.Element
  rowHeights?: NumberOrPercent[]
}

export function List<T>({
  data,
  children,
  defaultRowHeight,
  rowHeights,
  ...otherProps
}: ListProps<T>) {
  const gridData = useMemo(() => data.map((d) => [d]), [data])

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
