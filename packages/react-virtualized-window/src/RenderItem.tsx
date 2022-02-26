import * as React from "react"

import type { CellMeta, GridProps } from "./types.js"

type RenderItemsProps<T> = {
  Component: GridProps<T>["children"]
  itemProps: T
  itemWidth: number
  column: number
  row: number
  pinnedRow?: CellMeta["pinnedRow"]
  pinnedColumn?: CellMeta["pinnedColumn"]
}

export const RenderItem = function <T>({
  Component,
  itemProps,
  itemWidth,
  column,
  row,
  pinnedRow,
  pinnedColumn,
}: RenderItemsProps<T>) {
  const itemStyles = React.useMemo(() => {
    return {
      width: itemWidth,
      minWidth: itemWidth,
      maxWidth: itemWidth,
      height: "100%",
    }
  }, [itemWidth])

  const cellMeta = React.useMemo<CellMeta>(
    () => ({ row, column, pinnedRow, pinnedColumn }),
    [column, pinnedRow, pinnedColumn, row],
  )

  return <Component data={itemProps} style={itemStyles} cellMeta={cellMeta} />
}
