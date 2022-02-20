import * as React from "react"

import type { CellMeta, GridProps } from "./types"

type RenderItemsProps<T> = {
  Component: GridProps<T>["children"]
  itemProps: T
  itemWidth: number
  column: number
  row: number
  marginLeft: number
  marginRight: number
}

export const RenderItem = function <T>({
  Component,
  itemProps,
  itemWidth,
  column,
  row,
  marginRight,
  marginLeft,
}: RenderItemsProps<T>) {
  const itemStyles = React.useMemo(() => {
    return {
      width: itemWidth,
      minWidth: itemWidth,
      maxWidth: itemWidth,
      height: "100%",
      marginLeft,
      marginRight,
    }
  }, [itemWidth, marginLeft, marginRight])

  const cellMeta = React.useMemo<CellMeta>(() => ({ row, column }), [column, row])

  return <Component data={itemProps} style={itemStyles} cellMeta={cellMeta} />
}
