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

export function BasicGrid() {
  return (
    <Grid data={data} defaultColumnWidth={100} defaultRowHeight={100}>
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

export function BasicRTLGrid() {
  return (
    <Grid data={data} defaultColumnWidth={100} defaultRowHeight={100} rtl>
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

export function GridWithGap() {
  return (
    <Grid data={data} defaultColumnWidth={100} defaultRowHeight={100} gap={20}>
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

export function GridWithGapRTL() {
  return (
    <Grid data={data} defaultColumnWidth={100} defaultRowHeight={100} gap={20} rtl>
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
