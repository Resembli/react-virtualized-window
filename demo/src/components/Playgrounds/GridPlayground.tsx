import { Grid } from "@resembli/react-virtualized-window"

import { css } from "../../theme/theme"

const data = Array(1000)
  .fill(0)
  .map((_, i) => {
    return {
      cells: Array(200)
        .fill(0)
        .map((_, j) => [i, j]),
    }
  })

const heights = Array(1000)
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

export function GridPlayground() {
  return (
    <Grid
      data={data}
      defaultColumnWidth={"10%"}
      defaultRowHeight={"10%"}
      columnWidths={widths}
      rowHeights={heights}
    >
      {([row, column], styles) => {
        return (
          <div style={{ ...styles }} className={itemClass({ odd: (row + column) % 2 === 1 })}>
            {row},{column}
          </div>
        )
      }}
    </Grid>
  )
}
