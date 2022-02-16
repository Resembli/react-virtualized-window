import type { RenderItem } from "@resembli/react-virtualized-window"
import { Grid } from "@resembli/react-virtualized-window"

import { css } from "../../theme/theme"

const pinnedLeft = [Array.from({ length: 100 }, (_, i) => [-1, i])]

const data = Array(100)
  .fill(0)
  .map((_, i) => {
    return Array(200)
      .fill(0)
      .map((_, j) => [i, j])
  })

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
      width="70%"
      height="70%"
      pinnedLeft={pinnedLeft}
    >
      {GridItem}
    </Grid>
  )
}
