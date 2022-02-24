import * as React from "react"

import type { CellMeta, GridProps } from "./types"

type RenderItemsProps<T> = {
  Component: GridProps<T>["children"]
  itemProps: T
  itemWidth: number
  column: number
  row: number
  pinned?: "left" | "right"
}

export const RenderItem = function <T>({
  Component,
  itemProps,
  itemWidth,
  column,
  row,
  pinned,
}: RenderItemsProps<T>) {
  const itemStyles = React.useMemo(() => {
    return {
      width: itemWidth,
      minWidth: itemWidth,
      maxWidth: itemWidth,
      height: "100%",
    }
  }, [itemWidth])

  const cellMeta = React.useMemo<CellMeta>(() => ({ row, column, pinned }), [column, pinned, row])

  return <Component data={itemProps} style={itemStyles} cellMeta={cellMeta} />
}
