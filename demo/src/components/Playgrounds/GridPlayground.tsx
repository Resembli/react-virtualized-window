import type { RenderItem } from "@resembli/react-virtualized-window"
import { Grid } from "@resembli/react-virtualized-window"

import { css } from "../../theme/theme"

const data = Array(2000)
  .fill(0)
  .map((_, i) => {
    return Array(200)
      .fill(0)
      .map((_, j) => [i, j])
  })

const heights = Array(2000)
  .fill(0)
  .map((_, i) => ([40, 30, 100, "20%", "40%"] as const)[i % 5])

const widths = Array(200)
  .fill(0)
  .map((_, i) => (["5%", "10%", "20%", "12%", "11%"] as const)[i % 5])

const itemClass = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "$blue4",
  variants: {
    odd: {
      true: { backgroundColor: "$mint3", color: "$mint11" },
    },
  },
})

const GridItem: RenderItem<number[]> = ({ style, data: [row, column] }) => {
  return (
    <div style={style} className={itemClass({ odd: (row + column) % 2 === 1 })}>
      {row},{column}
    </div>
  )
}

export function GridPlayground() {
  return (
    <Grid
      data={data}
      defaultColumnWidth={100}
      defaultRowHeight={100}
      gap={20}
      columnWidths={widths}
      rowHeights={heights}
    >
      {GridItem}
    </Grid>
  )
}
