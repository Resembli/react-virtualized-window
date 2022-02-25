import * as React from "react"

import type { CellMeta, NumberOrPercent, VirtualWindowBaseProps } from "../types.js"
import { Grid } from "./Grid.js"

export interface ListProps<T> extends VirtualWindowBaseProps<T> {
  data: T[]
  defaultSize: NumberOrPercent
  children: <B extends T>(props: {
    data: B
    style: React.CSSProperties
    cellMeta: CellMeta
  }) => JSX.Element
  sizes?: NumberOrPercent[]
  layout?: "horizontal" | "vertical"
}

export function List<T>({
  data,
  children,
  defaultSize,
  sizes,
  layout = "vertical",
  ...otherProps
}: ListProps<T>) {
  const verticalData = React.useMemo(() => data.map((d) => [d]), [data])
  const horizontalData = React.useMemo(() => [data], [data])

  if (layout === "horizontal") {
    return (
      <Grid
        data={horizontalData}
        defaultColumnWidth={defaultSize}
        columnWidths={sizes}
        defaultRowHeight="100%"
        {...otherProps}
      >
        {children}
      </Grid>
    )
  }

  return (
    <Grid
      data={verticalData}
      rowHeights={sizes}
      defaultRowHeight={defaultSize}
      defaultColumnWidth="100%"
      {...otherProps}
    >
      {children}
    </Grid>
  )
}
