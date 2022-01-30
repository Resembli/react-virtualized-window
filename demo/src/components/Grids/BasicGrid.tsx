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
})

export function BasicGrid() {
  return (
    <Grid data={data} defaultColumnWidth={100} defaultRowHeight={100}>
      {(props, styles) => {
        return (
          <div style={{ ...styles }} className={itemClass()}>
            {props[0]},{props[1]}
          </div>
        )
      }}
    </Grid>
  )
}
