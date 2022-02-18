import * as React from "react"

import type { CellMeta, GridProps } from "./types"

type RenderItemsProps<T> = {
  Component: GridProps<T>["children"]
  marginStyling: React.CSSProperties
  itemProps: T
  itemWidth: number
  column: number
  row: number
}

export const RenderItem = function <T>({
  Component,
  itemProps,
  itemWidth,
  marginStyling,
  column,
  row,
}: RenderItemsProps<T>) {
  const itemStyles = React.useMemo(() => {
    return {
      width: itemWidth,
      minWidth: itemWidth,
      maxWidth: itemWidth,
      height: "100%",
      ...marginStyling,
    }
  }, [itemWidth, marginStyling])

  const cellMeta = React.useMemo<CellMeta>(() => ({ row, column }), [column, row])

  return <Component data={itemProps} style={itemStyles} cellMeta={cellMeta} />
}
